import { locales } from "../../lib/locales.js";
import { toolRegistry } from "../../lib/tool-registry.js";

export type ToolEvent =
  | "tool_complete"
  | "tool_copy"
  | "tool_download"
  | "tool_error";

interface ConsentApi {
  callbackQueue: Array<Record<string, () => void>>;
  getGoogleConsentModeValues?: () => {
    analyticsStoragePurposeConsentStatus?: number;
  };
  ConsentModePurposeStatusEnum?: {
    CONSENT_MODE_PURPOSE_STATUS_GRANTED?: number;
    CONSENT_MODE_PURPOSE_STATUS_NOT_APPLICABLE?: number;
  };
}

type AnalyticsWindow = Window & {
  googlefc?: ConsentApi;
  gtag?: (...args: unknown[]) => void;
};

const events = new Set<ToolEvent>([
  "tool_complete",
  "tool_copy",
  "tool_download",
  "tool_error",
]);
const tools = new Set<string>(
  toolRegistry
    .filter((tool) => tool.publication === "indexable")
    .map((tool) => tool.slug),
);
const languages = new Set<string>(locales);
const sent = new Set<string>();
let consentReady = false;
let interacted = false;

// Preview pages do not contain this script. No separate tag or storage is added.
const analyticsWindow =
  typeof window !== "undefined" &&
  /^G-[A-Z0-9]+$/u.test(
    document.querySelector<HTMLScriptElement>(
      'script[src="/google-consent-init.js"]',
    )?.dataset.measurementId ?? "",
  )
    ? (window as AnalyticsWindow)
    : undefined;

if (analyticsWindow) {
  for (const name of ["input", "change", "click", "drop"]) {
    document.addEventListener(
      name,
      (event) => {
        if (event.isTrusted) interacted = true;
      },
      { capture: true, passive: true },
    );
  }
  try {
    analyticsWindow.googlefc = analyticsWindow.googlefc || {
      callbackQueue: [],
    };
    analyticsWindow.googlefc.callbackQueue =
      analyticsWindow.googlefc.callbackQueue || [];
    analyticsWindow.googlefc.callbackQueue.push({
      CONSENT_MODE_DATA_READY: () => {
        consentReady = true;
      },
    });
  } catch {
    consentReady = false;
  }
}

/**
 * Record at most one of each action per tool/locale/document after interaction.
 * Never accept input, filenames, results, lengths, raw errors, or arbitrary params.
 * Unknown/denied/not-configured consent drops the event; nothing is replayed later.
 */
export function trackToolEvent(event: ToolEvent): void {
  if (!analyticsWindow || !consentReady || !interacted || !events.has(event))
    return;
  try {
    const [, locale, tool, remainder] =
      analyticsWindow.location.pathname.split("/");
    if (!languages.has(locale) || !tools.has(tool) || remainder !== "") return;
    if (analyticsWindow.location.pathname !== `/${locale}/${tool}/`) return;
    const api = analyticsWindow.googlefc;
    const consent =
      api?.getGoogleConsentModeValues?.().analyticsStoragePurposeConsentStatus;
    const values = api?.ConsentModePurposeStatusEnum;
    if (
      typeof consent !== "number" ||
      !values ||
      !(
        consent === values.CONSENT_MODE_PURPOSE_STATUS_GRANTED ||
        consent === values.CONSENT_MODE_PURPOSE_STATUS_NOT_APPLICABLE
      )
    )
      return;
    const key = `${locale}/${tool}/${event}`;
    if (sent.has(key) || typeof analyticsWindow.gtag !== "function") return;
    analyticsWindow.gtag("event", event, {
      tool_id: tool,
      tool_locale: locale,
      // Explicit static metadata excludes queries, fragments and referrer contents.
      page_location: `${analyticsWindow.location.origin}/${locale}/${tool}/`,
      page_title: `AbsolTools | ${tool}`,
      page_referrer: "",
    });
    sent.add(key);
  } catch {
    // Analytics must never prevent a local tool action or reveal a raw exception.
  }
}
