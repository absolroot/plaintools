import {
  applyEdits,
  format as createFormatEdits,
  parseTree,
  printParseErrorCode,
  type Node,
  type ParseError,
} from "jsonc-parser";

type ParserIssueCode = ReturnType<typeof printParseErrorCode>;

export type JsonParseIssueCode =
  | Exclude<ParserIssueCode, "<unknown ParseErrorCode>">
  | "Unknown";

export type JsonIssueCode = JsonParseIssueCode | "DuplicateKey";

export interface JsonIssue<Code extends JsonIssueCode = JsonIssueCode> {
  code: Code;
  line: number;
  column: number;
  offset: number;
}

export type JsonSyntaxIssue = JsonIssue<JsonParseIssueCode>;
export type JsonDuplicateKeyIssue = JsonIssue<"DuplicateKey">;

export interface JsonInspection {
  valid: boolean;
  source: string;
  bomRemoved: boolean;
  errors: JsonSyntaxIssue[];
  duplicateKeys: JsonDuplicateKeyIssue[];
}

export class JsonInputError extends Error {
  constructor(public readonly issue: JsonSyntaxIssue) {
    super(`${issue.code}:${issue.line}:${issue.column}`);
    this.name = "JsonInputError";
  }
}

function parseIssueCode(error: ParseError["error"]): JsonParseIssueCode {
  const code = printParseErrorCode(error);
  return code === "<unknown ParseErrorCode>" ? "Unknown" : code;
}

function positionAt(
  text: string,
  offset: number,
): Pick<JsonIssue, "line" | "column"> {
  const before = text.slice(0, offset);
  const lines = before.split(/\r\n|\r|\n/u);
  return { line: lines.length, column: (lines.at(-1)?.length ?? 0) + 1 };
}

function collectDuplicateKeys(
  node: Node | undefined,
  source: string,
  issues: JsonDuplicateKeyIssue[],
): void {
  if (!node) return;
  if (node.type === "object") {
    const seen = new Set<string>();
    for (const property of node.children ?? []) {
      const keyNode = property.children?.[0];
      const key = String(keyNode?.value ?? "");
      if (seen.has(key) && keyNode)
        issues.push({
          code: "DuplicateKey",
          offset: keyNode.offset,
          ...positionAt(source, keyNode.offset),
        });
      seen.add(key);
      collectDuplicateKeys(property.children?.[1], source, issues);
    }
    return;
  }
  for (const child of node.children ?? [])
    collectDuplicateKeys(child, source, issues);
}

export function inspectJson(input: string): JsonInspection {
  const bomRemoved = input.startsWith("\uFEFF");
  const source = bomRemoved ? input.slice(1) : input;
  const parseErrors: ParseError[] = [];
  const root = parseTree(source, parseErrors, {
    allowTrailingComma: false,
    disallowComments: true,
    allowEmptyContent: false,
  });
  const errors: JsonSyntaxIssue[] = parseErrors.map(({ error, offset }) => ({
    code: parseIssueCode(error),
    offset,
    ...positionAt(source, offset),
  }));
  const duplicateKeys: JsonDuplicateKeyIssue[] = [];
  if (errors.length === 0) collectDuplicateKeys(root, source, duplicateKeys);
  return {
    valid: errors.length === 0 && Boolean(root),
    source,
    bomRemoved,
    errors,
    duplicateKeys,
  };
}

function requireValid(input: string): JsonInspection {
  const inspection = inspectJson(input);
  if (!inspection.valid) {
    const issue = inspection.errors[0] ?? {
      code: "ValueExpected",
      line: 1,
      column: 1,
      offset: 0,
    };
    throw new JsonInputError(issue);
  }
  return inspection;
}

export function formatJson(input: string, indent: 2 | 4 | "tab" = 2): string {
  const { source } = requireValid(input);
  const options =
    indent === "tab"
      ? { insertSpaces: false, tabSize: 1, eol: "\n" }
      : { insertSpaces: true, tabSize: indent, eol: "\n" };
  return applyEdits(source, createFormatEdits(source, undefined, options));
}

export function minifyJson(input: string): string {
  const { source } = requireValid(input);
  let output = "";
  let inString = false;
  let escaped = false;
  for (const character of source) {
    if (inString) {
      output += character;
      if (escaped) escaped = false;
      else if (character === "\\") escaped = true;
      else if (character === '"') inString = false;
    } else if (character === '"') {
      inString = true;
      output += character;
    } else if (!/\s/u.test(character)) {
      output += character;
    }
  }
  return output;
}
