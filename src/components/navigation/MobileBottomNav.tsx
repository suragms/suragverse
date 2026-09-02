"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { navItems } from "@/lib/navigation";
import { useActiveSection } from "@/hooks/useActiveSection";
import NavigationLink from "./NavigationLink";

const SCROLL_THRESHOLD = 80; // px before auto-hide kicks in

/**
 * Premium floating bottom navigation — mobile only (<768px).
 * Pill-shaped bar with 5 icon+label links.
 * Auto-hides on scroll down, reveals on scroll up.
 * Respects reduced-motion (always visible).
 * Safe-area aware for notched devices.
 */
export default function MobileBottomNav() {
  const active = useActiveSection();
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const { scrollY } = useScroll();

  // Detect prefers-reduced-motion
  const prefersReducedMotion = useRef(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotion.current = mq.matches;
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Always respect reduced-motion — never auto-hide
    if (prefersReducedMotion.current) return;

    const diff = latest - lastY.current;

    // Only auto-hide once user has scrolled past the threshold from top
    if (latest > SCROLL_THRESHOLD) {
      if (diff > 8) {
        // Scrolling down
        setHidden(true);
      } else if (diff < -4) {
        // Scrolling up
        setHidden(false);
      }
    } else {
      // Near top — always show
      setHidden(false);
    }

    lastY.current = latest;
  });

  return (
    <motion.nav
      aria-label="Mobile navigation"
      initial={false}
      animate={{ y: hidden ? 100 : 0 }}
      transition={{ type: "spring", stiffness: 380, damping: 30 }}
      className="fixed inset-x-0 bottom-0 z-[70] flex justify-center pb-[max(16px,env(safe-area-inset-bottom,0px))] md:hidden pointer-events-none"
    >
      <div className="flex items-center gap-1 px-3 py-2 rounded-[28px] bg-[rgba(10,10,12,0.85)] backdrop-blur-[20px] border border-white/[0.10] shadow-[0_8px_32px_rgba(0,0,0,0.6)] pointer-events-auto">
        {navItems.map((item) => (
          <NavigationLink
            key={item.id}
            item={item}
            isActive={active === item.id}
          />
        ))}
      </div>
    </motion.nav>
  );
}
