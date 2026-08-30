import {
  CssInputError,
  formatCss,
  type CssIssueCode,
} from "@plaintool/css-formatter-core";
import type { CssWorkerReply, CssWorkerRequest } from "./contract";
import { formatterOutputWithinLimit } from "../../scripts/shared/formatter-resource-policy";

self.addEventListener(
  "message",
  async (event: MessageEvent<CssWorkerRequest>) => {
    const { id, operation, input, settings } = event.data;
    let reply: CssWorkerReply;
    try {
      const output = await formatCss(input, settings);
      reply = formatterOutputWithinLimit(output)
        ? { id, ok: true, operation, output }
        : { id, ok: false, operation, issue: { code: "Unknown" } };
    } catch (error) {
      const issue =
        error instanceof CssInputError
          ? error.issue
          : ({ code: "Unknown" } satisfies { code: CssIssueCode | "Unknown" });
      reply = { id, ok: false, operation, issue };
    }
    self.postMessage(reply);
  },
);
