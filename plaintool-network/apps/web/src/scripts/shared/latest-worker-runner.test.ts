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
  it("creates a lazy worker only when prepared work is ready", async () => {
    const workers: FakeWorker[] = [];
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
      onFailure: () => undefined,
      lazy: true,
    });
    expect(workers).toHaveLength(0);
    const id = runner.submit("first");
    expect(workers).toHaveLength(0);
    await Promise.resolve();
    expect(workers).toHaveLength(1);
    expect(workers[0]!.postMessage).toHaveBeenCalledWith({ id }, []);
  });

  it("does not replace a cancelled lazy worker until the next submit", async () => {
    const workers: FakeWorker[] = [];
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
      onFailure: () => undefined,
      lazy: true,
    });
    runner.submit("first");
    await Promise.resolve();
    expect(runner.cancel()).toBe(true);
    expect(workers[0]!.terminate).toHaveBeenCalledOnce();
    expect(workers).toHaveLength(1);
    runner.submit("second");
    await Promise.resolve();
    expect(workers).toHaveLength(2);
  });

  it("disposes a lazy runner without creating a worker", () => {
    const createWorker = vi.fn(() => new FakeWorker() as unknown as Worker);
    const runner = createLatestWorkerRunner<
      { id: number },
      { id: number },
      string
    >({
      createWorker,
      prepare: (id) => ({ payload: { id } }),
      replyId: (reply) => reply.id,
      onReply: () => undefined,
      onFailure: () => undefined,
      lazy: true,
    });
    runner.dispose();
    expect(createWorker).not.toHaveBeenCalled();
  });

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

  it("fails closed and recreates the worker after a malformed reply", () => {
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
    workers[0]!.emit("message", undefined);
    expect(workers[0]!.terminate).toHaveBeenCalledOnce();
    expect(workers).toHaveLength(2);
    expect(failures).toEqual(["active"]);
  });

  it("terminates timed-out work and reports the active context", async () => {
    vi.useFakeTimers();
    try {
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
        timeoutMs: 50,
      });
      runner.submit("slow");
      await Promise.resolve();
      await vi.advanceTimersByTimeAsync(50);
      expect(workers[0]!.terminate).toHaveBeenCalledOnce();
      expect(workers).toHaveLength(2);
      expect(failures).toEqual(["slow"]);
    } finally {
      vi.useRealTimers();
    }
  });
});
