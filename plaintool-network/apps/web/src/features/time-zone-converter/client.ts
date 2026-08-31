import {
  convertBetweenTimeZones,
  convertInstantBetweenTimeZones,
  TimeInputError,
  type TimeZoneConversion,
  type ZonedTimeValue,
} from "@plaintool/time-core";
import { readClientCopy, setToolStatus } from "../../scripts/shared/tool-dom";
import type { TimeZoneConverterClientCopy } from "./contract";

const DEFAULT_TARGETS = [
  "UTC",
  "America/New_York",
  "Europe/London",
  "Asia/Tokyo",
];
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

  const { feature: copy } = readClientCopy<TimeZoneConverterClientCopy>(root);
  const locale = root.dataset.locale ?? "en";
  const status = root.querySelector<HTMLElement>("[data-status]")!;
  const sourceTime =
    root.querySelector<HTMLInputElement>("[data-source-time]")!;
  const sourceZone =
    root.querySelector<HTMLSelectElement>("[data-source-zone]")!;
  const zoneFilter =
    root.querySelector<HTMLInputElement>("[data-zone-filter]")!;
  const optionList = root.querySelector<HTMLDataListElement>(
    "[data-time-zone-options]",
  )!;
  const clockList = root.querySelector<HTMLElement>("[data-world-clock-list]")!;
  const emptyMessage = root.querySelector<HTMLElement>(
    "[data-world-clock-empty]",
  )!;
  const template = root.querySelector<HTMLTemplateElement>(
    "[data-zone-row-template]",
  )!;
  const liveIndicator = root.querySelector<HTMLElement>(
    "[data-live-indicator]",
  )!;
  const zoneLabels = new Map<string, string>();
  const zoneAliases = new Map<string, string>();
  let targetZones: string[] = [];
  let live = true;
  let hour12 =
    new Intl.DateTimeFormat(locale, { hour: "numeric" }).resolvedOptions()
      .hour12 ?? false;
  let lastResult: TimeZoneConversion | undefined;

  const setStatus = (
    message: string,
    state: "idle" | "working" | "success" | "error" = "idle",
  ) => setToolStatus(root, status, message, state);

  const normalize = (value: string) =>
    value.trim().toLocaleLowerCase(locale).replace(/\s+/gu, " ");

  const offsetLabel = (offset: string) =>
    offset === "+00:00" ? "UTC" : `UTC${offset}`;

  const formatZoneName = (zone: string): string => {
    if (zone === "UTC") return "UTC";
    const city = zone.split("/").at(-1)?.replaceAll("_", " ") ?? zone;
    try {
      const genericName = new Intl.DateTimeFormat(locale, {
        timeZone: zone,
        timeZoneName: "longGeneric",
      })
        .formatToParts(new Date())
        .find((part) => part.type === "timeZoneName")?.value;
      return genericName && genericName !== city
        ? `${city} · ${genericName}`
        : city;
    } catch {
      return city;
    }
  };

  const registerOption = (option: HTMLOptionElement) => {
    const zone = option.value;
    const label = option.label || formatZoneName(zone);
    option.label = label;
    zoneLabels.set(zone, label.split(/[·—]/u)[0]?.trim() || label);
    zoneAliases.set(normalize(zone), zone);
    zoneAliases.set(normalize(label), zone);
    for (const part of label.split(/[·—,()]/u)) {
      const alias = normalize(part);
      if (alias && !zoneAliases.has(alias)) zoneAliases.set(alias, zone);
    }
    const city = zone.split("/").at(-1)?.replaceAll("_", " ");
    if (city) zoneAliases.set(normalize(city), zone);
  };

  Array.from(sourceZone.options).forEach(registerOption);
  const supportedValuesOf = (
    Intl as typeof Intl & { supportedValuesOf?: (key: "timeZone") => string[] }
  ).supportedValuesOf;
  const supportedZones = [
    ...new Set(
      ["UTC", ...(supportedValuesOf?.("timeZone") ?? DEFAULT_TARGETS)].map(
        (zone) => MODERN_ZONE_IDS.get(zone) ?? zone,
      ),
    ),
  ];
  const existingZones = new Set(
    Array.from(sourceZone.options, ({ value }) => value),
  );
  for (const zone of supportedZones) {
    if (existingZones.has(zone)) continue;
    const selectOption = document.createElement("option");
    selectOption.value = zone;
    selectOption.textContent = formatZoneName(zone);
    sourceZone.append(selectOption);
    registerOption(selectOption);

    const suggestion = document.createElement("option");
    suggestion.value = zone;
    suggestion.label = selectOption.textContent ?? zone;
    optionList.append(suggestion);
  }

  const resolveZone = (value: string): string | undefined => {
    const alias = zoneAliases.get(normalize(value));
    if (alias) return alias;
    try {
      new Intl.DateTimeFormat("en", { timeZone: value.trim() });
      return value.trim();
    } catch {
      return undefined;
    }
  };

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

  const formatZoneRow = (
    value: ZonedTimeValue,
    sourceOffsetMinutes: number,
    isSource: boolean,
  ): HTMLElement => {
    const row = template.content.firstElementChild!.cloneNode(
      true,
    ) as HTMLElement;
    const instantDate = new Date(lastResult!.instant);
    const time = new Intl.DateTimeFormat(locale, {
      timeZone: value.timeZone,
      hour: "numeric",
      minute: "2-digit",
      hour12,
    }).format(instantDate);
    const date = new Intl.DateTimeFormat(locale, {
      timeZone: value.timeZone,
      year: "numeric",
      month: "short",
      day: "numeric",
      weekday: "short",
    }).format(instantDate);
    const relativeDay = new Intl.RelativeTimeFormat(locale, {
      numeric: "auto",
    }).format(value.dayDifference, "day");
    row.dataset.zone = value.timeZone;
    row.dataset.searchText = normalize(
      `${zoneLabels.get(value.timeZone) ?? formatZoneName(value.timeZone)} ${value.timeZone} ${offsetLabel(value.offset)}`,
    );
    row.classList.toggle("is-source", isSource);
    row.querySelector<HTMLElement>("[data-zone-label]")!.textContent =
      zoneLabels.get(value.timeZone) ?? formatZoneName(value.timeZone);
    row.querySelector<HTMLElement>("[data-zone-id]")!.textContent =
      value.timeZone;
    row.querySelector<HTMLElement>("[data-zone-time]")!.textContent = time;
    row.querySelector<HTMLElement>("[data-zone-offset]")!.textContent =
      offsetLabel(value.offset);
    row.querySelector<HTMLElement>("[data-zone-date]")!.textContent = date;
    row.querySelector<HTMLElement>("[data-zone-difference]")!.textContent =
      isSource
        ? relativeDay
        : `${relativeDay} · ${formatDifference(value.offsetMinutes - sourceOffsetMinutes)}`;
    row.querySelector<HTMLElement>("[data-source-badge]")!.hidden = !isSource;
    row.setAttribute(
      "aria-label",
      `${zoneLabels.get(value.timeZone) ?? value.timeZone}, ${time}, ${date}, ${offsetLabel(value.offset)}`,
    );
    return row;
  };

  const filterRows = () => {
    const query = normalize(zoneFilter.value);
    let visible = 0;
    clockList.querySelectorAll<HTMLElement>("[data-zone]").forEach((row) => {
      const matches = !query || row.dataset.searchText?.includes(query);
      row.hidden = !matches;
      if (matches) visible += 1;
    });
    emptyMessage.hidden = visible > 0;
  };

  const render = (result: TimeZoneConversion) => {
    lastResult = result;
    const rows = [
      formatZoneRow(result.source, result.source.offsetMinutes, true),
      ...result.targets.map((value) =>
        formatZoneRow(value, result.source.offsetMinutes, false),
      ),
    ];
    clockList.replaceChildren(...rows);
    filterRows();
    liveIndicator.hidden = !live;
    root.classList.add("is-success");
    root.classList.remove("has-error");
  };

  const clearError = () => {
    sourceTime.removeAttribute("aria-invalid");
    sourceZone.removeAttribute("aria-invalid");
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
    root.classList.remove("is-success");
    root.classList.add("has-error");
    setStatus(message, "error");
  };

  const sourceZoneValue = (): string | undefined =>
    resolveZone(sourceZone.value);

  const runManual = () => {
    clearError();
    const zone = sourceZoneValue();
    if (!zone) {
      fail(new TimeInputError("invalid-zone"), sourceZone);
      return;
    }
    sourceZone.value = zone;
    try {
      const result = convertBetweenTimeZones(
        sourceTime.value,
        zone,
        targetZones,
      );
      render(result);
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

  const runLive = () => {
    clearError();
    const zone = sourceZoneValue();
    if (!zone) {
      fail(new TimeInputError("invalid-zone"), sourceZone);
      return;
    }
    sourceZone.value = zone;
    try {
      const result = convertInstantBetweenTimeZones(
        new Date().toISOString(),
        zone,
        targetZones,
      );
      sourceTime.value = result.source.localDateTime.slice(0, 16);
      render(result);
      setStatus(copy.live, "success");
    } catch (error) {
      fail(error, sourceZone);
    }
  };

  const refresh = () => (live ? runLive() : runManual());

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
    live = true;
    runLive();
  });
  root.querySelector("[data-convert]")?.addEventListener("click", () => {
    live = false;
    runManual();
  });
  sourceTime.addEventListener("input", () => {
    live = false;
    runManual();
  });
  sourceZone.addEventListener("change", () => {
    targetZones = supportedZones.filter((zone) => zone !== sourceZone.value);
    refresh();
  });
  root
    .querySelectorAll<HTMLButtonElement>("[data-hour-format]")
    .forEach((button) =>
      button.addEventListener("click", () => {
        hour12 = button.dataset.hourFormat === "12";
        updateFormatButtons();
        if (lastResult) render(lastResult);
      }),
    );

  zoneFilter.addEventListener("input", filterRows);

  const detectedZone =
    Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  sourceZone.value = resolveZone(detectedZone) ?? "UTC";
  targetZones = supportedZones.filter((zone) => zone !== sourceZone.value);
  updateFormatButtons();
  runLive();

  window.setInterval(() => {
    if (live && !document.hidden) runLive();
  }, 60_000);
}

document
  .querySelectorAll<HTMLElement>("[data-time-zone-converter]")
  .forEach(init);
