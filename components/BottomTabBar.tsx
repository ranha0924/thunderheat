"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const TABS = [
  {
    href: "/flow",
    label: "오늘밤",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <polyline points="12 7 12 12 15 14" />
      </svg>
    ),
  },
  {
    href: "/vocab",
    label: "단어",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h11a4 4 0 0 1 4 4v12a4 4 0 0 0-4-4H4z" />
        <line x1="8" y1="9" x2="14" y2="9" />
        <line x1="8" y1="13" x2="12" y2="13" />
      </svg>
    ),
  },
  {
    href: "/traps",
    label: "함정",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
        <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      </svg>
    ),
  },
  {
    href: "/me",
    label: "프로필",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4 4-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
];

export default function BottomTabBar() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] bg-paper border-t border-ink-100 z-40">
      <div className="flex justify-around py-2">
        {TABS.map((t) => {
          const active =
            pathname === t.href || pathname?.startsWith(t.href + "/");
          return (
            <Link
              key={t.href}
              href={t.href}
              aria-label={t.label}
              className={cn(
                "flex flex-col items-center gap-0.5 py-1 px-3 rounded-md transition",
                active ? "text-ink-900" : "text-ink-400",
              )}
            >
              {t.icon}
              <span className="text-[10px] font-semibold tracking-tight">
                {t.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
