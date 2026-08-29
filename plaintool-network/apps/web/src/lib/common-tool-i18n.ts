import type { Locale } from "./site";

export type CommonToolCopy = {
  preview: string;
  ready: string;
  working: string;
  clear: string;
  copy: string;
  copied: string;
  copyFailed: string;
  processingFailed: string;
  download: string;
  faqTitle: string;
  localTitle: string;
  localBody: string;
};

export const commonToolCopy: Record<Locale, CommonToolCopy> = {
  en: {
    preview: "Preview",
    ready: "Ready",
    working: "Working…",
    clear: "Clear",
    copy: "Copy",
    copied: "Copied",
    copyFailed: "Could not copy the result.",
    processingFailed: "Processing failed. Try again.",
    download: "Download",
    faqTitle: "Frequently asked questions",
    localTitle: "PlainTool works in your browser.",
    localBody:
      "Your input and results are processed only in this browser. They are not uploaded to or stored on a server.",
  },
  ko: {
    preview: "시험판",
    ready: "준비됨",
    working: "처리 중…",
    clear: "지우기",
    copy: "복사",
    copied: "복사됨",
    copyFailed: "복사하지 못했습니다.",
    processingFailed: "처리하지 못했습니다. 다시 시도하세요.",
    download: "다운로드",
    faqTitle: "자주 묻는 질문",
    localTitle: "PlainTool은 브라우저에서 작동합니다.",
    localBody:
      "입력한 내용과 결과는 브라우저 안에서만 처리되며 서버로 전송되거나 저장되지 않습니다.",
  },
  es: {
    preview: "Versión preliminar",
    ready: "Listo",
    working: "Procesando…",
    clear: "Limpiar",
    copy: "Copiar",
    copied: "Copiado",
    copyFailed: "No se pudo copiar el resultado.",
    processingFailed: "No se pudo procesar. Inténtalo de nuevo.",
    download: "Descargar",
    faqTitle: "Preguntas frecuentes",
    localTitle: "PlainTool funciona en tu navegador.",
    localBody:
      "La entrada y los resultados se procesan únicamente en este navegador. No se envían ni se guardan en ningún servidor.",
  },
};
