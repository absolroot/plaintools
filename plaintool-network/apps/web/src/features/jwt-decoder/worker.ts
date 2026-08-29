import { JwtError, decodeJwt } from "@plaintool/jwt-core";
import type { JwtWorkerReply, JwtWorkerRequest } from "./contract";

self.addEventListener("message", (event: MessageEvent<JwtWorkerRequest>) => {
  const { id, input } = event.data;
  try {
    const reply: JwtWorkerReply = { id, ok: true, result: decodeJwt(input) };
    self.postMessage(reply);
  } catch (error) {
    const reply: JwtWorkerReply = {
      id,
      ok: false,
      error: error instanceof JwtError ? error.code : "processing-failed",
    };
    self.postMessage(reply);
  }
});
