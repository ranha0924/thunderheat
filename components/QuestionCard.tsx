"use client";
import { Question } from "@/lib/types";
import { cn } from "@/lib/utils";

interface Props {
  question: Question;
  selectedIdx: number | null;
  onSelect: (idx: number) => void;
  disabled?: boolean;
  size?: "default" | "boss";
}

export function QuestionCard({
  question,
  selectedIdx,
  onSelect,
  disabled,
  size = "default",
}: Props) {
  const big = size === "boss";
  return (
    <div
      className={cn(
        "bg-white rounded-card p-5 shadow-paper border",
        big ? "border-[1.5px] border-terracotta" : "border-ink-100",
      )}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[10px] uppercase font-bold tracking-widest text-ink-400">
          {labelFor(question.type)}
        </span>
        {big && (
          <span className="text-[10px] font-bold tracking-widest text-terracotta-deep bg-terracotta-soft px-2 py-0.5 rounded-chip">
            보스
          </span>
        )}
      </div>

      <ContextBlock question={question} />

      <p className="text-sm font-semibold text-ink-900 mb-4 leading-relaxed">
        {question.question}
      </p>

      <ul className="space-y-2">
        {question.choices.map((c, i) => {
          const isSelected = selectedIdx === i;
          return (
            <li key={i}>
              <button
                disabled={disabled}
                onClick={() => onSelect(i)}
                className={cn(
                  "w-full text-left p-3 rounded-card border transition flex items-start gap-3",
                  isSelected
                    ? "border-ink-900 bg-ink-100/50"
                    : "border-ink-100 bg-white hover:border-ink-200",
                  disabled && "cursor-not-allowed opacity-90",
                )}
              >
                <span
                  className={cn(
                    "w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5",
                    isSelected
                      ? "bg-ink-900 border-ink-900 text-paper"
                      : "border-ink-200 text-ink-500",
                  )}
                >
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="text-sm text-ink-900 leading-relaxed flex-1">
                  {c}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function ContextBlock({ question }: { question: Question }) {
  switch (question.type) {
    case "vocab_en_ko":
      return (
        <p className="text-sm text-ink-700 mb-3 leading-relaxed bg-ink-100/40 rounded-card p-3">
          {question.context.split(question.word).map((part, i, arr) => (
            <span key={i}>
              {part}
              {i < arr.length - 1 && (
                <span className="font-bold underline decoration-2 underline-offset-4">
                  {question.word}
                </span>
              )}
            </span>
          ))}
        </p>
      );
    case "vocab_ko_en":
      return (
        <p className="text-base font-bold text-ink-900 mb-3 bg-butter-soft rounded-card p-3 text-center">
          {question.meaning}
        </p>
      );
    case "blank":
      return (
        <p className="text-sm text-ink-700 mb-3 leading-relaxed bg-ink-100/40 rounded-card p-3">
          {question.sentence}
        </p>
      );
    case "grammar_ox":
      return (
        <p className="text-sm text-ink-700 mb-3 leading-relaxed bg-ink-100/40 rounded-card p-3">
          {question.sentence}
        </p>
      );
    case "grammar_5":
      return (
        <p className="text-sm text-ink-700 mb-3 leading-relaxed bg-ink-100/40 rounded-card p-3">
          {question.passage}
        </p>
      );
    case "summary":
      return (
        <p className="text-sm text-ink-700 mb-3 leading-relaxed bg-lavender/40 rounded-card p-3">
          {question.summary}
        </p>
      );
    case "topic":
    case "title":
      return (
        <p className="text-[11px] text-ink-500 mb-3 italic">
          본문 전체를 바탕으로 답하세요.
        </p>
      );
  }
}

function labelFor(type: Question["type"]): string {
  const map: Record<Question["type"], string> = {
    vocab_en_ko: "어휘 영→한",
    vocab_ko_en: "어휘 한→영",
    blank: "빈칸",
    grammar_ox: "어법 OX",
    grammar_5: "어법 5지",
    summary: "요약",
    topic: "주제",
    title: "제목",
  };
  return map[type];
}
