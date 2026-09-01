const STORAGE_PREFIX = "plaintool.options.v1.";

type PersistedValue = string | boolean;
type PersistedOptions = Record<string, PersistedValue>;

function storageKey(): string {
  const [, possibleLocale, ...segments] = window.location.pathname.split("/");
  const locale = possibleLocale?.match(/^[a-z]{2}(?:-[A-Z]{2})?$/u);
  const toolPath = (locale ? segments : [possibleLocale, ...segments])
    .filter(Boolean)
    .join("/");
  return `${STORAGE_PREFIX}${toolPath || "home"}`;
}

function optionName(
  control: HTMLInputElement | HTMLSelectElement,
): string | null {
  if (control.id) return control.id;
  if (control.name) return control.name;
  for (const attribute of control.attributes) {
    if (
      attribute.name.startsWith("data-") &&
      attribute.name !== "data-persist-options"
    )
      return attribute.value
        ? `${attribute.name}:${attribute.value}`
        : attribute.name;
  }
  return null;
}

function supported(
  control: Element,
): control is HTMLInputElement | HTMLSelectElement {
  if (control instanceof HTMLSelectElement) return true;
  if (!(control instanceof HTMLInputElement)) return false;
  return ["checkbox", "radio", "range", "number", "color"].includes(
    control.type,
  );
}

function controls(
  container: Element,
): Array<HTMLInputElement | HTMLSelectElement> {
  return Array.from(container.querySelectorAll("input, select")).filter(
    supported,
  );
}

function readStoredOptions(): PersistedOptions {
  try {
    const value = localStorage.getItem(storageKey());
    if (!value) return {};
    const parsed: unknown = JSON.parse(value);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed))
      return {};
    return Object.fromEntries(
      Object.entries(parsed).filter(
        ([, item]) => typeof item === "string" || typeof item === "boolean",
      ),
    );
  } catch {
    return {};
  }
}

function writeStoredOptions(next: PersistedOptions): void {
  try {
    localStorage.setItem(storageKey(), JSON.stringify(next));
  } catch {}
}

function restore(container: Element, values: PersistedOptions): void {
  controls(container).forEach((control) => {
    const name = optionName(control);
    const value = name ? values[name] : undefined;
    if (value === undefined) return;
    if (
      control instanceof HTMLInputElement &&
      (control.type === "checkbox" || control.type === "radio")
    ) {
      if (typeof value === "boolean") control.checked = value;
      return;
    }
    if (typeof value === "string") control.value = value;
  });
}

function capture(container: Element): PersistedOptions {
  return controls(container).reduce<PersistedOptions>((values, control) => {
    const name = optionName(control);
    if (!name) return values;
    if (control instanceof HTMLInputElement && control.type === "radio") {
      if (control.checked) values[name] = control.value;
    } else if (
      control instanceof HTMLInputElement &&
      control.type === "checkbox"
    ) {
      values[name] = control.checked;
    } else {
      values[name] = control.value;
    }
    return values;
  }, {});
}

export function bindPersistedToolOptions(): void {
  const containers = Array.from(
    document.querySelectorAll("[data-persist-options]"),
  );
  if (!containers.length) return;

  const stored = readStoredOptions();
  containers.forEach((container) => restore(container, stored));
  containers.forEach((container) => {
    controls(container).forEach((control) => {
      control.dispatchEvent(new Event("change", { bubbles: true }));
    });
  });

  document.addEventListener("change", (event) => {
    const target = event.target;
    if (!(target instanceof Element) || !supported(target)) return;
    const container = target.closest("[data-persist-options]");
    if (!container) return;
    writeStoredOptions({ ...readStoredOptions(), ...capture(container) });
  });
}
