import { describe, expect, it } from "vitest";
import { CssFormatterAuthority } from "./state";

describe("CSS formatter result authority", () => {
  it("accepts only the latest rapid-input completion", () => {
    const authority = new CssFormatterAuthority();
    authority.changeInput(".first{color:red}");
    const first = authority.beginRequest();
    authority.changeInput(".latest{color:blue}");
    const latest = authority.beginRequest();
    expect(authority.commit(first, ".first { color: red; }\n")).toBe(false);
    expect(authority.commit(latest, ".latest { color: blue; }\n")).toBe(true);
    expect(authority.snapshot.output).toContain(".latest");
  });

  it("marks a preserved result stale and disables actions immediately", () => {
    const authority = new CssFormatterAuthority();
    authority.changeInput(".one{color:red}");
    const revision = authority.beginRequest();
    authority.commit(revision, ".one {\n  color: red;\n}\n");
    authority.changeInput(".two{color:blue}");
    expect(authority.snapshot).toMatchObject({
      output: ".one {\n  color: red;\n}\n",
      stale: true,
      actionsEnabled: false,
    });
  });

  it("Clear invalidates pending work and removes the result", () => {
    const authority = new CssFormatterAuthority();
    authority.changeInput(".one{color:red}");
    const pending = authority.beginRequest();
    authority.clear();
    expect(authority.commit(pending, ".one { color: red; }\n")).toBe(false);
    expect(authority.snapshot).toMatchObject({
      input: "",
      output: "",
      actionsEnabled: false,
    });
  });

  it("an error invalidates output and copy/download authority", () => {
    const authority = new CssFormatterAuthority();
    authority.changeInput(".valid{color:red}");
    const valid = authority.beginRequest();
    authority.commit(valid, ".valid { color: red; }\n");
    const failing = authority.beginRequest();
    authority.fail(failing);
    expect(authority.snapshot).toMatchObject({
      output: "",
      stale: false,
      actionsEnabled: false,
    });
  });

  it("loads a sample only into an empty input", () => {
    const authority = new CssFormatterAuthority();
    expect(authority.loadSample(".sample{display:grid}")).toBe(true);
    expect(authority.loadSample(".replacement{display:block}")).toBe(false);
    expect(authority.snapshot.input).toBe(".sample{display:grid}");
  });
});
