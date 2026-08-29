import { formatJson, inspectJson, minifyJson } from "@plaintool/json-core";
import type { JsonWorkerRequest } from "./contract";
self.addEventListener("message", (event: MessageEvent<JsonWorkerRequest>) => {
  const { id, input, operation, indent } = event.data;
  const inspection = inspectJson(input);
  let output = "";
  if (inspection.valid && operation === "format")
    output = formatJson(input, indent);
  if (inspection.valid && operation === "minify") output = minifyJson(input);
  self.postMessage({ id, inspection, output });
});
