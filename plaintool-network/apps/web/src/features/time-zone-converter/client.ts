import {
  convertBetweenTimeZones,
  convertInstantBetweenTimeZones,
  TimeInputError,
  type TimeZoneConversion,
  type ZonedTimeValue,
} from "@plaintool/time-core";
import { readClientCopy, setToolStatus } from "../../scripts/shared/tool-dom";
import type { TimeZoneConverterClientCopy } from "./contract";

const MAX_TARGET_ZONES = 7;
const DEFAULT_TARGETS = [
  "UTC",
  "America/New_York",
  "Europe/London",
  "Asia/Tokyo",
];

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
    root.querySelector<HTMLInputElement>("[data-source-zone]")!;
  const addZone = root.querySelector<HTMLInputElement>("[data-add-zone]")!;
  const addForm = root.querySelector<HTMLFormElement>("[data-add-zone-form]")!;
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

  Array.from(optionList.options).forEach(registerOption);
  const supportedValuesOf = (
    Intl as typeof Intl & { supportedValuesOf?: (key: "timeZone") => string[] }
  ).supportedValuesOf;
  const supportedZones = [
    "UTC",
    ...(supportedValuesOf?.("timeZone") ?? DEFAULT_TARGETS),
  ];
  const existingZones = new Set(
    Array.from(optionList.options, ({ value }) => value),
  );
  for (const zone of supportedZones) {
    if (existingZones.has(zone)) continue;
    const option = document.createElement("option");
    option.value = zone;
    option.label = formatZoneName(zone);
    optionList.append(option);
    registerOption(option);
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
    const hourMatch = /T(\d{2}):(\d{2})/u.exec(value.localDateTime);
    const minutesInDay = hourMatch
      ? Number(hourMatch[1]) * 60 + Number(hourMatch[2])
      : 0;

    row.dataset.zone = value.timeZone;
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
    row
      .querySelector<HTMLElement>(".world-clock-dayline")!
      .style.setProperty("--time-position", `${(minutesInDay / 1440) * 100}%`);
    row.querySelector<HTMLElement>("[data-source-badge]")!.hidden = !isSource;
    const removeButton =
      row.querySelector<HTMLButtonElement>("[data-remove-zone]")!;
    removeButton.hidden = isSource;
    removeButton.addEventListener("click", () => {
      targetZones = targetZones.filter((zone) => zone !== value.timeZone);
      refresh();
    });
    row.setAttribute(
      "aria-label",
      `${zoneLabels.get(value.timeZone) ?? value.timeZone}, ${time}, ${date}, ${offsetLabel(value.offset)}`,
    );
    return row;
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
    emptyMessage.hidden = targetZones.length > 0;
    liveIndicator.hidden = !live;
    root.classList.add("is-success");
    root.classList.remove("has-error");
  };

  const clearError = () => {
    sourceTime.removeAttribute("aria-invalid");
    sourceZone.removeAttribute("aria-invalid");
    addZone.removeAttribute("aria-invalid");
  };

  const fail = (error: unknown, control: HTMLInputElement = sourceTime) => {
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
    clockList.replaceChildren();
    emptyMessage.hidden = true;
    lastResult = undefined;
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
  sourceZone.addEventListener("input", () => {
    clearError();
    clockList.replaceChildren();
    lastResult = undefined;
    setStatus(common.ready);
  });
  sourceZone.addEventListener("change", refresh);
  sourceZone.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
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

  addForm.addEventListener("submit", (event) => {
    event.preventDefault();
    clearError();
    const zone = resolveZone(addZone.value);
    if (!zone) {
      addZone.setAttribute("aria-invalid", "true");
      setStatus(copy.invalidZone, "error");
      return;
    }
    if (zone === sourceZoneValue() || targetZones.includes(zone)) {
      addZone.setAttribute("aria-invalid", "true");
      setStatus(copy.duplicateZone, "error");
      return;
    }
    if (targetZones.length >= MAX_TARGET_ZONES) {
      addZone.setAttribute("aria-invalid", "true");
      setStatus(copy.maxZones, "error");
      return;
    }
    targetZones.push(zone);
    addZone.value = "";
    refresh();
  });

  const detectedZone =
    Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  sourceZone.value = resolveZone(detectedZone) ?? "UTC";
  targetZones = DEFAULT_TARGETS.filter(
    (zone) => zone !== sourceZone.value,
  ).slice(0, 3);
  updateFormatButtons();
  runLive();

  window.setInterval(() => {
    if (live && !document.hidden) runLive();
  }, 30_000);
}

document
  .querySelectorAll<HTMLElement>("[data-time-zone-converter]")
  .forEach(init);
