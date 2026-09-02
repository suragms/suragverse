"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [hoveringCard, setHoveringCard] = useState(false);

  const cursorX = useSpring(0, { stiffness: 500, damping: 40 });
  const cursorY = useSpring(0, { stiffness: 500, damping: 40 });

  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only on desktop
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.innerWidth < 1024) return;

    const handleMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setVisible(true);
    };

    const handleEnter = () => setVisible(true);
    const handleLeave = () => setVisible(false);

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseenter", handleEnter);
    document.addEventListener("mouseleave", handleLeave);

    // Detect hoverable elements
    const handleOverInteractive = () => setHovering(true);
    const handleOutInteractive = () => setHovering(false);
    const handleOverCard = () => setHoveringCard(true);
    const handleOutCard = () => setHoveringCard(false);

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
  }, [cursorX, cursorY]);

  // Don't render on mobile
  if (typeof window !== "undefined" && window.innerWidth < 1024) return null;

  return (
    <div className="fixed inset-0 z-[9998] pointer-events-none hidden lg:block">
      {/* Inner dot */}
      <motion.div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{
          x: cursorX,
          y: cursorY,
          opacity: visible ? 1 : 0,
        }}
      />

      {/* Outer circle */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-white/30 -translate-x-1/2 -translate-y-1/2"
        style={{
          x: cursorX,
          y: cursorY,
          opacity: visible ? 1 : 0,
        }}
        animate={{
          width: hoveringCard ? 80 : hovering ? 48 : 32,
          height: hoveringCard ? 80 : hovering ? 48 : 32,
          borderColor: hoveringCard
            ? "rgba(0, 217, 255, 0.5)"
            : hovering
            ? "rgba(255, 255, 255, 0.5)"
            : "rgba(255, 255, 255, 0.2)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
    </div>
  );
}
