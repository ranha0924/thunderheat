"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ProgressBar } from "@/components/ProgressBar";
import { Button } from "@/components/Button";
import { getState } from "@/lib/storage";
import { AppState, INITIAL_STATE } from "@/lib/types";
import { ALL_QUESTIONS as ALL, questionLabel } from "@/lib/questions";
import { Question } from "@/lib/types";

export default function Results() {
  const [state, setState] = useState<AppState>(INITIAL_STATE);
  useEffect(() => setState(getState()), []);

  const answered = Object.values(state.progress);
  const correct = answered.filter((p) => p.correct).length;
  const total = answered.length || 1;
  const accuracy = Math.round((correct / total) * 100);

  // mastery per lesson
  const lessonMap: Record<number, { total: number; mastered: number }> = {};
  for (const q of ALL) {
    if (!lessonMap[q.lesson]) lessonMap[q.lesson] = { total: 0, mastered: 0 };
    lessonMap[q.lesson].total += 1;
    if (state.progress[q.id]?.correct) lessonMap[q.lesson].mastered += 1;
  }

  const weakWords = state.weakness
    .map((w) => ALL.find((q) => q.id === w.id))
    .filter((q): q is Question => Boolean(q))
    .slice(0, 8);

  return (
    <main className="px-5 pt-10 pb-6">
      <header className="mb-5">
        <p className="text-[11px] text-ink-500 font-semibold mb-1">ROUND CLEAR</p>
        <h1 className="text-2xl font-extrabold tracking-tight">
          좋아요. 한 시간 만에
          <br />
          {answered.length}문제 끝!
        </h1>
      </header>

      <div className="grid grid-cols-3 gap-2 mb-6">
        <div className="bg-white rounded-card p-3 border border-ink-100 text-center">
          <div className="text-[10px] text-ink-400 font-bold uppercase">정답률</div>
          <div className="text-xl font-extrabold text-ink-900 mt-1">{accuracy}%</div>
        </div>
        <div className="bg-white rounded-card p-3 border border-ink-100 text-center">
          <div className="text-[10px] text-ink-400 font-bold uppercase">콤보</div>
          <div className="text-xl font-extrabold text-ink-900 mt-1">{state.combo}</div>
        </div>
        <div className="bg-white rounded-card p-3 border border-ink-100 text-center">
          <div className="text-[10px] text-ink-400 font-bold uppercase">XP</div>
          <div className="text-xl font-extrabold text-ink-900 mt-1">+{state.xp.sessionXP}</div>
        </div>
      </div>

      <section className="mb-6">
        <h2 className="text-xs font-bold text-ink-500 uppercase tracking-widest mb-3">
          단원별 마스터리
        </h2>
        <div className="space-y-3">
          {Object.entries(lessonMap).map(([lesson, stats]) => (
            <div
              key={lesson}
              className="bg-white rounded-card p-3 border border-ink-100"
            >
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span>Lesson {lesson}</span>
                <span className="text-ink-500">
                  {stats.mastered} / {stats.total}
                </span>
              </div>
              <ProgressBar
                value={stats.mastered}
                max={stats.total}
                variant="sage"
              />
            </div>
          ))}
        </div>
      </section>

      {weakWords.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold text-ink-500 uppercase tracking-widest mb-3">
            약점 노트
          </h2>
          <div className="bg-white rounded-card p-4 border border-ink-100">
            <ul className="space-y-2">
              {weakWords.map((q) => {
                const label = questionLabel(q);
                return (
                <li
                  key={q.id}
                  className="flex justify-between items-center text-sm"
                >
                  <span className="text-ink-900 font-semibold">
                    {label}
                  </span>
                  <span className="text-[10px] text-terracotta-deep bg-terracotta-soft px-2 py-0.5 rounded-chip font-bold">
                    {state.weakness.find((w) => w.id === q.id)?.failures}회
                  </span>
                </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}

      <div className="grid grid-cols-2 gap-2">
        <Link href="/study">
          <Button variant="primary" fullWidth>
            다음 라운드
          </Button>
        </Link>
        <Link href="/home">
          <Button variant="secondary" fullWidth>
            홈으로
          </Button>
        </Link>
      </div>
    </main>
  );
}
