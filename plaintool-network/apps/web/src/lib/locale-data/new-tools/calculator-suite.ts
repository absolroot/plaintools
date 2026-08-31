import type { BmiCalculatorCopy } from "../../../features/bmi-calculator/contract";
import type { MathCalculatorCopy } from "../../../features/math-calculator/contract";
import type { PercentageCalculatorCopy } from "../../../features/percentage-calculator/contract";
import type { Locale } from "../../site";

export type CalculatorPageId =
  | "fraction-calculator"
  | "factor-calculator"
  | "lcm-calculator"
  | "percentage-calculator"
  | "bmi-calculator";

type Page = {
  title: string;
  description: string;
  mobileDescription: string;
  guide: string;
  terms: readonly string[];
};

export type CalculatorSuiteLocaleSeed = {
  pages: Record<CalculatorPageId, Page>;
  math: MathCalculatorCopy;
  percentage: PercentageCalculatorCopy;
  bmi: BmiCalculatorCopy;
};

const commonMath = (language: string): MathCalculatorCopy => ({
  ariaLabel: language,
  calculate: "Calculate",
  fraction: {
    firstFraction: "First fraction",
    secondFraction: "Second fraction",
    numerator: "Numerator",
    denominator: "Denominator",
    operation: "Operation",
    operations: {
      add: "Add",
      subtract: "Subtract",
      multiply: "Multiply",
      divide: "Divide",
    },
    inputHint: "Use signed whole numbers. A denominator cannot be zero.",
    resultTitle: "Result",
    reducedFraction: "Reduced fraction",
    mixedNumber: "Mixed number",
    decimal: "Decimal",
    workingTitle: "Working",
    expression: "Expression",
    reduction: "Reduction",
    reductionTemplate: "{unreduced} ÷ {divisor} = {result}",
    exactDecimal: "{value}",
    approximateDecimal: "≈ {value}",
    calculated: "Calculated.",
  },
  factor: {
    inputLabel: "Positive integer",
    inputPlaceholder: "360",
    inputHint: "Enter one positive whole number up to 12 digits.",
    resultTitle: "Factors",
    primeFactorization: "Prime factorization",
    factors: "All positive factors",
    factorPairs: "Factor pairs",
    classification: "Classification",
    classifications: {
      unit: "Neither prime nor composite",
      prime: "Prime",
      composite: "Composite",
    },
    unitFactorization: "1",
    pairTemplate: "{left} × {right}",
    calculated: "Calculated.",
  },
  lcm: {
    inputLabel: "Integers",
    inputPlaceholder: "12, 18, 30",
    inputHint: "Enter 2 to 12 signed integers, separated by spaces or commas.",
    resultTitle: "LCM and GCF",
    leastCommonMultiple: "Least common multiple",
    greatestCommonFactor: "Greatest common factor",
    workingTitle: "Prime-factor working",
    zeroFactorization: "0 has no prime factorization",
    unitFactorization: "1",
    factorizationTemplate: "{value} → |{absoluteValue}| = {factorization}",
    calculated: "Calculated.",
  },
  errors: {
    "empty-input": "Enter a value.",
    "invalid-integer": "Enter whole numbers only.",
    "integer-too-large": "The entered number is too large.",
    "zero-denominator": "A denominator cannot be zero.",
    "division-by-zero": "A fraction cannot be divided by zero.",
    "positive-required": "Enter a positive whole number.",
    "too-few-values": "Enter at least two integers.",
    "too-many-values": "Enter no more than 12 integers.",
  },
});

const commonPercentage = (language: string): PercentageCalculatorCopy => ({
  ariaLabel: language,
  modeSelectorLabel: "Calculation type",
  modes: {
    "percent-of": "Percent of",
    "what-percent": "What percent",
    "whole-from-percent": "Find whole",
    "percentage-change": "Percent change",
  },
  phrases: {
    "percent-of": { start: "What is", between: "of", end: "?" },
    "what-percent": { start: "Part", between: "is what percent of", end: "?" },
    "whole-from-percent": {
      start: "Part",
      between: "is",
      end: "% of what whole?",
    },
    "percentage-change": {
      start: "Change from",
      between: "to",
      end: "percent",
    },
  },
  fields: {
    percent: "Percent",
    base: "Whole",
    part: "Part",
    oldValue: "Old value",
    newValue: "New value",
  },
  calculate: "Calculate",
  resultTitle: "Result",
  resultLabels: {
    "percent-of": "Result",
    "what-percent": "Percentage",
    "whole-from-percent": "Whole",
    "percentage-change": "Percentage change",
  },
  formulaLabel: "Formula",
  calculated: "Calculated.",
  directions: {
    increase: "Increase",
    decrease: "Decrease",
    "no-change": "No change",
  },
  errors: {
    "missing-input": "Enter both values.",
    "invalid-number": "Enter valid numbers.",
    "zero-denominator": "This value cannot be zero.",
    "non-finite-result": "The result is outside the supported range.",
  },
});

const commonBmi = (language: string): BmiCalculatorCopy => ({
  ariaLabel: language,
  unitSystemLabel: "Units",
  metricUnit: "Metric",
  usUnit: "US",
  weightKilograms: "Weight (kg)",
  heightCentimeters: "Height (cm)",
  weightPounds: "Weight (lb)",
  heightFeet: "Height (ft)",
  heightInches: "Height (in)",
  calculate: "Calculate",
  resultTitle: "BMI result",
  bmiLabel: "BMI",
  categoryLabel: "Category",
  categories: {
    underweight: "Underweight",
    healthy: "Healthy weight",
    overweight: "Overweight",
    obesity: "Obesity",
  },
  healthyWeightRange: "Healthy weight range",
  healthyWeightRangeTemplate: "{minimum}–{maximum} {unit}",
  kilogramUnit: "kg",
  poundUnit: "lb",
  calculated: "Calculated.",
  limitationTitle: "A screening estimate, not a diagnosis",
  limitationBody:
    "Adult BMI is a weight-to-height screening estimate. It does not directly measure body composition or determine a person's health.",
  errors: {
    "non-finite-input": "Enter valid numbers.",
    "weight-not-positive": "Weight must be greater than zero.",
    "height-not-positive": "Height must be greater than zero.",
    "weight-out-of-range": "Enter a plausible adult weight.",
    "height-out-of-range": "Enter a plausible adult height.",
    "feet-not-integer": "Feet must be a whole number.",
    "inches-out-of-range":
      "Inches must be from 0 up to, but not including, 12.",
  },
});

const englishPages: Record<CalculatorPageId, Page> = {
  "fraction-calculator": {
    title: "Fraction Calculator",
    description:
      "Add, subtract, multiply, or divide fractions and see a reduced fraction, mixed number, decimal, and working.",
    mobileDescription: "Calculate fractions and see the reduced result.",
    guide:
      "Enter two signed fractions, choose an operation, and calculate. Results stay exact with integer arithmetic before an optional decimal display.",
    terms: [
      "fraction calculator",
      "add fractions",
      "mixed number",
      "simplify fraction",
    ],
  },
  "factor-calculator": {
    title: "Factor Calculator",
    description:
      "List positive factors, factor pairs, prime factorization, and prime or composite status for an integer.",
    mobileDescription: "Find factors, pairs, and prime factorization.",
    guide:
      "Enter one positive integer. The calculator lists its factors in order and expresses it as prime powers.",
    terms: [
      "factor calculator",
      "factors",
      "factor pairs",
      "prime factorization",
    ],
  },
  "lcm-calculator": {
    title: "LCM Calculator",
    description:
      "Find the least common multiple and greatest common factor for two or more integers.",
    mobileDescription: "Find LCM and GCF for multiple integers.",
    guide:
      "Enter integers separated by spaces or commas. Negative values use their absolute values; an input of zero makes the LCM zero.",
    terms: [
      "LCM calculator",
      "least common multiple",
      "GCF calculator",
      "greatest common factor",
    ],
  },
  "percentage-calculator": {
    title: "Percentage Calculator",
    description:
      "Solve common percentage questions: a percent of a value, a part of a whole, a missing whole, or percentage change.",
    mobileDescription: "Solve everyday percentage questions.",
    guide:
      "Choose the sentence that matches your question, enter the two known values, and review the result and formula.",
    terms: [
      "percentage calculator",
      "percent of",
      "what percent",
      "percentage change",
    ],
  },
  "bmi-calculator": {
    title: "BMI Calculator",
    description:
      "Calculate adult BMI using metric or US units, see the standard category, and view a height-based healthy-weight range.",
    mobileDescription: "Calculate adult BMI with metric or US units.",
    guide:
      "Choose units, enter height and weight, then calculate. This tool uses standard adult BMI categories and is a screening estimate, not a diagnosis.",
    terms: [
      "BMI calculator",
      "body mass index",
      "healthy weight range",
      "adult BMI",
    ],
  },
};

const localizedTitles: Record<Locale, Record<CalculatorPageId, string>> = {
  en: Object.fromEntries(
    Object.entries(englishPages).map(([id, page]) => [id, page.title]),
  ) as Record<CalculatorPageId, string>,
  ko: {
    "fraction-calculator": "분수 계산기",
    "factor-calculator": "약수 계산기",
    "lcm-calculator": "최소공배수 계산기",
    "percentage-calculator": "백분율 계산기",
    "bmi-calculator": "BMI 계산기",
  },
  es: {
    "fraction-calculator": "Calculadora de fracciones",
    "factor-calculator": "Calculadora de factores",
    "lcm-calculator": "Calculadora de MCM",
    "percentage-calculator": "Calculadora de porcentajes",
    "bmi-calculator": "Calculadora de IMC",
  },
  de: {
    "fraction-calculator": "Bruchrechner",
    "factor-calculator": "Faktorenrechner",
    "lcm-calculator": "KGV-Rechner",
    "percentage-calculator": "Prozentrechner",
    "bmi-calculator": "BMI-Rechner",
  },
  ja: {
    "fraction-calculator": "分数計算機",
    "factor-calculator": "約数計算機",
    "lcm-calculator": "最小公倍数計算機",
    "percentage-calculator": "パーセント計算機",
    "bmi-calculator": "BMI計算機",
  },
  fr: {
    "fraction-calculator": "Calculatrice de fractions",
    "factor-calculator": "Calculatrice de facteurs",
    "lcm-calculator": "Calculatrice de PPCM",
    "percentage-calculator": "Calculatrice de pourcentage",
    "bmi-calculator": "Calculatrice d’IMC",
  },
  "pt-BR": {
    "fraction-calculator": "Calculadora de frações",
    "factor-calculator": "Calculadora de fatores",
    "lcm-calculator": "Calculadora de MMC",
    "percentage-calculator": "Calculadora de porcentagem",
    "bmi-calculator": "Calculadora de IMC",
  },
  it: {
    "fraction-calculator": "Calcolatore di frazioni",
    "factor-calculator": "Calcolatore dei fattori",
    "lcm-calculator": "Calcolatore del mcm",
    "percentage-calculator": "Calcolatore percentuale",
    "bmi-calculator": "Calcolatore BMI",
  },
  nl: {
    "fraction-calculator": "Breukencalculator",
    "factor-calculator": "Factorcalculator",
    "lcm-calculator": "KGV-calculator",
    "percentage-calculator": "Percentagecalculator",
    "bmi-calculator": "BMI-calculator",
  },
  sv: {
    "fraction-calculator": "Bråkräknare",
    "factor-calculator": "Faktorkalkylator",
    "lcm-calculator": "MGM-kalkylator",
    "percentage-calculator": "Procenträknare",
    "bmi-calculator": "BMI-kalkylator",
  },
  cs: {
    "fraction-calculator": "Kalkulačka zlomků",
    "factor-calculator": "Kalkulačka faktorů",
    "lcm-calculator": "Kalkulačka NSN",
    "percentage-calculator": "Procentní kalkulačka",
    "bmi-calculator": "Kalkulačka BMI",
  },
  pl: {
    "fraction-calculator": "Kalkulator ułamków",
    "factor-calculator": "Kalkulator dzielników",
    "lcm-calculator": "Kalkulator NWW",
    "percentage-calculator": "Kalkulator procentowy",
    "bmi-calculator": "Kalkulator BMI",
  },
  da: {
    "fraction-calculator": "Brøkregner",
    "factor-calculator": "Faktorberegner",
    "lcm-calculator": "MFM-beregner",
    "percentage-calculator": "Procentberegner",
    "bmi-calculator": "BMI-beregner",
  },
  no: {
    "fraction-calculator": "Brøkkalkulator",
    "factor-calculator": "Faktorkalkulator",
    "lcm-calculator": "MFM-kalkulator",
    "percentage-calculator": "Prosentkalkulator",
    "bmi-calculator": "BMI-kalkulator",
  },
  ar: {
    "fraction-calculator": "حاسبة الكسور",
    "factor-calculator": "حاسبة العوامل",
    "lcm-calculator": "حاسبة المضاعف المشترك الأصغر",
    "percentage-calculator": "حاسبة النسبة المئوية",
    "bmi-calculator": "حاسبة مؤشر كتلة الجسم",
  },
  "zh-TW": {
    "fraction-calculator": "分數計算機",
    "factor-calculator": "因數計算機",
    "lcm-calculator": "最小公倍數計算機",
    "percentage-calculator": "百分比計算機",
    "bmi-calculator": "BMI 計算機",
  },
  tr: {
    "fraction-calculator": "Kesir hesaplayıcı",
    "factor-calculator": "Çarpan hesaplayıcı",
    "lcm-calculator": "EKOK hesaplayıcı",
    "percentage-calculator": "Yüzde hesaplayıcı",
    "bmi-calculator": "VKİ hesaplayıcı",
  },
};

const koreanMath: MathCalculatorCopy = {
  ...commonMath("계산기"),
  calculate: "계산",
  fraction: {
    ...commonMath("계산기").fraction,
    firstFraction: "첫 번째 분수",
    secondFraction: "두 번째 분수",
    numerator: "분자",
    denominator: "분모",
    operation: "연산",
    operations: {
      add: "더하기",
      subtract: "빼기",
      multiply: "곱하기",
      divide: "나누기",
    },
    inputHint: "부호가 있는 정수를 입력하세요. 분모는 0일 수 없습니다.",
    resultTitle: "결과",
    reducedFraction: "기약분수",
    mixedNumber: "대분수",
    decimal: "소수",
    workingTitle: "계산 과정",
    expression: "식",
    reduction: "약분",
    calculated: "계산했습니다.",
  },
  factor: {
    ...commonMath("계산기").factor,
    inputLabel: "양의 정수",
    inputHint: "최대 12자리의 양의 정수 하나를 입력하세요.",
    resultTitle: "약수",
    primeFactorization: "소인수분해",
    factors: "모든 양의 약수",
    factorPairs: "약수쌍",
    classification: "분류",
    classifications: {
      unit: "소수도 합성수도 아님",
      prime: "소수",
      composite: "합성수",
    },
    calculated: "계산했습니다.",
  },
  lcm: {
    ...commonMath("계산기").lcm,
    inputLabel: "정수",
    inputHint: "공백 또는 쉼표로 구분한 부호 있는 정수 2~12개를 입력하세요.",
    resultTitle: "최소공배수와 최대공약수",
    leastCommonMultiple: "최소공배수",
    greatestCommonFactor: "최대공약수",
    workingTitle: "소인수분해 과정",
    calculated: "계산했습니다.",
  },
  errors: {
    "empty-input": "값을 입력하세요.",
    "invalid-integer": "정수만 입력하세요.",
    "integer-too-large": "입력한 수가 너무 큽니다.",
    "zero-denominator": "분모는 0일 수 없습니다.",
    "division-by-zero": "0으로 나눌 수 없습니다.",
    "positive-required": "양의 정수를 입력하세요.",
    "too-few-values": "정수를 두 개 이상 입력하세요.",
    "too-many-values": "정수는 최대 12개까지 입력할 수 있습니다.",
  },
};

const koreanPercentage: PercentageCalculatorCopy = {
  ...commonPercentage("백분율 계산기"),
  modeSelectorLabel: "계산 종류",
  modes: {
    "percent-of": "~의 몇 %",
    "what-percent": "몇 퍼센트",
    "whole-from-percent": "전체 구하기",
    "percentage-change": "변화율",
  },
  phrases: {
    "percent-of": { start: "기준값", between: "의", end: "는 얼마인가요?" },
    "what-percent": { start: "부분값", between: "는", end: "의 몇 %인가요?" },
    "whole-from-percent": {
      start: "부분값",
      between: "는",
      end: "%는 전체의 얼마인가요?",
    },
    "percentage-change": { start: "값", between: "에서", end: "로" },
  },
  fields: {
    percent: "퍼센트",
    base: "기준값",
    part: "부분값",
    oldValue: "이전 값",
    newValue: "새 값",
  },
  calculate: "계산",
  resultTitle: "결과",
  resultLabels: {
    "percent-of": "결과",
    "what-percent": "퍼센트",
    "whole-from-percent": "전체",
    "percentage-change": "변화율",
  },
  formulaLabel: "계산식",
  calculated: "계산했습니다.",
  directions: { increase: "증가", decrease: "감소", "no-change": "변화 없음" },
  errors: {
    "missing-input": "두 값을 모두 입력하세요.",
    "invalid-number": "올바른 숫자를 입력하세요.",
    "zero-denominator": "이 값은 0일 수 없습니다.",
    "non-finite-result": "지원 범위를 벗어난 결과입니다.",
  },
};

const koreanBmi: BmiCalculatorCopy = {
  ...commonBmi("BMI 계산기"),
  unitSystemLabel: "단위",
  metricUnit: "미터법",
  usUnit: "미국식",
  weightKilograms: "체중 (kg)",
  heightCentimeters: "키 (cm)",
  weightPounds: "체중 (lb)",
  heightFeet: "키 (ft)",
  heightInches: "키 (in)",
  calculate: "계산",
  resultTitle: "BMI 결과",
  categoryLabel: "분류",
  categories: {
    underweight: "저체중",
    healthy: "정상 체중",
    overweight: "과체중",
    obesity: "비만",
  },
  healthyWeightRange: "건강 체중 범위",
  kilogramUnit: "kg",
  poundUnit: "lb",
  calculated: "계산했습니다.",
  limitationTitle: "진단이 아닌 선별용 추정치입니다",
  limitationBody:
    "성인 BMI는 키 대비 체중을 이용한 선별용 추정치입니다. 체성분을 직접 측정하거나 개인의 건강을 판단하지는 않습니다.",
  errors: {
    "non-finite-input": "올바른 숫자를 입력하세요.",
    "weight-not-positive": "체중은 0보다 커야 합니다.",
    "height-not-positive": "키는 0보다 커야 합니다.",
    "weight-out-of-range": "현실적인 성인 체중을 입력하세요.",
    "height-out-of-range": "현실적인 성인 키를 입력하세요.",
    "feet-not-integer": "피트는 정수여야 합니다.",
    "inches-out-of-range": "인치는 0 이상 12 미만이어야 합니다.",
  },
};

export function calculatorSuiteFor(locale: Locale): CalculatorSuiteLocaleSeed {
  const titles = localizedTitles[locale];
  const pages = Object.fromEntries(
    Object.entries(englishPages).map(([id, page]) => [
      id,
      locale === "en"
        ? page
        : {
            ...page,
            title: titles[id as CalculatorPageId],
            terms: [titles[id as CalculatorPageId], ...page.terms],
          },
    ]),
  ) as Record<CalculatorPageId, Page>;
  if (locale === "ko")
    return {
      pages,
      math: koreanMath,
      percentage: koreanPercentage,
      bmi: koreanBmi,
    };
  const suite = titles["fraction-calculator"];
  return {
    pages,
    math: commonMath(suite),
    percentage: commonPercentage(suite),
    bmi: commonBmi(suite),
  };
}
