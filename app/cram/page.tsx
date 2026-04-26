"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { CRAM_NOTES, CramNote } from "@/lib/cramNotes";

const SCROLL_SPEEDS = [
  { label: "느리게", pxPerSec: 25 },
  { label: "보통", pxPerSec: 50 },
  { label: "빠르게", pxPerSec: 90 },
];

export default function CramPage() {
  const [lessonIdx, setLessonIdx] = useState(0);
  const [autoScroll, setAutoScroll] = useState(false);
  const [speedIdx, setSpeedIdx] = useState(1);
  const [tab, setTab] = useState<"summary" | "passage">("summary");
  const note: CramNote = CRAM_NOTES[lessonIdx];

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!autoScroll) return;
    const speed = SCROLL_SPEEDS[speedIdx].pxPerSec;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      window.scrollBy({ top: speed * dt, behavior: "auto" });
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (window.scrollY >= max - 5) {
        setAutoScroll(false);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [autoScroll, speedIdx]);

  return (
    <main className="px-5 pt-10 pb-32" ref={scrollRef}>
      <header className="mb-4 sticky top-0 bg-paper -mx-5 px-5 pt-1 pb-3 z-30 border-b border-ink-100">
        <p className="text-[11px] text-terracotta font-bold uppercase tracking-widest mb-1">
          CRAM NOTE · 시험 직전 속독
        </p>
        <h1 className="text-xl font-extrabold tracking-tight">암기노트</h1>

        <div className="flex gap-1.5 mt-3 flex-wrap">
          {CRAM_NOTES.map((n, i) => (
            <button
              key={n.lesson}
              onClick={() => {
                setLessonIdx(i);
                window.scrollTo({ top: 0, behavior: "auto" });
              }}
              className={cn(
                "px-2.5 py-1 rounded-chip text-[11px] font-bold border transition",
                lessonIdx === i
                  ? "bg-ink-900 text-paper border-ink-900"
                  : "bg-white text-ink-700 border-ink-200",
              )}
            >
              L{n.lesson}
            </button>
          ))}
        </div>

        <div className="flex gap-1.5 mt-2">
          <button
            onClick={() => setTab("summary")}
            className={cn(
              "flex-1 py-1.5 rounded-card text-[11px] font-bold border transition",
              tab === "summary"
                ? "bg-lavender text-ink-900 border-lavender"
                : "bg-white text-ink-500 border-ink-200",
            )}
          >
            한국어 요약
          </button>
          <button
            onClick={() => setTab("passage")}
            className={cn(
              "flex-1 py-1.5 rounded-card text-[11px] font-bold border transition",
              tab === "passage"
                ? "bg-lavender text-ink-900 border-lavender"
                : "bg-white text-ink-500 border-ink-200",
            )}
          >
            영어 본문
          </button>
        </div>
      </header>

      <section className="mb-5">
        <p className="text-[11px] text-ink-400 font-bold uppercase tracking-widest mb-1">
          Lesson {note.lesson}
        </p>
        <h2 className="text-lg font-extrabold tracking-tight text-ink-900">
          {note.lessonTitle}
        </h2>
        <div className="mt-2 bg-butter-soft rounded-card p-3 border border-ink-100">
          <p className="text-sm font-bold text-ink-900 leading-relaxed">
            {note.oneLine}
          </p>
        </div>
      </section>

      {tab === "summary" ? (
        <Section title="📖 본문 요약 (한국어)">
          <div className="bg-white rounded-card p-4 border border-ink-100">
            {note.korean.split("\n\n").map((p, i) => (
              <p
                key={i}
                className="text-sm text-ink-900 leading-[1.85] mb-3 last:mb-0"
              >
                {p}
              </p>
            ))}
          </div>
        </Section>
      ) : (
        <Section title="📜 본문 (English)">
          <div className="bg-white rounded-card p-4 border border-ink-100">
            {note.passageEn.split("\n\n").map((p, i) => (
              <p
                key={i}
                className="text-sm text-ink-900 leading-[1.85] mb-3 last:mb-0"
              >
                {p}
              </p>
            ))}
          </div>
        </Section>
      )}

      <Section title="🔑 핵심 단어">
        <div className="bg-white rounded-card border border-ink-100 divide-y divide-ink-100">
          {note.keyVocab.map((v) => (
            <div
              key={v.word}
              className="flex items-baseline gap-3 p-3 first:rounded-t-card last:rounded-b-card"
            >
              <span className="font-bold text-sm text-ink-900 w-[110px] shrink-0 tracking-tight">
                {v.word}
              </span>
              <span className="text-[13px] text-ink-700 leading-snug flex-1">
                {v.meaning}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="📐 어법 포인트">
        <div className="space-y-2">
          {note.grammarPoints.map((g, i) => (
            <div
              key={i}
              className="bg-white rounded-card p-3.5 border border-ink-100"
            >
              <div className="text-[13px] font-bold text-ink-900 mb-2 leading-snug">
                {g.rule}
              </div>
              <div
                className="text-[12px] text-ink-700 bg-paper rounded p-2 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: g.example.replace(
                    /\*\*(.+?)\*\*/g,
                    '<span class="bg-butter/50 px-1 rounded font-bold">$1</span>',
                  ),
                }}
              />
            </div>
          ))}
        </div>
      </Section>

      <Section title="🎯 출제 예상">
        <div className="bg-white rounded-card p-4 border border-ink-100">
          <ul className="space-y-2">
            {note.likelyQuestions.map((q, i) => (
              <li
                key={i}
                className="text-[13px] text-ink-900 leading-relaxed flex gap-2"
              >
                <span className="text-terracotta font-bold shrink-0">→</span>
                <span>{q}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section title="⚠️ 함정 주의">
        <div className="bg-terracotta-soft rounded-card p-4 border border-ink-100">
          <ul className="space-y-2">
            {note.trapWarnings.map((w, i) => (
              <li
                key={i}
                className="text-[13px] text-terracotta-deep leading-relaxed flex gap-2 font-medium"
              >
                <span className="font-bold shrink-0">!</span>
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <motion.div
        initial={false}
        className="fixed bottom-[80px] left-1/2 -translate-x-1/2 w-[calc(100%-40px)] max-w-[380px] z-40"
      >
        <div className="bg-ink-900 text-paper rounded-card p-2.5 shadow-paper flex items-center gap-2">
          <button
            onClick={() => setAutoScroll((s) => !s)}
            className={cn(
              "px-3 py-2 rounded-chip text-[11px] font-bold transition shrink-0",
              autoScroll ? "bg-butter text-ink-900" : "bg-paper/10 text-paper",
            )}
            aria-label={autoScroll ? "정지" : "자동 스크롤"}
          >
            {autoScroll ? "⏸ 정지" : "▶ 자동"}
          </button>
          <div className="flex gap-1 flex-1 justify-center">
            {SCROLL_SPEEDS.map((s, i) => (
              <button
                key={s.label}
                onClick={() => setSpeedIdx(i)}
                className={cn(
                  "px-2 py-1 rounded-chip text-[10px] font-bold transition",
                  speedIdx === i
                    ? "bg-paper text-ink-900"
                    : "text-paper/60",
                )}
              >
                {s.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="px-2 py-2 rounded-chip text-[11px] font-bold text-paper/80 shrink-0"
            aria-label="맨 위로"
          >
            ↑
          </button>
        </div>
      </motion.div>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-5">
      <h3 className="text-xs font-bold text-ink-500 uppercase tracking-widest mb-2 px-1">
        {title}
      </h3>
      {children}
    </section>
  );
}
