import {
  dateToTimestamp,
  TimeInputError,
  timestampToDate,
  type Disambiguation,
  type TimestampUnit,
  type TimeConversion,
} from "@plaintool/time-core";
import {
  copyText,
  readClientCopy,
  setToolStatus,
} from "../../scripts/shared/tool-dom";

function init(root: HTMLElement): void {
  if (root.dataset.initialized) return;
  root.dataset.initialized = "true";
  const copy = readClientCopy<Record<string, string>>(root);
  const status = root.querySelector<HTMLElement>("[data-status]")!;
  const badges = root.querySelector<HTMLElement>("[data-badges]")!;
  const timestamp = root.querySelector<HTMLInputElement>("[data-timestamp]")!;
  const date = root.querySelector<HTMLInputElement>("[data-date]")!;
  const nativeDate =
    root.querySelector<HTMLInputElement>("[data-native-date]")!;
  const zoneMode = root.querySelector<HTMLSelectElement>("[data-zone-mode]")!;
  const zoneInput = root.querySelector<HTMLInputElement>("[data-zone]")!;
  const selectedField = root.querySelector<HTMLElement>(".zone-selected")!;
  const zoneOffset =
    root.querySelector<HTMLSelectElement>("[data-zone-offset]")!;
  const offsetField = root.querySelector<HTMLElement>(".zone-offset")!;
  const dstField = root.querySelector<HTMLElement>(".dst-field")!;
  const unit = root.querySelector<HTMLSelectElement>("[data-unit]")!;
  const disambiguation = root.querySelector<HTMLSelectElement>(
    "[data-disambiguation]",
  )!;
  const copyButtons =
    root.querySelectorAll<HTMLButtonElement>("[data-copy-result]");
  let mode: "timestamp" | "date" = "timestamp";
  let revision = 0;
  const setStatus = (
    message: string,
    state: "idle" | "working" | "success" | "error" = "idle",
  ) => setToolStatus(root, status, message, state);
  const timeZone = () =>
    zoneMode.value === "local"
      ? Intl.DateTimeFormat().resolvedOptions().timeZone
      : zoneMode.value === "offset"
        ? zoneOffset.value
        : zoneInput.value.trim();
  const updateZoneFields = () => {
    selectedField.hidden = zoneMode.value !== "selected";
    offsetField.hidden = zoneMode.value !== "offset";
    dstField.hidden =
      mode !== "date" || !["local", "selected"].includes(zoneMode.value);
  };
  const clearInvalid = () =>
    root
      .querySelectorAll<HTMLElement>("[aria-invalid]")
      .forEach((field) => field.removeAttribute("aria-invalid"));
  const markInvalid = (code: string) => {
    clearInvalid();
    const zoneControl =
      zoneMode.value === "selected"
        ? zoneInput
        : zoneMode.value === "offset"
          ? zoneOffset
          : zoneMode;
    const field =
      code === "ambiguous-unit"
        ? unit
        : code === "nonexistent-time" || code === "repeated-time"
          ? disambiguation
          : code === "invalid-zone"
            ? zoneControl
            : mode === "timestamp"
              ? timestamp
              : date;
    field.setAttribute("aria-invalid", "true");
    field.focus();
  };
  const clearResults = () => {
    revision += 1;
    root
      .querySelectorAll<HTMLInputElement>("[data-result]")
      .forEach((field) => (field.value = ""));
    copyButtons.forEach((button) => (button.disabled = true));
    badges.replaceChildren();
  };
  const render = (result: TimeConversion) => {
    revision += 1;
    clearInvalid();
    Object.entries(result).forEach(([key, value]) => {
      const field = root.querySelector<HTMLInputElement>(
        `[data-result="${key}"]`,
      );
      if (field) field.value = String(value);
    });
    copyButtons.forEach((button) => (button.disabled = false));
    badges.replaceChildren();
    if (result.y2038Warning) {
      const badge = document.createElement("span");
      badge.className = "badge is-warning";
      badge.textContent = copy.y2038;
      badges.append(badge);
    }
    setStatus(copy.converted, "success");
  };
  const run = () => {
    try {
      const result =
        mode === "timestamp"
          ? timestampToDate(
              timestamp.value,
              unit.value as TimestampUnit,
              timeZone(),
            )
          : dateToTimestamp(
              date.value,
              timeZone(),
              disambiguation.value as Disambiguation,
            );
      render(result);
    } catch (error) {
      clearResults();
      const code = error instanceof TimeInputError ? error.code : "invalid";
      setStatus(
        code === "ambiguous-unit"
          ? copy.ambiguousUnit
          : code === "nonexistent-time"
            ? copy.nonexistentTime
            : code === "repeated-time"
              ? copy.repeatedTime
              : copy.invalid,
        "error",
      );
      markInvalid(code);
    }
  };
  root
    .querySelectorAll<HTMLButtonElement>("[data-mode-button]")
    .forEach((button) =>
      button.addEventListener("click", () => {
        mode = button.dataset.modeButton as typeof mode;
        root.dataset.mode = mode;
        root
          .querySelectorAll<HTMLButtonElement>("[data-mode-button]")
          .forEach((item) => {
            const active = item === button;
            item.classList.toggle("is-active", active);
            item.setAttribute("aria-pressed", String(active));
          });
        updateZoneFields();
        clearInvalid();
        clearResults();
        setStatus(copy.ready);
      }),
    );
  zoneMode.addEventListener("change", () => {
    updateZoneFields();
    clearInvalid();
    clearResults();
    setStatus(copy.ready);
  });
  nativeDate.addEventListener("input", () => {
    date.value = nativeDate.value;
    clearInvalid();
    clearResults();
    setStatus(copy.ready);
  });
  date.addEventListener("input", () => {
    nativeDate.value =
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d{1,3})?)?$/u.test(
        date.value,
      )
        ? date.value
        : "";
    clearInvalid();
    clearResults();
    setStatus(copy.ready);
  });
  root.querySelector("[data-convert]")?.addEventListener("click", run);
  root.querySelector("[data-now]")?.addEventListener("click", () => {
    const now = String(Date.now());
    if (mode === "timestamp") {
      timestamp.value = now;
      root.querySelector<HTMLSelectElement>("[data-unit]")!.value =
        "milliseconds";
    } else {
      try {
        const localNow =
          timestampToDate(now, "milliseconds", timeZone()).zoned.match(
            /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?/u,
          )?.[0] ?? "";
        date.value = localNow;
        nativeDate.value = localNow;
      } catch (error) {
        clearResults();
        const code = error instanceof TimeInputError ? error.code : "invalid";
        setStatus(copy.invalid, "error");
        markInvalid(code);
        return;
      }
    }
    run();
  });
  root.querySelector("[data-clear]")?.addEventListener("click", () => {
    timestamp.value = date.value = nativeDate.value = "";
    clearInvalid();
    clearResults();
    setStatus(copy.ready);
  });
  root.addEventListener("keydown", (event) => {
    if (
      event.key === "Enter" &&
      event.target instanceof HTMLInputElement &&
      event.target.matches("[data-timestamp], [data-date], [data-zone]")
    ) {
      event.preventDefault();
      run();
    }
  });
  copyButtons.forEach((button) =>
    button.addEventListener("click", async () => {
      const field = root.querySelector<HTMLInputElement>(
        `[data-result="${button.dataset.copyResult}"]`,
      );
      if (!field?.value) return;
      const value = field.value;
      const copyRevision = revision;
      const copied = await copyText(value);
      if (copyRevision !== revision || field.value !== value) return;
      setStatus(
        copied ? copy.copied : copy.copyFailed,
        copied ? "success" : "error",
      );
    }),
  );
  const localZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const localOffsetMinutes = -new Date().getTimezoneOffset();
  const localOffsetSign = localOffsetMinutes < 0 ? "-" : "+";
  const localOffsetAbsolute = Math.abs(localOffsetMinutes);
  const localOffset = `${localOffsetSign}${String(Math.floor(localOffsetAbsolute / 60)).padStart(2, "0")}:${String(localOffsetAbsolute % 60).padStart(2, "0")}`;
  if (zoneOffset.querySelector(`option[value="${localOffset}"]`))
    zoneOffset.value = localOffset;
  const localOption = zoneMode.querySelector<HTMLOptionElement>(
    'option[value="local"]',
  );
  if (localOption)
    localOption.textContent = `${localOption.textContent} (${localZone})`;
  const supportedValuesOf = (
    Intl as typeof Intl & { supportedValuesOf?: (key: "timeZone") => string[] }
  ).supportedValuesOf;
  const zoneList = root.querySelector<HTMLDataListElement>("#iana-zones");
  if (supportedValuesOf && zoneList) {
    const popularOptions = Array.from(zoneList.options);
    const popularValues = new Set(popularOptions.map((option) => option.value));
    const now = new Date();
    const offsetForZone = (value: string) =>
      new Intl.DateTimeFormat("en", {
        timeZone: value,
        timeZoneName: "longOffset",
      })
        .formatToParts(now)
        .find((part) => part.type === "timeZoneName")
        ?.value.replace("GMT", "UTC");
    popularOptions.forEach((option) => {
      const offset = offsetForZone(option.value);
      if (offset && !option.label.includes(offset))
        option.label = `${option.label} · ${offset}`;
    });
    const fallbackOptions = supportedValuesOf("timeZone")
      .filter((value) => !popularValues.has(value))
      .map((value) => {
        const option = document.createElement("option");
        option.value = value;
        const parts = value.split("/");
        const city = parts.at(-1)?.replaceAll("_", " ") ?? value;
        const region = parts.slice(0, -1).join(" / ").replaceAll("_", " ");
        const offset = offsetForZone(value);
        option.label = [city, region, offset].filter(Boolean).join(" — ");
        return option;
      });
    zoneList.replaceChildren(...popularOptions, ...fallbackOptions);
  }
  [timestamp, unit, zoneInput, zoneOffset, disambiguation].forEach((control) =>
    control.addEventListener("input", () => {
      clearInvalid();
      clearResults();
      setStatus(copy.ready);
    }),
  );
  updateZoneFields();
  run();
}
document.querySelectorAll<HTMLElement>("[data-time-tool]").forEach(init);
