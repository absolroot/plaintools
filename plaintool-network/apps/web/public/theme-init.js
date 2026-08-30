(() => {
  try {
    const saved = globalThis.localStorage.getItem("plaintool.theme");
    if (saved === "light" || saved === "dark") {
      globalThis.document.documentElement.dataset.theme = saved;
    }
  } catch {}
})();
