import { Code, ImageIcon, MessageSquare, Music, StickyNote, VideoIcon } from "lucide-react";

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
    label: "IA Generazione",
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: "/image",
  },
  {
    label: "Appunti",
    icon: StickyNote,
    color: "text-blue-700",
    bgColor: "bg-blue-700/10",
    href: "/notes",
  },
];
