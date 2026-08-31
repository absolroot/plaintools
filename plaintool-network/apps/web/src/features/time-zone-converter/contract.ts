import type { ToolCommonCopy } from "../common-copy-contract";
import type { Locale } from "../../lib/site";

export interface TimeZoneConverterCopy {
  ariaLabel: string;
  sourceTime: string;
  sourceTimeHint: string;
  sourceZone: string;
  sourceZonePlaceholder: string;
  now: string;
  convert: string;
  hourFormat: string;
  hour12: string;
  hour24: string;
  worldClock: string;
  addZone: string;
  zonePlaceholder: string;
  add: string;
  removeZone: string;
  sourceBadge: string;
  ahead: string;
  behind: string;
  sameOffset: string;
  live: string;
  converted: string;
  maxZones: string;
  duplicateZone: string;
  invalidZone: string;
  invalidTime: string;
  nonexistentTime: string;
  repeatedTime: string;
  emptyZones: string;
}

export interface TimeZoneConverterClientCopy {
  feature: TimeZoneConverterCopy;
  common: ToolCommonCopy;
}

export interface PopularTimeZone {
  value: string;
  label: string;
}

export interface TimeZoneConverterProps {
  locale: Locale;
  copy: TimeZoneConverterCopy;
  commonCopy: ToolCommonCopy;
  popularZones: PopularTimeZone[];
}
