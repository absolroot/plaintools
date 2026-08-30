const DEV_COMMANDS = new Set(["logs", "start", "status", "stop"]);

const isPort = (value) => {
  const port = Number(value);
  return Number.isInteger(port) && port >= 1 && port <= 65_535;
};

const isHost = (value) =>
  value === "localhost" ||
  value.includes(".") ||
  value.includes(":") ||
  value === "0.0.0.0";

export const normalizeDevArgs = (args) => {
  if (args.some((argument) => argument.startsWith("-"))) return args;
  if (args.length === 1 && DEV_COMMANDS.has(args[0])) return args;
  if (args.length === 1 && isPort(args[0])) return ["--port", args[0]];
  if (args.length === 1 && isHost(args[0])) return ["--host", args[0]];
  if (args.length === 2 && isHost(args[0]) && isPort(args[1])) {
    return ["--host", args[0], "--port", args[1]];
  }
  return args;
};
