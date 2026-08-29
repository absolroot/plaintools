import {
  convertData,
  DataConversionError,
} from "@plaintool/data-conversion-core";
import type {
  DataConverterWorkerReply,
  DataConverterWorkerRequest,
} from "./contract";

self.addEventListener(
  "message",
  (event: MessageEvent<DataConverterWorkerRequest>) => {
    const { id, mode, input, options } = event.data;
    let reply: DataConverterWorkerReply;
    try {
      reply = { id, ok: true, output: convertData(mode, input, options) };
    } catch (error) {
      if (error instanceof DataConversionError) {
        reply = {
          id,
          ok: false,
          error: error.code,
          line: error.line,
          column: error.column,
        };
      } else {
        throw error;
      }
    }
    self.postMessage(reply);
  },
);
