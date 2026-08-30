import { describe, expect, it } from "vitest";
import { SqlFormatterAuthority } from "./state";

describe("SQL formatter result authority", () => {
  it("accepts only the latest rapid-input completion", () => {
    const authority = new SqlFormatterAuthority();
    authority.changeInput("select 1;");
    const first = authority.beginRequest();
    authority.changeInput("select 2;");
    const latest = authority.beginRequest();
    expect(authority.commit(first, "select 1;\n")).toBe(false);
    expect(authority.commit(latest, "select 2;\n")).toBe(true);
    expect(authority.snapshot.output).toBe("select 2;\n");
  });

  it("marks a preserved result stale and disables its actions immediately", () => {
    const authority = new SqlFormatterAuthority();
    authority.changeInput("select 1;");
    const revision = authority.beginRequest();
    authority.commit(revision, "select 1;\n");
    authority.changeInput("select 2;");
    expect(authority.snapshot).toMatchObject({
      output: "select 1;\n",
      stale: true,
      actionsEnabled: false,
    });
  });

  it("Clear invalidates pending work and removes the result", () => {
    const authority = new SqlFormatterAuthority();
    authority.changeInput("select 1;");
    const pending = authority.beginRequest();
    authority.clear();
    expect(authority.commit(pending, "select 1;\n")).toBe(false);
    expect(authority.snapshot).toMatchObject({
      input: "",
      output: "",
      actionsEnabled: false,
    });
  });

  it("an error invalidates output and copy/download authority", () => {
    const authority = new SqlFormatterAuthority();
    authority.changeInput("select 1;");
    const valid = authority.beginRequest();
    authority.commit(valid, "select 1;\n");
    const failing = authority.beginRequest();
    authority.fail(failing);
    expect(authority.snapshot).toMatchObject({
      output: "",
      stale: false,
      actionsEnabled: false,
    });
  });

  it("loads a sample only into an empty input", () => {
    const authority = new SqlFormatterAuthority();
    expect(authority.loadSample("select * from orders;")).toBe(true);
    expect(authority.loadSample("select * from users;")).toBe(false);
    expect(authority.snapshot.input).toBe("select * from orders;");
  });
});
