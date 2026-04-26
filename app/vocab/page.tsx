"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Chip } from "@/components/Chip";
import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";
import { VOCAB, VocabEntry, vocabByLesson } from "@/lib/vocab";

const KEY = "thunder_vocab_v1";

interface MarkedState {
  known: string[];
  starred: string[];
}

function loadMarked(): MarkedState {
  if (typeof window === "undefined") return { known: [], starred: [] };
  try {
    return JSON.parse(localStorage.getItem(KEY) || "") as MarkedState;
  } catch {
    return { known: [], starred: [] };
  }
}

function saveMarked(m: MarkedState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(m));
}

export default function VocabPage() {
  const [marked, setMarked] = useState<MarkedState>({ known: [], starred: [] });
  const [filter, setFilter] = useState<"all" | "starred" | "unknown">("all");
  const [lessonFilter, setLessonFilter] = useState<number | "all">("all");
  const [flippedId, setFlippedId] = useState<string | null>(null);

  useEffect(() => setMarked(loadMarked()), []);

  const groups = vocabByLesson();
  const lessons = Object.keys(groups)
    .map(Number)
    .sort((a, b) => a - b);

  const items: VocabEntry[] = VOCAB.filter((v) => {
    if (lessonFilter !== "all" && v.lesson !== lessonFilter) return false;
    if (filter === "starred" && !marked.starred.includes(v.word)) return false;
    if (filter === "unknown" && marked.known.includes(v.word)) return false;
    return true;
  });

  const toggleKnown = (word: string) => {
    const next = {
      ...marked,
      known: marked.known.includes(word)
        ? marked.known.filter((w) => w !== word)
        : [...marked.known, word],
    };
    setMarked(next);
    saveMarked(next);
  };

  const toggleStar = (word: string) => {
    const next = {
      ...marked,
      starred: marked.starred.includes(word)
        ? marked.starred.filter((w) => w !== word)
        : [...marked.starred, word],
    };
    setMarked(next);
    saveMarked(next);
  };

  const knownPct = Math.round((marked.known.length / VOCAB.length) * 100);

  return (
    <main className="px-5 pt-10 pb-6">
      <header className="mb-5">
        <p className="text-[11px] text-ink-500 font-semibold mb-1">VOCAB NOTE</p>
        <h1 className="text-2xl font-extrabold tracking-tight">단어장</h1>
        <p className="text-sm text-ink-500 mt-2">
          총 {VOCAB.length}개 · 외운 단어 {marked.known.length}개 ({knownPct}%)
        </p>
      </header>

      <div className="flex gap-1.5 mb-3 flex-wrap">
        <FilterChip
          label="전체"
          active={filter === "all"}
          onClick={() => setFilter("all")}
        />
        <FilterChip
          label="★ 즐겨찾기"
          active={filter === "starred"}
          onClick={() => setFilter("starred")}
        />
        <FilterChip
          label="아직 모르는"
          active={filter === "unknown"}
          onClick={() => setFilter("unknown")}
        />
      </div>

      <div className="flex gap-1.5 mb-5 flex-wrap">
        <LessonChip
          label="ALL"
          active={lessonFilter === "all"}
          onClick={() => setLessonFilter("all")}
        />
        {lessons.map((l) => (
          <LessonChip
            key={l}
            label={`L${l}`}
            active={lessonFilter === l}
            onClick={() => setLessonFilter(l)}
          />
        ))}
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16 text-sm text-ink-400">
          해당하는 단어가 없어요
        </div>
      ) : (
        <ul className="space-y-2">
          {items.map((v) => {
            const known = marked.known.includes(v.word);
            const starred = marked.starred.includes(v.word);
            const flipped = flippedId === v.word;
            return (
              <li key={v.word}>
                <div
                  className={cn(
                    "bg-white rounded-card p-4 border transition relative",
                    known
                      ? "border-ink-100 opacity-60"
                      : "border-ink-100",
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <button
                      onClick={() => setFlippedId(flipped ? null : v.word)}
                      className="flex-1 text-left"
                    >
                      <div className="text-base font-bold text-ink-900 tracking-tight">
                        {v.word}
                      </div>
                      <AnimatePresence mode="wait">
                        {flipped ? (
                          <motion.div
                            key="back"
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="mt-2"
                          >
                            <div className="text-sm text-ink-700 font-semibold">
                              {v.meaning}
                            </div>
                            <div className="text-[12px] text-ink-500 mt-2 italic leading-relaxed">
                              {`"${v.context}"`}
                            </div>
                            <div className="text-[11px] text-terracotta-deep bg-terracotta-soft rounded-card px-2 py-1.5 mt-2">
                              💡 {v.mnemonic}
                            </div>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="front"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="text-[11px] text-ink-400 mt-1"
                          >
                            탭하면 뜻이 보여요
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                    <div className="flex flex-col gap-1.5 shrink-0">
                      <Chip variant="default" size="sm">
                        L{v.lesson}
                      </Chip>
                      <button
                        onClick={() => toggleStar(v.word)}
                        aria-label={starred ? "즐겨찾기 해제" : "즐겨찾기"}
                        className={cn(
                          "w-7 h-7 rounded-chip flex items-center justify-center text-sm",
                          starred
                            ? "bg-butter text-ink-900"
                            : "bg-ink-100 text-ink-400",
                        )}
                      >
                        {starred ? "★" : "☆"}
                      </button>
                    </div>
                  </div>

                  {flipped && (
                    <div className="mt-3 flex gap-2">
                      <Button
                        variant={known ? "secondary" : "primary"}
                        fullWidth
                        onClick={() => toggleKnown(v.word)}
                      >
                        {known ? "다시 학습" : "외웠어요"}
                      </Button>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-3 py-1.5 rounded-chip text-xs font-bold border transition",
        active
          ? "bg-ink-900 text-paper border-ink-900"
          : "bg-white text-ink-700 border-ink-200",
      )}
    >
      {label}
    </button>
  );
}

function LessonChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-2.5 py-1 rounded-chip text-[11px] font-bold border transition",
        active
          ? "bg-lavender-deep text-paper border-lavender-deep"
          : "bg-white text-ink-500 border-ink-200",
      )}
    >
      {label}
    </button>
  );
}
