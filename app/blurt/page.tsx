"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { BlurtPad } from "@/components/BlurtPad";
import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";
import { gradeBlurt, BlurtGrade } from "@/lib/blurt";
import { BLURT_KEYS_BY_LESSON, LESSON_TITLES } from "@/lib/vocab";
import { getState, setState } from "@/lib/storage";

const LESSONS = Object.keys(BLURT_KEYS_BY_LESSON)
  .map(Number)
  .sort((a, b) => a - b);

export default function BlurtPage() {
  const [lesson, setLesson] = useState<number>(LESSONS[0]);
  const [grade, setGrade] = useState<BlurtGrade | null>(null);

  const submit = (text: string) => {
    const keys = BLURT_KEYS_BY_LESSON[lesson] ?? [];
    const g = gradeBlurt(text, keys);
    setGrade(g);
    const s = getState();
    setState({
      ...s,
      blurts: [
        ...s.blurts,
        {
          id: `blurt_${Date.now()}`,
          passageId: `L${lesson}`,
          userText: text,
          matched: g.matched,
          missed: g.missed,
          startedAt: Date.now(),
          submittedAt: Date.now(),
          score: g.score,
        },
      ],
    });
  };

  const reset = () => setGrade(null);

  return (
    <main className="px-5 pt-10 pb-6">
      <header className="mb-4">
        <p className="text-[11px] text-terracotta font-bold uppercase tracking-widest mb-1">
          BLURTING · 백지복습
        </p>
        <h1 className="text-2xl font-extrabold tracking-tight">
          기억나는 만큼 적어주세요
        </h1>
        <p className="text-sm text-ink-500 mt-2">
          본문을 보지 않고 키워드·문장·사람·숫자 — 떠오르는 모든 것을 적어요.
        </p>
      </header>

      {!grade && (
        <>
          <div className="flex gap-1.5 mb-3 flex-wrap">
            {LESSONS.map((l) => (
              <button
                key={l}
                onClick={() => setLesson(l)}
                className={cn(
                  "px-3 py-1.5 rounded-chip text-xs font-bold border transition",
                  lesson === l
                    ? "bg-ink-900 text-paper border-ink-900"
                    : "bg-white text-ink-700 border-ink-200",
                )}
              >
                L{l}
              </button>
            ))}
          </div>
          <p className="text-[12px] text-ink-500 mb-3 italic">
            {LESSON_TITLES[lesson]}
          </p>
          <BlurtPad onSubmit={submit} />
          <p className="text-[11px] text-ink-400 mt-3 leading-relaxed">
            출처: Brunch 전교1등 백지복습법 · Dunlosky 2013 (high utility)
          </p>
        </>
      )}

      {grade && (
        <BlurtResult
          grade={grade}
          lesson={lesson}
          onReset={reset}
        />
      )}
    </main>
  );
}

function BlurtResult({
  grade,
  lesson,
  onReset,
}: {
  grade: BlurtGrade;
  lesson: number;
  onReset: () => void;
}) {
  const pct = Math.round(grade.score * 100);
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="bg-white rounded-card p-5 border border-ink-100 mb-4">
        <div className="text-[11px] text-ink-400 font-bold uppercase tracking-widest mb-1">
          채점 — Lesson {lesson}
        </div>
        <div className="text-3xl font-extrabold text-ink-900 mb-1 tabular-nums">
          {grade.matched.length} / {grade.matched.length + grade.missed.length}
        </div>
        <div className="text-[12px] text-ink-500">정확히 떠올린 키워드 {pct}%</div>
      </div>

      <section className="mb-4">
        <h2 className="text-xs font-bold text-ink-500 uppercase tracking-widest mb-2">
          ✓ 떠올린 것
        </h2>
        <div className="bg-lavender rounded-card p-3 border border-lavender">
          {grade.matched.length === 0 ? (
            <p className="text-[12px] text-ink-700">없음 — 본문 다시 보기</p>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {grade.matched.map((m) => (
                <span
                  key={m}
                  className="text-[12px] font-semibold text-ink-900 bg-paper/60 px-2 py-1 rounded-chip"
                >
                  {m}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="mb-5">
        <h2 className="text-xs font-bold text-ink-500 uppercase tracking-widest mb-2">
          놓친 것 — 다시 외워야 할 키워드
        </h2>
        <div className="bg-paper rounded-card p-3 border border-ink-100">
          {grade.missed.length === 0 ? (
            <p className="text-[12px] text-ink-700">완벽! 다음 레슨으로.</p>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {grade.missed.map((m) => (
                <span
                  key={m}
                  className="text-[12px] font-semibold text-ink-400 line-through"
                >
                  {m}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      <Button fullWidth onClick={onReset}>
        다시 시도
      </Button>
    </motion.div>
  );
}
