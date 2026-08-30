import {
  JavaScriptInputError,
  type JavaScriptIssueCode,
} from "@plaintool/javascript-formatter-core/shared";
import type {
  JavaScriptWorkerReply,
  JavaScriptWorkerRequest,
} from "./contract";
import { formatterOutputWithinLimit } from "../../scripts/shared/formatter-resource-policy";

self.addEventListener(
  "message",
  async (event: MessageEvent<JavaScriptWorkerRequest>) => {
    const { id, input, mode, settings } = event.data;
    let reply: JavaScriptWorkerReply;
    try {
      const output =
        mode === "format"
          ? await import("@plaintool/javascript-formatter-core/format").then(
              ({ formatJavaScript }) =>
                formatJavaScript(input, settings.format),
            )
          : await import("@plaintool/javascript-formatter-core/minify").then(
              ({ minifyJavaScript }) =>
                minifyJavaScript(input, {
                  preserveComments: settings.preserveComments,
                }),
            );
      reply = formatterOutputWithinLimit(output)
        ? { id, ok: true, output }
        : { id, ok: false, issue: { code: "Unknown" } };
    } catch (error) {
      const issue =
        error instanceof JavaScriptInputError
          ? error.issue
          : ({
              code: "Unknown",
            } satisfies { code: JavaScriptIssueCode | "Unknown" });
      reply = { id, ok: false, issue };
    }
    self.postMessage(reply);
  },
);
