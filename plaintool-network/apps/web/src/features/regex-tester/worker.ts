/// <reference lib="webworker" />

import type { RegexWorkerReply, RegexWorkerRequest } from "./contract";
import { evaluateRegex, replaceAllRegex } from "./evaluate";

self.addEventListener("message", (event: MessageEvent<RegexWorkerRequest>) => {
  const request = event.data;
  const evaluation = evaluateRegex(
    request.expression,
    request.flags,
    request.text,
  );
  const reply: RegexWorkerReply = {
    id: request.id,
    evaluation,
    replacement:
      request.operation === "replace"
        ? replaceAllRegex(
            request.expression,
            request.flags,
            request.text,
            request.replacement,
          )
        : undefined,
  };
  self.postMessage(reply);
});
