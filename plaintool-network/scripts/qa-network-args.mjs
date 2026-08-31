const TARGETS = new Set(["preview", "production"]);

const usageError = () =>
  new Error("qa-network requires --target preview|production.");

export function parseQaNetworkTarget(args) {
  if (args.length === 0) return "preview";

  if (args.length === 1) {
    if (TARGETS.has(args[0])) return args[0];
    throw usageError();
  }

  if (args.length === 2 && args[0] === "--target" && TARGETS.has(args[1])) {
    return args[1];
  }

  throw usageError();
}
