/** Height of the sticky navbar (h-16); sections land just below it. */
export const NAV_OFFSET = 64;

/**
 * Document position ignoring CSS transforms. Sections are moved by scroll-linked animations,
 * so getBoundingClientRect() would report where a section is mid-transition, not where it rests.
 */
function layoutTop(el: HTMLElement) {
  let top = 0;
  for (let node: HTMLElement | null = el; node; node = node.offsetParent as HTMLElement | null) {
    top += node.offsetTop;
  }
  return top;
}

/** Smoothly scrolls to a section (e.g. "#About"), landing it just below the sticky navbar. */
export function scrollToSection(selector: string) {
  const target = document.querySelector<HTMLElement>(selector);
  if (!target) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const top = selector === "#Home" ? 0 : Math.max(0, layoutTop(target) - NAV_OFFSET);

  // No hash update here: the router would react to it with a competing scroll-to-hash.
  window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
}
