import { HashError, hashAllBytes } from "@plaintool/hash-core";
import type { HashWorkerReply, HashWorkerRequest } from "./contract";

self.addEventListener(
  "message",
  async (event: MessageEvent<HashWorkerRequest>) => {
    const { id, input } = event.data;
    try {
      const results = await hashAllBytes(new Uint8Array(input));
      const reply: HashWorkerReply = { id, ok: true, results };
      self.postMessage(reply);
    } catch (error) {
      const reply: HashWorkerReply = {
        id,
        ok: false,
        error: error instanceof HashError ? error.code : "processing-failed",
      };
      self.postMessage(reply);
    }
  },
);
