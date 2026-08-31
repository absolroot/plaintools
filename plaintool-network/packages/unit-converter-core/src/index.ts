export const unitCategories = [
  "length",
  "mass",
  "temperature",
  "area",
  "volume",
  "speed",
  "data",
  "time",
] as const;
export type UnitCategory = (typeof unitCategories)[number];
export type UnitId = string;

export type UnitDefinition = {
  id: UnitId;
  category: UnitCategory;
  symbol: string;
  name: string;
  /** Value of one unit in the category base unit. */
  factor?: number;
};

export class UnitConversionError extends Error {
  constructor(public readonly code: "invalid-number" | "incompatible-unit") {
    super(code);
    this.name = "UnitConversionError";
  }
}

const linear = (
  category: UnitCategory,
  rows: readonly [string, string, number][],
) =>
  rows.map(([id, symbol, factor]) => ({
    id,
    category,
    symbol,
    name: id,
    factor,
  }));

export const units: readonly UnitDefinition[] = [
  ...linear("length", [
    ["millimeter", "mm", 0.001],
    ["centimeter", "cm", 0.01],
    ["meter", "m", 1],
    ["kilometer", "km", 1000],
    ["inch", "in", 0.0254],
    ["foot", "ft", 0.3048],
    ["yard", "yd", 0.9144],
    ["mile", "mi", 1609.344],
    ["nautical-mile", "nmi", 1852],
  ]),
  ...linear("mass", [
    ["milligram", "mg", 0.000001],
    ["gram", "g", 0.001],
    ["kilogram", "kg", 1],
    ["metric-ton", "t", 1000],
    ["ounce", "oz", 0.028349523125],
    ["pound", "lb", 0.45359237],
    ["stone", "st", 6.35029318],
  ]),
  { id: "celsius", category: "temperature", symbol: "°C", name: "celsius" },
  {
    id: "fahrenheit",
    category: "temperature",
    symbol: "°F",
    name: "fahrenheit",
  },
  { id: "kelvin", category: "temperature", symbol: "K", name: "kelvin" },
  ...linear("area", [
    ["square-centimeter", "cm²", 0.0001],
    ["square-meter", "m²", 1],
    ["square-kilometer", "km²", 1_000_000],
    ["square-foot", "ft²", 0.09290304],
    ["square-yard", "yd²", 0.83612736],
    ["acre", "ac", 4046.8564224],
    ["hectare", "ha", 10000],
  ]),
  ...linear("volume", [
    ["milliliter", "mL", 0.001],
    ["liter", "L", 1],
    ["cubic-meter", "m³", 1000],
    ["us-fluid-ounce", "US fl oz", 0.0295735295625],
    ["us-cup", "US cup", 0.2365882365],
    ["us-pint", "US pt", 0.473176473],
    ["us-quart", "US qt", 0.946352946],
    ["us-gallon", "US gal", 3.785411784],
    ["uk-pint", "UK pt", 0.56826125],
    ["uk-gallon", "UK gal", 4.54609],
  ]),
  ...linear("speed", [
    ["meter-per-second", "m/s", 1],
    ["kilometer-per-hour", "km/h", 0.2777777777777778],
    ["mile-per-hour", "mph", 0.44704],
    ["foot-per-second", "ft/s", 0.3048],
    ["knot", "kn", 0.5144444444444445],
  ]),
  ...linear("data", [
    ["bit", "bit", 1],
    ["kilobit", "kbit", 1000],
    ["megabit", "Mbit", 1_000_000],
    ["gigabit", "Gbit", 1_000_000_000],
    ["byte", "B", 8],
    ["kilobyte", "kB", 8000],
    ["megabyte", "MB", 8_000_000],
    ["gigabyte", "GB", 8_000_000_000],
  ]),
  ...linear("time", [
    ["millisecond", "ms", 0.001],
    ["second", "s", 1],
    ["minute", "min", 60],
    ["hour", "h", 3600],
    ["day", "d", 86400],
    ["week", "wk", 604800],
  ]),
];

const byId = new Map(units.map((unit) => [unit.id, unit]));
export const unitsFor = (category: UnitCategory) =>
  units.filter((unit) => unit.category === category);
export const getUnit = (id: UnitId) => byId.get(id);

function temperatureToCelsius(value: number, unit: UnitId): number {
  if (unit === "celsius") return value;
  if (unit === "fahrenheit") return (value - 32) * (5 / 9);
  if (unit === "kelvin") return value - 273.15;
  throw new UnitConversionError("incompatible-unit");
}
function celsiusToTemperature(value: number, unit: UnitId): number {
  if (unit === "celsius") return value;
  if (unit === "fahrenheit") return value * (9 / 5) + 32;
  if (unit === "kelvin") return value + 273.15;
  throw new UnitConversionError("incompatible-unit");
}

export function convertUnit(
  value: number,
  fromId: UnitId,
  toId: UnitId,
): number {
  if (!Number.isFinite(value)) throw new UnitConversionError("invalid-number");
  const from = getUnit(fromId);
  const to = getUnit(toId);
  if (!from || !to || from.category !== to.category)
    throw new UnitConversionError("incompatible-unit");
  const result =
    from.category === "temperature"
      ? celsiusToTemperature(temperatureToCelsius(value, from.id), to.id)
      : (value * from.factor!) / to.factor!;
  if (!Number.isFinite(result)) throw new UnitConversionError("invalid-number");
  return Object.is(result, -0) ? 0 : Number(result.toPrecision(15));
}
