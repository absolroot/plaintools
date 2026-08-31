/** @typedef {"preview" | "production"} DeploymentTarget */

/**
 * Capabilities describe integrations that are actually implemented and reviewed
 * in this build. Environment variables may configure a capability, but cannot
 * create one.
 *
 * @typedef {object} DeploymentCapabilities
 * @property {boolean} googleCmp
 * @property {boolean} ga4
 * @property {boolean} adsense
 */

/** @typedef {Record<string, string | undefined>} DeploymentEnvironment */

/**
 * @typedef {object} DeploymentIssue
 * @property {string} code
 * @property {string} key
 * @property {string} message
 */

export const implementedIntegrationCapabilities = /** @type {const} */ ({
  googleCmp: true,
  ga4: true,
  adsense: true,
});

// These identifiers are public deployment configuration, not credentials.
// Source defaults prevent production rebuilds from silently dropping the
// Google tag or the AdSense code used for site review and Google CMP delivery.
export const productionIntegrationDefaults = /** @type {const} */ ({
  PUBLIC_ADSENSE_PUBLISHER_ID: "ca-pub-5862324369257695",
  PUBLIC_GA4_MEASUREMENT_ID: "G-0NCP26Q60K",
  PUBLIC_GOOGLE_CMP_ENABLED: "true",
});

const requiredProductionKeys = /** @type {const} */ ([
  "PUBLIC_SITE_ORIGIN",
  "PUBLIC_OPERATOR_NAME",
  "PUBLIC_CONTACT_EMAIL",
  "PUBLIC_OPERATOR_REGION",
  "PUBLIC_POLICY_EFFECTIVE_DATE",
  "PUBLIC_HOST_PROVIDER_NAME",
  "PUBLIC_HOST_PRIVACY_URL",
  "PUBLIC_HOST_LOG_RETENTION",
  "PUBLIC_GOVERNING_LAW",
  "PUBLIC_JURISDICTION",
]);

const previewOrigin = "https://preview.invalid";

/** @param {unknown} value */
function clean(value) {
  return typeof value === "string" ? value.trim() : "";
}

/**
 * @param {DeploymentIssue[]} issues
 * @param {string} code
 * @param {string} key
 * @param {string} message
 */
function addIssue(issues, code, key, message) {
  issues.push({ code, key, message });
}

/**
 * @param {string} value
 * @returns {URL | undefined}
 */
function httpsUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password
      ? url
      : undefined;
  } catch {
    return undefined;
  }
}

/** @param {string} value */
function contactEmail(value) {
  if (!value || value.length > 254 || /\s/u.test(value)) return false;

  const separator = value.lastIndexOf("@");
  if (separator <= 0 || separator !== value.indexOf("@")) return false;

  const local = value.slice(0, separator);
  const domain = value.slice(separator + 1);
  const domainLabels = domain.split(".");
  return (
    local.length <= 64 &&
    domain.length <= 253 &&
    !local.startsWith(".") &&
    !local.endsWith(".") &&
    !local.includes("..") &&
    domainLabels.length >= 2 &&
    domainLabels.every(
      (label) =>
        label.length <= 63 && /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/iu.test(label),
    )
  );
}

/** @param {string} value */
function isoCalendarDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/u.test(value)) return false;

  const date = new Date(`${value}T00:00:00.000Z`);
  return (
    !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value
  );
}

/**
 * Resolve deployment facts without reading global process or Vite state. A
 * preview target is always non-indexable. A production target becomes ready
 * only when every required fact and requested integration is valid and the
 * corresponding implementation capability exists.
 *
 * @param {DeploymentEnvironment} env
 * @param {DeploymentTarget} target
 * @param {DeploymentCapabilities} capabilities
 */
export function resolveDeploymentConfig(env, target, capabilities) {
  if (target !== "preview" && target !== "production") {
    throw new TypeError(`Unsupported deployment target: ${String(target)}`);
  }

  const values = Object.fromEntries(
    [
      ...requiredProductionKeys,
      "PUBLIC_ADSENSE_PUBLISHER_ID",
      "PUBLIC_GA4_MEASUREMENT_ID",
      "PUBLIC_GOOGLE_CMP_ENABLED",
    ].map((key) => [key, clean(env[key])]),
  );
  /** @type {DeploymentIssue[]} */
  const issues = [];

  if (target === "production") {
    for (const key of requiredProductionKeys) {
      if (!values[key])
        addIssue(
          issues,
          "required",
          key,
          `${key} is required for a production build.`,
        );
    }

    if (values.PUBLIC_SITE_ORIGIN) {
      const origin = httpsUrl(values.PUBLIC_SITE_ORIGIN);
      if (!origin) {
        addIssue(
          issues,
          "invalid-url",
          "PUBLIC_SITE_ORIGIN",
          "PUBLIC_SITE_ORIGIN must be an HTTPS origin without a path.",
        );
      } else if (origin.pathname !== "/" || origin.search || origin.hash) {
        addIssue(
          issues,
          "invalid-origin",
          "PUBLIC_SITE_ORIGIN",
          "PUBLIC_SITE_ORIGIN must not include a path, query, or fragment.",
        );
      }
    }

    if (
      values.PUBLIC_HOST_PRIVACY_URL &&
      !httpsUrl(values.PUBLIC_HOST_PRIVACY_URL)
    ) {
      addIssue(
        issues,
        "invalid-url",
        "PUBLIC_HOST_PRIVACY_URL",
        "PUBLIC_HOST_PRIVACY_URL must be an HTTPS URL.",
      );
    }

    if (
      values.PUBLIC_CONTACT_EMAIL &&
      !contactEmail(values.PUBLIC_CONTACT_EMAIL)
    ) {
      addIssue(
        issues,
        "invalid-email",
        "PUBLIC_CONTACT_EMAIL",
        "PUBLIC_CONTACT_EMAIL must be a valid contact email address.",
      );
    }

    if (
      values.PUBLIC_POLICY_EFFECTIVE_DATE &&
      !isoCalendarDate(values.PUBLIC_POLICY_EFFECTIVE_DATE)
    ) {
      addIssue(
        issues,
        "invalid-date",
        "PUBLIC_POLICY_EFFECTIVE_DATE",
        "PUBLIC_POLICY_EFFECTIVE_DATE must be a valid YYYY-MM-DD calendar date.",
      );
    }

    const cmpConfigured = values.PUBLIC_GOOGLE_CMP_ENABLED === "true";
    const ga4Configured = Boolean(values.PUBLIC_GA4_MEASUREMENT_ID);
    const adsenseConfigured = Boolean(values.PUBLIC_ADSENSE_PUBLISHER_ID);

    if (
      values.PUBLIC_GOOGLE_CMP_ENABLED &&
      !["true", "false"].includes(values.PUBLIC_GOOGLE_CMP_ENABLED)
    ) {
      addIssue(
        issues,
        "invalid-boolean",
        "PUBLIC_GOOGLE_CMP_ENABLED",
        "PUBLIC_GOOGLE_CMP_ENABLED must be true or false.",
      );
    }
    if (cmpConfigured && !capabilities.googleCmp) {
      addIssue(
        issues,
        "unsupported-capability",
        "PUBLIC_GOOGLE_CMP_ENABLED",
        "This build does not contain a verified Google CMP capability.",
      );
    }
    if (cmpConfigured && !adsenseConfigured) {
      addIssue(
        issues,
        "required",
        "PUBLIC_ADSENSE_PUBLISHER_ID",
        "Google Privacy & messaging requires the AdSense publisher code.",
      );
    }
    if (
      ga4Configured &&
      !/^G-[A-Z0-9]+$/u.test(values.PUBLIC_GA4_MEASUREMENT_ID)
    ) {
      addIssue(
        issues,
        "invalid-id",
        "PUBLIC_GA4_MEASUREMENT_ID",
        "PUBLIC_GA4_MEASUREMENT_ID must look like G-XXXXXXXXXX.",
      );
    }
    if (
      adsenseConfigured &&
      !/^ca-pub-\d+$/u.test(values.PUBLIC_ADSENSE_PUBLISHER_ID)
    ) {
      addIssue(
        issues,
        "invalid-id",
        "PUBLIC_ADSENSE_PUBLISHER_ID",
        "PUBLIC_ADSENSE_PUBLISHER_ID must look like ca-pub-1234567890.",
      );
    }
    if (ga4Configured && !capabilities.ga4) {
      addIssue(
        issues,
        "unsupported-capability",
        "PUBLIC_GA4_MEASUREMENT_ID",
        "This build does not contain a verified GA4 capability.",
      );
    }
    if (adsenseConfigured && !capabilities.adsense) {
      addIssue(
        issues,
        "unsupported-capability",
        "PUBLIC_ADSENSE_PUBLISHER_ID",
        "This build does not contain a verified AdSense capability.",
      );
    }
    if ((ga4Configured || adsenseConfigured) && !cmpConfigured) {
      addIssue(
        issues,
        "missing-consent",
        "PUBLIC_GOOGLE_CMP_ENABLED",
        "Google analytics or ads require PUBLIC_GOOGLE_CMP_ENABLED=true and the Google Privacy & messaging consent flow.",
      );
    }
  }

  const productionReady = target === "production" && issues.length === 0;
  const integrationsEnabled =
    productionReady && values.PUBLIC_GOOGLE_CMP_ENABLED === "true";
  const googleCmpEnabled = integrationsEnabled && capabilities.googleCmp;
  const ga4MeasurementId =
    googleCmpEnabled && capabilities.ga4
      ? values.PUBLIC_GA4_MEASUREMENT_ID
      : "";
  const adsensePublisherId =
    googleCmpEnabled && capabilities.adsense
      ? values.PUBLIC_ADSENSE_PUBLISHER_ID
      : "";
  const resolvedOrigin = productionReady
    ? new URL(values.PUBLIC_SITE_ORIGIN).origin
    : previewOrigin;

  return {
    target,
    productionReady,
    issues,
    id: "plaintool-network",
    origin: resolvedOrigin,
    operator: {
      name:
        values.PUBLIC_OPERATOR_NAME || "[Operator name required before launch]",
      email: values.PUBLIC_CONTACT_EMAIL || "superphil722@gmail.com",
      region:
        values.PUBLIC_OPERATOR_REGION ||
        "[Operator region required before launch]",
      effectiveDate:
        values.PUBLIC_POLICY_EFFECTIVE_DATE ||
        "[Effective date required before launch]",
      governingLaw:
        values.PUBLIC_GOVERNING_LAW || "[Governing law required before launch]",
      jurisdiction:
        values.PUBLIC_JURISDICTION || "[Jurisdiction required before launch]",
    },
    hosting: {
      provider:
        values.PUBLIC_HOST_PROVIDER_NAME ||
        "[Hosting provider required before launch]",
      privacyUrl:
        values.PUBLIC_HOST_PRIVACY_URL ||
        "[Hosting privacy URL required before launch]",
      logRetention:
        values.PUBLIC_HOST_LOG_RETENTION ||
        "[Hosting log retention required before launch]",
    },
    integrations: {
      adsensePublisherId,
      ga4MeasurementId,
      googleCmpEnabled,
      active: Boolean(adsensePublisherId || ga4MeasurementId),
    },
  };
}
