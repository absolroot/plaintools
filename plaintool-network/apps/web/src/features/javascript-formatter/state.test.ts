import { describe, expect, it } from "vitest";
import { JavaScriptFormatterAuthority } from "./state";

describe("JavaScript formatter result authority", () => {
  it("accepts only the newest rapid-input completion", () => {
    const authority = new JavaScriptFormatterAuthority();
    authority.changeInput("const first=1");
    const first = authority.beginRequest();
    authority.changeInput("const latest=2");
    const latest = authority.beginRequest();
    expect(authority.commit(first, "const first = 1;\n")).toBe(false);
    expect(authority.commit(latest, "const latest = 2;\n")).toBe(true);
    expect(authority.snapshot.output).toBe("const latest = 2;\n");
  });

  it("keeps an old result visible as stale but disables actions immediately", () => {
    const authority = new JavaScriptFormatterAuthority();
    authority.changeInput("const one=1");
    const revision = authority.beginRequest();
    authority.commit(revision, "const one = 1;\n");
    authority.changeInput("const two=2");
    expect(authority.snapshot).toMatchObject({
      output: "const one = 1;\n",
      stale: true,
      actionsEnabled: false,
    });
  });

  it("invalidates an old result when the selected mode changes", () => {
    const authority = new JavaScriptFormatterAuthority("format");
    authority.changeInput("const value=1");
    const revision = authority.beginRequest();
    authority.commit(revision, "const value = 1;\n");
    authority.changeMode("minify");
    expect(authority.snapshot).toMatchObject({
      mode: "minify",
      stale: true,
      actionsEnabled: false,
    });
  });

  it("retains the selected mode across new input, sample, and Clear", () => {
    const authority = new JavaScriptFormatterAuthority();
    authority.changeMode("minify");
    authority.changeInput("const value = 1;");
    authority.clear();
    expect(authority.loadSample("const sample = true;")).toBe(true);
    expect(authority.snapshot.mode).toBe("minify");
  });

  it("Clear invalidates pending work and removes output authority", () => {
    const authority = new JavaScriptFormatterAuthority();
    authority.changeInput("const value=1");
    const pending = authority.beginRequest();
    authority.clear();
    expect(authority.commit(pending, "const value = 1;\n")).toBe(false);
    expect(authority.snapshot).toMatchObject({
      input: "",
      output: "",
      actionsEnabled: false,
    });
  });

  it("an error clears output and result actions", () => {
    const authority = new JavaScriptFormatterAuthority();
    authority.changeInput("const value=1");
    const valid = authority.beginRequest();
    authority.commit(valid, "const value = 1;\n");
    const failing = authority.beginRequest();
    authority.fail(failing);
    expect(authority.snapshot).toMatchObject({
      output: "",
      stale: false,
      actionsEnabled: false,
    });
  });

  it("loads a sample only when the input is exactly empty", () => {
    const authority = new JavaScriptFormatterAuthority();
    authority.changeInput("   ");
    expect(authority.loadSample("const sample=true")).toBe(false);
    expect(authority.snapshot.input).toBe("   ");
  });
});
