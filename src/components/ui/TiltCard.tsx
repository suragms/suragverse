"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  /** Disable pointer-driven tilt (e.g. for touch contexts). */
  disabled?: boolean;
}

/**
 * Reusable wrapper that gives its content a subtle pointer-driven 3D tilt,
 * with a smooth spring settle back to flat on mouse leave.
 */
export default function TiltCard({
  children,
  className = "",
  maxTilt = 8,
  disabled = false,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotateX = useSpring(
    useTransform(py, [0, 1], [maxTilt, -maxTilt]),
    { stiffness: 150, damping: 20 }
  );
  const rotateY = useSpring(
    useTransform(px, [0, 1], [-maxTilt, maxTilt]),
    { stiffness: 150, damping: 20 }
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={disabled ? undefined : handleMouseMove}
      onMouseLeave={disabled ? undefined : reset}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
