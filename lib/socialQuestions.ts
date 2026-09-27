import data from "./socialQuestions.json";
import {
  SubUnitQuestion,
  questionsBySubUnit as byUnit,
  questionsBySubUnits as byUnits,
} from "./subjectPack";

export type SocialQuestion = SubUnitQuestion;

export const SOCIAL_QUESTIONS: SocialQuestion[] = data as SocialQuestion[];

export function questionsBySubUnits(subUnits: string[]): SocialQuestion[] {
  return byUnits(SOCIAL_QUESTIONS, subUnits);
}

export function questionsBySubUnit(subUnit: string): SocialQuestion[] {
  return byUnit(SOCIAL_QUESTIONS, subUnit);
}
