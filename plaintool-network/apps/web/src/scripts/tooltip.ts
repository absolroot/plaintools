const roots = Array.from(
  document.querySelectorAll<HTMLElement>("[data-tooltip]"),
);

function updatePlacement(root: HTMLElement): void {
  const content = root.querySelector<HTMLElement>("[role='tooltip']");
  if (!content) return;

  root.removeAttribute("data-tooltip-placement");
  const triggerBounds = root.getBoundingClientRect();
  const contentHeight = content.getBoundingClientRect().height;
  const spaceBelow = window.innerHeight - triggerBounds.bottom;
  const spaceAbove = triggerBounds.top;

  if (spaceBelow < contentHeight && spaceAbove > spaceBelow) {
    root.dataset.tooltipPlacement = "top";
  }
}

function setOpen(root: HTMLElement, open: boolean): void {
  root.toggleAttribute("data-tooltip-open", open);
  if (open) requestAnimationFrame(() => updatePlacement(root));
  root
    .querySelector<HTMLButtonElement>("[data-tooltip-trigger]")
    ?.setAttribute("aria-pressed", String(open));
}

function closeAll(except?: HTMLElement): void {
  for (const root of roots) {
    if (root !== except) setOpen(root, false);
  }
}

for (const root of roots) {
  if (root.dataset.tooltipBound === "true") continue;
  root.dataset.tooltipBound = "true";

  const trigger = root.querySelector<HTMLButtonElement>(
    "[data-tooltip-trigger]",
  );
  if (!trigger) continue;
  trigger.setAttribute("aria-pressed", "false");

  trigger.addEventListener("click", () => {
    const shouldOpen = !root.hasAttribute("data-tooltip-open");
    closeAll(root);
    root.removeAttribute("data-tooltip-dismissed");
    setOpen(root, shouldOpen);
  });

  root.addEventListener("pointerenter", () =>
    requestAnimationFrame(() => updatePlacement(root)),
  );
  root.addEventListener("focusin", () =>
    requestAnimationFrame(() => updatePlacement(root)),
  );

  root.addEventListener("pointerleave", () =>
    root.removeAttribute("data-tooltip-dismissed"),
  );
  root.addEventListener("focusout", (event) => {
    if (!root.contains(event.relatedTarget as Node | null)) {
      root.removeAttribute("data-tooltip-dismissed");
      setOpen(root, false);
    }
  });
}

document.addEventListener("pointerdown", (event) => {
  const target = event.target as Node;
  for (const root of roots) {
    const trigger = root.querySelector("[data-tooltip-trigger]");
    if (root.hasAttribute("data-tooltip-open") && !trigger?.contains(target))
      setOpen(root, false);
  }
});

window.addEventListener("resize", () => {
  for (const root of roots) {
    if (root.matches(":hover") || root.hasAttribute("data-tooltip-open")) {
      updatePlacement(root);
    }
  }
});

window.addEventListener(
  "scroll",
  () => {
    for (const root of roots) {
      if (root.matches(":hover") || root.hasAttribute("data-tooltip-open")) {
        updatePlacement(root);
      }
    }
  },
  { passive: true },
);

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  for (const root of roots) {
    if (
      root.matches(":hover") ||
      root.contains(document.activeElement) ||
      root.hasAttribute("data-tooltip-open")
    ) {
      const focusedControl =
        root.contains(document.activeElement) &&
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : root.querySelector<HTMLElement>("[data-tooltip-trigger]");
      root.setAttribute("data-tooltip-dismissed", "");
      setOpen(root, false);
      focusedControl?.focus({ preventScroll: true });
    }
  }
});
