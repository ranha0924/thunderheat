"use client";
import { motion } from "framer-motion";
import { GradeResult } from "@/lib/grader";
import { cn } from "@/lib/utils";

interface Props {
  result: GradeResult;
  userInput: string;
  correctAnswer: string;
}

/**
 * Result reveal: lavender for strict-correct, ink+strikethrough for wrong.
 * "비슷한 뜻" gets a soft secondary badge but is treated as wrong (wishlist#1).
 * No red/green anywhere.
 */
export function StrictGrader({ result, userInput, correctAnswer }: Props) {
  const isStrict = result === "strict";
  const isSimilar = result === "similar";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.12 }}
      className={cn(
        "rounded-card p-4 border",
        isStrict ? "bg-lavender border-lavender" : "bg-paper border-ink-100",
      )}
    >
      <div className="flex items-center gap-2 mb-2">
        <span
          className={cn(
            "w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold",
            isStrict ? "bg-ink-900 text-paper" : "bg-ink-900 text-paper",
          )}
          aria-hidden
        >
          {isStrict ? "✓" : "!"}
        </span>
        <span className="text-[13px] font-bold text-ink-900">
          {isStrict ? "정답" : isSimilar ? "비슷한 뜻 — 정확하게" : "다음에 다시"}
        </span>
        {isSimilar && (
          <span className="text-[10px] font-bold text-ink-500 bg-ink-100 px-2 py-0.5 rounded-chip">
            비슷
          </span>
        )}
      </div>
      <div className="text-[13px] text-ink-700">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-ink-400 mr-2">
            정답
          </span>
          <span className="font-semibold text-ink-900">{correctAnswer}</span>
        </div>
        {!isStrict && (
          <div className="mt-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-ink-400 mr-2">
              내 답
            </span>
            <span className="text-ink-400 line-through">{userInput}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
