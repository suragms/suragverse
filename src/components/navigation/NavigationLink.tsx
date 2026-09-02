"use client";

import { motion } from "framer-motion";
import { scrollToSection } from "@/lib/lenis";
import type { NavItem } from "@/lib/navigation";

interface NavigationLinkProps {
  item: NavItem;
  isActive: boolean;
}

/**
 * Accessible icon + label button for the bottom nav.
 * Active state uses an Antigravity pill (layoutId for shared layout animation).
 * Tap triggers Lenis smooth scroll.
 */
export default function NavigationLink({ item, isActive }: NavigationLinkProps) {
  const Icon = item.icon;

  const handleClick = () => {
    scrollToSection(item.href);
  };

  return (
    <button
      onClick={handleClick}
      aria-label={item.label}
      aria-current={isActive ? "true" : undefined}
      className="relative flex flex-col items-center justify-center gap-1 min-w-[48px] min-h-[48px] px-2 py-1.5 rounded-xl transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric-blue z-10"
    >
      {/* Active pill background */}
      {isActive && (
        <motion.div
          layoutId="bottom-nav-active"
          className="absolute inset-0 rounded-xl bg-white/[0.08]"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}

      <Icon
        size={18}
        className={`relative z-10 transition-colors duration-200 ${
          isActive ? "text-electric-blue" : "text-secondary-text"
        }`}
        strokeWidth={isActive ? 2 : 1.5}
      />
      <span
        className={`relative z-10 font-mono text-[8px] tracking-[0.12em] transition-colors duration-200 ${
          isActive ? "text-white" : "text-secondary-text"
        }`}
      >
        {item.label}
      </span>
    </button>
  );
}
