import {
  formatDialect,
  mariadb,
  mysql,
  postgresql,
  sql,
  sqlite,
  transactsql,
  type DialectOptions,
  type KeywordCase,
} from "sql-formatter";

export const SQL_DIALECTS = [
  "sql",
  "postgresql",
  "mysql",
  "mariadb",
  "sqlite",
  "transactsql",
] as const;

export type SqlDialect = (typeof SQL_DIALECTS)[number];
export type SqlIndent = 2 | 4 | "tab";
export type SqlKeywordCase = Extract<
  KeywordCase,
  "preserve" | "upper" | "lower"
>;

export type SqlFormatOptions = {
  dialect: SqlDialect;
  indent?: SqlIndent;
  keywordCase?: SqlKeywordCase;
};

const DIALECT_OPTIONS: Record<SqlDialect, DialectOptions> = {
  sql,
  postgresql,
  mysql,
  mariadb,
  sqlite,
  transactsql,
};

export type SqlIssueCode = "FormattingFailed";

export type SqlIssue = {
  code: SqlIssueCode;
  line?: number;
  column?: number;
};

export class SqlFormatError extends Error {
  constructor(public readonly issue: SqlIssue) {
    super(
      [issue.code, issue.line, issue.column]
        .filter((value) => value !== undefined)
        .join(":"),
    );
    this.name = "SqlFormatError";
  }
}

const LOCATION_PATTERN = /\bat line (\d+) column (\d+)\b/u;

function toSqlFormatError(error: unknown): SqlFormatError {
  // sql-formatter 15.8.2 exposes parse locations only in its Error message.
  // The adapter keeps one failure code (no message-derived taxonomy) and
  // extracts only the documented line/column suffix for local UI focus.
  const match =
    error instanceof Error ? LOCATION_PATTERN.exec(error.message) : null;
  return new SqlFormatError({
    code: "FormattingFailed",
    line: match ? Number(match[1]) : undefined,
    column: match ? Number(match[2]) : undefined,
  });
}

/**
 * Formats SQL source text for the explicitly selected dialect. The `sql`
 * dialect is a common subset, not automatic detection. This function never
 * executes a query, connects to a database, replaces parameters, or minifies.
 */
export function formatSql(input: string, options: SqlFormatOptions): string {
  const indent = options.indent ?? 2;
  try {
    return formatDialect(input, {
      dialect: DIALECT_OPTIONS[options.dialect],
      tabWidth: indent === "tab" ? 2 : indent,
      useTabs: indent === "tab",
      keywordCase: options.keywordCase ?? "preserve",
    });
  } catch (error) {
    throw toSqlFormatError(error);
  }
}
