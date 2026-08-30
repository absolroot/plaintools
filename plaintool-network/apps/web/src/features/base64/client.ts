import type {
  CodecMode,
  CodecOptions,
  CodecResult,
} from "@plaintool/codec-core";
import { HEX_PREVIEW_BYTE_LIMIT } from "@plaintool/codec-core";
import {
  appendBadge,
  copyText,
  createDeferredIndicator,
  downloadBlob,
  exceedsUtf8ByteLimit,
  readClientCopy,
  setToolStatus,
  type ToolState,
} from "../../scripts/shared/tool-dom";
import { createLatestWorkerRunner } from "../../scripts/shared/latest-worker-runner";
import type {
  Base64ClientCopy,
  Base64WorkerReply,
  Base64WorkerRequest,
} from "./contract";
import { createBase64ModeDefinitions } from "./mode-definition";
import {
  base64FailureCode,
  prepareBase64WorkerMessage,
  type Base64RunContext,
} from "./run-preparation";

const MAX_BYTES = 100 * 1024 * 1024;
const AUTO_RUN_CHARS = 1024 * 1024;
const QUICK_AUTO_RUN_CHARS = 64 * 1024;
const QUICK_AUTO_RUN_DELAY = 70;
const LARGE_AUTO_RUN_DELAY = 140;
const VERY_LARGE_AUTO_RUN_DELAY = 260;

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KiB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MiB`;
}

function initConverter(root: HTMLElement): void {
  if (root.dataset.initialized) return;
  root.dataset.initialized = "true";

  const query = <T extends Element>(selector: string) =>
    root.querySelector<T>(selector)!;
  const copy = readClientCopy<Base64ClientCopy>(root, "[data-tool-copy]");
  const modeDefinitions = createBase64ModeDefinitions(copy);
  const pageHeading = document.querySelector<HTMLElement>(
    "[data-mode-heading]",
  );
  const pageSubheading = document.querySelector<HTMLElement>(
    "[data-mode-subheading]",
  );
  const input = query<HTMLTextAreaElement>("[data-input]");
  const output = query<HTMLTextAreaElement>("[data-output]");
  const inputLabel = query<HTMLElement>("[data-input-label]");
  const outputLabel = query<HTMLElement>("[data-output-label]");
  const status = query<HTMLElement>("[data-status]");
  const badges = query<HTMLElement>("[data-badges]");
  const copyButton = query<HTMLButtonElement>("[data-copy]");
  const downloadButton = query<HTMLButtonElement>("[data-download]");
  const openFileButton = query<HTMLButtonElement>("[data-open-file]");
  const fileInput = query<HTMLInputElement>("[data-file-input]");
  const outputView = query<HTMLSelectElement>('[data-option="outputView"]');
  const optionsPanel = query<HTMLDetailsElement>("[data-options]");
  const recursiveOption = query<HTMLInputElement>('[data-option="recursive"]');
  const preview = query<HTMLElement>("[data-preview]");
  const previewImage = query<HTMLImageElement>("[data-preview-image]");
  let mode: CodecMode =
    root.dataset.initialMode === "encode" ? "encode" : "decode";
  let revision = 0;
  let autoTimer = 0;
  let pendingFile: File | null = null;
  let result: CodecResult | null = null;
  let previewUrl = "";

  const setStatus = (message: string, state: ToolState = "idle") =>
    setToolStatus(root, status, message, state);
  const workingIndicator = createDeferredIndicator(() =>
    setStatus(copy.working, "working"),
  );

  function clearPreview(): void {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    previewUrl = "";
    preview.hidden = true;
    previewImage.removeAttribute("src");
  }

  function invalidateResult(): void {
    result = null;
    output.value = "";
    badges.replaceChildren();
    clearPreview();
    copyButton.disabled = downloadButton.disabled = true;
  }

  function markResultPending(): void {
    copyButton.disabled = downloadButton.disabled = true;
  }

  function restoreSettledStatus(): void {
    setStatus(
      result ? modeDefinitions[mode].completeLabel : copy.ready,
      result ? "success" : "idle",
    );
  }

  function syncTextDirections(): void {
    input.dir = mode === "decode" ? "ltr" : "auto";
    output.dir =
      mode === "encode" || outputView.value === "hex" ? "ltr" : "auto";
  }

  function updateMode(nextMode: CodecMode, updateUrl = true): void {
    window.clearTimeout(autoTimer);
    cancelActiveWork();
    mode = nextMode;
    syncTextDirections();
    const definition = modeDefinitions[mode];
    root.dataset.mode = mode;
    root
      .querySelectorAll<HTMLButtonElement>("[data-mode]")
      .forEach((button) => {
        const active = button.dataset.mode === mode;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", String(active));
      });
    inputLabel.textContent = definition.inputLabel;
    outputLabel.textContent = definition.outputLabel;
    input.placeholder = definition.inputPlaceholder;
    const heading = definition.heading;
    if (pageHeading) pageHeading.textContent = heading;
    const headerContext = document.querySelector<HTMLElement>(
      "[data-header-context]",
    );
    const headerContextLabel = headerContext?.querySelector<HTMLElement>(
      "[data-header-context-label]",
    );
    if (headerContext && headerContextLabel) {
      const headerLabel =
        mode === "decode" ? copy.decodeHeaderLabel : copy.encodeHeaderLabel;
      headerContext.ariaLabel = headerLabel;
      headerContextLabel.textContent = headerLabel;
    }
    if (pageSubheading) pageSubheading.textContent = definition.description;
    const { guideTitle, guideIntro, guideSteps, faqs } = definition;
    const guideTitleNode =
      document.querySelector<HTMLElement>("[data-guide-title]");
    const guideIntroNode =
      document.querySelector<HTMLElement>("[data-guide-intro]");
    if (guideTitleNode) guideTitleNode.textContent = guideTitle;
    if (guideIntroNode) guideIntroNode.textContent = guideIntro;
    document
      .querySelectorAll<HTMLElement>("[data-guide-step]")
      .forEach((item, index) => {
        item.textContent = guideSteps[index] || "";
      });
    document
      .querySelectorAll<HTMLElement>("[data-faq-question]")
      .forEach((item, index) => {
        item.textContent = faqs[index]?.q || "";
      });
    document
      .querySelectorAll<HTMLElement>("[data-faq-answer]")
      .forEach((item, index) => {
        item.textContent = faqs[index]?.a || "";
      });
    const faqSchema =
      document.querySelector<HTMLScriptElement>("[data-faq-schema]");
    if (faqSchema)
      faqSchema.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      });
    root.setAttribute("aria-label", heading);
    pendingFile = null;
    invalidateResult();
    setStatus(copy.ready);
    if (updateUrl) {
      const locale = root.dataset.locale || "en";
      const slug = definition.slug;
      history.replaceState({}, "", `/${locale}/${slug}/`);
      const canonical = document.querySelector<HTMLLinkElement>(
        'link[rel="canonical"]',
      );
      if (canonical) {
        const url = new URL(canonical.href);
        url.pathname = `/${locale}/${slug}/`;
        canonical.href = url.toString();
        document
          .querySelector<HTMLMetaElement>('meta[property="og:url"]')
          ?.setAttribute("content", url.toString());
      }
      document
        .querySelectorAll<HTMLLinkElement>('link[rel="alternate"][hreflang]')
        .forEach((link) => {
          const targetLocale =
            link.hreflang === "x-default" ? "en" : link.hreflang;
          const url = new URL(link.href);
          url.pathname = `/${targetLocale}/${slug}/`;
          link.href = url.toString();
        });
      const metaTitle = definition.metaTitle;
      document.title = metaTitle;
      const description = definition.description;
      document
        .querySelector<HTMLMetaElement>('meta[name="description"]')
        ?.setAttribute("content", description);
      document
        .querySelector<HTMLMetaElement>('meta[property="og:title"]')
        ?.setAttribute("content", metaTitle);
      document
        .querySelector<HTMLMetaElement>('meta[property="og:description"]')
        ?.setAttribute("content", description);
      document
        .querySelector<HTMLMetaElement>('meta[name="twitter:title"]')
        ?.setAttribute("content", metaTitle);
      document
        .querySelector<HTMLMetaElement>('meta[name="twitter:description"]')
        ?.setAttribute("content", description);
      const pageSchema =
        document.querySelector<HTMLScriptElement>("[data-page-schema]");
      if (pageSchema) {
        const schema = JSON.parse(pageSchema.textContent || "{}") as {
          "@graph"?: Array<Record<string, any>>;
        };
        const pageUrl = document.querySelector<HTMLLinkElement>(
          'link[rel="canonical"]',
        )?.href;
        if (pageUrl && schema["@graph"]) {
          schema["@graph"].forEach((node) => {
            const types = Array.isArray(node["@type"])
              ? node["@type"]
              : [node["@type"]];
            if (types.includes("WebPage"))
              Object.assign(node, {
                "@id": `${pageUrl}#webpage`,
                url: pageUrl,
                name: metaTitle,
                description,
              });
            if (types.includes("SoftwareApplication"))
              Object.assign(node, {
                "@id": `${pageUrl}#application`,
                url: pageUrl,
                name: heading,
                description,
                mainEntityOfPage: { "@id": `${pageUrl}#webpage` },
                featureList: guideSteps,
              });
            if (
              types.includes("BreadcrumbList") &&
              Array.isArray(node.itemListElement)
            ) {
              const last = node.itemListElement.at(-1);
              if (last) Object.assign(last, { name: heading, item: pageUrl });
            }
          });
          pageSchema.textContent = JSON.stringify(schema);
        }
      }
      document
        .querySelectorAll<HTMLAnchorElement>("[data-locale-link]")
        .forEach((link) => {
          const target = new URL(link.href);
          const targetLocale =
            target.pathname.split("/").filter(Boolean)[0] || "en";
          target.pathname = `/${targetLocale}/${slug}/`;
          target.search = "";
          link.href = target.toString();
        });
    }
  }

  function getOptions(): Partial<CodecOptions> {
    const values: Record<string, string | boolean> = {};
    root
      .querySelectorAll<HTMLInputElement | HTMLSelectElement>("[data-option]")
      .forEach((control) => {
        values[control.dataset.option!] =
          control instanceof HTMLInputElement ? control.checked : control.value;
      });
    return { ...values, mode } as Partial<CodecOptions>;
  }

  function renderResult(nextResult: CodecResult): void {
    result = nextResult;
    output.value = nextResult.text;
    badges.replaceChildren();
    if (nextResult.detectedVariant)
      appendBadge(
        badges,
        `${copy.detected}: Base64${nextResult.detectedVariant === "url" ? "URL" : ""}`,
      );
    appendBadge(badges, formatBytes(nextResult.byteLength));
    if (nextResult.hexPreviewTruncated)
      appendBadge(
        badges,
        `${copy.hexLabel}: ${formatBytes(HEX_PREVIEW_BYTE_LIMIT)} / ${formatBytes(nextResult.byteLength)}`,
        true,
      );
    nextResult.repairs.forEach((repair) =>
      appendBadge(badges, copy.repairs[repair]),
    );
    nextResult.warnings.forEach((warning) =>
      appendBadge(
        badges,
        warning === "executable-file"
          ? copy.executableWarning
          : copy.binaryOutput,
        true,
      ),
    );
    if (nextResult.signature)
      appendBadge(
        badges,
        `${nextResult.signature.mime} (.${nextResult.signature.extension})`,
        nextResult.signature.executable,
      );
    if ((nextResult.decodePasses ?? 1) > 1) {
      appendBadge(
        badges,
        copy.recursiveApplied.replace(
          "{count}",
          String(nextResult.decodePasses),
        ),
      );
      recursiveOption.checked = true;
      optionsPanel.open = true;
    }
    copyButton.disabled = !nextResult.text;
    downloadButton.disabled = !nextResult.text && !nextResult.bytes?.length;
    clearPreview();
    if (nextResult.signature?.preview === "image" && nextResult.bytes?.length) {
      const copiedBytes = Uint8Array.from(nextResult.bytes);
      const blob = new Blob([copiedBytes.buffer], {
        type: nextResult.signature.mime,
      });
      previewUrl = URL.createObjectURL(blob);
      previewImage.src = previewUrl;
      preview.hidden = false;
    }
    setStatus(modeDefinitions[mode].completeLabel, "success");
  }

  const runner = createLatestWorkerRunner<
    Base64WorkerRequest,
    Base64WorkerReply,
    Base64RunContext
  >({
    createWorker: () =>
      new Worker(new URL("./worker.ts", import.meta.url), { type: "module" }),
    prepare: prepareBase64WorkerMessage,
    replyId: (reply) => reply.id,
    onReply: (reply) => {
      workingIndicator.end();
      if (reply.ok) renderResult(reply.result);
      else {
        invalidateResult();
        setStatus(copy.errors[reply.error], "error");
      }
    },
    onFailure: (context) => {
      workingIndicator.end();
      invalidateResult();
      setStatus(copy.errors[base64FailureCode(context?.mode ?? mode)], "error");
    },
  });

  function cancelActiveWork(): void {
    revision += 1;
    const wasWorking = workingIndicator.cancel();
    runner.cancel();
    if (wasWorking) restoreSettledStatus();
  }

  function exceedsTextLimit(value: string): boolean {
    return exceedsUtf8ByteLimit(value, MAX_BYTES);
  }

  async function run(): Promise<void> {
    window.clearTimeout(autoTimer);
    workingIndicator.cancel();
    runner.cancel();
    markResultPending();
    revision += 1;
    if (pendingFile) {
      if (pendingFile.size > MAX_BYTES) {
        invalidateResult();
        setStatus(copy.fileTooLarge, "error");
        return;
      }
    } else if (exceedsTextLimit(input.value)) {
      invalidateResult();
      setStatus(copy.fileTooLarge, "error");
      return;
    }
    workingIndicator.begin();
    runner.submit({
      mode,
      input: input.value,
      file: pendingFile,
      options: getOptions(),
    });
  }

  root.querySelectorAll<HTMLButtonElement>("[data-mode]").forEach((button) =>
    button.addEventListener("click", () => {
      const hadFile = Boolean(pendingFile);
      updateMode(button.dataset.mode as CodecMode);
      if (hadFile) input.value = "";
      else if (input.value) void run();
    }),
  );
  openFileButton.addEventListener("click", () => fileInput.click());
  input.addEventListener("input", () => {
    pendingFile = null;
    window.clearTimeout(autoTimer);
    cancelActiveWork();
    if (!input.value) {
      invalidateResult();
      setStatus(copy.ready);
      return;
    }
    if (root.classList.contains("has-error")) restoreSettledStatus();
    markResultPending();
    const delay =
      input.value.length <= QUICK_AUTO_RUN_CHARS
        ? QUICK_AUTO_RUN_DELAY
        : input.value.length <= AUTO_RUN_CHARS
          ? LARGE_AUTO_RUN_DELAY
          : VERY_LARGE_AUTO_RUN_DELAY;
    autoTimer = window.setTimeout(() => void run(), delay);
  });

  root
    .querySelectorAll<HTMLInputElement | HTMLSelectElement>("[data-option]")
    .forEach((control) =>
      control.addEventListener("change", () => {
        if (control === outputView) syncTextDirections();
        if (input.value || pendingFile) void run();
      }),
    );

  root.querySelector("[data-clear]")?.addEventListener("click", () => {
    window.clearTimeout(autoTimer);
    cancelActiveWork();
    input.value = output.value = "";
    fileInput.value = "";
    pendingFile = null;
    invalidateResult();
    setStatus(copy.ready);
    input.focus();
  });

  fileInput.addEventListener("change", () => {
    pendingFile = fileInput.files?.[0] || null;
    if (!pendingFile) return;
    input.value = pendingFile.name;
    fileInput.value = "";
    void run();
  });

  copyButton.addEventListener("click", async () => {
    const copyRevision = revision;
    const copied = await copyText(output.value);
    if (copyRevision !== revision) return;
    setStatus(
      copied ? copy.copied : copy.copyFailed,
      copied ? "success" : "error",
    );
  });

  downloadButton.addEventListener("click", () => {
    if (!result) return;
    const binary =
      mode === "decode" && result.bytes?.length && result.kind === "binary";
    const copiedBytes = binary ? Uint8Array.from(result.bytes!) : null;
    const blob = binary
      ? new Blob([copiedBytes!.buffer], {
          type: result.signature?.mime || "application/octet-stream",
        })
      : new Blob([result.text], { type: "text/plain;charset=utf-8" });
    const filename = binary
      ? `decoded.${result.signature?.extension || "bin"}`
      : mode === "encode"
        ? "encoded-base64.txt"
        : "decoded.txt";
    downloadBlob(blob, filename);
  });

  ["dragenter", "dragover"].forEach((name) =>
    root.addEventListener(name, (event) => {
      event.preventDefault();
      root.classList.add("is-dragging");
    }),
  );
  ["dragleave", "drop"].forEach((name) =>
    root.addEventListener(name, (event) => {
      event.preventDefault();
      root.classList.remove("is-dragging");
    }),
  );
  root.addEventListener("drop", (event) => {
    pendingFile = event.dataTransfer?.files?.[0] || null;
    if (!pendingFile) return;
    input.value = pendingFile.name;
    void run();
  });

  window.addEventListener(
    "pagehide",
    () => {
      runner.dispose();
      clearPreview();
    },
    { once: true },
  );
  updateMode(mode, false);
}

document
  .querySelectorAll<HTMLElement>("[data-converter]")
  .forEach(initConverter);
