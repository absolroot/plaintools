export function flattenCopy(
  value: unknown,
  path = "",
): Array<[string, string]> {
  if (typeof value === "string") return [[path, value]];
  if (Array.isArray(value)) {
    return value.flatMap((item, index) =>
      flattenCopy(item, `${path}[${index}]`),
    );
  }
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, item]) =>
      flattenCopy(item, path ? `${path}.${key}` : key),
    );
  }
  return [];
}

export function copyPlaceholders(value: string): string[] {
  return [...value.matchAll(/\{\{\w+\}\}|\{\w+\}/gu)]
    .map((match) => match[0])
    .sort();
}

export function copyShape(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(copyShape);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, child]) => [key, copyShape(child)]),
    );
  }
  return typeof value;
}
