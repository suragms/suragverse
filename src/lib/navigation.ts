import { Home, User, Compass, Briefcase, MessageCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
}

/**
 * Centralized navigation configuration.
 * Desktop navbar and mobile bottom nav both consume this.
 */
export const navItems: NavItem[] = [
  { id: "home", label: "HOME", href: "#home", icon: Home },
  { id: "my-story", label: "STORY", href: "#my-story", icon: User },
  { id: "journey", label: "JOURNEY", href: "#journey", icon: Compass },
  { id: "my-work", label: "WORK", href: "#my-work", icon: Briefcase },
  { id: "connect", label: "CONNECT", href: "#connect", icon: MessageCircle },
];
