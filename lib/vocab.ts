import vocabJson from "./vocab.json";

export interface VocabEntry {
  word: string;
  meaning: string;
  lesson: number;
  context: string;
  mnemonic: string;
  /** Exact alternate spellings/forms accepted as strict-correct in typed grading. */
  strict?: string[];
  /** Common confusables — flagged as "비슷한 뜻" but not correct (wishlist#1). */
  similar?: string[];
}

export const VOCAB: VocabEntry[] = vocabJson as VocabEntry[];

export function vocabByLesson(): Record<number, VocabEntry[]> {
  const map: Record<number, VocabEntry[]> = {};
  for (const v of VOCAB) {
    if (!map[v.lesson]) map[v.lesson] = [];
    map[v.lesson].push(v);
  }
  return map;
}

/** Lesson titles used by /flow + /pretest + /onepager. */
export const LESSON_TITLES: Record<number, string> = {
  1: "The Power of Friendliness",
  2: "You and I Become We — Whakapapa",
  3: "Let It Be Green",
  4: "A Better Future for Coffee Waste",
};

/** Source bullets per lesson — used by /blurt scoring. */
export const BLURT_KEYS_BY_LESSON: Record<
  number,
  { label: string; aliases?: string[]; kind?: "vocab" | "phrase" }[]
> = {
  1: [
    { label: "kindness", aliases: ["친절", "친절함"] },
    { label: "cooperation", aliases: ["협력"] },
    { label: "evolutionary", aliases: ["진화"] },
    { label: "ancestor", aliases: ["조상"] },
    { label: "Brian Hare" },
    { label: "Sparky" },
    { label: "bonobo" },
    { label: "Neanderthal" },
    { label: "Homo sapiens", kind: "phrase" },
    { label: "두 컵 실험", kind: "phrase" },
  ],
  2: [
    { label: "whakapapa" },
    { label: "Nani Tama", kind: "phrase" },
    { label: "Murupara" },
    { label: "genealogy", aliases: ["가계도", "족보"] },
    { label: "chanting", aliases: ["찬송"] },
    { label: "determined", aliases: ["결심"] },
    { label: "shaky hands", kind: "phrase" },
  ],
  4: [
    { label: "circular economy", kind: "phrase" },
    { label: "spent coffee grounds", kind: "phrase", aliases: ["SCGs"] },
    { label: "methane", aliases: ["메탄"] },
    { label: "fertilizer", aliases: ["비료"] },
    { label: "landfill" },
    { label: "incinerate", aliases: ["소각"] },
    { label: "coffee logs", kind: "phrase" },
    { label: "reusable cups", kind: "phrase" },
    { label: "0.2 percent", kind: "phrase" },
    { label: "sustainable", aliases: ["지속가능"] },
  ],
};
