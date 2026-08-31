(() => {
  const element = globalThis.document.currentScript;
  const measurementId = element?.dataset.measurementId || "";
  if (!/^G-[A-Z0-9]+$/.test(measurementId)) return;

  globalThis.dataLayer = globalThis.dataLayer || [];
  globalThis.gtag =
    globalThis.gtag ||
    function gtag() {
      globalThis.dataLayer.push(arguments);
    };

  const consentRegions = [
    "AT",
    "BE",
    "BG",
    "CH",
    "CY",
    "CZ",
    "DE",
    "DK",
    "EE",
    "ES",
    "FI",
    "FR",
    "GB",
    "GR",
    "HR",
    "HU",
    "IE",
    "IS",
    "IT",
    "LI",
    "LT",
    "LU",
    "LV",
    "MT",
    "NL",
    "NO",
    "PL",
    "PT",
    "RO",
    "SE",
    "SI",
    "SK",
  ];

  globalThis.gtag("consent", "default", {
    ad_personalization: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    analytics_storage: "denied",
    region: consentRegions,
    wait_for_update: 1500,
  });
  globalThis.gtag("consent", "default", {
    ad_personalization: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    analytics_storage: "granted",
  });
  globalThis.gtag("set", "ads_data_redaction", true);
  globalThis.gtag("js", new Date());
  globalThis.gtag("config", measurementId, {
    allow_ad_personalization_signals: false,
    allow_google_signals: false,
    cookie_expires: 33696000,
  });
})();
