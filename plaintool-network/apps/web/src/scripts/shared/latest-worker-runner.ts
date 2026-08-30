export type PreparedWorkerMessage<P> = {
  payload: P;
  transfer?: Transferable[];
};

type WorkerLike = Pick<
  Worker,
  "addEventListener" | "postMessage" | "terminate"
>;

type LatestWorkerRunnerOptions<P, R, C> = {
  createWorker: () => WorkerLike;
  prepare: (
    id: number,
    context: C,
  ) => PreparedWorkerMessage<P> | Promise<PreparedWorkerMessage<P>>;
  replyId: (reply: R) => number;
  onReply: (reply: R, context: C) => void;
  onFailure: (context: C | undefined) => void;
  lazy?: boolean;
  timeoutMs?: number;
};

export type LatestWorkerRunner<C> = {
  submit(context: C): number;
  cancel(): boolean;
  dispose(): void;
};

export function createLatestWorkerRunner<P, R, C>(
  options: LatestWorkerRunnerOptions<P, R, C>,
): LatestWorkerRunner<C> {
  let worker: WorkerLike | undefined;
  let generation = 0;
  let active: { id: number; context: C } | undefined;
  let watchdog: ReturnType<typeof setTimeout> | undefined;
  let disposed = false;

  const clearWatchdog = () => {
    if (watchdog !== undefined) globalThis.clearTimeout(watchdog);
    watchdog = undefined;
  };

  function failWorker(target: WorkerLike): void {
    if (worker !== target || disposed) return;
    const context = active?.context;
    clearWatchdog();
    generation += 1;
    active = undefined;
    target.terminate();
    worker = options.lazy ? undefined : attachWorker();
    options.onFailure(context);
  }

  function attachWorker(): WorkerLike {
    const next = options.createWorker();
    next.addEventListener("message", ((event: MessageEvent<R>) => {
      try {
        if (!active || options.replyId(event.data) !== active.id || disposed)
          return;
        const context = active.context;
        active = undefined;
        clearWatchdog();
        options.onReply(event.data, context);
      } catch {
        failWorker(next);
      }
    }) as EventListener);
    next.addEventListener("error", () => failWorker(next));
    next.addEventListener("messageerror", () => failWorker(next));
    return next;
  }

  const getWorker = (): WorkerLike => {
    worker ??= attachWorker();
    return worker;
  };

  if (!options.lazy) worker = attachWorker();

  const cancel = (): boolean => {
    const hadActiveWork = Boolean(active);
    clearWatchdog();
    generation += 1;
    active = undefined;
    if (hadActiveWork) {
      worker?.terminate();
      worker = options.lazy ? undefined : attachWorker();
    }
    return hadActiveWork;
  };

  return {
    submit(context) {
      if (disposed) throw new Error("LatestWorkerRunner is disposed.");
      cancel();
      const id = generation;
      active = { id, context };
      void Promise.resolve(options.prepare(id, context))
        .then(({ payload, transfer }) => {
          if (disposed || active?.id !== id) return;
          const target = getWorker();
          target.postMessage(payload, transfer ?? []);
          if (options.timeoutMs !== undefined) {
            watchdog = globalThis.setTimeout(() => {
              if (!disposed && active?.id === id) failWorker(target);
            }, options.timeoutMs);
          }
        })
        .catch(() => {
          if (disposed || active?.id !== id) return;
          const failedContext = active.context;
          active = undefined;
          options.onFailure(failedContext);
        });
      return id;
    },
    cancel,
    dispose() {
      if (disposed) return;
      disposed = true;
      clearWatchdog();
      generation += 1;
      active = undefined;
      worker?.terminate();
      worker = undefined;
    },
  };
}
