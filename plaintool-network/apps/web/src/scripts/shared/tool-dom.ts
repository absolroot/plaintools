export type ToolState = "idle" | "working" | "success" | "error";

export interface DeferredIndicator {
  begin(): void;
  cancel(): boolean;
  end(): boolean;
}

export function readClientCopy<T>(
  root: ParentNode,
  selector = "[data-client-copy]",
): T {
  const source = root.querySelector<HTMLScriptElement>(selector)?.textContent;
  if (!source) throw new Error(`Missing client copy: ${selector}`);
  return JSON.parse(source) as T;
}

export function setToolStatus(
  root: HTMLElement,
  status: HTMLElement,
  message: string,
  state: ToolState = "idle",
): void {
  if (status.textContent !== message) status.textContent = message;
  root.classList.toggle("is-working", state === "working");
  root.classList.toggle("is-success", state === "success");
  root.classList.toggle("has-error", state === "error");
  root.setAttribute("aria-busy", String(state === "working"));
  const liveRegion = status.closest<HTMLElement>(".tool-status") ?? status;
  if (liveRegion !== status) status.removeAttribute("aria-live");
  liveRegion.setAttribute(
    "aria-live",
    state === "error" ? "assertive" : "polite",
  );
}

export function createDeferredIndicator(
  onShow: () => void,
  delay = 180,
): DeferredIndicator {
  let timer: ReturnType<typeof setTimeout> | undefined;
  let shown = false;

  const cancel = (): boolean => {
    if (timer !== undefined) globalThis.clearTimeout(timer);
    timer = undefined;
    const wasShown = shown;
    shown = false;
    return wasShown;
  };

  return {
    begin: () => {
      cancel();
      timer = globalThis.setTimeout(() => {
        timer = undefined;
        shown = true;
        onShow();
      }, delay);
    },
    cancel,
    end: cancel,
  };
}

export async function copyText(value: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    return false;
  }
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function utf8ByteLength(value: string): number {
  return new TextEncoder().encode(value).byteLength;
}

export function exceedsUtf8ByteLimit(value: string, limit: number): boolean {
  if (value.length > limit) return true;
  if (value.length <= Math.floor(limit / 3)) return false;
  return utf8ByteLength(value) > limit;
}

export function appendBadge(
  container: HTMLElement,
  label: string,
  warning = false,
): void {
  const badge = document.createElement("span");
  badge.className = `badge${warning ? " is-warning" : ""}`;
  badge.textContent = label;
  container.append(badge);
}
