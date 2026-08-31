export type BrowserModelPart = {
  path: string;
  bytes: number;
  sha256: string;
};

export type ModelIntegrityErrorCode =
  | "model-fetch"
  | "model-size"
  | "model-sha256";

export class ModelIntegrityError extends Error {
  constructor(public readonly code: ModelIntegrityErrorCode) {
    super(code);
    this.name = "ModelIntegrityError";
  }
}

export async function sha256Hex(
  bytes: Uint8Array<ArrayBuffer>,
): Promise<string> {
  const digest = new Uint8Array(
    await globalThis.crypto.subtle.digest("SHA-256", bytes),
  );
  return Array.from(digest, (byte) => byte.toString(16).padStart(2, "0")).join(
    "",
  );
}

function declaredLength(response: Response): number | undefined {
  const header = response.headers.get("content-length");
  if (header === null || !/^\d+$/u.test(header)) return undefined;
  const value = Number(header);
  return Number.isSafeInteger(value) ? value : undefined;
}

async function cancelQuietly(target: {
  cancel(reason?: unknown): Promise<void>;
}): Promise<void> {
  try {
    await target.cancel("model-size");
  } catch {
    // The integrity failure remains authoritative if cancellation fails.
  }
}

export async function readVerifiedModelPart(
  response: Response,
  destination: Uint8Array<ArrayBuffer>,
  offset: number,
  part: BrowserModelPart,
  onProgress: (loaded: number) => void = () => undefined,
): Promise<void> {
  if (!response.ok) throw new ModelIntegrityError("model-fetch");
  if (
    !Number.isSafeInteger(offset) ||
    offset < 0 ||
    !Number.isSafeInteger(part.bytes) ||
    part.bytes < 0 ||
    offset + part.bytes > destination.byteLength
  ) {
    throw new ModelIntegrityError("model-size");
  }

  if ((declaredLength(response) ?? 0) > part.bytes) {
    if (response.body) await cancelQuietly(response.body);
    throw new ModelIntegrityError("model-size");
  }

  let written = 0;
  try {
    if (response.body) {
      const reader = response.body.getReader();
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          if (value.byteLength > part.bytes - written) {
            await cancelQuietly(reader);
            throw new ModelIntegrityError("model-size");
          }
          destination.set(value, offset + written);
          written += value.byteLength;
          onProgress(written);
        }
      } finally {
        reader.releaseLock();
      }
    } else {
      const bytes = new Uint8Array(await response.arrayBuffer());
      if (bytes.byteLength > part.bytes) {
        throw new ModelIntegrityError("model-size");
      }
      destination.set(bytes, offset);
      written = bytes.byteLength;
      onProgress(written);
    }

    if (written !== part.bytes) throw new ModelIntegrityError("model-size");
    const actual = await sha256Hex(
      destination.subarray(offset, offset + part.bytes),
    );
    if (actual !== part.sha256) {
      throw new ModelIntegrityError("model-sha256");
    }
  } catch (error) {
    destination.fill(0, offset, offset + written);
    throw error;
  }
}
