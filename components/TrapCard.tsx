"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrapPattern } from "@/lib/traps";
import { cn } from "@/lib/utils";

interface Props {
  index: number;
  trap: TrapPattern;
  expanded: boolean;
  onToggle: () => void;
}

export function TrapCard({ index, trap, expanded, onToggle }: Props) {
  const [picked, setPicked] = useState<Record<number, number>>({});

  return (
    <div className="bg-white rounded-card border border-ink-100 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full text-left p-4 flex items-start gap-3"
        aria-expanded={expanded}
      >
        <span className="text-[10px] font-bold text-terracotta-deep bg-terracotta-soft px-2 py-1 rounded-chip shrink-0">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-bold text-ink-900">{trap.title}</div>
          <div className="text-[12px] text-ink-500 mt-1 leading-relaxed">
            {trap.rule}
          </div>
        </div>
        <span className="text-ink-400 text-sm">{expanded ? "▴" : "▾"}</span>
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-3 border-t border-ink-100 pt-3">
              <div className="bg-paper rounded p-3 text-[12px] text-ink-700 leading-relaxed">
                <div className="text-[10px] font-bold text-ink-400 uppercase tracking-widest mb-1">
                  예
                </div>
                {trap.example}
              </div>
              <div className="bg-butter-soft rounded p-3 text-[12px] text-ink-900 leading-relaxed">
                <div className="text-[10px] font-bold text-ink-700 uppercase tracking-widest mb-1">
                  꿀팁
                </div>
                {trap.trick}
              </div>
              <div>
                <div className="text-[10px] font-bold text-ink-400 uppercase tracking-widest mb-2">
                  미니드릴
                </div>
                {trap.drills.map((d, i) => {
                  const p = picked[i];
                  const answered = p !== undefined;
                  return (
                    <div
                      key={i}
                      className="bg-paper rounded-card p-3 mb-2 last:mb-0 border border-ink-100"
                    >
                      <p className="text-[12px] text-ink-900 mb-2">{d.question}</p>
                      <div className="flex flex-col gap-1.5">
                        {d.choices.map((c, j) => {
                          const isCorrect = j === d.answer;
                          const isPicked = p === j;
                          return (
                            <button
                              key={j}
                              disabled={answered}
                              onClick={() =>
                                setPicked({ ...picked, [i]: j })
                              }
                              className={cn(
                                "text-left text-[12px] px-2.5 py-1.5 rounded border",
                                answered && isCorrect
                                  ? "bg-lavender border-lavender text-ink-900 font-semibold"
                                  : answered && isPicked
                                    ? "bg-paper border-ink-200 text-ink-400 line-through"
                                    : "bg-white border-ink-200 text-ink-700",
                              )}
                            >
                              {c}
                            </button>
                          );
                        })}
                      </div>
                      {answered && (
                        <p className="text-[11px] text-ink-500 mt-2 leading-relaxed">
                          {d.explanation}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
