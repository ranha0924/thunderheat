"use client";
import { SubjectJokbo } from "@/components/SubjectJokbo";
import { SubjectPack } from "@/lib/subjectPack";
import { CHAPTERS, SOCIAL_SUBUNITS } from "@/lib/socialNotes";
import { SOCIAL_QUESTIONS } from "@/lib/socialQuestions";

const SOCIAL_PACK: SubjectPack = {
  key: "social",
  subjectLabel: "통합사회1",
  examLabel: "1학기 중간",
  heroWord: "사회",
  chapters: CHAPTERS,
  subUnits: SOCIAL_SUBUNITS,
  questions: SOCIAL_QUESTIONS,
  readLegacyScope: (s) => s.socialUnits ?? [],
};

export default function SocialPage() {
  return <SubjectJokbo pack={SOCIAL_PACK} />;
}
