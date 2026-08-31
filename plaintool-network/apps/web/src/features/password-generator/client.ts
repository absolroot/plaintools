import {
  generatePassword,
  type PasswordGenerationOptions,
  type RandomUint32Source,
} from "@plaintool/password-core";
import {
  copyText,
  readClientCopy,
  setToolStatus,
} from "../../scripts/shared/tool-dom";
import type {
  PasswordGeneratorClientCopy,
  PasswordStrengthBand,
} from "./contract";

const UI_MIN_LENGTH = 8;
const UI_MAX_LENGTH = 128;
const RANDOM_BUFFER_SIZE = 128;

function format(
  template: string,
  values: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/gu, (_, key: string) =>
    String(values[key] ?? `{${key}}`),
  );
}

function strengthBand(entropyUpperBoundBits: number): PasswordStrengthBand {
  if (entropyUpperBoundBits < 50) return "limited";
  if (entropyUpperBoundBits < 80) return "moderate";
  if (entropyUpperBoundBits < 112) return "strong";
  return "veryStrong";
}

function strengthLevel(band: PasswordStrengthBand): number {
  return band === "limited"
    ? 1
    : band === "moderate"
      ? 2
      : band === "strong"
        ? 3
        : 4;
}

function createCryptoRandomSource(): RandomUint32Source {
  if (!globalThis.crypto?.getRandomValues) {
    throw new Error("crypto-unavailable");
  }
  const values = new Uint32Array(RANDOM_BUFFER_SIZE);
  let index = values.length;
  return () => {
    if (index >= values.length) {
      globalThis.crypto.getRandomValues(values);
      index = 0;
    }
    const value = values[index];
    index += 1;
    return value;
  };
}

function init(root: HTMLElement): void {
  if (root.dataset.initialized) return;
  root.dataset.initialized = "true";

  const copy = readClientCopy<PasswordGeneratorClientCopy>(root);
  const result = root.querySelector<HTMLInputElement>("[data-result]")!;
  const lengthNumber = root.querySelector<HTMLInputElement>(
    "[data-length-number]",
  )!;
  const lengthRange = root.querySelector<HTMLInputElement>(
    "[data-length-range]",
  )!;
  const characterOptions = root.querySelector<HTMLElement>(
    "[data-character-options]",
  )!;
  const characterInputs = [
    ...root.querySelectorAll<HTMLInputElement>("[data-character-set]"),
  ];
  const excludeAmbiguous = root.querySelector<HTMLInputElement>(
    "[data-exclude-ambiguous]",
  )!;
  const copyButton = root.querySelector<HTMLButtonElement>("[data-copy]")!;
  const regenerateButton =
    root.querySelector<HTMLButtonElement>("[data-regenerate]")!;
  const strength = root.querySelector<HTMLElement>("[data-strength]")!;
  const strengthLabel = root.querySelector<HTMLElement>(
    "[data-strength-label]",
  )!;
  const strengthHint = root.querySelector<HTMLElement>("[data-strength-hint]")!;
  const entropy = root.querySelector<HTMLOutputElement>("[data-entropy]")!;
  const status = root.querySelector<HTMLElement>("[data-status]")!;
  let committedPassword = "";
  let revision = 0;

  const setStatus = (
    message: string,
    state: "idle" | "success" | "error" = "idle",
  ) => setToolStatus(root, status, message, state);

  const resetResult = () => {
    committedPassword = "";
    result.value = "";
    copyButton.disabled = true;
    strength.dataset.level = "";
    strength.setAttribute("aria-valuenow", "0");
    strengthLabel.textContent = "—";
    strengthHint.textContent = copy.feature.entropyHint;
    entropy.textContent = "";
  };

  const selectedOptions = (length: number): PasswordGenerationOptions => {
    const selected = Object.fromEntries(
      characterInputs.map((input) => [
        input.dataset.characterSet!,
        input.checked,
      ]),
    );
    return {
      length,
      lowercase: Boolean(selected.lowercase),
      uppercase: Boolean(selected.uppercase),
      digits: Boolean(selected.digits),
      symbols: Boolean(selected.symbols),
      excludeAmbiguous: excludeAmbiguous.checked,
    };
  };

  const generate = () => {
    revision += 1;
    lengthNumber.removeAttribute("aria-invalid");
    characterOptions.removeAttribute("aria-invalid");
    const length = Number(lengthNumber.value);
    if (
      !Number.isInteger(length) ||
      length < UI_MIN_LENGTH ||
      length > UI_MAX_LENGTH
    ) {
      resetResult();
      lengthNumber.setAttribute("aria-invalid", "true");
      setStatus(
        format(copy.feature.errors.lengthRange, {
          min: UI_MIN_LENGTH,
          max: UI_MAX_LENGTH,
        }),
        "error",
      );
      return;
    }

    const options = selectedOptions(length);
    if (
      !options.lowercase &&
      !options.uppercase &&
      !options.digits &&
      !options.symbols
    ) {
      resetResult();
      characterOptions.setAttribute("aria-invalid", "true");
      setStatus(copy.feature.errors.noCharacterTypes, "error");
      return;
    }

    try {
      const generated = generatePassword(options, createCryptoRandomSource());
      committedPassword = generated.password;
      result.value = generated.password;
      copyButton.disabled = false;
      const band = strengthBand(generated.entropyBits);
      const level = strengthLevel(band);
      strength.dataset.level = band;
      strength.setAttribute("aria-valuenow", String(level));
      strengthLabel.textContent = copy.feature.strengthLevels[band];
      strengthHint.textContent = copy.feature.strengthHints[band];
      entropy.textContent = format(copy.feature.entropyEstimate, {
        bits: Math.floor(generated.entropyBits),
      });
      setStatus(copy.feature.generated, "success");
    } catch (error) {
      resetResult();
      const randomUnavailable =
        error instanceof Error && error.message === "crypto-unavailable";
      setStatus(
        randomUnavailable
          ? copy.feature.errors.randomUnavailable
          : copy.feature.errors.generationFailed,
        "error",
      );
    }
  };

  lengthRange.addEventListener("input", () => {
    lengthNumber.value = lengthRange.value;
    generate();
  });
  lengthNumber.addEventListener("input", () => {
    const length = Number(lengthNumber.value);
    if (
      Number.isInteger(length) &&
      length >= UI_MIN_LENGTH &&
      length <= UI_MAX_LENGTH
    ) {
      lengthRange.value = String(length);
    }
    generate();
  });
  characterInputs.forEach((input) =>
    input.addEventListener("change", generate),
  );
  excludeAmbiguous.addEventListener("change", generate);
  regenerateButton.addEventListener("click", generate);
  copyButton.addEventListener("click", async () => {
    if (!committedPassword || copyButton.disabled) return;
    const value = committedPassword;
    const copyRevision = revision;
    const succeeded = await copyText(value);
    if (
      copyRevision !== revision ||
      committedPassword !== value ||
      copyButton.disabled
    ) {
      return;
    }
    setStatus(
      succeeded ? copy.common.copied : copy.common.copyFailed,
      succeeded ? "success" : "error",
    );
  });

  generate();
}

document
  .querySelectorAll<HTMLElement>("[data-password-generator]")
  .forEach(init);
