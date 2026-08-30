import {
  formatHtml,
  HtmlInputError,
  type HtmlIssueCode,
} from "@plaintool/html-formatter-core";
import type { HtmlWorkerReply, HtmlWorkerRequest } from "./contract";

self.addEventListener(
  "message",
  async (event: MessageEvent<HtmlWorkerRequest>) => {
    const { id, input, settings } = event.data;
    let reply: HtmlWorkerReply;
    try {
      reply = {
        id,
        ok: true,
        output: await formatHtml(input, settings),
      };
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
