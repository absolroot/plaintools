export type BmiUnitSystem = "metric" | "us";

export type AdultBmiCategory =
  | "underweight"
  | "healthy"
  | "overweight"
  | "obesity";

export type BmiInputErrorCode =
  | "non-finite-input"
  | "weight-not-positive"
  | "height-not-positive"
  | "weight-out-of-range"
  | "height-out-of-range"
  | "feet-not-integer"
  | "inches-out-of-range";

export class BmiInputError extends Error {
  constructor(public readonly code: BmiInputErrorCode) {
    super(code);
    this.name = "BmiInputError";
  }
}

export interface MetricBmiInput {
  unitSystem: "metric";
  weightKilograms: number;
  heightCentimeters: number;
}

export interface UsBmiInput {
  unitSystem: "us";
  weightPounds: number;
  heightFeet: number;
  heightInches: number;
}

export type AdultBmiInput = MetricBmiInput | UsBmiInput;

export interface HealthyWeightRange {
  minimum: number;
  /** The BMI healthy range ends immediately below this weight. */
  maximumExclusive: number;
  unit: "kilograms" | "pounds";
}

export interface AdultBmiResult {
  bmi: number;
  category: AdultBmiCategory;
  healthyWeightRange: HealthyWeightRange;
}

export const ADULT_BMI_THRESHOLDS = {
  healthyMinimum: 18.5,
  overweightMinimum: 25,
  obesityMinimum: 30,
} as const;

export const BMI_PLAUSIBLE_RANGES = {
  heightCentimeters: { minimum: 100, maximum: 250 },
  weightKilograms: { minimum: 10, maximum: 500 },
} as const;

const KILOGRAMS_PER_POUND = 0.453_592_37;
const METERS_PER_INCH = 0.0254;

function requireFinite(values: readonly number[]): void {
  if (values.some((value) => !Number.isFinite(value))) {
    throw new BmiInputError("non-finite-input");
  }
}

function validateWeight(weightKilograms: number): void {
  if (weightKilograms <= 0) {
    throw new BmiInputError("weight-not-positive");
  }
  const range = BMI_PLAUSIBLE_RANGES.weightKilograms;
  if (weightKilograms < range.minimum || weightKilograms > range.maximum) {
    throw new BmiInputError("weight-out-of-range");
  }
}

function validateHeight(heightMeters: number): void {
  if (heightMeters <= 0) {
    throw new BmiInputError("height-not-positive");
  }
  const heightCentimeters = heightMeters * 100;
  const range = BMI_PLAUSIBLE_RANGES.heightCentimeters;
  if (heightCentimeters < range.minimum || heightCentimeters > range.maximum) {
    throw new BmiInputError("height-out-of-range");
  }
}

export function classifyAdultBmi(bmi: number): AdultBmiCategory {
  if (!Number.isFinite(bmi)) {
    throw new BmiInputError("non-finite-input");
  }
  if (bmi <= 0) {
    throw new BmiInputError("weight-not-positive");
  }
  if (bmi < ADULT_BMI_THRESHOLDS.healthyMinimum) return "underweight";
  if (bmi < ADULT_BMI_THRESHOLDS.overweightMinimum) return "healthy";
  if (bmi < ADULT_BMI_THRESHOLDS.obesityMinimum) return "overweight";
  return "obesity";
}

function normalizeInput(input: AdultBmiInput): {
  weightKilograms: number;
  heightMeters: number;
} {
  if (input.unitSystem === "metric") {
    requireFinite([input.weightKilograms, input.heightCentimeters]);
    return {
      weightKilograms: input.weightKilograms,
      heightMeters: input.heightCentimeters / 100,
    };
  }

  requireFinite([input.weightPounds, input.heightFeet, input.heightInches]);
  if (!Number.isInteger(input.heightFeet)) {
    throw new BmiInputError("feet-not-integer");
  }
  if (input.heightInches < 0 || input.heightInches >= 12) {
    throw new BmiInputError("inches-out-of-range");
  }
  const totalInches = input.heightFeet * 12 + input.heightInches;
  return {
    weightKilograms: input.weightPounds * KILOGRAMS_PER_POUND,
    heightMeters: totalInches * METERS_PER_INCH,
  };
}

export function calculateAdultBmi(input: AdultBmiInput): AdultBmiResult {
  const { weightKilograms, heightMeters } = normalizeInput(input);
  validateWeight(weightKilograms);
  validateHeight(heightMeters);

  const heightSquared = heightMeters ** 2;
  const bmi = weightKilograms / heightSquared;
  const minimumKilograms = ADULT_BMI_THRESHOLDS.healthyMinimum * heightSquared;
  const maximumExclusiveKilograms =
    ADULT_BMI_THRESHOLDS.overweightMinimum * heightSquared;
  const poundsPerKilogram = 1 / KILOGRAMS_PER_POUND;

  return {
    bmi,
    category: classifyAdultBmi(bmi),
    healthyWeightRange:
      input.unitSystem === "metric"
        ? {
            minimum: minimumKilograms,
            maximumExclusive: maximumExclusiveKilograms,
            unit: "kilograms",
          }
        : {
            minimum: minimumKilograms * poundsPerKilogram,
            maximumExclusive: maximumExclusiveKilograms * poundsPerKilogram,
            unit: "pounds",
          },
  };
}
