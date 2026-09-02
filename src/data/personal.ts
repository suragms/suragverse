/**
 * SURAGVERSE — personal narrative content.
 * Single source of truth for the "WHO I AM" and "MY STORY" sections.
 * Edit here to update copy — no component changes needed.
 */

export interface IdentityPoint {
  index: string;
  label: string;
  detail: string;
}

/** WHO I AM — the identity points, expressed editorially (not skill cards). */
export const identityPoints: IdentityPoint[] = [
  {
    index: "01",
    label: "Creator",
    detail: "I turn ideas into things that exist and matter.",
  },
  {
    index: "02",
    label: "Learner",
    detail: "Curiosity drives me — I never stop asking how and why.",
  },
  {
    index: "03",
    label: "Technologist",
    detail: "Technology is my medium for building and adapting.",
  },
  {
    index: "04",
    label: "Dreamer",
    detail: "I believe in possibilities others haven't seen yet.",
  },
];

/** WHO I AM — the opening personal introduction. */
export const whoAmI: string[] = [
  "I'm Surag M S — a technology enthusiast, developer, creator, and lifelong learner from Kerala, India.",
  "I believe technology can turn ideas into meaningful experiences — and possibilities into reality.",
  "My journey isn't only about writing code or building websites. It's about learning, adapting, creating, overcoming challenges, and continuing to move forward.",
];

/** MY STORY — written with dignity. No pity, no cliché, no helplessness. */
export const personalStory = {
  heading: ["MY JOURNEY", "IS MY OWN."],
  statement: "I AM A PERSON FIRST. A CREATOR. A PROFESSIONAL. A LEARNER.",
  statementHighlight: "MY LIMITATIONS DO NOT DEFINE MY POSSIBILITIES.",
  realities: [
    "I am a person first — a creator, a learner, a professional.",
    "I live with a physical disability. It is part of my story, not the whole of it.",
    "Technology and assistive tools help me interact, create, learn, and keep building.",
    "My challenges shape my approach, but they don't define my limits.",
  ],
  closing:
    "Technology has always been more than a career for me. It is how I adapt, how I communicate, how I create — and how I keep moving forward, one build at a time.",
};
