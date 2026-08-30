import {
  formatSql,
  SqlFormatError,
  type SqlIssueCode,
} from "@plaintool/sql-formatter-core";
import type { SqlWorkerReply, SqlWorkerRequest } from "./contract";

self.addEventListener("message", (event: MessageEvent<SqlWorkerRequest>) => {
  const { id, input, settings } = event.data;
  let reply: SqlWorkerReply;
  try {
    reply = { id, ok: true, output: formatSql(input, settings) };
  } catch (error) {
    const issue =
      error instanceof SqlFormatError
        ? error.issue
        : ({ code: "Unknown" } satisfies { code: SqlIssueCode | "Unknown" });
    reply = { id, ok: false, issue };
  }
  self.postMessage(reply);
});
