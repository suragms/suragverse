/**
 * SURAGVERSE — current professional status.
 * Single source of truth for the "WHERE I AM RIGHT NOW" section.
 * Edit this file to update status — no component changes needed.
 */

export interface StatusItem {
  id: string;
  label: string;
  detail: string;
  /** Status indicator color (defaults to electric-blue). */
  color?: string;
}

export interface StatusConfig {
  /** Short headline shown above the status list. */
  heading: string[];
  items: StatusItem[];
}

export const status: StatusConfig = {
  heading: ["RIGHT NOW."],
  items: [
    {
      id: "open-opportunities",
      label: "OPEN TO SELECTED OPPORTUNITIES",
      detail: "Considering roles, projects, and collaborations that align with my focus.",
      color: "#38BDF8",
    },
    {
      id: "freelance",
      label: "AVAILABLE FOR FREELANCE PROJECTS",
      detail: "Taking on meaningful freelance and contract builds.",
      color: "#C9D6E0",
    },
    {
      id: "collaborations",
      label: "OPEN TO COLLABORATIONS",
      detail: "Open to teaming up on technology, AI, and creative ideas.",
      color: "#C9D6E0",
    },
    {
      id: "building-ai",
      label: "BUILDING WITH AI",
      detail: "Exploring applied AI and intelligent automation.",
      color: "#38BDF8",
    },
    {
      id: "exploring-automation",
      label: "EXPLORING AI AUTOMATION",
      detail: "Experimenting with intelligent workflows that save time and scale effort.",
      color: "#A1A1AA",
    },
    {
      id: "learning",
      label: "CONTINUOUSLY LEARNING",
      detail: "Growing every day — technology never stands still.",
      color: "#A1A1AA",
    },
  ],
};
