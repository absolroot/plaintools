import { describe, expect, it } from "vitest";
import { HtmlFormatterAuthority } from "./state";

describe("HTML formatter result authority", () => {
  it("accepts only the latest rapid-input completion", () => {
    const authority = new HtmlFormatterAuthority();
    authority.changeInput("<p>first</p>");
    const first = authority.beginRequest();
    authority.changeInput("<p>latest</p>");
    const latest = authority.beginRequest();
    expect(authority.commit(first, "<p>first</p>\n")).toBe(false);
    expect(authority.commit(latest, "<p>latest</p>\n")).toBe(true);
    expect(authority.snapshot.output).toBe("<p>latest</p>\n");
  });

  it("marks a preserved result stale and disables its actions immediately", () => {
    const authority = new HtmlFormatterAuthority();
    authority.changeInput("<p>one</p>");
    const revision = authority.beginRequest();
    authority.commit(revision, "<p>one</p>\n");
    authority.changeInput("<p>two</p>");
    expect(authority.snapshot).toMatchObject({
      output: "<p>one</p>\n",
      stale: true,
      actionsEnabled: false,
    });
  });

  it("Clear invalidates pending work and removes the result", () => {
    const authority = new HtmlFormatterAuthority();
    authority.changeInput("<p>one</p>");
    const pending = authority.beginRequest();
    authority.clear();
    expect(authority.commit(pending, "<p>one</p>\n")).toBe(false);
    expect(authority.snapshot).toMatchObject({
      input: "",
      output: "",
      actionsEnabled: false,
    });
  });

  it("an error invalidates output and copy/download authority", () => {
    const authority = new HtmlFormatterAuthority();
    authority.changeInput("<p>valid</p>");
    const valid = authority.beginRequest();
    authority.commit(valid, "<p>valid</p>\n");
    const failing = authority.beginRequest();
    authority.fail(failing);
    expect(authority.snapshot).toMatchObject({
      output: "",
      stale: false,
      actionsEnabled: false,
    });
  });

  it("loads a sample only into an empty input", () => {
    const authority = new HtmlFormatterAuthority();
    expect(authority.loadSample("<main>sample</main>")).toBe(true);
    expect(authority.loadSample("<main>replacement</main>")).toBe(false);
    expect(authority.snapshot.input).toBe("<main>sample</main>");
  });
});
