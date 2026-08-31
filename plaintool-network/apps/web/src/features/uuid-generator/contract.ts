import type {
  UuidErrorCode,
  UuidLetterCase,
  UuidNamespaceKind,
  UuidOutputFormat,
  UuidVersion,
} from "@plaintool/uuid-core";

export type UuidGeneratorCopy = {
  ariaLabel: string;
  versionLabel: string;
  versionNames: Record<UuidVersion, string>;
  versionHints: Record<UuidVersion, string>;
  nameLabel: string;
  namePlaceholder: string;
  namespaceLabel: string;
  namespaceNames: Record<UuidNamespaceKind, string>;
  customNamespaceLabel: string;
  customNamespacePlaceholder: string;
  quantityLabel: string;
  quantityHint: string;
  formatLabel: string;
  formatNames: Record<UuidOutputFormat, string>;
  letterCaseLabel: string;
  letterCaseNames: Record<UuidLetterCase, string>;
  generate: string;
  resultTitle: string;
  resultEmpty: string;
  resultCount: string;
  copyOne: string;
  copyAll: string;
  generated: string;
  outdated: string;
  copiedOne: string;
  copiedAll: string;
  downloaded: string;
  errors: Record<UuidErrorCode, string>;
};

export type UuidGeneratorClientCopy = {
  feature: UuidGeneratorCopy;
  common: {
    ready: string;
    copied: string;
    copyFailed: string;
    failed: string;
  };
};
