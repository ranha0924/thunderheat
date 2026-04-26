import { MOCK_QUESTIONS } from "./mockQuestions";
import questionsJson from "./questions.json";
import { Question } from "./types";

export const ALL_QUESTIONS: Question[] =
  Array.isArray(questionsJson) && (questionsJson as Question[]).length
    ? (questionsJson as Question[])
    : MOCK_QUESTIONS;

export function questionLabel(q: Question): string {
  switch (q.type) {
    case "vocab_en_ko":
      return q.word;
    case "vocab_ko_en":
      return q.meaning;
    case "blank":
    case "grammar_ox":
      return q.sentence.length > 32
        ? q.sentence.slice(0, 32) + "…"
        : q.sentence;
    case "grammar_5":
      return q.passage.slice(0, 32) + "…";
    case "summary":
      return q.summary.length > 32
        ? q.summary.slice(0, 32) + "…"
        : q.summary;
    case "topic":
      return "주제 찾기";
    case "title":
      return "제목 찾기";
  }
}
