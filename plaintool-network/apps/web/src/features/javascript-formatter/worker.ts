import {
  JavaScriptInputError,
  processJavaScript,
  type JavaScriptIssueCode,
} from "@plaintool/javascript-formatter-core";
import type {
  JavaScriptWorkerReply,
  JavaScriptWorkerRequest,
} from "./contract";

self.addEventListener(
  "message",
  async (event: MessageEvent<JavaScriptWorkerRequest>) => {
    const { id, input, mode, settings } = event.data;
    let reply: JavaScriptWorkerReply;
    try {
      const output = await processJavaScript(
        input,
        mode === "format"
          ? { mode, ...settings.format }
          : { mode, preserveComments: settings.preserveComments },
      );
      reply = { id, ok: true, output };
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
