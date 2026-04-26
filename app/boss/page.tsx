"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QuestionCard } from "@/components/QuestionCard";
import { FeedbackOverlay } from "@/components/FeedbackOverlay";
import { Button } from "@/components/Button";
import { EmptyState } from "@/components/EmptyState";
import { ALL_QUESTIONS as ALL } from "@/lib/questions";
import { Question } from "@/lib/types";
import { getState, setState } from "@/lib/storage";
import { recordAnswer } from "@/lib/session";

export default function Boss() {
  const [bossList, setBossList] = useState<Question[]>([]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);

  useEffect(() => {
    const s = getState();
    const ids = new Set(s.weakness.filter((w) => w.failures >= 1).map((w) => w.id));
    setBossList(ALL.filter((q) => ids.has(q.id)));
  }, []);

  if (bossList.length === 0) {
    return (
      <main className="px-5 pt-10">
        <header className="mb-5">
          <h1 className="text-2xl font-extrabold tracking-tight">약점 보스</h1>
          <p className="text-sm text-ink-500 mt-2">
            3번 이상 틀린 단어가 보스로 등장해요.
          </p>
        </header>
        <EmptyState
          variant="empty"
          title="약점이 없어요"
          body="문제를 풀고 틀리면 여기에 모여요. 먼저 학습부터 시작해 보세요."
          cta={{ label: "학습 시작", href: "/study" }}
        />
      </main>
    );
  }

  const current = bossList[idx];

  const submit = () => {
    if (selected === null) return;
    const isCorrect = selected === current.answer;
    const next = recordAnswer(getState(), current.id, isCorrect);
    setState(next);
    setFeedback(isCorrect ? "correct" : "wrong");
  };

  const nextQ = () => {
    setFeedback(null);
    setSelected(null);
    if (idx + 1 >= bossList.length) {
      window.location.href = "/results";
    } else {
      setIdx(idx + 1);
    }
  };

  return (
    <main className="px-5 pt-8 pb-32 relative">
      <header className="mb-5">
        <p className="text-[11px] text-terracotta font-bold uppercase tracking-widest mb-1">
          BOSS · {idx + 1} / {bossList.length}
        </p>
        <h1 className="text-xl font-extrabold tracking-tight">
          3번 이상 틀린 문제
        </h1>
      </header>

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
            size="boss"
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
        />
      )}
    </main>
  );
}
