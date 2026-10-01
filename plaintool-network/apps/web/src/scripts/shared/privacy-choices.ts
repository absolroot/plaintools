interface PrivacyApi {
  callbackQueue: Array<Record<string, () => void>>;
  showRevocationMessage?: () => void;
}

type PrivacyWindow = Window & {
  googlefc?: PrivacyApi;
  __tcfapi?: (
    command: string,
    version: number,
    callback: (
      data: { gdprApplies?: boolean } | undefined,
      success: boolean,
    ) => void,
  ) => void;
};

export function bindPrivacyChoices(): void {
  const button = document.querySelector<HTMLButtonElement>(
    "[data-privacy-choices]",
  );
  if (!button) return;
  const host = window as PrivacyWindow;
  const whenReady = (callback: () => void) => {
    try {
      host.googlefc = host.googlefc || { callbackQueue: [] };
      host.googlefc.callbackQueue = host.googlefc.callbackQueue || [];
      host.googlefc.callbackQueue.push({
        CONSENT_API_READY: () => {
          try {
            callback();
          } catch {
            button.hidden = true;
          }
        },
      });
    } catch {
      button.hidden = true;
    }
  };
  whenReady(() => {
    host.__tcfapi?.("addEventListener", 2, (data, success) => {
      button.hidden = !(
        success &&
        data?.gdprApplies === true &&
        typeof host.googlefc?.showRevocationMessage === "function"
      );
    });
  });
  button.addEventListener("click", () => {
    if (!button.hidden)
      whenReady(() => host.googlefc?.showRevocationMessage?.());
  });
}
