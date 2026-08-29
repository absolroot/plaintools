import { countText } from "@plaintool/text-metrics-core";
import type { WordWorkerRequest } from "./contract";
self.addEventListener("message", (event: MessageEvent<WordWorkerRequest>) => {
  self.postMessage({
    id: event.data.id,
    metrics: countText(event.data.text, event.data.locale),
  });
});
