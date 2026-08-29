import { marked } from "marked";
import TurndownService from "turndown";

export type CsvDelimiter = "," | ";" | "\t" | "|";

export type DataConversionMode =
  | "csv-to-markdown"
  | "markdown-to-csv"
  | "json-to-csv"
  | "csv-to-json"
  | "html-to-markdown"
  | "markdown-to-html";

export type DataConversionErrorCode =
  | "invalid-csv"
  | "missing-markdown-table"
  | "invalid-markdown-table"
  | "invalid-json"
  | "invalid-json-shape"
  | "empty-header"
  | "duplicate-header";

export class DataConversionError extends Error {
  readonly code: DataConversionErrorCode;
  readonly line?: number;
  readonly column?: number;

  constructor(
    code: DataConversionErrorCode,
    options: { line?: number; column?: number; cause?: unknown } = {},
  ) {
    super(
      code,
      options.cause === undefined ? undefined : { cause: options.cause },
    );
    this.name = "DataConversionError";
    this.code = code;
    this.line = options.line;
    this.column = options.column;
  }
}

export type CsvParseOptions = {
  delimiter?: CsvDelimiter | "auto";
  skipEmptyLines?: boolean;
};

export type CsvConversionOptions = CsvParseOptions & {
  firstRowHeader?: boolean;
};

const CSV_DELIMITERS = [",", "\t", ";", "|"] as const;

function positionAt(
  input: string,
  offset: number,
): {
  line: number;
  column: number;
} {
  const before = input.slice(0, offset);
  const lines = before.split(/\r\n|\r|\n/);
  return { line: lines.length, column: (lines.at(-1)?.length ?? 0) + 1 };
}

export function detectCsvDelimiter(input: string): CsvDelimiter {
  const scores = CSV_DELIMITERS.map((delimiter) => {
    const counts: number[] = [];
    let count = 0;
    let inQuotes = false;

    for (
      let index = 0;
      index < input.length && counts.length < 12;
      index += 1
    ) {
      const character = input[index]!;
      if (character === '"') {
        if (inQuotes && input[index + 1] === '"') index += 1;
        else inQuotes = !inQuotes;
      } else if (!inQuotes && character === delimiter) {
        count += 1;
      } else if (!inQuotes && (character === "\r" || character === "\n")) {
        if (character === "\r" && input[index + 1] === "\n") index += 1;
        if (count > 0) counts.push(count);
        count = 0;
      }
    }
    if (count > 0) counts.push(count);
    if (counts.length === 0) return { delimiter, score: 0 };
    const mostFrequent = Math.max(
      ...Array.from(
        new Set(counts),
        (value) => counts.filter((candidate) => candidate === value).length,
      ),
    );
    const consistency = mostFrequent / counts.length;
    const width = Math.max(...counts);
    return {
      delimiter,
      score: consistency * 1000 + counts.length * 10 + width,
    };
  });

  scores.sort((left, right) => right.score - left.score);
  return scores[0]!.score === 0 ? "," : scores[0]!.delimiter;
}

export function parseCsv(
  source: string,
  options: CsvParseOptions = {},
): string[][] {
  const input = source.startsWith("\uFEFF") ? source.slice(1) : source;
  if (input.length === 0) return [];
  const delimiter =
    !options.delimiter || options.delimiter === "auto"
      ? detectCsvDelimiter(input)
      : options.delimiter;
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  let afterQuote = false;
  let rowTouched = false;

  const fail = (offset: number): never => {
    throw new DataConversionError("invalid-csv", positionAt(input, offset));
  };
  const commitField = () => {
    row.push(field);
    field = "";
    afterQuote = false;
  };
  const commitRow = () => {
    commitField();
    if (
      !options.skipEmptyLines ||
      row.length > 1 ||
      row.some((value) => value.length > 0)
    ) {
      rows.push(row);
    }
    row = [];
    rowTouched = false;
  };

  for (let index = 0; index < input.length; index += 1) {
    const character = input[index]!;
    if (inQuotes) {
      rowTouched = true;
      if (character === '"') {
        if (input[index + 1] === '"') {
          field += '"';
          index += 1;
        } else {
          inQuotes = false;
          afterQuote = true;
        }
      } else {
        field += character;
      }
      continue;
    }

    if (afterQuote) {
      if (character === delimiter) {
        commitField();
        rowTouched = true;
      } else if (character === "\r" || character === "\n") {
        commitRow();
        if (character === "\r" && input[index + 1] === "\n") index += 1;
      } else if (character !== " " && character !== "\t") {
        fail(index);
      }
      continue;
    }

    if (character === '"') {
      if (field.length > 0) fail(index);
      inQuotes = true;
      rowTouched = true;
    } else if (character === delimiter) {
      commitField();
      rowTouched = true;
    } else if (character === "\r" || character === "\n") {
      commitRow();
      if (character === "\r" && input[index + 1] === "\n") index += 1;
    } else {
      field += character;
      rowTouched = true;
    }
  }

  if (inQuotes) fail(input.length);
  if (rowTouched || row.length > 0 || field.length > 0) commitRow();
  return rows;
}

function quoteCsvCell(value: string, delimiter: CsvDelimiter): string {
  if (
    value.includes(delimiter) ||
    value.includes('"') ||
    /[\r\n]/.test(value) ||
    /^\s|\s$/.test(value)
  ) {
    return `"${value.replaceAll('"', '""')}"`;
  }
  return value;
}

export function serializeCsv(
  rows: readonly (readonly string[])[],
  delimiter: CsvDelimiter = ",",
): string {
  return rows
    .map((row) =>
      row.map((cell) => quoteCsvCell(cell, delimiter)).join(delimiter),
    )
    .join("\r\n");
}

function escapeMarkdownCell(value: string): string {
  return value
    .replaceAll("\\", "\\\\")
    .replaceAll("|", "\\|")
    .replace(/\r\n|\r|\n/g, "<br>")
    .trim();
}

function normalizeRowWidth(rows: string[][]): string[][] {
  const width = Math.max(0, ...rows.map((row) => row.length));
  return rows.map((row) => [
    ...row,
    ...Array.from({ length: width - row.length }, () => ""),
  ]);
}

export function csvToMarkdown(
  input: string,
  options: CsvConversionOptions = {},
): string {
  const rows = normalizeRowWidth(parseCsv(input, options));
  if (rows.length === 0) return "";
  const firstRowHeader = options.firstRowHeader ?? true;
  const width = rows[0]!.length;
  const header = firstRowHeader
    ? rows[0]!
    : Array.from({ length: width }, () => "");
  const body = firstRowHeader ? rows.slice(1) : rows;
  const formatRow = (row: readonly string[]) =>
    `| ${row.map(escapeMarkdownCell).join(" | ")} |`;
  return [
    formatRow(header),
    `| ${Array.from({ length: width }, () => "---").join(" | ")} |`,
    ...body.map(formatRow),
  ].join("\n");
}

function splitMarkdownRow(line: string): string[] {
  let source = line.trim();
  if (source.startsWith("|")) source = source.slice(1);
  if (source.endsWith("|") && !source.endsWith("\\|"))
    source = source.slice(0, -1);
  const cells: string[] = [];
  let field = "";
  let escaped = false;
  let codeFence = 0;
  for (let index = 0; index < source.length; index += 1) {
    const character = source[index]!;
    if (escaped) {
      field += character === "|" ? "|" : `\\${character}`;
      escaped = false;
    } else if (character === "\\") {
      escaped = true;
    } else if (character === "`") {
      let ticks = 1;
      while (source[index + ticks] === "`") ticks += 1;
      const sequence = "`".repeat(ticks);
      field += sequence;
      index += ticks - 1;
      codeFence = codeFence === ticks ? 0 : codeFence === 0 ? ticks : codeFence;
    } else if (character === "|" && codeFence === 0) {
      cells.push(field.trim().replace(/<br\s*\/?\s*>/gi, "\n"));
      field = "";
    } else {
      field += character;
    }
  }
  if (escaped) field += "\\";
  cells.push(field.trim().replace(/<br\s*\/?\s*>/gi, "\n"));
  return cells;
}

function isMarkdownSeparator(cells: readonly string[]): boolean {
  return (
    cells.length > 0 && cells.every((cell) => /^:?-{1,}:?$/.test(cell.trim()))
  );
}

export function parseMarkdownTable(input: string): string[][] {
  const lines = input
    .replaceAll("\r\n", "\n")
    .replaceAll("\r", "\n")
    .split("\n");
  let separatorIndex = -1;
  let header: string[] | undefined;
  for (let index = 1; index < lines.length; index += 1) {
    const candidate = splitMarkdownRow(lines[index]!);
    const previous = lines[index - 1]!.trim();
    if (previous && isMarkdownSeparator(candidate)) {
      separatorIndex = index;
      header = splitMarkdownRow(previous);
      break;
    }
  }
  if (!header) throw new DataConversionError("missing-markdown-table");
  if (header.length === 0)
    throw new DataConversionError("invalid-markdown-table");
  const rows = [header];
  for (let index = separatorIndex + 1; index < lines.length; index += 1) {
    const line = lines[index]!;
    if (!line.trim()) break;
    const cells = splitMarkdownRow(line);
    if (cells.length === 1 && !line.includes("|")) break;
    rows.push(cells);
  }
  return normalizeRowWidth(rows);
}

export function markdownToCsv(
  input: string,
  delimiter: CsvDelimiter = ",",
): string {
  return serializeCsv(parseMarkdownTable(input), delimiter);
}

function parseJson(input: string): unknown {
  try {
    return JSON.parse(input) as unknown;
  } catch (cause) {
    const message = cause instanceof Error ? cause.message : "";
    const match = /position\s+(\d+)/i.exec(message);
    const lineMatch = /line\s+(\d+)\s+column\s+(\d+)/i.exec(message);
    const tokenMatch = /Unexpected token '([^']+)'/i.exec(message);
    const tokenOffset = tokenMatch ? input.lastIndexOf(tokenMatch[1]!) : -1;
    const position = match
      ? positionAt(input, Number(match[1]))
      : lineMatch
        ? { line: Number(lineMatch[1]), column: Number(lineMatch[2]) }
        : tokenOffset >= 0
          ? positionAt(input, tokenOffset)
          : /unexpected end/i.test(message)
            ? positionAt(input, input.length)
            : {};
    throw new DataConversionError("invalid-json", { ...position, cause });
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function jsonCell(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

export function jsonToCsv(
  input: string,
  delimiter: CsvDelimiter = ",",
): string {
  const value = parseJson(input);
  if (!Array.isArray(value) || value.some((entry) => !isRecord(entry))) {
    throw new DataConversionError("invalid-json-shape");
  }
  if (value.length === 0) return "";
  const headers: string[] = [];
  const seen = new Set<string>();
  value.forEach((entry) => {
    Object.keys(entry).forEach((key) => {
      if (!seen.has(key)) {
        seen.add(key);
        headers.push(key);
      }
    });
  });
  if (headers.length === 0) return "";
  return serializeCsv(
    [
      headers,
      ...value.map((entry) => headers.map((key) => jsonCell(entry[key]))),
    ],
    delimiter,
  );
}

export type CsvToJsonOptions = CsvParseOptions & {
  pretty?: boolean;
};

export function csvToJson(
  input: string,
  options: CsvToJsonOptions = {},
): string {
  const rows = parseCsv(input, { ...options, skipEmptyLines: true });
  if (rows.length === 0) return "[]";
  const headers = rows[0]!.map((header) => header.trim());
  const firstEmpty = headers.findIndex((header) => header.length === 0);
  if (firstEmpty >= 0) {
    throw new DataConversionError("empty-header", {
      line: 1,
      column: firstEmpty + 1,
    });
  }
  const duplicate = headers.find(
    (header, index) => headers.indexOf(header) !== index,
  );
  if (duplicate) throw new DataConversionError("duplicate-header", { line: 1 });
  const overflowRow = rows.findIndex(
    (row, index) => index > 0 && row.length > headers.length,
  );
  if (overflowRow >= 0) {
    throw new DataConversionError("invalid-csv", {
      line: overflowRow + 1,
      column: headers.length + 1,
    });
  }
  const result = rows
    .slice(1)
    .map((row) =>
      Object.fromEntries(
        headers.map((header, index) => [header, row[index] ?? ""]),
      ),
    );
  return JSON.stringify(result, null, options.pretty === false ? undefined : 2);
}

function markdownTableFromHtml(table: Element): string {
  const rows = Array.from(table.querySelectorAll("tr"))
    .map((row) =>
      Array.from(row.children)
        .filter((cell) => /^(TH|TD)$/i.test(cell.tagName))
        .map((cell) => (cell.textContent ?? "").replace(/\s+/g, " ").trim()),
    )
    .filter((row) => row.length > 0);
  if (rows.length === 0) return "";
  const normalized = normalizeRowWidth(rows);
  const width = normalized[0]!.length;
  const formatRow = (row: readonly string[]) =>
    `| ${row.map(escapeMarkdownCell).join(" | ")} |`;
  return `\n\n${[
    formatRow(normalized[0]!),
    `| ${Array.from({ length: width }, () => "---").join(" | ")} |`,
    ...normalized.slice(1).map(formatRow),
  ].join("\n")}\n\n`;
}

export function htmlToMarkdown(input: string): string {
  const turndown = new TurndownService({
    bulletListMarker: "-",
    codeBlockStyle: "fenced",
    emDelimiter: "*",
    headingStyle: "atx",
    strongDelimiter: "**",
  });
  turndown.addRule("gfm-table", {
    filter: "table",
    replacement: (_content, node) => markdownTableFromHtml(node as Element),
  });
  return turndown.turndown(input).trim();
}

export function markdownToHtml(input: string): string {
  return marked.parse(input, {
    async: false,
    breaks: false,
    gfm: true,
  }) as string;
}

export type DataConversionOptions = {
  delimiter?: CsvDelimiter | "auto";
  firstRowHeader?: boolean;
  prettyJson?: boolean;
};

export function convertData(
  mode: DataConversionMode,
  input: string,
  options: DataConversionOptions = {},
): string {
  switch (mode) {
    case "csv-to-markdown":
      return csvToMarkdown(input, {
        delimiter: options.delimiter,
        firstRowHeader: options.firstRowHeader,
        skipEmptyLines: true,
      });
    case "markdown-to-csv":
      return markdownToCsv(
        input,
        options.delimiter === "auto" ? "," : options.delimiter,
      );
    case "json-to-csv":
      return jsonToCsv(
        input,
        options.delimiter === "auto" ? "," : options.delimiter,
      );
    case "csv-to-json":
      return csvToJson(input, {
        delimiter: options.delimiter,
        pretty: options.prettyJson,
      });
    case "html-to-markdown":
      return htmlToMarkdown(input);
    case "markdown-to-html":
      return markdownToHtml(input);
  }
}
