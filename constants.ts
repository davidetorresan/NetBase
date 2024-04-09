import {
  Code,
  ImageIcon,
  MessageSquare,
  Music,
  StickyNote,
  VideoIcon,
  Zap,
} from "lucide-react";

export const MAX_FREE_COUNTS = 5;

export const tools = [
  {
    label: "AI Chat",
    icon: MessageSquare,
    href: "/assistant",
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: "Financial AI Chat",
    icon: Zap,
    href: "/finance",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    label: "Appunti",
    icon: StickyNote,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    href: "/notes",
  },
];
