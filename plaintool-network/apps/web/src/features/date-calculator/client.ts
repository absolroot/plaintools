import {
  addToDate,
  calculateAge,
  DateInputError,
  differenceBetweenDates,
  type DateMathOperation,
} from "@plaintool/date-core";
import {
  copyText,
  readClientCopy,
  setToolStatus,
} from "../../scripts/shared/tool-dom";
import type { DateCalculatorClientCopy } from "./contract";

type Mode = "difference" | "math" | "age";

function fill(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/gu, (_, key: string) => values[key] ?? "");
}

function localToday(): string {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}

function init(root: HTMLElement): void {
  if (root.dataset.initialized) return;
  root.dataset.initialized = "true";

  const copy = readClientCopy<DateCalculatorClientCopy>(root);
  const locale = root.dataset.locale ?? "en";
  const number = new Intl.NumberFormat(locale);
  const list = new Intl.ListFormat(locale, {
    style: "long",
    type: "conjunction",
  });
  const date = new Intl.DateTimeFormat(locale, {
    dateStyle: "full",
    timeZone: "UTC",
  });
  const status = root.querySelector<HTMLElement>("[data-status]")!;
  const results = root.querySelector<HTMLElement>("[data-results]")!;
  const copyButton = root.querySelector<HTMLButtonElement>("[data-copy]")!;
  const fields = Object.fromEntries(
    [
      ...root.querySelectorAll<HTMLInputElement | HTMLSelectElement>(
        "[data-field]",
      ),
    ].map((field) => [field.dataset.field!, field]),
  ) as Record<string, HTMLInputElement | HTMLSelectElement>;
  const mode = (root.dataset.mode as Mode | undefined) ?? "difference";
  let revision = 0;
  let committedText = "";

  const setStatus = (
    message: string,
    state: "idle" | "success" | "error" = "idle",
  ) => setToolStatus(root, status, message, state);
  const formatDate = (value: string) =>
    date.format(new Date(`${value}T12:00:00.000Z`));
  const formatUnit = (value: number, unit: "year" | "month" | "week" | "day") =>
    new Intl.NumberFormat(locale, {
      style: "unit",
      unit,
      unitDisplay: "long",
    }).format(value);
  const formatSpan = (source: {
    years: number;
    months: number;
    days: number;
  }) =>
    list.format([
      formatUnit(source.years, "year"),
      formatUnit(source.months, "month"),
      formatUnit(source.days, "day"),
    ]);
  const setResult = (key: string, value: string) => {
    const target = results.querySelector<HTMLElement>(`[data-result="${key}"]`);
    if (target) target.textContent = value;
  };
  const clearInvalid = () =>
    root
      .querySelectorAll<HTMLElement>("[aria-invalid]")
      .forEach((field) => field.removeAttribute("aria-invalid"));
  const invalidate = () => {
    revision += 1;
    committedText = "";
    copyButton.disabled = true;
    results.hidden = true;
    results
      .querySelectorAll<HTMLElement>("[data-result]")
      .forEach((target) => (target.textContent = ""));
  };
  const markInvalid = (error: unknown) => {
    const code = error instanceof DateInputError ? error.code : "invalid-date";
    const target =
      code === "invalid-amount"
        ? root.querySelector<HTMLInputElement>("[data-amount]")
        : code === "birth-after-reference"
          ? fields.birth
          : mode === "difference"
            ? fields.start
            : mode === "math"
              ? fields.base
              : fields.birth;
    target?.setAttribute("aria-invalid", "true");
    target?.focus();
    setStatus(
      code === "invalid-amount"
        ? copy.feature.errors.invalidAmount
        : code === "birth-after-reference"
          ? copy.feature.errors.birthAfterReference
          : code === "out-of-range"
            ? copy.feature.errors.outOfRange
            : copy.feature.errors.invalidDate,
      "error",
    );
  };
  const showResultPanel = () => {
    results.hidden = false;
    results
      .querySelectorAll<HTMLElement>("[data-result-panel]")
      .forEach((panel) => (panel.hidden = panel.dataset.resultPanel !== mode));
    copyButton.disabled = false;
    const visibleRows = [
      ...results.querySelectorAll<HTMLElement>(
        `[data-result-panel="${mode}"] > div`,
      ),
    ];
    committedText = visibleRows
      .map((row) => {
        const label = row.querySelector("dt")?.textContent?.trim() ?? "";
        const value = row.querySelector("dd")?.textContent?.trim() ?? "";
        return `${label}: ${value}`;
      })
      .join("\n");
    setStatus(copy.feature.calculated, "success");
  };

  const run = () => {
    clearInvalid();
    invalidate();
    try {
      if (mode === "difference") {
        const result = differenceBetweenDates(
          fields.start.value,
          fields.end.value,
          (fields.includeEnd as HTMLInputElement).checked,
        );
        setResult("totalDays", formatUnit(result.totalDays, "day"));
        setResult("calendarDifference", formatSpan(result));
        setResult(
          "weeksAndDays",
          list.format([
            formatUnit(result.weeks, "week"),
            formatUnit(result.remainingDays, "day"),
          ]),
        );
        setResult(
          "dDay",
          result.dDayOffset > 0
            ? `D−${number.format(result.dDayOffset)}`
            : result.dDayOffset < 0
              ? `D+${number.format(Math.abs(result.dDayOffset))}`
              : copy.feature.dDay,
        );
      } else if (mode === "math") {
        const amount = (key: string) =>
          Number(
            root.querySelector<HTMLInputElement>(`[data-amount="${key}"]`)!
              .value,
          );
        const result = addToDate(
          fields.base.value,
          fields.operation.value as DateMathOperation,
          {
            years: amount("years"),
            months: amount("months"),
            weeks: amount("weeks"),
            days: amount("days"),
          },
        );
        setResult("resultingDate", formatDate(result.date));
      } else {
        const result = calculateAge(fields.birth.value, fields.reference.value);
        setResult(
          "fullAge",
          fill(copy.feature.fullAgeTemplate, {
            count: number.format(result.fullYears),
          }),
        );
        setResult("exactAge", formatSpan(result));
        setResult("livedDays", formatUnit(result.totalDays, "day"));
        setResult(
          "nextBirthday",
          result.daysUntilNextBirthday === 0
            ? fill(copy.feature.birthdayTodayTemplate, {
                date: formatDate(result.nextBirthday),
                age: number.format(result.ageAtNextBirthday),
              })
            : fill(copy.feature.nextBirthdayTemplate, {
                date: formatDate(result.nextBirthday),
                count: number.format(result.daysUntilNextBirthday),
                age: number.format(result.ageAtNextBirthday),
              }),
        );
      }
      showResultPanel();
    } catch (error) {
      markInvalid(error);
    }
  };

  root
    .querySelectorAll<HTMLButtonElement>("[data-today-for]")
    .forEach((button) =>
      button.addEventListener("click", () => {
        fields[button.dataset.todayFor!].value = localToday();
        clearInvalid();
        invalidate();
        setStatus(copy.common.ready);
      }),
    );
  root
    .querySelectorAll<HTMLInputElement | HTMLSelectElement>("input, select")
    .forEach((field) =>
      field.addEventListener("input", () => {
        clearInvalid();
        invalidate();
        setStatus(copy.common.ready);
      }),
    );
  root.querySelector("[data-calculate]")?.addEventListener("click", run);
  root.querySelector("[data-clear]")?.addEventListener("click", () => {
    root.querySelectorAll<HTMLInputElement>("input").forEach((field) => {
      if (field.type === "checkbox") field.checked = false;
      else field.value = field.dataset.amount ? "0" : "";
    });
    (fields.operation as HTMLSelectElement).value = "add";
    clearInvalid();
    invalidate();
    setStatus(copy.common.ready);
  });
  root.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" || !(event.target instanceof HTMLInputElement))
      return;
    event.preventDefault();
    run();
  });
  copyButton.addEventListener("click", async () => {
    if (!committedText || copyButton.disabled) return;
    const text = committedText;
    const copyRevision = revision;
    const succeeded = await copyText(text);
    if (copyRevision !== revision || committedText !== text) return;
    setStatus(
      succeeded ? copy.common.copied : copy.common.copyFailed,
      succeeded ? "success" : "error",
    );
  });

  const today = localToday();
  ["start", "end", "base", "reference"].forEach(
    (key) => (fields[key].value = today),
  );
}

document.querySelectorAll<HTMLElement>("[data-date-calculator]").forEach(init);
