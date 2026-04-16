"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, PenLine, Tag, Settings } from "lucide-react";

const tabs = [
  { href: "/calendar", label: "calendar", Icon: CalendarDays },
  { href: "/today", label: "today", Icon: PenLine },
  { href: "/tags", label: "tags", Icon: Tag },
  { href: "/settings", label: "settings", Icon: Settings },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 flex items-center justify-around px-2 border-t border-white/5"
      style={{ backgroundColor: "var(--theme-surface)" }}
    >
      {tabs.map(({ href, label, Icon }) => {
        const active = pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className="flex flex-col items-center gap-0.5 py-2 px-4 transition-colors duration-150"
            style={{ color: active ? "var(--theme-accent)" : "color-mix(in srgb, var(--theme-text) 40%, transparent)" }}
          >
            <Icon size={20} strokeWidth={1.75} />
            <span className="text-[10px] tracking-wide">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
