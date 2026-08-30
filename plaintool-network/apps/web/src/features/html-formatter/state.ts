export type HtmlFormatterSnapshot = {
  revision: number;
  input: string;
  output: string;
  stale: boolean;
  actionsEnabled: boolean;
};

/** Feature-owned latest-result authority; Worker cancellation is an extra guard. */
export class HtmlFormatterAuthority {
  #snapshot: HtmlFormatterSnapshot = {
    revision: 0,
    input: "",
    output: "",
    stale: false,
    actionsEnabled: false,
  };

  get snapshot(): Readonly<HtmlFormatterSnapshot> {
    return this.#snapshot;
  }

  changeInput(input: string): number {
    const revision = this.#snapshot.revision + 1;
    this.#snapshot = {
      revision,
      input,
      output: input ? this.#snapshot.output : "",
      stale: Boolean(input && this.#snapshot.output),
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
    if (revision !== this.#snapshot.revision || !this.#snapshot.input)
      return false;
    this.#snapshot = {
      ...this.#snapshot,
      output,
      stale: false,
      actionsEnabled: Boolean(output),
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
