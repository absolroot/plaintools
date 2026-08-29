import type { Locale } from "./site";

type ToolExamples = {
  wordInput: string;
  jsonInput: string;
  timestampInput: string;
  timestampHint: string;
  dateInput: string;
  dateHint: string;
  timeResult: string;
};

export const toolExamples: Record<Locale, ToolExamples> = {
  en: {
    wordInput:
      "Example: PlainTool counts words and characters in this browser.",
    jsonInput: 'Example: {"name":"PlainTool","items":[1,2,3]}',
    timestampInput: "1704067200",
    timestampHint:
      "Example: 1704067200 (seconds) or 1704067200000 (milliseconds).",
    dateInput: "2024-01-01T00:00",
    dateHint:
      "Example format: 2024-01-01T00:00. Seconds are optional, and you can also use the date picker.",
    timeResult: "Converted value",
  },
  ko: {
    wordInput: "예: PlainTool은 이 브라우저에서 단어와 글자 수를 셉니다.",
    jsonInput: '예: {"name":"PlainTool","items":[1,2,3]}',
    timestampInput: "1704067200",
    timestampHint: "예: 1704067200(초) 또는 1704067200000(밀리초)",
    dateInput: "2024-01-01T00:00",
    dateHint:
      "예시 형식: 2024-01-01T00:00. 초는 생략할 수 있고 날짜 선택도 사용할 수 있습니다.",
    timeResult: "변환 결과",
  },
  es: {
    wordInput:
      "Ejemplo: PlainTool cuenta palabras y caracteres en este navegador.",
    jsonInput: 'Ejemplo: {"name":"PlainTool","items":[1,2,3]}',
    timestampInput: "1704067200",
    timestampHint: "Ej.: 1704067200 (segundos) o 1704067200000 (milisegundos).",
    dateInput: "2024-01-01T00:00",
    dateHint:
      "Formato de ejemplo: 2024-01-01T00:00. Los segundos son opcionales y también puedes usar el selector.",
    timeResult: "Valor convertido",
  },
};
