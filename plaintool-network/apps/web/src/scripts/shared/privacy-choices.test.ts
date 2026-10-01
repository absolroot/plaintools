import { afterEach, describe, expect, it, vi } from "vitest";
import { bindPrivacyChoices } from "./privacy-choices";

afterEach(() => vi.unstubAllGlobals());

function setup(present = true) {
  const listeners = new Map<string, () => void>();
  const button = {
    hidden: true,
    addEventListener: (name: string, fn: () => void) => listeners.set(name, fn),
  };
  let consentCallback: (
    data: { gdprApplies?: boolean } | undefined,
    success: boolean,
  ) => void;
  const googlefc = {
    callbackQueue: [] as Array<Record<string, () => void>>,
    showRevocationMessage: vi.fn(),
  };
  const tcf = vi.fn((_command, _version, callback) => {
    consentCallback = callback;
  });
  vi.stubGlobal("document", { querySelector: () => (present ? button : null) });
  vi.stubGlobal("window", { googlefc, __tcfapi: tcf });
  return {
    button,
    googlefc,
    tcf,
    ready: () => googlefc.callbackQueue[0].CONSENT_API_READY(),
    status: (data: { gdprApplies?: boolean } | undefined, success = true) =>
      consentCallback(data, success),
    click: () => listeners.get("click")?.(),
  };
}

describe("Google privacy choices", () => {
  it("does not break page initialization if the consent queue fails", () => {
    const app = setup();
    app.googlefc.callbackQueue.push = () => {
      throw new Error("Unavailable");
    };
    expect(bindPrivacyChoices).not.toThrow();
    expect(app.button.hidden).toBe(true);
  });
  it("does nothing when integrations are absent", () => {
    const app = setup(false);
    bindPrivacyChoices();
    expect(app.googlefc.callbackQueue).toHaveLength(0);
  });

  it("shows a working control only after applicable consent API data", () => {
    const app = setup();
    bindPrivacyChoices();
    expect(app.button.hidden).toBe(true);
    app.ready();
    expect(app.tcf).toHaveBeenCalledWith(
      "addEventListener",
      2,
      expect.any(Function),
    );
    app.status({ gdprApplies: true });
    expect(app.button.hidden).toBe(false);
    app.click();
    expect(app.googlefc.showRevocationMessage).not.toHaveBeenCalled();
    app.googlefc.callbackQueue[1].CONSENT_API_READY();
    expect(app.googlefc.showRevocationMessage).toHaveBeenCalledTimes(1);
  });

  it("keeps the control hidden for unknown, failed or inapplicable data", () => {
    const app = setup();
    bindPrivacyChoices();
    app.ready();
    for (const data of [undefined, {}, { gdprApplies: false }]) {
      app.status(data);
      expect(app.button.hidden).toBe(true);
    }
    app.status({ gdprApplies: true }, false);
    expect(app.button.hidden).toBe(true);
    app.click();
    expect(app.googlefc.callbackQueue).toHaveLength(1);
  });

  it("isolates unavailable or failing consent services", () => {
    const app = setup();
    bindPrivacyChoices();
    app.tcf.mockImplementation(() => {
      throw new Error("Unavailable");
    });
    expect(app.ready).not.toThrow();
    expect(app.button.hidden).toBe(true);
  });

  it("hides the control when reopening fails", () => {
    const app = setup();
    bindPrivacyChoices();
    app.ready();
    app.status({ gdprApplies: true });
    app.googlefc.showRevocationMessage.mockImplementation(() => {
      throw new Error("Unavailable");
    });
    app.click();
    expect(() =>
      app.googlefc.callbackQueue[1].CONSENT_API_READY(),
    ).not.toThrow();
    expect(app.button.hidden).toBe(true);
  });
});
