import { describe, expect, it, vi } from "vitest";
import { createLatestWorkerRunner } from "./latest-worker-runner";

class FakeWorker {
  listeners = new Map<string, EventListener[]>();
  postMessage = vi.fn();
  terminate = vi.fn();
  addEventListener(type: string, listener: EventListener): void {
    this.listeners.set(type, [...(this.listeners.get(type) ?? []), listener]);
  }
  emit(type: string, data?: unknown): void {
    for (const listener of this.listeners.get(type) ?? [])
      listener({ data } as MessageEvent);
  }
}

describe("createLatestWorkerRunner", () => {
  it("terminates active work and ignores stale preparation", async () => {
    const workers: FakeWorker[] = [];
    let releaseFirst!: (value: { payload: { id: number } }) => void;
    const replies: string[] = [];
    const runner = createLatestWorkerRunner<
      { id: number },
      { id: number },
      string
    >({
      createWorker: () => {
        const worker = new FakeWorker();
        workers.push(worker);
        return worker as unknown as Worker;
      },
      prepare: (id, context) =>
        context === "first"
          ? new Promise((resolve) => {
              releaseFirst = resolve;
            })
          : { payload: { id } },
      replyId: (reply) => reply.id,
      onReply: (_reply, context) => replies.push(context),
      onFailure: () => undefined,
    });
    runner.submit("first");
    const secondId = runner.submit("second");
    releaseFirst({ payload: { id: 0 } });
    await Promise.resolve();
    await Promise.resolve();
    expect(workers[0]!.terminate).toHaveBeenCalledOnce();
    expect(workers[1]!.postMessage).toHaveBeenCalledWith({ id: secondId }, []);
    workers[1]!.emit("message", { id: secondId });
    expect(replies).toEqual(["second"]);
  });

  it("recreates the worker after infrastructure failure", () => {
    const workers: FakeWorker[] = [];
    const failures: string[] = [];
    const runner = createLatestWorkerRunner<
      { id: number },
      { id: number },
      string
    >({
      createWorker: () => {
        const worker = new FakeWorker();
        workers.push(worker);
        return worker as unknown as Worker;
      },
      prepare: (id) => ({ payload: { id } }),
      replyId: (reply) => reply.id,
      onReply: () => undefined,
      onFailure: (context) => failures.push(context ?? "none"),
    });
    runner.submit("active");
    workers[0]!.emit("error");
    expect(workers).toHaveLength(2);
    expect(failures).toEqual(["active"]);
  });
});
