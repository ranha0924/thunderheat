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

// v0.2 additions

export interface LeitnerCard {
  id: string;
  box: 0 | 1 | 2 | 3;
  lastSeen: number;
  nextDue: number;
}

export interface BlurtSession {
  id: string;
  passageId: string;
  userText: string;
  matched: string[];
  missed: string[];
  startedAt: number;
  submittedAt: number;
  score: number;
}

export interface FocusSession {
  id: string;
  startedAt: number;
  endedAt?: number;
  breaks: number;
  ambientUsed: boolean;
}

export interface PretestEntry {
  id: string;
  sessionId: string;
  items: { qid: string; correct: boolean }[];
  weights: Record<string, number>;
}

export type FlowPhase =
  | "pretest"
  | "blurt"
  | "drill"
  | "trap"
  | "mock"
  | "review"
  | "done";

export interface FlowState {
  startedAt: number;
  bedtimeAt: number; // epoch ms hard cutoff
  phase: FlowPhase;
  budgetMs: Record<FlowPhase, number>;
  spentMs: Record<FlowPhase, number>;
  extensionsUsed: Record<FlowPhase, number>;
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

  // v0.2 additions
  currentFlow?: FlowState;
  leitner: LeitnerCard[];
  blurts: BlurtSession[];
  pretests: PretestEntry[];
  sleepCutoffSnoozedAt?: number;
  bedtime: string; // "HH:MM"
  tabBarOnboarded: boolean;

  // 통합사회 시험 범위 (선택된 단원 번호; 비어있으면 ‘아직 미설정’)
  socialUnits: number[];
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
  leitner: [],
  blurts: [],
  pretests: [],
  bedtime: "23:50",
  tabBarOnboarded: false,
  socialUnits: [],
};
