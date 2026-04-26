"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const TABS = [
  {
    href: "/home",
    label: "공부",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 5a2 2 0 0 1 2-2h6v18H6a2 2 0 0 1-2-2V5z" />
        <path d="M20 5a2 2 0 0 0-2-2h-6v18h6a2 2 0 0 0 2-2V5z" />
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
    href: "/results",
    label: "통계",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <line x1="6" y1="20" x2="6" y2="12" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="18" y1="20" x2="18" y2="14" />
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
