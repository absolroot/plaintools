import type { ToolCommonCopy } from "../common-copy-contract";

export interface DateCalculatorCopy {
  ariaLabel: string;
  differenceMode: string;
  dateMathMode: string;
  ageMode: string;
  startDate: string;
  endDate: string;
  baseDate: string;
  birthDate: string;
  referenceDate: string;
  today: string;
  includeEndDate: string;
  includeEndHint: string;
  operation: string;
  add: string;
  subtract: string;
  years: string;
  months: string;
  weeks: string;
  days: string;
  calculate: string;
  resultTitle: string;
  totalDays: string;
  calendarDifference: string;
  weeksAndDays: string;
  dDay: string;
  resultingDate: string;
  fullAge: string;
  exactAge: string;
  livedDays: string;
  nextBirthday: string;
  calendarNote: string;
  monthEndNote: string;
  calculated: string;
  fullAgeTemplate: string;
  nextBirthdayTemplate: string;
  birthdayTodayTemplate: string;
  errors: {
    invalidDate: string;
    invalidAmount: string;
    birthAfterReference: string;
    outOfRange: string;
  };
}

export interface DateCalculatorClientCopy {
  feature: DateCalculatorCopy;
  common: ToolCommonCopy;
}

export interface DateCalculatorProps {
  locale: string;
  copy: DateCalculatorCopy;
  commonCopy: ToolCommonCopy;
}
