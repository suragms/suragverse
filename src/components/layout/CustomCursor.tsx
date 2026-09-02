"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { ANTIGRAVITY_SPRINGS } from "@/lib/motion";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [hoveringCard, setHoveringCard] = useState(false);
  const [cardLabel, setCardLabel] = useState<string | null>(null);

  // Inner dot — highly responsive tracking
  const dotX = useSpring(0, ANTIGRAVITY_SPRINGS.cursorDot);
  const dotY = useSpring(0, ANTIGRAVITY_SPRINGS.cursorDot);

  // Outer orbital ring — smooth reduced-gravity lag
  const ringX = useSpring(0, ANTIGRAVITY_SPRINGS.cursorRing);
  const ringY = useSpring(0, ANTIGRAVITY_SPRINGS.cursorRing);

  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only on desktop pointer devices without reduced motion preference
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.innerWidth < 1024) return;

    const handleMove = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
      setVisible(true);
    };

    const handleEnter = () => setVisible(true);
    const handleLeave = () => setVisible(false);

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseenter", handleEnter);
    document.addEventListener("mouseleave", handleLeave);

    // Detect hoverable elements
    const handleOverInteractive = () => setHovering(true);
    const handleOutInteractive = () => setHovering(false);

    const handleOverCard = (e: Event) => {
      setHoveringCard(true);
      const target = e.currentTarget as HTMLElement;
      const label = target.getAttribute("data-cursor-label");
      setCardLabel(label || null);
    };
    const handleOutCard = () => {
      setHoveringCard(false);
      setCardLabel(null);
    };

    const interactiveEls = document.querySelectorAll(
      'a, button, [role="button"], input, textarea'
    );
    const cardEls = document.querySelectorAll("[data-cursor-card]");

    interactiveEls.forEach((el) => {
      el.addEventListener("mouseenter", handleOverInteractive);
      el.addEventListener("mouseleave", handleOutInteractive);
    });

    cardEls.forEach((el) => {
      el.addEventListener("mouseenter", handleOverCard);
      el.addEventListener("mouseleave", handleOutCard);
    });

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseenter", handleEnter);
      document.removeEventListener("mouseleave", handleLeave);
      interactiveEls.forEach((el) => {
        el.removeEventListener("mouseenter", handleOverInteractive);
        el.removeEventListener("mouseleave", handleOutInteractive);
      });
      cardEls.forEach((el) => {
        el.removeEventListener("mouseenter", handleOverCard);
        el.removeEventListener("mouseleave", handleOutCard);
      });
    };
  }, [dotX, dotY, ringX, ringY]);

  // Don't render on mobile or tablet
  if (
    typeof window !== "undefined" &&
    (window.innerWidth < 1024 ||
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  ) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9998] pointer-events-none hidden lg:block" aria-hidden="true">
      {/* Inner dot */}
      <motion.div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{
          x: dotX,
          y: dotY,
          opacity: visible ? 1 : 0,
        }}
      />

      {/* Outer antigravity orbital ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-white/30 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center backdrop-blur-[1px]"
        style={{
          x: ringX,
          y: ringY,
          opacity: visible ? 1 : 0,
        }}
        animate={{
          width: hoveringCard ? 72 : hovering ? 44 : 28,
          height: hoveringCard ? 72 : hovering ? 44 : 28,
          borderColor: hoveringCard
            ? "rgba(56, 189, 248, 0.6)"
            : hovering
            ? "rgba(255, 255, 255, 0.6)"
            : "rgba(255, 255, 255, 0.2)",
          backgroundColor: hoveringCard
            ? "rgba(56, 189, 248, 0.08)"
            : hovering
            ? "rgba(255, 255, 255, 0.05)"
            : "transparent",
        }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {hoveringCard && cardLabel && (
          <span className="font-mono text-[9px] tracking-[0.25em] text-electric-blue uppercase">
            {cardLabel}
          </span>
        )}
      </motion.div>
    </div>
  );
}
