"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ALL_QUESTIONS } from "@/lib/questions";
import { Question } from "@/lib/types";
import { PretestCard } from "@/components/PretestCard";
import { getState, setState } from "@/lib/storage";

const SAMPLE_SIZE = 8;

function pickSample(pool: Question[]): Question[] {
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, SAMPLE_SIZE);
}

export default function PretestPage() {
  const router = useRouter();
  const [items] = useState<Question[]>(() => pickSample(ALL_QUESTIONS));
  const [idx, setIdx] = useState(0);
  const [results, setResults] = useState<{ qid: string; correct: boolean }[]>(
    [],
  );
  const [done, setDone] = useState(false);

  const onAnswer = (correct: boolean) => {
    const next = [...results, { qid: items[idx].id, correct }];
    setResults(next);
    if (idx + 1 < items.length) {
      setIdx(idx + 1);
    } else {
      finish(next);
    }
  };

  const finish = (final: { qid: string; correct: boolean }[]) => {
    const weights: Record<string, number> = {};
    for (const r of final) weights[r.qid] = r.correct ? 1 : 3;
    const s = getState();
    setState({
      ...s,
      pretests: [
        ...s.pretests,
        {
          id: `pre_${Date.now()}`,
          sessionId: `${s.currentFlow?.startedAt ?? Date.now()}`,
          items: final,
          weights,
        },
      ],
    });
    setDone(true);
  };

  const goNext = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      // If launched from /flow, the flow wrapper will pick this up via storage.
      router.push("/study?mode=interleave");
    } else {
      router.push("/study");
    }
  };

  const total = items.length;
  const filled = results.length;

  return (
    <main className="px-5 pt-10 pb-6">
      <header className="mb-5">
        <p className="text-[11px] text-terracotta font-bold uppercase tracking-widest mb-1">
          60초 진단
        </p>
        <h1 className="text-2xl font-extrabold tracking-tight">
          어디부터 약한지 빠르게 확인
        </h1>
        <p className="text-[12px] text-ink-500 mt-2 leading-relaxed">
          점수는 보여드리지 않아요. 약한 부분에 시간을 더 쓸게요.
          (Richland, Kornell &amp; Kao 2009 — pretest 자체가 학습을 돕는다)
        </p>
      </header>

      <div className="mb-4">
        <div className="flex justify-between text-[11px] text-ink-500 font-medium mb-1">
          <span>
            {Math.min(idx + 1, total)} / {total}
          </span>
          <span>진단 진행 중</span>
        </div>
        <div className="h-1 bg-ink-100 rounded-chip overflow-hidden">
          <div
            className="h-full bg-ink-900 rounded-chip transition-all"
            style={{ width: `${(filled / total) * 100}%` }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div
            key={items[idx]?.id ?? "loading"}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            {items[idx] && (
              <PretestCard question={items[idx]} onAnswer={onAnswer} />
            )}
          </motion.div>
        ) : (
          <motion.div
            key="done"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.18 }}
            className="bg-white rounded-card p-5 border border-ink-100 text-center"
          >
            <div className="text-[11px] text-ink-400 font-bold uppercase tracking-widest mb-2">
              진단 완료
            </div>
            <p className="text-base font-bold text-ink-900 mb-1">
              약한 부분으로 학습을 맞춰드릴게요
            </p>
            <p className="text-[12px] text-ink-500 mb-5 leading-relaxed">
              점수는 일부러 보여드리지 않아요. 부담은 시험 때만.
            </p>
            <button
              onClick={goNext}
              className="w-full bg-ink-900 text-paper py-3 rounded-card font-bold text-sm"
            >
              학습 시작
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
