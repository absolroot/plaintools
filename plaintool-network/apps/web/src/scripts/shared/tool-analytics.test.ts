import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(() => {
  vi.unstubAllGlobals();
  vi.resetModules();
});

async function setup({
  production = true,
  path = "/en/base64-decode/",
  brokenQueue = false,
} = {}) {
  const listeners = new Map<string, (event: { isTrusted: boolean }) => void>();
  let consent = 1;
  const api = {
    callbackQueue: [] as Array<Record<string, () => void>>,
    getGoogleConsentModeValues: vi.fn(() => ({
      analyticsStoragePurposeConsentStatus: consent,
    })),
    ConsentModePurposeStatusEnum: {
      CONSENT_MODE_PURPOSE_STATUS_GRANTED: 1,
      CONSENT_MODE_PURPOSE_STATUS_NOT_APPLICABLE: 3,
    },
  };
  const gtag = vi.fn();
  if (brokenQueue)
    api.callbackQueue.push = () => {
      throw new Error("Unavailable");
    };
  const location = {
    pathname: path,
    origin: "https://absoltools.com",
    href: `https://absoltools.com${path}?secret=private-input#private-result`,
  };
  vi.stubGlobal("window", { googlefc: api, gtag, location });
  vi.stubGlobal("document", {
    querySelector: () =>
      production ? { dataset: { measurementId: "G-0NCP26Q60K" } } : null,
    addEventListener: (
      name: string,
      listener: (event: { isTrusted: boolean }) => void,
    ) => listeners.set(name, listener),
    title: "private-input",
    referrer: "https://example.com/private-input",
  });
  const { trackToolEvent } = await import("./tool-analytics");
  return {
    track: trackToolEvent,
    gtag,
    api,
    location,
    consent: (value: number) => {
      consent = value;
    },
    ready: () =>
      api.callbackQueue.forEach((entry) => entry.CONSENT_MODE_DATA_READY()),
    interact: (isTrusted = true, name = "input") =>
      listeners.get(name)?.({ isTrusted }),
  };
}

describe("privacy-safe tool measurement", () => {
  it("does not break tool initialization if the consent queue fails", async () => {
    const app = await setup({ brokenQueue: true });
    app.interact();
    app.track("tool_complete");
    expect(app.gtag).not.toHaveBeenCalled();
  });
  it("never registers consent callbacks or sends events in preview", async () => {
    const app = await setup({ production: false });
    app.interact();
    app.ready();
    app.track("tool_complete");
    expect(app.api.callbackQueue).toHaveLength(0);
    expect(app.gtag).not.toHaveBeenCalled();
  });

  it("drops pre-consent events without replaying them later", async () => {
    const app = await setup();
    app.interact();
    app.track("tool_complete");
    app.ready();
    expect(app.gtag).not.toHaveBeenCalled();
    app.track("tool_complete");
    expect(app.gtag).toHaveBeenCalledTimes(1);
  });

  it.each([0, 2, 4, 999, NaN])(
    "fails closed for consent state %s",
    async (value) => {
      const app = await setup();
      app.ready();
      app.interact();
      app.consent(value);
      app.track("tool_complete");
      expect(app.gtag).not.toHaveBeenCalled();
    },
  );

  it("does not count initial examples or synthetic input as user completions", async () => {
    const app = await setup();
    app.ready();
    app.track("tool_complete");
    app.interact(false);
    app.track("tool_complete");
    expect(app.gtag).not.toHaveBeenCalled();
  });

  it("counts a file drop without inspecting the dropped file", async () => {
    const app = await setup();
    app.ready();
    app.interact(true, "drop");
    app.track("tool_complete");
    expect(app.gtag).toHaveBeenCalledTimes(1);
  });

  it.each([1, 3])(
    "sends only allowlisted metadata with consent %s",
    async (value) => {
      const app = await setup();
      app.ready();
      app.interact();
      app.consent(value);
      app.track("tool_complete");
      expect(app.gtag).toHaveBeenCalledExactlyOnceWith(
        "event",
        "tool_complete",
        {
          tool_id: "base64-decode",
          tool_locale: "en",
          page_location: "https://absoltools.com/en/base64-decode/",
          page_title: "AbsolTools | base64-decode",
          page_referrer: "",
        },
      );
      expect(JSON.stringify(app.gtag.mock.calls)).not.toContain("private");
    },
  );

  it("caps repeated edits/actions and tracks mode routes separately", async () => {
    const app = await setup();
    app.ready();
    app.interact();
    for (let i = 0; i < 10; i++) app.track("tool_complete");
    app.track("tool_copy");
    app.track("tool_copy");
    app.track("tool_download");
    app.track("tool_error");
    expect(app.gtag).toHaveBeenCalledTimes(4);
    app.location.pathname = "/en/base64-encode/";
    app.track("tool_complete");
    expect(app.gtag).toHaveBeenCalledTimes(5);
  });

  it("rechecks consent after revocation and does not replay denied actions", async () => {
    const app = await setup();
    app.ready();
    app.interact();
    app.track("tool_complete");
    app.consent(2);
    app.track("tool_copy");
    app.consent(1);
    expect(app.gtag).toHaveBeenCalledTimes(1);
    app.track("tool_download");
    expect(app.gtag).toHaveBeenCalledTimes(2);
  });

  it.each([
    "/en/",
    "/en/privacy/",
    "/private/base64-decode/",
    "/en/private-input/",
    "/en/base64-decode/private/",
  ])("rejects non-tool or arbitrary route %s", async (path) => {
    const app = await setup({ path });
    app.ready();
    app.interact();
    app.track("tool_complete");
    expect(app.gtag).not.toHaveBeenCalled();
  });

  it("ignores unknown event names and isolates consent/transport failures", async () => {
    const app = await setup();
    app.ready();
    app.interact();
    // @ts-expect-error Also reject arbitrary event names at the runtime boundary.
    app.track("private-input");
    expect(app.gtag).not.toHaveBeenCalled();
    app.api.getGoogleConsentModeValues.mockImplementationOnce(() => {
      throw new Error("private-error");
    });
    expect(() => app.track("tool_complete")).not.toThrow();
    expect(app.gtag).not.toHaveBeenCalled();
    app.gtag.mockImplementationOnce(() => {
      throw new Error("transport failed");
    });
    expect(() => app.track("tool_complete")).not.toThrow();
  });
});
