import { compareText } from "@plaintool/text-diff-core";
import type {
  TextCompareWorkerReply,
  TextCompareWorkerRequest,
} from "./contract";

self.addEventListener(
  "message",
  (event: MessageEvent<TextCompareWorkerRequest>) => {
    const { id, original, changed } = event.data;
    const reply: TextCompareWorkerReply = {
      id,
      result: compareText(original, changed),
    };
    self.postMessage(reply);
  },
);
