import { LucideIcon } from "lucide-react";

type Item = {
  title: string;
  url: string;
};

type NavItem = {
  title: string;
  url?: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: Item[];
  hasSubmenu?: boolean;
};

export type { NavItem };
