"use client";
import { cn } from "@/lib/utils";

export interface Lesson {
  id: string;
  title: string;
  questions: number;
  estMin: number;
}

interface Props {
  lessons: Lesson[];
  selected: string[];
  onChange: (next: string[]) => void;
}

export function LessonChecklist({ lessons, selected, onChange }: Props) {
  const toggle = (id: string) => {
    if (selected.includes(id)) onChange(selected.filter((s) => s !== id));
    else onChange([...selected, id]);
  };
  return (
    <ul className="space-y-2">
      {lessons.map((l) => {
        const checked = selected.includes(l.id);
        return (
          <li key={l.id}>
            <button
              onClick={() => toggle(l.id)}
              className={cn(
                "w-full flex items-center gap-3 p-4 rounded-card border bg-white text-left transition",
                checked
                  ? "border-ink-900 shadow-paper-soft"
                  : "border-ink-100",
              )}
            >
              <div
                className={cn(
                  "w-5 h-5 rounded border-2 flex items-center justify-center text-[11px] shrink-0",
                  checked
                    ? "bg-ink-900 border-ink-900 text-paper"
                    : "border-ink-200",
                )}
                aria-hidden
              >
                {checked && "✓"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-ink-900 truncate">
                  {l.title}
                </div>
                <div className="text-[11px] text-ink-500 mt-0.5">
                  {l.questions}문제 · {l.estMin}분
                </div>
              </div>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
