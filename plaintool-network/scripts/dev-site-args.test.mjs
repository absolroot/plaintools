import { describe, expect, it } from "vitest";
import { normalizeDevArgs } from "./dev-site-args.mjs";

describe("normalizeDevArgs", () => {
  it("restores host and port flags stripped by npm on Windows", () => {
    expect(normalizeDevArgs(["127.0.0.1", "4387"])).toEqual([
      "--host",
      "127.0.0.1",
      "--port",
      "4387",
    ]);
  });

  it("restores a standalone host or port", () => {
    expect(normalizeDevArgs(["localhost"])).toEqual(["--host", "localhost"]);
    expect(normalizeDevArgs(["4387"])).toEqual(["--port", "4387"]);
  });

  it("preserves explicit flags and lifecycle commands", () => {
    expect(normalizeDevArgs(["--host", "127.0.0.1"])).toEqual([
      "--host",
      "127.0.0.1",
    ]);
    expect(normalizeDevArgs(["status"])).toEqual(["status"]);
    expect(normalizeDevArgs(["stop"])).toEqual(["stop"]);
  });
});
