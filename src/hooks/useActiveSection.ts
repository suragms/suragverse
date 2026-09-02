"use client";

import { useState, useEffect, useRef } from "react";
import { navItems } from "@/lib/navigation";

/**
 * IntersectionObserver-based active section spy.
 * Returns the id of the section currently most visible in the viewport.
 * Falls back to the first nav item if nothing is intersecting.
 */
export function useActiveSection(): string {
  const [active, setActive] = useState<string>(navItems[0].id);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Clean up any prior observer
    observerRef.current?.disconnect();

    const visible = new Map<string, number>();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.intersectionRatio);
          } else {
            visible.delete(entry.target.id);
          }
        }

        // Pick the entry with the highest intersection ratio
        let best = navItems[0].id;
        let bestRatio = -1;
        for (const [id, ratio] of visible) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        }
        setActive(best);
      },
      {
        // Spy band: 35% from top, 60% from bottom — biases toward
        // sections in the upper-middle of the viewport.
        rootMargin: "-35% 0px -60% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    const ids = navItems.map((item) => item.id);
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observerRef.current.observe(el);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return active;
}
