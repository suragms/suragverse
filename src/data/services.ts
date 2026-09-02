export interface Service {
  icon: string;
  title: string;
  description: string;
}

/**
 * The professional services & collaborations on offer.
 * Edit this array to add or remove offerings — they render as animated cards.
 */
export const services: Service[] = [
  {
    icon: "briefcase",
    title: "Freelance Projects",
    description: "End-to-end delivery of ambitious digital builds, on time and on budget.",
  },
  {
    icon: "drafting",
    title: "Architectural Consultations",
    description: "Blueprint your product before a single line of code is written.",
  },
  {
    icon: "lifebuoy",
    title: "Business Support",
    description: "Ongoing technical guidance and digital assistance for growing teams.",
  },
  {
    icon: "growth",
    title: "Business Development",
    description: "Turn ideas into revenue — strategy, scoping, and launch support.",
  },
  {
    icon: "code",
    title: "Full-Stack Development",
    description: "Robust, scalable applications engineered across the entire stack.",
  },
  {
    icon: "network",
    title: "Technology Collaborations",
    description: "Partner with me on research, innovation, and emerging technology.",
  },
  {
    icon: "globe",
    title: "Website Development",
    description: "Premium, fast, immersive websites built to convert and impress.",
  },
  {
    icon: "box",
    title: "Digital Product Development",
    description: "From MVP to polished product — designed, built, and shipped.",
  },
];
