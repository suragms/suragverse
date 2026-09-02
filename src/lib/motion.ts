/**
 * SURAGVERSE — Universal Antigravity Motion System
 * ===============================================
 * Single source of truth for all animation timing, curves, springs, and variants.
 *
 * Core Principle: MOVE WITH PURPOSE.
 * The motion feels like gravity has been reduced:
 *   - Gentle acceleration
 *   - Smooth floating travel
 *   - Slow, controlled settling
 *   - No elastic bouncing, no chaotic shaking, no neon overload.
 */

import type { Transition, Variants } from "framer-motion";

// ============================================================================
// 1. MOTION TOKENS
// ============================================================================

export const MOTION_DURATION = {
  /** Level 01 — Micro Motion: Buttons, Links, Icons, Cursor (150ms - 300ms) */
  FAST: 0.22,
  /** Level 02 — Interface Motion: Cards, Navigation, Section content (400ms - 800ms) */
  NORMAL: 0.6,
  /** Level 03 — Cinematic Motion: Large reveals, portraits, headlines (800ms - 1200ms) */
  SLOW: 1.0,
  /** Level 03 — Cinematic Moments: Hero entry, chapter transitions (1200ms - 2000ms) */
  CINEMATIC: 1.6,
} as const;

/**
 * Universal Antigravity Easing Curve:
 * Gentle acceleration -> weightless travel -> controlled settling.
 */
export const ANTIGRAVITY_EASE = [0.22, 1, 0.36, 1] as const;
export const ANTIGRAVITY_EASE_CSS = "cubic-bezier(0.22, 1, 0.36, 1)";

/**
 * Premium Spring Physics:
 * Low bounce, medium damping, soft settling.
 */
export const ANTIGRAVITY_SPRINGS = {
  /** Responsive micro interactions (buttons, icons) */
  micro: { stiffness: 450, damping: 32, mass: 0.7 },
  /** Weightless floating elements (portraits, cards) */
  weightless: { stiffness: 60, damping: 18, mass: 1 },
  /** Parallax tracking springs */
  parallax: { stiffness: 35, damping: 20 },
  /** Inner cursor dot — highly responsive */
  cursorDot: { stiffness: 750, damping: 48 },
  /** Outer cursor ring — slight weightless orbital lag */
  cursorRing: { stiffness: 240, damping: 26, mass: 0.6 },
} as const;

// ============================================================================
// 2. UNIVERSAL ENTRY VARIANTS
// ============================================================================

/**
 * Universal Antigravity Entrance:
 * Soft vertical rise (32px), subtle blur clearance, and 0.98 -> 1 scale.
 */
export const antigravityReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 32,
    scale: 0.98,
    filter: "blur(6px)",
  },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: MOTION_DURATION.NORMAL,
      delay,
      ease: ANTIGRAVITY_EASE,
    },
  }),
};

/**
 * Clean Rise without blur — optimized for lighter sections and high-density text.
 */
export const antigravityRise: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION_DURATION.NORMAL,
      delay,
      ease: ANTIGRAVITY_EASE,
    },
  }),
};

/**
 * Simple weightless fade.
 */
export const antigravityFade: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: {
      duration: MOTION_DURATION.NORMAL,
      delay,
      ease: ANTIGRAVITY_EASE,
    },
  }),
};

// ============================================================================
// 3. TYPOGRAPHY & MASK REVEALS
// ============================================================================

/**
 * Rise Through Mask:
 * Text rises upward from behind an overflow-hidden container (110% -> 0%).
 * Gives the sensation of rising into the physical world.
 */
export const riseThroughMask: Variants = {
  hidden: {
    y: "110%",
    opacity: 0,
  },
  visible: (delay = 0) => ({
    y: "0%",
    opacity: 1,
    transition: {
      duration: MOTION_DURATION.SLOW,
      delay,
      ease: ANTIGRAVITY_EASE,
    },
  }),
};

// ============================================================================
// 4. PHOTOGRAPHY & CINEMATIC MOMENTS
// ============================================================================

/**
 * Image Reveal:
 * Photography emerges with subtle initial scale (1.12 -> 1.0) and opacity.
 */
export const antigravityImageReveal: Variants = {
  hidden: {
    opacity: 0,
    scale: 1.12,
  },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: MOTION_DURATION.CINEMATIC,
      delay,
      ease: ANTIGRAVITY_EASE,
    },
  }),
};

/**
 * Weightless Float Effect:
 * Applied SPARINGLY to select hero portraits, portal layers, or key visual anchors.
 * Floating movement: 0 -> -7px -> 0 over 6.5 seconds.
 */
export const antigravityFloatAnimation = {
  y: [0, -7, 0],
  transition: {
    duration: 6.5,
    repeat: Infinity,
    ease: "easeInOut",
  } as Transition,
};

/**
 * Gentle Pulse Effect:
 * Used for live status beacons and subtle interactive indicators.
 */
export const antigravityPulseAnimation = {
  opacity: [1, 0.55, 1],
  scale: [1, 1.04, 1],
  transition: {
    duration: 2.8,
    repeat: Infinity,
    ease: "easeInOut",
  } as Transition,
};

// ============================================================================
// 5. STAGGER CONTAINERS
// ============================================================================

export function createStaggerContainer(staggerDelay = 0.08, delayChildren = 0.1): Variants {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren,
      },
    },
  };
}

// ============================================================================
// 6. MICRO INTERACTIONS (Buttons, Links, Hover)
// ============================================================================

export const buttonMicroMotion = {
  rest: {
    y: 0,
    scale: 1,
  },
  hover: {
    y: -3,
    scale: 1.02,
    transition: {
      duration: MOTION_DURATION.FAST,
      ease: ANTIGRAVITY_EASE,
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1,
      ease: ANTIGRAVITY_EASE,
    },
  },
};

export const portalPortalMotion = {
  rest: {
    scale: 1,
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: MOTION_DURATION.NORMAL,
      ease: ANTIGRAVITY_EASE,
    },
  },
};
