import type { UnitCategory } from "@plaintool/unit-converter-core";

export type UnitConverterCopy = {
  ariaLabel: string;
  category: string;
  from: string;
  to: string;
  swap: string;
  result: string;
  ready: string;
  invalid: string;
  categories: Record<UnitCategory, string>;
  unitNames: Record<string, string>;
};
