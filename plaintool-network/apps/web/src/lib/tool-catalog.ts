import type { Locale } from "./site";
import { toolRegistry } from "./tool-registry.js";

export type ToolStatus = "available" | "preview" | "reserve";
export type ToolCategory = "encoding" | "text" | "data" | "time";

type LocalizedText = Record<Locale, string>;

export interface ToolCatalogItem {
  id: string;
  slug?: string;
  mark: string;
  category: ToolCategory;
  status: ToolStatus;
  name: LocalizedText;
  summary: LocalizedText;
}

type RegisteredTool = (typeof toolRegistry)[number];
type RegisteredToolId = RegisteredTool["id"];
type CatalogPresentation = Pick<ToolCatalogItem, "mark" | "name" | "summary">;

const registeredToolCopy: Record<RegisteredToolId, CatalogPresentation> = {
  "base64-decode": {
    mark: "64",
    name: {
      en: "Base64 decoder",
      ko: "Base64 디코더",
      es: "Decodificador Base64",
    },
    summary: {
      en: "Decode Base64 text or files directly in your browser.",
      ko: "Base64 텍스트나 파일을 브라우저에서 바로 디코딩합니다.",
      es: "Decodifica texto o archivos Base64 directamente en el navegador.",
    },
  },
  "base64-encode": {
    mark: "64",
    name: {
      en: "Base64 encoder",
      ko: "Base64 인코더",
      es: "Codificador Base64",
    },
    summary: {
      en: "Encode text or files to Base64 locally in your browser.",
      ko: "텍스트나 파일을 브라우저에서 Base64로 인코딩합니다.",
      es: "Codifica texto o archivos en Base64 directamente en el navegador.",
    },
  },
  "word-counter": {
    mark: "Aa",
    name: {
      en: "Word & character counter",
      ko: "단어·글자 수 세기",
      es: "Contador de palabras y caracteres",
    },
    summary: {
      en: "Count words, characters, lines and paragraphs in your browser.",
      ko: "단어, 글자, 줄, 문단 수를 브라우저에서 셉니다.",
      es: "Cuenta palabras, caracteres, líneas y párrafos en el navegador.",
    },
  },
  "json-formatter": {
    mark: "{}",
    name: { en: "JSON formatter", ko: "JSON 포매터", es: "Formateador JSON" },
    summary: {
      en: "Make JSON easier to read, check it for errors, or minify it to one line.",
      ko: "JSON을 보기 좋게 정리하고, 오류를 검사하거나 한 줄로 압축합니다.",
      es: "Haz que el JSON sea fácil de leer, comprueba si tiene errores o minifícalo en una sola línea.",
    },
  },
  "unix-timestamp-converter": {
    mark: "T",
    name: {
      en: "Unix timestamp converter",
      ko: "Unix 타임스탬프 변환기",
      es: "Conversor de timestamp Unix",
    },
    summary: {
      en: "Convert Unix timestamps in seconds or milliseconds to dates and times, and back.",
      ko: "Unix 타임스탬프(초·밀리초)와 날짜·시간을 서로 변환합니다.",
      es: "Convierte timestamps Unix en segundos o milisegundos a fechas y horas, y viceversa.",
    },
  },
};

const registeredTools: ToolCatalogItem[] = toolRegistry.map((tool) => ({
  id: tool.id,
  slug: tool.slug,
  category: tool.category,
  status: tool.publication === "indexable" ? "available" : "preview",
  ...registeredToolCopy[tool.id],
}));

export const toolCatalog: ToolCatalogItem[] = [
  ...registeredTools,
  {
    id: "text-compare",
    mark: "≠",
    category: "text",
    status: "reserve",
    name: { en: "Text compare", ko: "텍스트 비교", es: "Comparador de texto" },
    summary: {
      en: "Not available yet.",
      ko: "아직 제공되지 않는 도구입니다.",
      es: "Esta herramienta aún no está disponible.",
    },
  },
  {
    id: "case-converter",
    mark: "aA",
    category: "text",
    status: "reserve",
    name: {
      en: "Case converter",
      ko: "대소문자 변환기",
      es: "Conversor de mayúsculas y minúsculas",
    },
    summary: {
      en: "Not available yet.",
      ko: "아직 제공되지 않는 도구입니다.",
      es: "Esta herramienta aún no está disponible.",
    },
  },
];

export const networkCopy: Record<
  Locale,
  {
    allTools: string;
    directoryMetaTitle: string;
    directoryTitle: string;
    directoryIntro: string;
    available: string;
    research: string;
    reserve: string;
    breadcrumbLabel: string;
    encodingCategory: string;
    categories: Record<ToolCategory, string>;
    footerNote: string;
    catalogAria: string;
    useLightTheme: string;
    useDarkTheme: string;
  }
> = {
  en: {
    allTools: "All tools",
    directoryMetaTitle:
      "Free Browser Tools for Text, Data & Encoding | PlainTool",
    directoryTitle: "Find the tool you need.",
    directoryIntro:
      "Run text, data, time, and encoding tasks directly in your browser. Preview tools work normally but remain out of search results until review is complete.",
    available: "Available",
    research: "Preview",
    reserve: "Under consideration",
    breadcrumbLabel: "Breadcrumb",
    encodingCategory: "Encoding & decoding",
    categories: {
      encoding: "Encoding & decoding",
      text: "Text",
      data: "Data",
      time: "Time",
    },
    footerNote:
      "Use these tools directly in your browser—no account or server upload required.",
    catalogAria: "Tool directory",
    useLightTheme: "Use light theme",
    useDarkTheme: "Use dark theme",
  },
  ko: {
    allTools: "전체 도구",
    directoryMetaTitle: "무료 브라우저 도구 - 텍스트·데이터·인코딩 | PlainTool",
    directoryTitle: "필요한 도구를 바로 찾아보세요.",
    directoryIntro:
      "텍스트, 데이터, 시간, 인코딩 작업을 브라우저에서 바로 처리하세요. 시험판 도구는 정상적으로 사용할 수 있지만 검토가 끝날 때까지 검색 결과에 노출되지 않습니다.",
    available: "사용 가능",
    research: "시험판",
    reserve: "검토 중",
    breadcrumbLabel: "현재 위치",
    encodingCategory: "인코딩/디코딩",
    categories: {
      encoding: "인코딩/디코딩",
      text: "텍스트",
      data: "데이터",
      time: "시간",
    },
    footerNote:
      "가입이나 서버 업로드 없이 브라우저에서 바로 사용할 수 있습니다.",
    catalogAria: "도구 디렉터리",
    useLightTheme: "라이트 테마 사용",
    useDarkTheme: "다크 테마 사용",
  },
  es: {
    allTools: "Todas las herramientas",
    directoryMetaTitle: "Herramientas web para texto y datos | PlainTool",
    directoryTitle: "Encuentra la herramienta que necesitas.",
    directoryIntro:
      "Resuelve tareas de texto, datos, tiempo y codificación directamente en el navegador. Las herramientas en versión preliminar funcionan, pero no aparecerán en los resultados de búsqueda hasta terminar la revisión.",
    available: "Disponible",
    research: "Versión preliminar",
    reserve: "En evaluación",
    breadcrumbLabel: "Ruta de navegación",
    encodingCategory: "Codificación y decodificación",
    categories: {
      encoding: "Codificación y decodificación",
      text: "Texto",
      data: "Datos",
      time: "Tiempo",
    },
    footerNote:
      "Usa estas herramientas directamente en el navegador, sin cuenta ni subir contenido a un servidor.",
    catalogAria: "Directorio de herramientas",
    useLightTheme: "Usar tema claro",
    useDarkTheme: "Usar tema oscuro",
  },
};

export function toolPath(
  locale: Locale,
  tool: ToolCatalogItem,
): string | undefined {
  return tool.slug ? `/${locale}/${tool.slug}/` : undefined;
}
