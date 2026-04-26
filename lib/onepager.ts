import { AppState, Question } from "./types";
import { questionLabel } from "./questions";
import { VOCAB } from "./vocab";
import { TRAPS } from "./traps";

export interface OnepagerData {
  generatedAt: number;
  durationMin: number;
  totalAnswered: number;
  accuracy: number;
  masteredCount: number;
  weakWords: { word: string; meaning: string; failures: number }[];
  weakQuestions: { id: string; label: string; failures: number }[];
  topTraps: string[];
  passageOutline: string;
}

const PASSAGE_OUTLINES: Record<number, string> = {
  1: "친절함이 생존의 열쇠 — 개·보노보·사피엔스 모두 증명",
  2: "병중에도 가계도(whakapapa)를 끝내려는 Nani Tama의 결의",
  3: "공동의 미래를 위한 작은 행동 (Let It Be Green)",
  4: "커피 찌꺼기를 순환 경제로 — 비료·연료·옷감 재탄생",
};

export function buildOnepager(
  state: AppState,
  allQuestions: Question[],
): OnepagerData {
  const ts = Date.now();
  const answered = Object.values(state.progress);
  const totalAnswered = answered.length;
  const correct = answered.filter((p) => p.correct).length;
  const accuracy = totalAnswered ? Math.round((correct / totalAnswered) * 100) : 0;
  const masteredCount = Object.values(state.consecutiveCorrect).filter(
    (c) => c >= 3,
  ).length;

  const weak = [...state.weakness]
    .sort((a, b) => b.failures - a.failures)
    .slice(0, 10);

  const weakWords: OnepagerData["weakWords"] = [];
  const weakQuestions: OnepagerData["weakQuestions"] = [];
  for (const w of weak) {
    const q = allQuestions.find((x) => x.id === w.id);
    if (!q) continue;
    if (q.type === "vocab_en_ko") {
      const v = VOCAB.find((x) => x.word === q.word);
      weakWords.push({
        word: q.word,
        meaning: v?.meaning ?? q.choices[q.answer],
        failures: w.failures,
      });
    } else if (q.type === "vocab_ko_en") {
      weakWords.push({
        word: q.choices[q.answer],
        meaning: q.meaning,
        failures: w.failures,
      });
    } else {
      weakQuestions.push({
        id: q.id,
        label: questionLabel(q),
        failures: w.failures,
      });
    }
  }

  const lessonsTouched = Array.from(
    new Set(allQuestions.map((q) => q.lesson)),
  );
  const passageOutline = lessonsTouched
    .map((l) => `L${l}: ${PASSAGE_OUTLINES[l] ?? ""}`)
    .filter((s) => !s.endsWith(":"))
    .join(" / ");

  const startedAt = state.currentFlow?.startedAt ?? ts;
  const durationMin = Math.max(0, Math.round((ts - startedAt) / 60000));

  return {
    generatedAt: ts,
    durationMin,
    totalAnswered,
    accuracy,
    masteredCount,
    weakWords: weakWords.slice(0, 10),
    weakQuestions: weakQuestions.slice(0, 5),
    topTraps: TRAPS.slice(0, 3).map((t) => `${t.title} — ${t.rule}`),
    passageOutline,
  };
}
