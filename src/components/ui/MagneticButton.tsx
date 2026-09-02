"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ANTIGRAVITY_SPRINGS, buttonMicroMotion } from "@/lib/motion";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  strength?: number;
}

/**
 * Reusable magnetic button wrapper — pulls smoothly toward the cursor on hover
 * using low-bounce Antigravity spring physics.
 */
export default function MagneticButton({
  children,
  className,
  onClick,
  href,
  target,
  rel,
  strength = 0.28,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, ANTIGRAVITY_SPRINGS.weightless);
  const springY = useSpring(y, ANTIGRAVITY_SPRINGS.weightless);

  const handleMouseMove = (e: React.MouseEvent) => {
    // Skip magnetic effect on touch devices or reduced motion
    if (typeof window !== "undefined") {
      if (window.matchMedia("(pointer: coarse)").matches) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    }
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const offsetX = e.clientX - (rect.left + rect.width / 2);
    const offsetY = e.clientY - (rect.top + rect.height / 2);
    x.set(offsetX * strength);
    y.set(offsetY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={href || onClick ? handleMouseMove : undefined}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      variants={buttonMicroMotion}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      className={className}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target={target} rel={rel}>
        {content}
      </a>
    );
  }

  return <button onClick={onClick}>{content}</button>;
}