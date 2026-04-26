"use client";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/Button";
import { BlurtPad } from "@/components/BlurtPad";
import { PretestCard } from "@/components/PretestCard";
import { TrapCard } from "@/components/TrapCard";
import FocusTimer from "@/components/FocusTimer";
import AmbientPane from "@/components/AmbientPane";
import { cn } from "@/lib/utils";
import { ALL_QUESTIONS } from "@/lib/questions";
import { Question, FlowPhase } from "@/lib/types";
import {
  newFlow,
  nextPhase,
  extendPhase,
  phaseRemainingMs,
  totalRemainingMs,
  isPastBedtime,
} from "@/lib/flow";
import { interleave, applyWeights } from "@/lib/scheduler";
import { newLeitnerCard, promote, demote, nextCard } from "@/lib/leitner";
import { gradeBlurt, BlurtGrade } from "@/lib/blurt";
import { BLURT_KEYS_BY_LESSON, LESSON_TITLES } from "@/lib/vocab";
import { TRAPS } from "@/lib/traps";
import { getState, setState } from "@/lib/storage";
import { recordAnswer } from "@/lib/session";
import { QuestionCard } from "@/components/QuestionCard";

const PHASE_LABEL: Record<FlowPhase, string> = {
  pretest: "진단",
  blurt: "백지복습",
  drill: "문제 풀이",
  trap: "함정 점검",
  mock: "모의 1세트",
  review: "요약",
  done: "완료",
};

const PHASE_ORDER: FlowPhase[] = [
  "pretest",
  "blurt",
  "drill",
  "trap",
  "mock",
  "review",
];

function fmtTimeOfDay(ts: number) {
  const d = new Date(ts);
  return `${d.getHours()}:${d.getMinutes().toString().padStart(2, "0")}`;
}

function fmtMin(ms: number) {
  return `${Math.max(0, Math.round(ms / 60000))}분`;
}

export default function FlowPage() {
  const [hydrated, setHydrated] = useState(false);
  const [, setTick] = useState(0);

  // Hydrate or start a flow
  useEffect(() => {
    const s = getState();
    if (!s.currentFlow || s.currentFlow.phase === "done") {
      setState({
        ...s,
        currentFlow: newFlow(Date.now(), s.bedtime),
        leitner: [],
      });
    }
    setHydrated(true);
  }, []);

  // 1Hz tick to refresh time displays + bedtime hard-cutoff check
  useEffect(() => {
    const id = setInterval(() => {
      const s = getState();
      if (s.currentFlow && isPastBedtime(s.currentFlow)) {
        setState({
          ...s,
          currentFlow: { ...s.currentFlow, phase: "done" },
        });
        if (typeof window !== "undefined") {
          window.location.href = `/onepager/${s.currentFlow.startedAt}`;
        }
        return;
      }
      setTick((t) => t + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  if (!hydrated) {
    return (
      <main className="px-5 pt-20 text-center text-sm text-ink-500">
        준비 중…
      </main>
    );
  }

  return (
    <main className="px-5 pt-6 pb-32">
      <FlowHeader />
      <div className="mt-4">
        <PhaseRouter onAdvance={() => setTick((t) => t + 1)} />
      </div>
      <div className="fixed bottom-[80px] left-1/2 -translate-x-1/2 w-[calc(100%-32px)] max-w-[380px] z-30">
        <AmbientPane />
      </div>
    </main>
  );
}

function FlowHeader() {
  const state = getState();
  const flow = state.currentFlow!;
  const now = Date.now();
  const remTotal = totalRemainingMs(flow, now);
  const remPhase = phaseRemainingMs(flow, flow.phase);
  const phaseIdx = PHASE_ORDER.indexOf(flow.phase);
  const stepNum = phaseIdx >= 0 ? phaseIdx + 1 : PHASE_ORDER.length;
  const totalSteps = PHASE_ORDER.length;
  const showTimer = flow.phase !== "review" && flow.phase !== "done";

  return (
    <header className="sticky top-0 bg-paper -mx-5 px-5 pt-4 pb-3 z-20 border-b border-ink-100">
      <div className="flex items-baseline justify-between mb-2">
        <p className="text-[11px] text-terracotta font-bold uppercase tracking-widest">
          오늘밤 · {fmtTimeOfDay(flow.startedAt)} → {fmtTimeOfDay(flow.bedtimeAt)}
        </p>
        <span className="text-[10px] text-ink-400 tabular-nums">
          남은 {fmtMin(remTotal)}
        </span>
      </div>
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-base font-extrabold text-ink-900">
          단계 {stepNum} / {totalSteps} · {PHASE_LABEL[flow.phase]}
        </h1>
        <span className="text-[10px] text-ink-500 tabular-nums">
          {fmtMin(remPhase)} 남음
        </span>
      </div>
      <div className="h-1 bg-ink-100 rounded-chip overflow-hidden mb-3">
        <div
          className="h-full bg-ink-900 rounded-chip transition-all"
          style={{ width: `${(stepNum / totalSteps) * 100}%` }}
        />
      </div>
      {showTimer && <FocusTimer startedAtMs={flow.startedAt} />}
    </header>
  );
}

function PhaseRouter({ onAdvance }: { onAdvance: () => void }) {
  const state = getState();
  const phase = state.currentFlow!.phase;

  const advance = (signal: "done" | "skip" | "ranOut") => {
    const s = getState();
    if (!s.currentFlow) return;
    const updated = nextPhase(s.currentFlow, signal);
    setState({ ...s, currentFlow: updated });
    onAdvance();
    if (updated.phase === "done") {
      window.location.href = `/onepager/${s.currentFlow.startedAt}`;
    }
  };

  const extend = () => {
    const s = getState();
    if (!s.currentFlow) return;
    const { flow, ok } = extendPhase(s.currentFlow);
    if (!ok) return;
    setState({ ...s, currentFlow: flow });
    onAdvance();
  };

  switch (phase) {
    case "pretest":
      return <PretestPhase onDone={() => advance("done")} onSkip={() => advance("skip")} />;
    case "blurt":
      return <BlurtPhase onDone={() => advance("done")} onSkip={() => advance("skip")} onExtend={extend} />;
    case "drill":
      return <DrillPhase onDone={() => advance("done")} onSkip={() => advance("skip")} onExtend={extend} />;
    case "trap":
      return <TrapPhase onDone={() => advance("done")} onSkip={() => advance("skip")} />;
    case "mock":
      return <MockPhase onDone={() => advance("done")} onSkip={() => advance("skip")} />;
    case "review":
      return <ReviewPhase onDone={() => advance("done")} />;
    case "done":
      return null;
  }
}

function SkipExtendBar({
  onSkip,
  onExtend,
}: {
  onSkip: () => void;
  onExtend?: () => void;
}) {
  return (
    <div className="flex gap-2 mt-3">
      <button
        onClick={onSkip}
        className="flex-1 bg-white border border-ink-200 rounded-card py-2.5 text-[12px] font-bold text-ink-700"
      >
        건너뛰기
      </button>
      {onExtend && (
        <button
          onClick={onExtend}
          className="flex-1 bg-white border border-ink-200 rounded-card py-2.5 text-[12px] font-bold text-ink-700"
        >
          5분 더
        </button>
      )}
    </div>
  );
}

// ---------- Phase 1: Pretest ----------
function PretestPhase({
  onDone,
  onSkip,
}: {
  onDone: () => void;
  onSkip: () => void;
}) {
  const [items] = useState<Question[]>(() =>
    [...ALL_QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 8),
  );
  const [idx, setIdx] = useState(0);
  const [results, setResults] = useState<{ qid: string; correct: boolean }[]>(
    [],
  );

  const onAnswer = (correct: boolean) => {
    const next = [...results, { qid: items[idx].id, correct }];
    setResults(next);
    if (idx + 1 >= items.length) {
      const weights: Record<string, number> = {};
      for (const r of next) weights[r.qid] = r.correct ? 1 : 3;
      const s = getState();
      setState({
        ...s,
        pretests: [
          ...s.pretests,
          {
            id: `pre_${Date.now()}`,
            sessionId: `${s.currentFlow?.startedAt ?? Date.now()}`,
            items: next,
            weights,
          },
        ],
      });
      onDone();
    } else {
      setIdx(idx + 1);
    }
  };

  return (
    <div>
      <p className="text-[12px] text-ink-500 mb-3 leading-relaxed">
        8문제로 약점 확인. 점수는 안 보여드려요.
      </p>
      {items[idx] && <PretestCard question={items[idx]} onAnswer={onAnswer} />}
      <SkipExtendBar onSkip={onSkip} />
    </div>
  );
}

// ---------- Phase 2: Blurt ----------
function BlurtPhase({
  onDone,
  onSkip,
  onExtend,
}: {
  onDone: () => void;
  onSkip: () => void;
  onExtend: () => void;
}) {
  const [grade, setGrade] = useState<BlurtGrade | null>(null);
  const [lesson, setLesson] = useState(1);

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

  return (
    <div>
      {!grade ? (
        <>
          <div className="flex gap-1.5 mb-3 flex-wrap">
            {[1, 2, 4].map((l) => (
              <button
                key={l}
                onClick={() => setLesson(l)}
                className={cn(
                  "px-3 py-1.5 rounded-chip text-xs font-bold border",
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
          <BlurtPad onSubmit={submit} durationSec={180} />
        </>
      ) : (
        <BlurtSummary grade={grade} onContinue={onDone} />
      )}
      <SkipExtendBar onSkip={onSkip} onExtend={onExtend} />
    </div>
  );
}

function BlurtSummary({
  grade,
  onContinue,
}: {
  grade: BlurtGrade;
  onContinue: () => void;
}) {
  return (
    <div className="bg-white rounded-card p-4 border border-ink-100">
      <div className="text-[11px] uppercase tracking-widest font-bold text-ink-400 mb-1">
        채점
      </div>
      <div className="text-2xl font-extrabold text-ink-900 mb-2 tabular-nums">
        {grade.matched.length} / {grade.matched.length + grade.missed.length}
      </div>
      <div className="bg-lavender rounded p-2 mb-2">
        <div className="text-[10px] font-bold uppercase tracking-widest text-ink-700 mb-1">
          ✓ 떠올림
        </div>
        <div className="flex flex-wrap gap-1">
          {grade.matched.length === 0 ? (
            <span className="text-[12px] text-ink-700">없음</span>
          ) : (
            grade.matched.map((m) => (
              <span
                key={m}
                className="text-[12px] font-semibold text-ink-900 bg-paper/60 px-2 py-0.5 rounded-chip"
              >
                {m}
              </span>
            ))
          )}
        </div>
      </div>
      <div className="bg-paper rounded p-2 mb-3 border border-ink-100">
        <div className="text-[10px] font-bold uppercase tracking-widest text-ink-400 mb-1">
          놓침
        </div>
        <div className="flex flex-wrap gap-1">
          {grade.missed.length === 0 ? (
            <span className="text-[12px] text-ink-700">완벽</span>
          ) : (
            grade.missed.map((m) => (
              <span
                key={m}
                className="text-[12px] font-semibold text-ink-400 line-through"
              >
                {m}
              </span>
            ))
          )}
        </div>
      </div>
      <Button fullWidth onClick={onContinue}>
        계속
      </Button>
    </div>
  );
}

// ---------- Phase 3: Drill (Leitner + Interleave) ----------
function DrillPhase({
  onDone,
  onSkip,
  onExtend,
}: {
  onDone: () => void;
  onSkip: () => void;
  onExtend: () => void;
}) {
  const queue = useMemo(() => {
    const s = getState();
    const weights = s.pretests[s.pretests.length - 1]?.weights ?? {};
    const ordered = applyWeights(ALL_QUESTIONS, weights);
    return interleave(ordered).slice(0, 12);
  }, []);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [reveal, setReveal] = useState(false);

  // initialize Leitner cards once
  useEffect(() => {
    const s = getState();
    if (!s.leitner.length) {
      const cards = queue.map((q) => newLeitnerCard(q.id));
      setState({ ...s, leitner: cards });
    }
  }, [queue]);

  const cur = queue[idx];

  const submit = () => {
    if (selected === null || !cur) return;
    setReveal(true);
    const s = getState();
    const isCorrect = selected === cur.answer;
    const card = s.leitner.find((c) => c.id === cur.id);
    const updated = card
      ? isCorrect
        ? promote(card)
        : demote(card)
      : isCorrect
        ? promote(newLeitnerCard(cur.id))
        : demote(newLeitnerCard(cur.id));
    const nextLeitner = s.leitner.some((c) => c.id === cur.id)
      ? s.leitner.map((c) => (c.id === cur.id ? updated : c))
      : [...s.leitner, updated];
    const newState = recordAnswer(s, cur.id, isCorrect);
    setState({ ...newState, leitner: nextLeitner });
  };

  const goNext = () => {
    setReveal(false);
    setSelected(null);
    // Try to inject a Leitner-due card every 3 cards
    const s = getState();
    const dueCard = idx > 0 && idx % 3 === 0 ? nextCard(s.leitner) : undefined;
    if (dueCard) {
      const dueQ = ALL_QUESTIONS.find((q) => q.id === dueCard.id);
      if (dueQ && !queue.slice(idx + 1).find((q) => q.id === dueQ.id)) {
        queue.splice(idx + 1, 0, dueQ);
      }
    }
    if (idx + 1 >= queue.length) {
      onDone();
    } else {
      setIdx(idx + 1);
    }
  };

  if (!cur) {
    return <p className="text-sm text-ink-500">문제 준비 중…</p>;
  }

  return (
    <div>
      <p className="text-[11px] text-ink-500 mb-3 tabular-nums">
        {idx + 1} / {queue.length} · 유형 섞임
      </p>
      <QuestionCard
        question={cur}
        selectedIdx={selected}
        onSelect={setSelected}
        disabled={reveal}
      />
      <div className="mt-3">
        {!reveal ? (
          <Button fullWidth onClick={submit} disabled={selected === null}>
            확인
          </Button>
        ) : (
          <div className="space-y-2">
            <div
              className={cn(
                "rounded-card p-3 border text-[13px]",
                selected === cur.answer
                  ? "bg-lavender border-lavender text-ink-900"
                  : "bg-paper border-ink-100 text-ink-700",
              )}
            >
              <div className="font-bold mb-1">
                {selected === cur.answer ? "정답" : "다음에 다시"}
              </div>
              <div>
                정답:{" "}
                <span className="font-semibold">
                  {cur.choices[cur.answer]}
                </span>
              </div>
              <p className="text-[12px] text-ink-500 mt-1.5 leading-relaxed">
                {cur.explanation}
              </p>
            </div>
            <Button fullWidth onClick={goNext}>
              다음
            </Button>
          </div>
        )}
      </div>
      <SkipExtendBar onSkip={onSkip} onExtend={onExtend} />
    </div>
  );
}

// ---------- Phase 4: Trap ----------
function TrapPhase({
  onDone,
  onSkip,
}: {
  onDone: () => void;
  onSkip: () => void;
}) {
  const [openId, setOpenId] = useState<string | null>(TRAPS[0]?.id ?? null);

  return (
    <div>
      <p className="text-[12px] text-ink-500 mb-3 leading-relaxed">
        함정 8개를 빠르게 훑어요. 미니드릴은 1–2개만 풀어도 OK.
      </p>
      <div className="space-y-2">
        {TRAPS.map((t, i) => (
          <TrapCard
            key={t.id}
            index={i}
            trap={t}
            expanded={openId === t.id}
            onToggle={() => setOpenId(openId === t.id ? null : t.id)}
          />
        ))}
      </div>
      <div className="mt-3">
        <Button fullWidth onClick={onDone}>
          함정 점검 완료
        </Button>
      </div>
      <SkipExtendBar onSkip={onSkip} />
    </div>
  );
}

// ---------- Phase 5: Mock ----------
function MockPhase({
  onDone,
  onSkip,
}: {
  onDone: () => void;
  onSkip: () => void;
}) {
  const [picked, setPicked] = useState<Record<number, number>>({});
  const items = useMemo(
    () =>
      [...ALL_QUESTIONS]
        .filter((q) => q.type === "topic" || q.type === "title" || q.type === "summary")
        .sort(() => Math.random() - 0.5)
        .slice(0, 3),
    [],
  );

  const allAnswered = items.every((_, i) => picked[i] !== undefined);

  return (
    <div>
      <p className="text-[12px] text-ink-500 mb-3 leading-relaxed">
        3문제 모의. 결과는 채점만, 점수에 매달리지 마세요.
      </p>
      <div className="space-y-3">
        {items.map((q, i) => {
          const p = picked[i];
          const answered = p !== undefined;
          return (
            <div
              key={q.id}
              className="bg-white rounded-card p-3 border border-ink-100"
            >
              <p className="text-[13px] font-bold text-ink-900 mb-2">
                {q.question}
              </p>
              <ul className="space-y-1.5">
                {q.choices.map((c, j) => {
                  const isSel = p === j;
                  const isCorrect = j === q.answer;
                  return (
                    <li key={j}>
                      <button
                        disabled={answered}
                        onClick={() =>
                          setPicked({ ...picked, [i]: j })
                        }
                        className={cn(
                          "w-full text-left text-[12px] px-2.5 py-1.5 rounded border",
                          answered && isCorrect
                            ? "bg-lavender border-lavender text-ink-900 font-semibold"
                            : answered && isSel
                              ? "bg-paper border-ink-200 text-ink-400 line-through"
                              : "bg-paper border-ink-200 text-ink-700",
                        )}
                      >
                        {String.fromCharCode(65 + j)}. {c}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
      <div className="mt-3">
        <Button fullWidth onClick={onDone} disabled={!allAnswered}>
          모의 종료
        </Button>
      </div>
      <SkipExtendBar onSkip={onSkip} />
    </div>
  );
}

// ---------- Phase 6: Review ----------
function ReviewPhase({ onDone }: { onDone: () => void }) {
  const s = getState();
  const startedAt = s.currentFlow?.startedAt ?? Date.now();

  return (
    <div className="text-center">
      <div className="text-3xl mb-2" aria-hidden>
        🌙
      </div>
      <h2 className="text-lg font-extrabold tracking-tight text-ink-900 mb-2">
        마지막: A4 한 장 요약
      </h2>
      <p className="text-[12px] text-ink-500 mb-5 leading-relaxed">
        시험 직전 5분에 다시 보세요. 자정 전에 자는 게 +20% 회상이에요.
      </p>
      <Button fullWidth onClick={onDone}>
        요약 보러 가기
      </Button>
      <a
        href={`/onepager/${startedAt}`}
        className="block mt-3 text-[12px] text-ink-400 underline"
      >
        지금 바로 열기
      </a>
    </div>
  );
}
