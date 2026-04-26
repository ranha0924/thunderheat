export type QuestionType =
  | "vocab_en_ko"
  | "vocab_ko_en"
  | "blank"
  | "grammar_ox"
  | "grammar_5"
  | "summary"
  | "topic"
  | "title";

interface QuestionBase {
  id: string;
  type: QuestionType;
  lesson: number;
  question: string;
  choices: string[];
  answer: number;
  explanation: string;
}

export type Question =
  | (QuestionBase & { type: "vocab_en_ko"; word: string; context: string })
  | (QuestionBase & { type: "vocab_ko_en"; meaning: string })
  | (QuestionBase & { type: "blank"; sentence: string })
  | (QuestionBase & { type: "grammar_ox"; sentence: string })
  | (QuestionBase & { type: "grammar_5"; passage: string })
  | (QuestionBase & { type: "summary"; summary: string })
  | (QuestionBase & { type: "topic" })
  | (QuestionBase & { type: "title" });

export interface ProgressEntry {
  answered: boolean;
  correct: boolean;
  ts: number;
}

export interface WeaknessEntry {
  id: string;
  failures: number;
  nextDue: number;
}

export interface AppState {
  progress: Record<string, ProgressEntry>;
  weakness: WeaknessEntry[];
  streak: { current: number; lastDate: string };
  xp: { total: number; sessionXP: number };
  combo: number;
  consecutiveCorrect: Record<string, number>;
  selectedSubjects: string[];
  selectedGrade: string;
  notifications: { dDay: boolean; daily: boolean };
  dailyGoalMin: number;
  quietHours: { enabled: boolean; start: string; end: string };
}

export const INITIAL_STATE: AppState = {
  progress: {},
  weakness: [],
  streak: { current: 0, lastDate: "" },
  xp: { total: 0, sessionXP: 0 },
  combo: 0,
  consecutiveCorrect: {},
  selectedSubjects: [],
  selectedGrade: "",
  notifications: { dDay: true, daily: true },
  dailyGoalMin: 30,
  quietHours: { enabled: false, start: "22:00", end: "08:00" },
};
