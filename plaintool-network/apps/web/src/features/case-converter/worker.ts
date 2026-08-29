import { convertCase } from "@plaintool/text-case-core";
import type { CaseWorkerReply, CaseWorkerRequest } from "./contract";

self.addEventListener("message", (event: MessageEvent<CaseWorkerRequest>) => {
  const reply: CaseWorkerReply = {
    id: event.data.id,
    output: convertCase(event.data.input, event.data.mode),
  };
  self.postMessage(reply);
});
