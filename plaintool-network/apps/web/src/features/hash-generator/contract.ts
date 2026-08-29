import type { HashErrorCode, HashResults } from "@plaintool/hash-core";
import type { ToolCommonCopy } from "../common-copy-contract";

export interface HashGeneratorCopy {
  ariaLabel: string;
  inputLabel: string;
  inputPlaceholder: string;
  openFile: string;
  resultsLabel: string;
  /** Accessible label template with the `{algorithm}` placeholder. */
  resultValueLabel: string;
  /** Accessible copy-action label with the `{algorithm}` placeholder. */
  copyHashLabel: string;
  /** Includes the `{name}` and `{size}` placeholders. */
  fileSelected: string;
  dropHint: string;
  completed: string;
  outdated: string;
  textTooLarge: string;
  fileTooLarge: string;
  legacyWarning: string;
  errors: Record<HashErrorCode, string>;
}

export interface HashClientCopy {
  feature: HashGeneratorCopy;
  common: ToolCommonCopy;
}

export type HashWorkerRequest = {
  id: number;
  input: ArrayBuffer;
};

export type HashWorkerReply =
  | { id: number; ok: true; results: HashResults }
  | {
      id: number;
      ok: false;
      error: HashErrorCode | "processing-failed";
    };

export type HashRunContext = {
  revision: number;
  source: string | File;
};
