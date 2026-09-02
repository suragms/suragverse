import type Lenis from "lenis";

let lenisInstance: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  lenisInstance = lenis;
}

export function getLenis() {
  return lenisInstance;
}

/** Smoothly scroll to a section id using Lenis (or native fallback). */
export function scrollToSection(href: string) {
  const el = document.querySelector(href) as HTMLElement | null;
  if (!el) return;
  if (lenisInstance) {
    lenisInstance.scrollTo(el, { offset: 0 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}