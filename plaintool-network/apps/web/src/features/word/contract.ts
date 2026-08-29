import type { TextMetrics } from "@plaintool/text-metrics-core";

export type WordClientCopy = {
  ready: string;
  working: string;
  completed: string;
  processingFailed: string;
  tooLarge: string;
  approximate: string;
};

export type WordWorkerRequest = { id: number; text: string };
export type WordWorkerReply = { id: number; metrics: TextMetrics };

export const metricKeys = [
  "words",
  "characters",
  "charactersWithoutWhitespace",
  "lines",
  "paragraphs",
] as const;
