import {
  formatSql,
  SqlFormatError,
  type SqlIssueCode,
} from "@plaintool/sql-formatter-core";
import type { SqlWorkerReply, SqlWorkerRequest } from "./contract";
import { formatterOutputWithinLimit } from "../../scripts/shared/formatter-resource-policy";

self.addEventListener("message", (event: MessageEvent<SqlWorkerRequest>) => {
  const { id, input, settings } = event.data;
  let reply: SqlWorkerReply;
  try {
    const output = formatSql(input, settings);
    reply = formatterOutputWithinLimit(output)
      ? { id, ok: true, output }
      : { id, ok: false, issue: { code: "Unknown" } };
  } catch (error) {
    const issue =
      error instanceof SqlFormatError
        ? error.issue
        : ({ code: "Unknown" } satisfies { code: SqlIssueCode | "Unknown" });
    reply = { id, ok: false, issue };
  }
  self.postMessage(reply);
});
