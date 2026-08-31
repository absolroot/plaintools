import {
  UuidCoreError,
  formatUuid,
  generateUuidBatch,
  isNameBasedUuidVersion,
  type UuidLetterCase,
  type UuidNamespaceKind,
  type UuidOutputFormat,
  type UuidVersion,
} from "@plaintool/uuid-core";
import {
  copyText,
  downloadBlob,
  readClientCopy,
  setToolStatus,
} from "../../scripts/shared/tool-dom";
import type { UuidGeneratorClientCopy } from "./contract";

function fill(
  template: string,
  values: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/gu, (_, key: string) =>
    String(values[key] ?? `{${key}}`),
  );
}

function init(root: HTMLElement): void {
  if (root.dataset.initialized) return;
  root.dataset.initialized = "true";

  const copy = readClientCopy<UuidGeneratorClientCopy>(root);
  const versionButtons = [
    ...root.querySelectorAll<HTMLButtonElement>("[data-version-button]"),
  ];
  const nameControls = root.querySelector<HTMLElement>("[data-name-controls]")!;
  const quantityControls = root.querySelector<HTMLElement>(
    "[data-quantity-controls]",
  )!;
  const nameInput = root.querySelector<HTMLInputElement>("[data-name]")!;
  const namespaceSelect =
    root.querySelector<HTMLSelectElement>("[data-namespace]")!;
  const customNamespaceField = root.querySelector<HTMLElement>(
    "[data-custom-namespace-field]",
  )!;
  const customNamespaceInput = root.querySelector<HTMLInputElement>(
    "[data-custom-namespace]",
  )!;
  const countInput = root.querySelector<HTMLInputElement>("[data-count]")!;
  const quickCountButtons = [
    ...root.querySelectorAll<HTMLButtonElement>("[data-quick-count]"),
  ];
  const formatButtons = [
    ...root.querySelectorAll<HTMLButtonElement>("[data-format]"),
  ];
  const caseButtons = [
    ...root.querySelectorAll<HTMLButtonElement>("[data-letter-case]"),
  ];
  const versionHint = root.querySelector<HTMLElement>("[data-version-hint]")!;
  const resultSection = root.querySelector<HTMLElement>("[data-results]")!;
  const resultEmpty = root.querySelector<HTMLElement>("[data-result-empty]")!;
  const resultList =
    root.querySelector<HTMLOListElement>("[data-result-list]")!;
  const resultCount = root.querySelector<HTMLElement>("[data-result-count]")!;
  const copyAllButton =
    root.querySelector<HTMLButtonElement>("[data-copy-all]")!;
  const downloadButton =
    root.querySelector<HTMLButtonElement>("[data-download]")!;
  const status = root.querySelector<HTMLElement>("[data-status]")!;

  let version: UuidVersion = "v4";
  let format: UuidOutputFormat = "canonical";
  let letterCase: UuidLetterCase = "lower";
  let canonicalValues: string[] = [];
  let stale = false;

  const setStatus = (
    message: string,
    state: "idle" | "success" | "error" = "idle",
  ) => setToolStatus(root, status, message, state);

  const formattedValues = () =>
    canonicalValues.map((value) => formatUuid(value, format, letterCase));

  const setResultActions = (enabled: boolean) => {
    copyAllButton.disabled = !enabled;
    downloadButton.disabled = !enabled;
    root
      .querySelectorAll<HTMLButtonElement>("[data-copy-index]")
      .forEach((button) => (button.disabled = !enabled));
  };

  const renderResults = () => {
    const values = formattedValues();
    resultEmpty.hidden = values.length > 0;
    resultList.hidden = values.length === 0;
    resultCount.hidden = values.length === 0;
    resultCount.textContent = fill(copy.feature.resultCount, {
      count: values.length,
    });
    resultList.replaceChildren();
    const fragment = document.createDocumentFragment();
    values.forEach((value, index) => {
      const item = document.createElement("li");
      item.className = "uuid-result-row";
      const code = document.createElement("code");
      code.dir = "ltr";
      code.textContent = value;
      const button = document.createElement("button");
      button.className = "text-button uuid-copy-one";
      button.type = "button";
      button.dataset.copyIndex = String(index);
      button.disabled = stale;
      button.setAttribute(
        "aria-label",
        fill(copy.feature.copyOne, { index: index + 1 }),
      );
      button.textContent = copy.feature.copyOne
        .replace(/\s*\{index\}\s*/u, " ")
        .trim();
      item.append(code, button);
      fragment.append(item);
    });
    resultList.append(fragment);
    setResultActions(values.length > 0 && !stale);
  };

  const markStale = () => {
    if (!canonicalValues.length) return;
    stale = true;
    root.classList.add("has-stale-result");
    setResultActions(false);
    setStatus(copy.feature.outdated);
  };

  const syncCustomNamespace = () => {
    const custom = namespaceSelect.value === "custom";
    customNamespaceField.hidden = !custom;
    customNamespaceInput.disabled = !custom || nameControls.hidden;
  };

  const syncVersion = () => {
    const nameBased = isNameBasedUuidVersion(version);
    root.dataset.version = version;
    versionHint.textContent = copy.feature.versionHints[version];
    nameControls.hidden = !nameBased;
    quantityControls.hidden = nameBased;
    nameInput.disabled = !nameBased;
    namespaceSelect.disabled = !nameBased;
    countInput.disabled = nameBased;
    quickCountButtons.forEach((button) => (button.disabled = nameBased));
    syncCustomNamespace();
  };

  const scrollToResults = () => {
    if (!window.matchMedia("(max-width: 680px)").matches) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    requestAnimationFrame(() =>
      resultSection.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "start",
      }),
    );
  };

  const generate = (userInitiated = true) => {
    try {
      canonicalValues = generateUuidBatch({
        version,
        count: Number(countInput.value),
        name: nameInput.value,
        namespaceKind: namespaceSelect.value as UuidNamespaceKind,
        customNamespace: customNamespaceInput.value,
      });
      stale = false;
      root.classList.remove("has-stale-result");
      renderResults();
      setStatus(
        fill(copy.feature.generated, { count: canonicalValues.length }),
        "success",
      );
      if (userInitiated) scrollToResults();
    } catch (error) {
      const message =
        error instanceof UuidCoreError
          ? copy.feature.errors[error.code]
          : copy.common.failed;
      setStatus(message, "error");
    }
  };

  versionButtons.forEach((button) =>
    button.addEventListener("click", () => {
      version = button.dataset.versionButton as UuidVersion;
      versionButtons.forEach((candidate) => {
        const active = candidate === button;
        candidate.classList.toggle("is-active", active);
        candidate.setAttribute("aria-pressed", String(active));
      });
      syncVersion();
      markStale();
    }),
  );

  [nameInput, customNamespaceInput].forEach((input) =>
    input.addEventListener("input", markStale),
  );
  namespaceSelect.addEventListener("change", () => {
    syncCustomNamespace();
    markStale();
  });
  countInput.addEventListener("input", () => {
    quickCountButtons.forEach((button) => {
      const active = button.dataset.quickCount === countInput.value;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    markStale();
  });
  quickCountButtons.forEach((button) =>
    button.addEventListener("click", () => {
      countInput.value = button.dataset.quickCount!;
      quickCountButtons.forEach((candidate) => {
        const active = candidate === button;
        candidate.classList.toggle("is-active", active);
        candidate.setAttribute("aria-pressed", String(active));
      });
      markStale();
    }),
  );

  formatButtons.forEach((button) =>
    button.addEventListener("click", () => {
      format = button.dataset.format as UuidOutputFormat;
      formatButtons.forEach((candidate) => {
        const active = candidate === button;
        candidate.classList.toggle("is-active", active);
        candidate.setAttribute("aria-pressed", String(active));
      });
      renderResults();
    }),
  );
  caseButtons.forEach((button) =>
    button.addEventListener("click", () => {
      letterCase = button.dataset.letterCase as UuidLetterCase;
      caseButtons.forEach((candidate) => {
        const active = candidate === button;
        candidate.classList.toggle("is-active", active);
        candidate.setAttribute("aria-pressed", String(active));
      });
      renderResults();
    }),
  );

  root
    .querySelector("[data-generate]")
    ?.addEventListener("click", () => generate());
  [nameInput, customNamespaceInput, countInput].forEach((input) =>
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") generate();
    }),
  );
  resultList.addEventListener("click", async (event) => {
    const button = (event.target as HTMLElement).closest<HTMLButtonElement>(
      "[data-copy-index]",
    );
    if (!button || button.disabled || stale) return;
    const index = Number(button.dataset.copyIndex);
    const value = formattedValues()[index];
    if (!value) return;
    const succeeded = await copyText(value);
    setStatus(
      succeeded ? copy.feature.copiedOne : copy.common.copyFailed,
      succeeded ? "success" : "error",
    );
  });
  copyAllButton.addEventListener("click", async () => {
    if (copyAllButton.disabled || stale) return;
    const values = formattedValues();
    const succeeded = await copyText(values.join("\n"));
    setStatus(
      succeeded
        ? fill(copy.feature.copiedAll, { count: values.length })
        : copy.common.copyFailed,
      succeeded ? "success" : "error",
    );
  });
  downloadButton.addEventListener("click", () => {
    if (downloadButton.disabled || stale) return;
    const values = formattedValues();
    downloadBlob(
      new Blob([values.join("\n") + "\n"], {
        type: "text/plain;charset=utf-8",
      }),
      `uuid-${version}.txt`,
    );
    setStatus(
      fill(copy.feature.downloaded, { count: values.length }),
      "success",
    );
  });
  root.querySelector("[data-clear]")?.addEventListener("click", () => {
    canonicalValues = [];
    stale = false;
    root.classList.remove("has-stale-result");
    renderResults();
    setStatus(copy.common.ready);
  });

  syncVersion();
  generate(false);
}

document.querySelectorAll<HTMLElement>("[data-uuid-generator]").forEach(init);
