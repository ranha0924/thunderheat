import data from "./socialQuestions.json";

export interface SocialQuestion {
  id: string;
  subUnit: string; // "1-1" 등
  subUnitTitle: string;
  round: number;
  n: number;
  prompt: string;
  passage: string;
  choices: string[];
  answer: number;
  explanation: string;
}

export const SOCIAL_QUESTIONS: SocialQuestion[] = data as SocialQuestion[];

export function questionsBySubUnits(subUnits: string[]): SocialQuestion[] {
  if (subUnits.length === 0) return [];
  const set = new Set(subUnits);
  return SOCIAL_QUESTIONS.filter((q) => set.has(q.subUnit));
}

export function questionsBySubUnit(subUnit: string): SocialQuestion[] {
  return SOCIAL_QUESTIONS.filter((q) => q.subUnit === subUnit);
}
