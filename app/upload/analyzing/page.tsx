"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const STEPS = [
  "PDF 받았어요",
  "단원 인식 중",
  "본문 추출 중",
  "문제 카드 만드는 중",
];

export default function Analyzing() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    for (let i = 1; i <= STEPS.length; i++) {
      timers.push(setTimeout(() => setStep(i), i * 700));
    }
    timers.push(
      setTimeout(() => router.push("/upload/confirm"), STEPS.length * 700 + 500),
    );
    return () => timers.forEach(clearTimeout);
  }, [router]);

  return (
    <main className="px-5 pt-16 pb-6 flex flex-col items-center">
      <div className="w-24 h-24 rounded-full bg-terracotta-soft flex items-center justify-center mb-6 relative">
        <div className="w-12 h-12 rounded-full border-[3px] border-terracotta border-t-transparent animate-spin" />
      </div>

      <h1 className="text-xl font-extrabold tracking-tight mb-1">읽는 중…</h1>
      <p className="text-sm text-ink-500 mb-8">잠깐만 기다려줘요</p>

      <ul className="w-full max-w-[300px] space-y-3">
        {STEPS.map((s, i) => {
          const done = i < step;
          const active = i === step;
          return (
            <li key={s} className="flex items-center gap-3">
              <div
                className={cn(
                  "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border-[1.5px] shrink-0 transition",
                  done
                    ? "bg-ink-900 border-ink-900 text-paper"
                    : active
                      ? "border-terracotta text-terracotta"
                      : "border-ink-200 text-ink-200",
                )}
              >
                {done ? "✓" : i + 1}
              </div>
              <span
                className={cn(
                  "text-sm transition",
                  done
                    ? "text-ink-900 font-semibold"
                    : active
                      ? "text-ink-700 font-semibold"
                      : "text-ink-400",
                )}
              >
                {s}
              </span>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
