"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import { Chip } from "@/components/Chip";
import { cn } from "@/lib/utils";

const MOCK_PASSAGE = `When he pointed to the cup with the food, the dogs found it easily. The wolves, however, struggled and chose cups at random, paying no attention to his gestures. Dr. Hare concluded that the dogs' ability to read human gestures allowed them to perform better than the wolves.`;

const MOCK_Q = {
  question: "윗글의 주제로 가장 적절한 것은?",
  choices: [
    "wolves' superior intelligence over dogs",
    "dogs' ability to read human gestures",
    "the difficulty of training wolves",
    "Dr. Hare's research methodology",
  ],
  answer: 1,
};

const TOTAL_SEC = 18 * 60;

export default function Mock() {
  const router = useRouter();
  const [seconds, setSeconds] = useState(TOTAL_SEC);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    const t = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          clearInterval(t);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const mm = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const ss = (seconds % 60).toString().padStart(2, "0");

  return (
    <main className="px-5 pt-8 pb-6">
      <header className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-extrabold tracking-tight">실전 모의</h1>
        <Chip variant={seconds < 60 ? "terracotta" : "ink"}>
          ⏱ {mm}:{ss}
        </Chip>
      </header>

      <article className="bg-white rounded-card p-5 border border-ink-100 mb-5">
        <p className="text-[11px] uppercase font-bold tracking-widest text-ink-400 mb-2">
          본문
        </p>
        <p className="text-sm text-ink-900 leading-relaxed">{MOCK_PASSAGE}</p>
      </article>

      <p className="text-sm font-bold text-ink-900 mb-3">{MOCK_Q.question}</p>
      <ul className="space-y-2 mb-6">
        {MOCK_Q.choices.map((c, i) => {
          const isSelected = selected === i;
          return (
            <li key={i}>
              <button
                onClick={() => setSelected(i)}
                className={cn(
                  "w-full text-left p-3 rounded-card border transition flex items-start gap-3",
                  isSelected
                    ? "border-ink-900 bg-ink-100/50"
                    : "border-ink-100 bg-white",
                )}
              >
                <span
                  className={cn(
                    "w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5",
                    isSelected
                      ? "bg-ink-900 border-ink-900 text-paper"
                      : "border-ink-200 text-ink-500",
                  )}
                >
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="text-sm text-ink-900 leading-relaxed flex-1">
                  {c}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <Button
        fullWidth
        onClick={() => router.push("/results")}
        disabled={selected === null}
      >
        제출
      </Button>
    </main>
  );
}
