import {
  formatHtml,
  HtmlInputError,
  type HtmlIssueCode,
} from "@plaintool/html-formatter-core";
import type { HtmlWorkerReply, HtmlWorkerRequest } from "./contract";
import { formatterOutputWithinLimit } from "../../scripts/shared/formatter-resource-policy";

self.addEventListener(
  "message",
  async (event: MessageEvent<HtmlWorkerRequest>) => {
    const { id, input, settings } = event.data;
    let reply: HtmlWorkerReply;
    try {
      const output = await formatHtml(input, settings);
      reply = formatterOutputWithinLimit(output)
        ? { id, ok: true, output }
        : { id, ok: false, issue: { code: "Unknown" } };
    } catch (error) {
      const issue =
        error instanceof HtmlInputError
          ? error.issue
          : ({ code: "Unknown" } satisfies { code: HtmlIssueCode | "Unknown" });
      reply = { id, ok: false, issue };
    }
    self.postMessage(reply);
  },
);
