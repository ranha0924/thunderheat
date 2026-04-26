"use client";
import { motion } from "framer-motion";
import { Question } from "@/lib/types";
import { cn } from "@/lib/utils";

interface Props {
  mode: "correct" | "wrong";
  question: Question;
  userAnswerIdx: number;
  onNext: () => void;
  comboAfter?: number;
}

export function FeedbackOverlay({
  mode,
  question,
  userAnswerIdx,
  onNext,
  comboAfter,
}: Props) {
  const correct = mode === "correct";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="fixed inset-x-0 bottom-0 z-50 flex justify-center pointer-events-none"
    >
      <div className="w-full max-w-[420px] bg-white border-t border-ink-100 rounded-t-[24px] shadow-paper p-5 pointer-events-auto pb-8">
        <motion.div
          initial={correct ? { scale: 1 } : { x: 0 }}
          animate={
            correct
              ? { scale: [1, 1.08, 1] }
              : { x: [0, -3, 3, -3, 3, 0] }
          }
          transition={{ duration: 0.3 }}
          className="flex items-center gap-3 mb-3"
        >
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold",
              correct
                ? "bg-lavender text-ink-900"
                : "bg-ink-900 text-paper",
            )}
            aria-hidden
          >
            {correct ? "✓" : "!"}
          </div>
          <div className="flex-1">
            <div className="text-base font-bold text-ink-900 tracking-tight">
              {correct ? "정답이에요" : "아쉬워요"}
            </div>
            <div className="text-[11px] text-ink-500 mt-0.5">
              {correct
                ? `콤보 ${comboAfter ?? 1} · +10 XP`
                : "약점 노트에 저장됐어요"}
            </div>
          </div>
        </motion.div>

        <div className="bg-paper rounded-card p-3 mb-3 border border-ink-100">
          <div className="text-[10px] uppercase tracking-widest text-ink-400 font-bold mb-1">
            정답
          </div>
          <div className="text-sm text-ink-900 font-semibold">
            <span
              className={cn(
                correct
                  ? "bg-butter/40 px-1 py-0.5 rounded"
                  : "text-lavender-deep",
              )}
            >
              {String.fromCharCode(65 + question.answer)}.{" "}
              {question.choices[question.answer]}
            </span>
          </div>
          {!correct && (
            <div className="text-[12px] text-ink-400 line-through mt-1">
              여러분 답: {String.fromCharCode(65 + userAnswerIdx)}.{" "}
              {question.choices[userAnswerIdx]}
            </div>
          )}
        </div>

        <div className="bg-paper rounded-card p-3 mb-4 border border-ink-100">
          <div className="text-[10px] uppercase tracking-widest text-ink-400 font-bold mb-1">
            시험 단골 함정
          </div>
          <p className="text-[13px] text-ink-700 leading-relaxed">
            {question.explanation}
          </p>
        </div>

        <button
          onClick={onNext}
          className="w-full bg-ink-900 text-paper py-3.5 rounded-card font-bold text-sm tracking-tight"
        >
          다음 →
        </button>
      </div>
    </motion.div>
  );
}
