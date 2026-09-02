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
    detail: "I enjoy turning ideas into meaningful digital experiences.",
  },
  {
    index: "02",
    label: "Technologist",
    detail: "Technology is both my profession and a world I continue exploring.",
  },
  {
    index: "03",
    label: "Learner",
    detail: "I believe growth comes from curiosity and continuous learning.",
  },
  {
    index: "04",
    label: "Builder",
    detail: "I enjoy transforming concepts into real digital experiences.",
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
    "Living with a physical disability is part of my reality — never the whole of my identity.",
    "Technology and assistive tools empower me to adapt, create, and build with independence.",
    "Every constraint became an opportunity to think deeper, solve smarter, and engineer with care.",
    "My challenges have shaped my discipline, but they do not set my ceiling.",
  ],
  closing:
    "Technology has always been more than a career for me. It is how I adapt, how I communicate, how I create — and how I keep moving forward, one build at a time.",
};
