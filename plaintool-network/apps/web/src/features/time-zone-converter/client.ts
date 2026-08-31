import {
  convertBetweenTimeZones,
  convertInstantBetweenTimeZones,
  TimeInputError,
  type TimeZoneConversion,
  type ZonedTimeValue,
} from "@plaintool/time-core";
import { readClientCopy, setToolStatus } from "../../scripts/shared/tool-dom";
import type { TimeZoneConverterClientCopy } from "./contract";

const FALLBACK_ZONES = [
  "UTC",
  "Asia/Seoul",
  "Asia/Tokyo",
  "Asia/Singapore",
  "Europe/London",
  "America/New_York",
  "Australia/Sydney",
];

const WORLD_CLOCK_ZONES = [
  "Asia/Seoul",
  "Asia/Tokyo",
  "Asia/Singapore",
  "Europe/London",
  "America/New_York",
  "Australia/Sydney",
] as const;

const MODERN_ZONE_IDS = new Map([
  ["America/Godthab", "America/Nuuk"],
  ["Asia/Calcutta", "Asia/Kolkata"],
  ["Asia/Katmandu", "Asia/Kathmandu"],
  ["Europe/Kiev", "Europe/Kyiv"],
  ["Pacific/Ponape", "Pacific/Pohnpei"],
  ["Pacific/Truk", "Pacific/Chuuk"],
]);

function init(root: HTMLElement): void {
  if (root.dataset.initialized) return;
  root.dataset.initialized = "true";

  const { feature: copy, common } =
    readClientCopy<TimeZoneConverterClientCopy>(root);
  const locale = root.dataset.locale ?? "en";
  const status = root.querySelector<HTMLElement>("[data-status]")!;
  const sourceTime =
    root.querySelector<HTMLInputElement>("[data-source-time]")!;
  const sourceZone =
    root.querySelector<HTMLSelectElement>("[data-source-zone]")!;
  const targetZone =
    root.querySelector<HTMLSelectElement>("[data-target-zone]")!;
  const result = root.querySelector<HTMLElement>("[data-conversion-result]")!;
  const resultZone = root.querySelector<HTMLElement>("[data-conversion-zone]")!;
  const resultTime = root.querySelector<HTMLElement>("[data-conversion-time]")!;
  const resultDate = root.querySelector<HTMLElement>("[data-conversion-date]")!;
  const resultOffset = root.querySelector<HTMLElement>(
    "[data-conversion-offset]",
  )!;
  const resultDifference = root.querySelector<HTMLElement>(
    "[data-conversion-difference]",
  )!;
  const clockList = root.querySelector<HTMLElement>("[data-world-clock-list]")!;
  const template = root.querySelector<HTMLTemplateElement>(
    "[data-zone-row-template]",
  )!;

  let hour12 =
    new Intl.DateTimeFormat(locale, { hour: "numeric" }).resolvedOptions()
      .hour12 ?? false;
  let lastConversion: TimeZoneConversion | undefined;
  let lastWorldClock: TimeZoneConversion | undefined;
  const zoneLabels = new Map<string, string>();

  const setStatus = (
    message: string,
    state: "idle" | "working" | "success" | "error" = "idle",
  ) => setToolStatus(root, status, message, state);

  const offsetLabel = (offset: string) =>
    offset === "+00:00" ? "UTC" : `UTC${offset}`;

  const conciseLabel = (label: string): string =>
    label.split(/\s+[—·]\s+/u)[0]?.trim() || label;

  const genericZoneName = (zone: string): string | undefined => {
    if (zone === "UTC") return "UTC";
    try {
      return new Intl.DateTimeFormat(locale, {
        timeZone: zone,
        timeZoneName: "longGeneric",
      })
        .formatToParts(new Date())
        .find((part) => part.type === "timeZoneName")?.value;
    } catch {
      return undefined;
    }
  };

  for (const option of sourceZone.options) {
    zoneLabels.set(
      option.value,
      conciseLabel(option.textContent ?? option.value),
    );
  }

  const supportedValuesOf = (
    Intl as typeof Intl & { supportedValuesOf?: (key: "timeZone") => string[] }
  ).supportedValuesOf;
  const supportedZones = [
    ...new Set(
      ["UTC", ...(supportedValuesOf?.("timeZone") ?? FALLBACK_ZONES)].map(
        (zone) => MODERN_ZONE_IDS.get(zone) ?? zone,
      ),
    ),
  ];

  const appendLongTailOptions = (select: HTMLSelectElement) => {
    const existing = new Set(Array.from(select.options, ({ value }) => value));
    for (const zone of supportedZones) {
      if (existing.has(zone)) continue;
      const generic = genericZoneName(zone);
      const option = document.createElement("option");
      option.value = zone;
      option.textContent =
        generic && generic !== zone ? `${zone} — ${generic}` : zone;
      select.append(option);
    }
  };

  appendLongTailOptions(sourceZone);
  appendLongTailOptions(targetZone);

  const availableWorldZones = new Set(
    Array.from(
      sourceZone.querySelectorAll<HTMLOptionElement>(
        "option[data-world-clock-zone]",
      ),
      ({ value }) => value,
    ),
  );
  const worldZones = WORLD_CLOCK_ZONES.filter((zone) =>
    availableWorldZones.has(zone),
  );

  const formatTime = (value: ZonedTimeValue, instant: Date) =>
    new Intl.DateTimeFormat(locale, {
      timeZone: value.timeZone,
      hour: "numeric",
      minute: "2-digit",
      hour12,
    }).format(instant);

  const formatDate = (value: ZonedTimeValue, instant: Date) =>
    new Intl.DateTimeFormat(locale, {
      timeZone: value.timeZone,
      year: "numeric",
      month: "short",
      day: "numeric",
      weekday: "short",
    }).format(instant);

  const formatDifference = (minutes: number): string => {
    if (minutes === 0) return copy.sameOffset;
    const absolute = Math.abs(minutes);
    const hours = Math.floor(absolute / 60);
    const remainder = absolute % 60;
    const value = [hours ? `${hours}h` : "", remainder ? `${remainder}m` : ""]
      .filter(Boolean)
      .join(" ");
    return (minutes > 0 ? copy.ahead : copy.behind).replace(
      "{difference}",
      value,
    );
  };

  const clearError = () => {
    sourceTime.removeAttribute("aria-invalid");
    sourceZone.removeAttribute("aria-invalid");
    targetZone.removeAttribute("aria-invalid");
  };

  const fail = (
    error: unknown,
    control: HTMLInputElement | HTMLSelectElement = sourceTime,
  ) => {
    const code = error instanceof TimeInputError ? error.code : "invalid";
    const message =
      code === "invalid-zone"
        ? copy.invalidZone
        : code === "nonexistent-time"
          ? copy.nonexistentTime
          : code === "repeated-time"
            ? copy.repeatedTime
            : copy.invalidTime;
    clearError();
    control.setAttribute("aria-invalid", "true");
    setStatus(message, "error");
  };

  const renderConversion = (conversion: TimeZoneConversion) => {
    lastConversion = conversion;
    const target = conversion.targets[0];
    if (!target) return;
    const instant = new Date(conversion.instant);
    resultZone.textContent = zoneLabels.get(target.timeZone) ?? target.timeZone;
    resultTime.textContent = formatTime(target, instant);
    resultDate.textContent = formatDate(target, instant);
    resultOffset.textContent = offsetLabel(target.offset);
    resultDifference.textContent = `${new Intl.RelativeTimeFormat(locale, {
      numeric: "auto",
    }).format(target.dayDifference, "day")} · ${formatDifference(
      target.offsetMinutes - conversion.source.offsetMinutes,
    )}`;
    result.hidden = false;
  };

  const worldClockRow = (value: ZonedTimeValue, instant: Date): HTMLElement => {
    const row = template.content.firstElementChild!.cloneNode(
      true,
    ) as HTMLElement;
    const label = zoneLabels.get(value.timeZone) ?? value.timeZone;
    const time = formatTime(value, instant);
    const date = formatDate(value, instant);
    row.dataset.zone = value.timeZone;
    row.querySelector<HTMLElement>("[data-zone-label]")!.textContent = label;
    row.querySelector<HTMLElement>("[data-zone-id]")!.textContent =
      value.timeZone;
    row.querySelector<HTMLElement>("[data-zone-time]")!.textContent = time;
    row.querySelector<HTMLElement>("[data-zone-offset]")!.textContent =
      offsetLabel(value.offset);
    row.querySelector<HTMLElement>("[data-zone-date]")!.textContent = date;
    row.setAttribute(
      "aria-label",
      `${label}, ${time}, ${date}, ${offsetLabel(value.offset)}`,
    );
    return row;
  };

  const renderWorldClocks = (conversion: TimeZoneConversion) => {
    lastWorldClock = conversion;
    const instant = new Date(conversion.instant);
    clockList.replaceChildren(
      ...conversion.targets.map((value) => worldClockRow(value, instant)),
    );
  };

  const refreshWorldClocks = () => {
    try {
      renderWorldClocks(
        convertInstantBetweenTimeZones(
          new Date().toISOString(),
          "UTC",
          worldZones,
        ),
      );
    } catch {
      // Keep the last valid clocks if the platform's time-zone data fails.
    }
  };

  const setCurrentSourceTime = () => {
    try {
      const current = convertInstantBetweenTimeZones(
        new Date().toISOString(),
        sourceZone.value,
        [],
      );
      sourceTime.value = current.source.localDateTime.slice(0, 16);
      clearError();
      setStatus(common.ready);
    } catch (error) {
      fail(error, sourceZone);
    }
  };

  const runConversion = () => {
    clearError();
    try {
      const conversion = convertBetweenTimeZones(
        sourceTime.value,
        sourceZone.value,
        [targetZone.value],
      );
      renderConversion(conversion);
      setStatus(copy.converted, "success");
    } catch (error) {
      fail(
        error,
        error instanceof TimeInputError && error.code === "invalid-zone"
          ? sourceZone
          : sourceTime,
      );
    }
  };

  const invalidateConversion = () => {
    lastConversion = undefined;
    result.hidden = true;
    clearError();
    setStatus(common.ready);
  };

  const updateFormatButtons = () => {
    root
      .querySelectorAll<HTMLButtonElement>("[data-hour-format]")
      .forEach((button) => {
        const active = (button.dataset.hourFormat === "12") === hour12;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", String(active));
      });
  };

  root.querySelector("[data-now]")?.addEventListener("click", () => {
    setCurrentSourceTime();
  });
  root
    .querySelector("[data-convert]")
    ?.addEventListener("click", runConversion);
  root.querySelector("[data-swap-zones]")?.addEventListener("click", () => {
    const previousSource = sourceZone.value;
    sourceZone.value = targetZone.value;
    targetZone.value = previousSource;
    if (lastConversion?.targets[0]) {
      sourceTime.value = lastConversion.targets[0].localDateTime.slice(0, 16);
    }
    invalidateConversion();
  });
  sourceTime.addEventListener("input", invalidateConversion);
  sourceZone.addEventListener("change", invalidateConversion);
  targetZone.addEventListener("change", invalidateConversion);
  root
    .querySelectorAll<HTMLButtonElement>("[data-hour-format]")
    .forEach((button) =>
      button.addEventListener("click", () => {
        hour12 = button.dataset.hourFormat === "12";
        updateFormatButtons();
        if (lastConversion) renderConversion(lastConversion);
        if (lastWorldClock) renderWorldClocks(lastWorldClock);
      }),
    );

  const detectedZone =
    MODERN_ZONE_IDS.get(
      Intl.DateTimeFormat().resolvedOptions().timeZone ?? "UTC",
    ) ??
    Intl.DateTimeFormat().resolvedOptions().timeZone ??
    "UTC";
  sourceZone.value = "UTC";
  targetZone.value = supportedZones.includes(detectedZone)
    ? detectedZone
    : "Asia/Seoul";
  if (targetZone.value === sourceZone.value) targetZone.value = "Asia/Seoul";
  updateFormatButtons();
  setCurrentSourceTime();
  refreshWorldClocks();

  window.setInterval(() => {
    if (!document.hidden) refreshWorldClocks();
  }, 60_000);
}

document
  .querySelectorAll<HTMLElement>("[data-time-zone-converter]")
  .forEach(init);
