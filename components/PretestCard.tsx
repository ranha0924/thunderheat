"use client";
import { useState } from "react";
import { Question } from "@/lib/types";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

interface Props {
  question: Question;
  onAnswer: (correct: boolean) => void;
}

/**
 * Lightweight cued-recall card for pre-test (60s diagnostic).
 * No score shown per A#7 framing — answers reweight pool only.
 */
export function PretestCard({ question, onAnswer }: Props) {
  const [picked, setPicked] = useState<number | null>(null);

  const cue = (() => {
    if (question.type === "vocab_en_ko") return question.word;
    if (question.type === "vocab_ko_en") return question.meaning;
    return question.question;
  })();

  const submit = () => {
    if (picked === null) return;
    onAnswer(picked === question.answer);
    setPicked(null);
  };

  return (
    <div className="bg-white rounded-card p-4 border border-ink-100">
      <div className="text-[11px] text-ink-400 font-bold uppercase tracking-widest mb-2">
        간단 확인
      </div>
      <div className="text-base font-bold text-ink-900 mb-3 break-words">
        {cue}
      </div>
      <ul className="space-y-2 mb-3">
        {question.choices.map((c, i) => (
          <li key={i}>
            <button
              onClick={() => setPicked(i)}
              className={cn(
                "w-full text-left p-2.5 rounded-card border text-[13px] transition",
                picked === i
                  ? "border-ink-900 bg-ink-100/50"
                  : "border-ink-100 bg-paper",
              )}
            >
              <span className="text-ink-500 font-bold mr-2">
                {String.fromCharCode(65 + i)}
              </span>
              {c}
            </button>
          </li>
        ))}
      </ul>
      <Button fullWidth onClick={submit} disabled={picked === null}>
        다음
      </Button>
    </div>
  );
}
