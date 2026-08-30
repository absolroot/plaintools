(() => {
  const element = document.currentScript;
  const measurementId = element?.dataset.measurementId || "";
  if (!/^G-[A-Z0-9]+$/.test(measurementId)) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag() {
      window.dataLayer.push(arguments);
    };

  let configured = false;
  const syncConsent = () => {
    const statisticsGranted = Boolean(window.Cookiebot?.consent?.statistics);
    window[`ga-disable-${measurementId}`] = !statisticsGranted;
    window.gtag("consent", "update", {
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
    window.gtag("js", new Date());
    window.gtag("config", measurementId, {
      allow_ad_personalization_signals: false,
      allow_google_signals: false,
      cookie_expires: 33696000,
    });
  };

  window.addEventListener("CookiebotOnAccept", syncConsent);
  window.addEventListener("CookiebotOnDecline", syncConsent);
  syncConsent();
})();
