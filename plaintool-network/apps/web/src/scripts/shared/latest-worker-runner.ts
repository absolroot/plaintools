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
};

export type LatestWorkerRunner<C> = {
  submit(context: C): number;
  cancel(): boolean;
  dispose(): void;
};

export function createLatestWorkerRunner<P, R, C>(
  options: LatestWorkerRunnerOptions<P, R, C>,
): LatestWorkerRunner<C> {
  let worker: WorkerLike;
  let generation = 0;
  let active: { id: number; context: C } | undefined;
  let disposed = false;

  const attachWorker = (): WorkerLike => {
    const next = options.createWorker();
    next.addEventListener("message", ((event: MessageEvent<R>) => {
      if (!active || options.replyId(event.data) !== active.id || disposed)
        return;
      const context = active.context;
      active = undefined;
      options.onReply(event.data, context);
    }) as EventListener);
    const fail = () => {
      if (worker !== next || disposed) return;
      const context = active?.context;
      generation += 1;
      active = undefined;
      next.terminate();
      worker = attachWorker();
      options.onFailure(context);
    };
    next.addEventListener("error", fail);
    next.addEventListener("messageerror", fail);
    return next;
  };

  worker = attachWorker();

  const cancel = (): boolean => {
    const hadActiveWork = Boolean(active);
    generation += 1;
    active = undefined;
    if (hadActiveWork) {
      worker.terminate();
      worker = attachWorker();
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
          worker.postMessage(payload, transfer ?? []);
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
      generation += 1;
      active = undefined;
      worker.terminate();
    },
  };
}
