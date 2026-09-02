import {
  LinkedInIcon,
  InstagramIcon,
  FacebookIcon,
  GitHubIcon,
  YouTubeIcon,
  LinktreeIcon,
} from "@/components/icons/BrandIcons";
import type { ComponentType, SVGProps } from "react";

export interface SocialPlatform {
  id: string;
  name: string;
  username: string;
  url: string;
  /** Subtle identity accent used for the hover glow (kept muted). */
  accent: string;
  icon: ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;
}

/**
 * All social platforms, managed from this single file.
 * Add or remove platforms here and they appear everywhere the social universe renders.
 */
export const socials: SocialPlatform[] = [
  {
    id: "linkedin",
    name: "LinkedIn",
    username: "linkedin.com/in/suragsunil",
    url: "https://linkedin.com/in/suragsunil",
    accent: "#0A66C2",
    icon: LinkedInIcon,
  },
  {
    id: "instagram",
    name: "Instagram",
    username: "instagram.com/surag_sunil",
    url: "https://instagram.com/surag_sunil",
    accent: "#E4405F",
    icon: InstagramIcon,
  },
  {
    id: "facebook",
    name: "Facebook",
    username: "facebook.com/suraagms",
    url: "https://facebook.com/suraagms",
    accent: "#1877F2",
    icon: FacebookIcon,
  },
  {
    id: "github",
    name: "GitHub",
    username: "github.com/suragms",
    url: "https://github.com/suragms",
    accent: "#FFFFFF",
    icon: GitHubIcon,
  },
  {
    id: "youtube",
    name: "YouTube",
    username: "youtube.com/@suragdevstudio",
    url: "https://youtube.com/@suragdevstudio",
    accent: "#FF0000",
    icon: YouTubeIcon,
  },
  {
    id: "linktree",
    name: "Linktree",
    username: "linktr.ee/suragdevstudio",
    url: "https://linktr.ee/suragdevstudio",
    accent: "#39E09B",
    icon: LinktreeIcon,
  },
];
