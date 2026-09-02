/**
 * SURAGVERSE — journey narrative.
 * The 4-chapter creator story. Image assets live in `images.ts`; this file
 * owns the section-level copy and exposes the chapter list.
 */
import { storyChapters } from "@/data/images";

export { storyChapters as journeyChapters };

/** Section intro shown above the chapters. */
export const journeyIntro = {
  eyebrow: "MY JOURNEY",
  heading: ["THE JOURNEY", "SO FAR."],
};
