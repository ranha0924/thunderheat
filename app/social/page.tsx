"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/Button";
import { Chip } from "@/components/Chip";
import { ProgressBar } from "@/components/ProgressBar";
import { cn } from "@/lib/utils";
import { SOCIAL_UNITS } from "@/lib/socialNotes";
import { SOCIAL_QUESTIONS, SocialQuestion } from "@/lib/socialQuestions";
import { getState, setState, updateState } from "@/lib/storage";
import { recordAnswer } from "@/lib/session";

type Mode = "notes" | "quiz";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function SocialPage() {
  const [scope, setScope] = useState<number[]>([]);
  const [scopeLoaded, setScopeLoaded] = useState(false);
  const [scopeOpen, setScopeOpen] = useState(false);
  const [unit, setUnit] = useState<number | null>(null);
  const [mode, setMode] = useState<Mode>("notes");

  // quiz state
  const [queue, setQueue] = useState<SocialQuestion[]>([]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  useEffect(() => {
    const s = getState();
    const saved = s.socialUnits ?? [];
    setScope(saved);
    setScopeLoaded(true);
    if (saved.length === 0) {
      // 처음 진입 → 범위 선택부터
      setScopeOpen(true);
    } else {
      setUnit(saved[0]);
    }
  }, []);

  const visibleUnits = useMemo(
    () => SOCIAL_UNITS.filter((u) => scope.includes(u.unit)),
    [scope],
  );

  const note = useMemo(
    () => SOCIAL_UNITS.find((u) => u.unit === unit) ?? null,
    [unit],
  );

  const scopedQuestionCount = useMemo(
    () => SOCIAL_QUESTIONS.filter((q) => scope.includes(q.unit)).length,
    [scope],
  );

  const toggleScopeUnit = (u: number) => {
    setScope((s) =>
      s.includes(u) ? s.filter((x) => x !== u) : [...s, u].sort(),
    );
  };

  const saveScope = () => {
    if (scope.length === 0) return;
    updateState((s) => ({ ...s, socialUnits: scope }));
    setScopeOpen(false);
    if (unit === null || !scope.includes(unit)) setUnit(scope[0]);
  };

  const startQuiz = (target: "unit" | "scope") => {
    const pool =
      target === "unit" && unit !== null
        ? SOCIAL_QUESTIONS.filter((q) => q.unit === unit)
        : SOCIAL_QUESTIONS.filter((q) => scope.includes(q.unit));
    if (pool.length === 0) return;
    setQueue(shuffle(pool));
    setIdx(0);
    setSelected(null);
    setRevealed(false);
    setScore({ correct: 0, total: 0 });
    setMode("quiz");
  };

  const submit = () => {
    if (selected === null) return;
    const current = queue[idx];
    const isCorrect = selected === current.answer;
    setRevealed(true);
    setScore((s) => ({
      correct: s.correct + (isCorrect ? 1 : 0),
      total: s.total + 1,
    }));
    setState(recordAnswer(getState(), current.id, isCorrect));
  };

  const next = () => {
    if (idx + 1 >= queue.length) {
      setMode("notes");
      return;
    }
    setIdx(idx + 1);
    setSelected(null);
    setRevealed(false);
  };

  const current = queue[idx];

  return (
    <main className="px-5 pt-10 pb-20 min-h-screen">
      <header className="mb-5">
        <Link
          href="/home"
          className="text-[11px] text-ink-500 font-semibold mb-1 inline-block"
        >
          ← 홈
        </Link>
        <p className="text-[11px] uppercase tracking-widest font-bold text-terracotta mt-2">
          통합사회1 · 1학기 중간
        </p>
        <h1 className="text-[32px] leading-[1.05] font-extrabold tracking-tight mt-2">
          사회
          <span className="bg-butter-soft px-2 inline-block ml-1">족보</span>
        </h1>
        <div className="flex gap-1.5 mt-3 flex-wrap items-center">
          <Chip variant="terracotta">
            범위 {scope.length}/{SOCIAL_UNITS.length}단원
          </Chip>
          <Chip variant="butter">{scopedQuestionCount}문항</Chip>
          <Chip variant="lavender">고1 · 미래엔</Chip>
          <button
            onClick={() => setScopeOpen((v) => !v)}
            className="ml-auto text-[11px] font-bold text-ink-500 underline-offset-2 underline"
          >
            {scopeOpen ? "닫기" : "범위 변경"}
          </button>
        </div>
      </header>

      {/* 시험 범위 선택 패널 */}
      {scopeOpen && (
        <section className="mb-6 bg-white rounded-card p-5 border border-ink-100 shadow-paper-soft">
          <h2 className="text-xs font-bold text-ink-500 uppercase tracking-widest mb-1">
            시험 범위 선택
          </h2>
          <p className="text-[12px] text-ink-500 leading-relaxed mb-4">
            학교 시험 범위에 해당하는 단원만 골라줘. 선택한 단원만 정리·문제에
            나타나.
          </p>
          <div className="space-y-2">
            {SOCIAL_UNITS.map((u) => {
              const active = scope.includes(u.unit);
              const qCount = SOCIAL_QUESTIONS.filter(
                (q) => q.unit === u.unit,
              ).length;
              return (
                <button
                  key={u.unit}
                  onClick={() => toggleScopeUnit(u.unit)}
                  className={cn(
                    "w-full text-left p-3 rounded-card border transition flex items-start gap-3",
                    active
                      ? "bg-ink-900 text-paper border-ink-900"
                      : "bg-white border-ink-200 text-ink-800",
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 w-5 h-5 shrink-0 rounded-md border-[1.5px] flex items-center justify-center text-[12px] font-extrabold",
                      active
                        ? "bg-butter border-butter text-ink-900"
                        : "bg-white border-ink-300 text-transparent",
                    )}
                  >
                    ✓
                  </span>
                  <span className="flex-1">
                    <span className="block text-sm font-bold">
                      단원 {u.unit}. {u.unitTitle}
                    </span>
                    <span
                      className={cn(
                        "block text-[11px] mt-0.5",
                        active ? "text-paper/70" : "text-ink-500",
                      )}
                    >
                      {qCount}문항 · {u.oneLine}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setScope([1, 2, 3, 4, 5])}
              className="text-[11px] font-bold text-ink-500 underline underline-offset-2"
            >
              전체 선택
            </button>
            <button
              onClick={() => setScope([])}
              className="text-[11px] font-bold text-ink-500 underline underline-offset-2"
            >
              전체 해제
            </button>
            <Button
              onClick={saveScope}
              disabled={scope.length === 0}
              className="ml-auto"
            >
              저장 ({scope.length})
            </Button>
          </div>
        </section>
      )}

      {/* 범위 미설정 시 가이드 */}
      {scopeLoaded && scope.length === 0 && !scopeOpen && (
        <section className="bg-terracotta-soft/40 border border-terracotta/20 rounded-card p-5 text-center">
          <p className="text-sm text-ink-800 font-semibold mb-3">
            아직 시험 범위가 설정되지 않았어요.
          </p>
          <Button onClick={() => setScopeOpen(true)}>범위 설정하기</Button>
        </section>
      )}

      {/* 단원 탭 (범위 내에서만) */}
      {visibleUnits.length > 0 && (
        <section className="mb-5 -mx-5 px-5 overflow-x-auto">
          <div className="flex gap-2 min-w-max pb-1">
            {visibleUnits.map((u) => (
              <button
                key={u.unit}
                onClick={() => {
                  setUnit(u.unit);
                  setMode("notes");
                }}
                className={cn(
                  "px-3.5 py-2 rounded-chip text-xs font-bold border whitespace-nowrap transition",
                  unit === u.unit
                    ? "bg-ink-900 text-paper border-ink-900"
                    : "bg-white text-ink-700 border-ink-200",
                )}
              >
                {u.unit}. {u.unitTitle.split(" ")[0]}
              </button>
            ))}
          </div>
        </section>
      )}

      {mode === "notes" && note && (
        <section className="space-y-5">
          <div className="bg-white rounded-card p-5 border border-ink-100 shadow-paper-soft">
            <div className="text-[11px] text-ink-500 uppercase tracking-wider font-semibold mb-1">
              단원 {note.unit}
            </div>
            <h2 className="text-lg font-bold text-ink-900 tracking-tight mb-2">
              {note.unitTitle}
            </h2>
            <div className="bg-butter-soft rounded-chip px-3 py-2 text-sm font-semibold text-ink-900">
              💡 {note.oneLine}
            </div>
          </div>

          <div className="bg-white rounded-card p-5 border border-ink-100">
            <h3 className="text-xs font-bold text-ink-500 uppercase tracking-widest mb-3">
              핵심 정리
            </h3>
            <p className="text-sm text-ink-800 leading-relaxed whitespace-pre-line">
              {note.koreanSummary.split("**").map((part, i) =>
                i % 2 === 1 ? (
                  <strong key={i} className="text-ink-900 font-bold">
                    {part}
                  </strong>
                ) : (
                  <span key={i}>{part}</span>
                ),
              )}
            </p>
          </div>

          <div className="bg-white rounded-card p-5 border border-ink-100">
            <h3 className="text-xs font-bold text-ink-500 uppercase tracking-widest mb-3">
              핵심 용어
            </h3>
            <ul className="space-y-2">
              {note.keyTerms.map((t) => (
                <li key={t.term} className="text-sm">
                  <span className="font-bold text-ink-900">{t.term}</span>
                  <span className="text-ink-500"> — </span>
                  <span className="text-ink-700">{t.meaning}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-card p-5 border border-ink-100">
            <h3 className="text-xs font-bold text-ink-500 uppercase tracking-widest mb-3">
              자주 나오는 문제 유형
            </h3>
            <ul className="space-y-1.5">
              {note.commonQuestions.map((q, i) => (
                <li
                  key={i}
                  className="text-sm text-ink-700 pl-4 relative leading-relaxed"
                >
                  <span className="absolute left-0 text-terracotta font-bold">
                    ·
                  </span>
                  {q}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-terracotta-soft/40 rounded-card p-5 border border-terracotta/20">
            <h3 className="text-xs font-bold text-terracotta-deep uppercase tracking-widest mb-3">
              ⚠️ 함정 포인트
            </h3>
            <ul className="space-y-1.5">
              {note.trapWarnings.map((t, i) => (
                <li
                  key={i}
                  className="text-sm text-ink-800 pl-4 relative leading-relaxed"
                >
                  <span className="absolute left-0 text-terracotta-deep font-bold">
                    !
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <Button onClick={() => startQuiz("unit")} fullWidth>
              이 단원만 풀기
            </Button>
            <Button
              onClick={() => startQuiz("scope")}
              variant="secondary"
              fullWidth
            >
              범위 전체 풀기 ({scopedQuestionCount})
            </Button>
          </div>
        </section>
      )}

      {mode === "quiz" && (
        <section className="space-y-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] text-ink-500 font-semibold">
              {idx + 1} / {queue.length} 문항
            </span>
            <span className="text-[11px] text-ink-500 font-semibold">
              {score.correct} / {score.total}
            </span>
          </div>
          <ProgressBar
            value={Math.round(
              ((idx + (revealed ? 1 : 0)) / queue.length) * 100,
            )}
            variant="sage"
          />

          {current && (
            <div className="bg-white rounded-card p-5 border border-ink-100 shadow-paper-soft">
              <Chip variant="lavender">
                단원 {current.unit} · {current.unitTitle}
              </Chip>
              <p className="mt-3 text-[15px] text-ink-900 font-semibold leading-relaxed whitespace-pre-line">
                {current.prompt}
              </p>
              {current.passage && (
                <div className="mt-3 bg-paper rounded-chip p-3 text-[13px] text-ink-800 leading-relaxed whitespace-pre-line border border-ink-100">
                  {current.passage}
                </div>
              )}
              <div className="mt-4 space-y-2">
                {current.choices.map((c, i) => {
                  const isPicked = selected === i;
                  const isAnswer = revealed && i === current.answer;
                  const isWrongPick =
                    revealed && isPicked && i !== current.answer;
                  return (
                    <button
                      key={i}
                      disabled={revealed}
                      onClick={() => setSelected(i)}
                      className={cn(
                        "w-full text-left px-4 py-3 rounded-card border text-sm transition",
                        isAnswer
                          ? "bg-sage border-sage-deep text-ink-900 font-semibold"
                          : isWrongPick
                            ? "bg-terracotta-soft border-terracotta text-ink-900 font-semibold"
                            : isPicked
                              ? "bg-ink-900 text-paper border-ink-900"
                              : "bg-white border-ink-200 text-ink-800",
                      )}
                    >
                      <span className="inline-block w-5 font-bold opacity-70">
                        {["①", "②", "③", "④", "⑤"][i]}
                      </span>
                      {c}
                    </button>
                  );
                })}
              </div>

              {revealed && (
                <div className="mt-4 bg-butter-soft rounded-chip p-3 border border-butter">
                  <div className="text-[11px] uppercase tracking-widest text-ink-500 font-bold mb-1">
                    해설
                  </div>
                  <p className="text-sm text-ink-800 leading-relaxed">
                    {current.explanation}
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 pt-2">
            <Button
              variant="secondary"
              fullWidth
              onClick={() => setMode("notes")}
            >
              정리 보기
            </Button>
            {!revealed ? (
              <Button fullWidth onClick={submit} disabled={selected === null}>
                채점
              </Button>
            ) : (
              <Button fullWidth onClick={next}>
                {idx + 1 >= queue.length ? "정리로 돌아가기" : "다음 문제 →"}
              </Button>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
