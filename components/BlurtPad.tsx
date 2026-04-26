"use client";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
  durationSec?: number;
  placeholder?: string;
  onSubmit: (text: string) => void;
  /** Auto-focus when mounted. */
  autoFocus?: boolean;
}

const DEFAULT_DURATION = 180;

export function BlurtPad({
  durationSec = DEFAULT_DURATION,
  placeholder = "본문에서 기억나는 모든 것을 적어보세요. 단어, 문장, 키워드 — 무엇이든.",
  onSubmit,
  autoFocus = true,
}: Props) {
  const [text, setText] = useState("");
  const [remaining, setRemaining] = useState(durationSec);
  const [submitted, setSubmitted] = useState(false);
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (autoFocus) ref.current?.focus();
  }, [autoFocus]);

  useEffect(() => {
    if (submitted) return;
    const id = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(id);
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [submitted]);

  useEffect(() => {
    if (remaining === 0 && !submitted) {
      handleSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remaining]);

  const handleSubmit = () => {
    if (submitted) return;
    setSubmitted(true);
    onSubmit(text);
  };

  const mm = Math.floor(remaining / 60).toString().padStart(2, "0");
  const ss = (remaining % 60).toString().padStart(2, "0");
  const pct = (remaining / durationSec) * 100;

  return (
    <div className="space-y-3">
      <div className="bg-white rounded-card border border-ink-100 overflow-hidden">
        <textarea
          ref={ref}
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={submitted}
          placeholder={placeholder}
          aria-label="백지복습 입력"
          className={cn(
            "w-full min-h-[280px] p-4 bg-transparent border-0 outline-none resize-none",
            "text-[17px] leading-[1.7] text-ink-900",
            "placeholder:text-ink-400 placeholder:font-normal",
          )}
          style={{
            fontFamily: "Pretendard, system-ui, sans-serif",
            backgroundImage:
              "repeating-linear-gradient(transparent, transparent 28px, #E8E3D6 28px, #E8E3D6 29px)",
          }}
        />
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1">
          <div className="h-1 bg-ink-100 rounded-chip overflow-hidden">
            <div
              className="h-full bg-ink-900 rounded-chip transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="text-[11px] text-ink-500 font-mono mt-1 tabular-nums">
            {mm}:{ss} 남음
          </div>
        </div>
        <button
          onClick={handleSubmit}
          disabled={submitted || !text.trim()}
          className="bg-ink-900 text-paper px-5 py-2.5 rounded-card text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          채점하기
        </button>
      </div>
    </div>
  );
}
