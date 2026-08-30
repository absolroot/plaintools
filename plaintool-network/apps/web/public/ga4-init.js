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

  let configured = false;
  const syncConsent = () => {
    const statisticsGranted = Boolean(
      globalThis.Cookiebot?.consent?.statistics,
    );
    globalThis[`ga-disable-${measurementId}`] = !statisticsGranted;
    globalThis.gtag("consent", "update", {
      ad_personalization: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      analytics_storage: statisticsGranted ? "granted" : "denied",
      functionality_storage: "denied",
      personalization_storage: "denied",
      security_storage: "granted",
    });

    if (!statisticsGranted || configured) return;
    configured = true;
    globalThis.gtag("js", new Date());
    globalThis.gtag("config", measurementId, {
      allow_ad_personalization_signals: false,
      allow_google_signals: false,
      cookie_expires: 33696000,
    });
  };

  globalThis.addEventListener("CookiebotOnAccept", syncConsent);
  globalThis.addEventListener("CookiebotOnDecline", syncConsent);
  syncConsent();
})();
