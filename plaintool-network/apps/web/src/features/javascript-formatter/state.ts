import type { JavaScriptFormatterMode } from "@plaintool/javascript-formatter-core";

export interface JavaScriptFormatterSnapshot {
  revision: number;
  mode: JavaScriptFormatterMode;
  input: string;
  output: string;
  stale: boolean;
  actionsEnabled: boolean;
}

/** Feature-owned latest-result authority; Worker cancellation is an extra guard. */
export class JavaScriptFormatterAuthority {
  #snapshot: JavaScriptFormatterSnapshot;

  constructor(initialMode: JavaScriptFormatterMode = "format") {
    this.#snapshot = {
      revision: 0,
      mode: initialMode,
      input: "",
      output: "",
      stale: false,
      actionsEnabled: false,
    };
  }

  get snapshot(): Readonly<JavaScriptFormatterSnapshot> {
    return this.#snapshot;
  }

  changeInput(input: string): number {
    const revision = this.#snapshot.revision + 1;
    this.#snapshot = {
      ...this.#snapshot,
      revision,
      input,
      output: input ? this.#snapshot.output : "",
      stale: Boolean(input && this.#snapshot.output),
      actionsEnabled: false,
    };
    return revision;
  }

  changeMode(mode: JavaScriptFormatterMode): number {
    if (mode === this.#snapshot.mode) return this.#snapshot.revision;
    const revision = this.#snapshot.revision + 1;
    this.#snapshot = {
      ...this.#snapshot,
      revision,
      mode,
      stale: Boolean(this.#snapshot.input && this.#snapshot.output),
      actionsEnabled: false,
    };
    return revision;
  }

  beginRequest(): number {
    const revision = this.#snapshot.revision + 1;
    this.#snapshot = {
      ...this.#snapshot,
      revision,
      stale: Boolean(this.#snapshot.output),
      actionsEnabled: false,
    };
    return revision;
  }

  commit(revision: number, output: string): boolean {
    if (
      revision !== this.#snapshot.revision ||
      !this.#snapshot.input ||
      !output
    )
      return false;
    this.#snapshot = {
      ...this.#snapshot,
      output,
      stale: false,
      actionsEnabled: true,
    };
    return true;
  }

  fail(revision: number): boolean {
    if (revision !== this.#snapshot.revision) return false;
    this.#snapshot = {
      ...this.#snapshot,
      output: "",
      stale: false,
      actionsEnabled: false,
    };
    return true;
  }

  clear(): number {
    return this.changeInput("");
  }

  loadSample(sample: string): boolean {
    if (this.#snapshot.input) return false;
    this.changeInput(sample);
    return true;
  }
}
