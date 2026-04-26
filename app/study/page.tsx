"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { QuestionCard } from "@/components/QuestionCard";
import { FeedbackOverlay } from "@/components/FeedbackOverlay";
import { Chip } from "@/components/Chip";
import { ProgressBar } from "@/components/ProgressBar";
import { Button } from "@/components/Button";
import { ALL_QUESTIONS as ALL } from "@/lib/questions";
import { Question } from "@/lib/types";
import { getState, setState } from "@/lib/storage";
import { recordAnswer } from "@/lib/session";
import { dueNow } from "@/lib/srs";

export default function Study() {
  const router = useRouter();
  const [queue, setQueue] = useState<Question[]>([]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [combo, setCombo] = useState(0);
  const [sessionXP, setSessionXP] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [reviewedIds] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    const s = getState();
    setCombo(s.combo);
    setSessionXP(s.xp.sessionXP);
    // build initial queue: 10 fresh + due weakness items
    const dueIds = new Set(dueNow(s.weakness).map((w) => w.id));
    const dues = ALL.filter((q) => dueIds.has(q.id));
    const fresh = ALL.filter((q) => !dueIds.has(q.id) && !s.progress[q.id]?.correct).slice(0, 10);
    let q = [...dues, ...fresh];
    if (q.length === 0) q = ALL.slice(0, 10);
    setQueue(q);
  }, []);

  const current = queue[idx];
  const total = queue.length;

  const submit = () => {
    if (selected === null || !current) return;
    const isCorrect = selected === current.answer;
    const next = recordAnswer(getState(), current.id, isCorrect);
    setState(next);
    setCombo(next.combo);
    setSessionXP(next.xp.sessionXP);
    setFeedback(isCorrect ? "correct" : "wrong");
  };

  const nextQ = () => {
    setFeedback(null);
    setSelected(null);
    // every 5 questions, inject a due weakness
    let nextQueue = queue;
    const nextIdx = idx + 1;
    if (idx > 0 && idx % 5 === 0) {
      const s = getState();
      const due = dueNow(s.weakness).find((w) => !reviewedIds.has(w.id));
      if (due) {
        const q = ALL.find((x) => x.id === due.id);
        if (q && !nextQueue.slice(nextIdx).find((x) => x.id === q.id)) {
          nextQueue = [...nextQueue.slice(0, nextIdx), q, ...nextQueue.slice(nextIdx)];
          setQueue(nextQueue);
          setReviewCount((c) => c + 1);
          reviewedIds.add(q.id);
        }
      }
    }
    if (nextIdx >= nextQueue.length) {
      router.push("/results");
    } else {
      setIdx(nextIdx);
    }
  };

  if (!current) {
    return (
      <main className="px-5 pt-20 text-center">
        <p className="text-sm text-ink-500">준비 중…</p>
      </main>
    );
  }

  return (
    <main className="px-5 pt-8 pb-32 relative">
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => router.push("/home")}
          className="text-xs text-ink-500 font-semibold"
        >
          ← 그만하기
        </button>
        <div className="flex gap-1.5">
          <Chip variant="terracotta" size="sm">
            🔥 콤보 {combo}
          </Chip>
          <Chip variant="butter" size="sm">
            +{sessionXP} XP
          </Chip>
        </div>
      </div>

      <ProgressBar
        value={idx}
        max={total}
        variant="sage"
        showLabel
        label={`${idx + 1} / ${total}`}
        className="mb-5"
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.18 }}
        >
          <QuestionCard
            question={current}
            selectedIdx={selected}
            onSelect={setSelected}
            disabled={feedback !== null}
          />
        </motion.div>
      </AnimatePresence>

      {feedback === null && (
        <Button
          fullWidth
          className="mt-6"
          onClick={submit}
          disabled={selected === null}
        >
          확인
        </Button>
      )}

      {feedback && (
        <FeedbackOverlay
          mode={feedback}
          question={current}
          userAnswerIdx={selected ?? 0}
          onNext={nextQ}
          comboAfter={combo}
        />
      )}

      {reviewCount > 0 && (
        <p className="text-[10px] text-ink-400 text-center mt-3">
          복습 {reviewCount}회 추가됨
        </p>
      )}
    </main>
  );
}
