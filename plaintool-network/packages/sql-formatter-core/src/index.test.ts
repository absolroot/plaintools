import { describe, expect, it } from "vitest";
import {
  formatSql,
  SQL_DIALECTS,
  SqlFormatError,
  type SqlDialect,
} from "./index";

describe("SQL source formatting", () => {
  it("formats a standard SQL query without executing or replacing values", () => {
    const output = formatSql(
      "select customer_id,sum(total) as total from orders where status = ? group by customer_id;",
      { dialect: "sql" },
    );
    expect(output).toContain("select\n  customer_id,");
    expect(output).toContain("sum(total) as total");
    expect(output).toContain("status = ?");
  });

  it.each<[SqlDialect, string]>([
    ["sql", "select * from users where active=true;"],
    [
      "postgresql",
      "select payload->>'name' as name from events where created_at::date=current_date;",
    ],
    ["mysql", "select `order` from `sales` limit 5;"],
    ["mariadb", "select `rank` from `scores` limit 5;"],
    ["sqlite", "select json_extract(payload,'$.name') from records;"],
    ["transactsql", "select top 5 [Order] from [Sales];"],
  ])("formats the explicitly selected %s dialect", (dialect, source) => {
    expect(formatSql(source, { dialect })).toMatch(/select/i);
  });

  it("keeps the exposed dialect list narrow and stable", () => {
    expect(SQL_DIALECTS).toEqual([
      "sql",
      "postgresql",
      "mysql",
      "mariadb",
      "sqlite",
      "transactsql",
    ]);
  });

  it.each([
    ["upper", "SELECT"],
    ["lower", "select"],
    ["preserve", "SeLeCt"],
  ] as const)("supports %s keyword case", (keywordCase, expected) => {
    const output = formatSql("SeLeCt id FrOm users;", {
      dialect: "sql",
      keywordCase,
    });
    expect(output).toContain(expected);
  });

  it.each([
    [4, "    id"],
    ["tab", "\tid"],
  ] as const)("supports the %s indentation option", (indent, expected) => {
    const output = formatSql("select id,name from users;", {
      dialect: "sql",
      indent,
    });
    expect(output).toContain(expected);
  });

  it("returns a typed failure with the library's parse location", () => {
    expect(() =>
      formatSql("select [name] from users;", { dialect: "sql" }),
    ).toThrowError(SqlFormatError);
    try {
      formatSql("select [name] from users;", { dialect: "sql" });
    } catch (error) {
      expect(error).toMatchObject({
        name: "SqlFormatError",
        issue: {
          code: "FormattingFailed",
          line: 1,
          column: 8,
        },
      } satisfies Partial<SqlFormatError>);
    }
  });
});
