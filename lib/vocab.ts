import vocabJson from "./vocab.json";

export interface VocabEntry {
  word: string;
  meaning: string;
  lesson: number;
  context: string;
  mnemonic: string;
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
