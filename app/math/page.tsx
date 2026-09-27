"use client";
import { SubjectJokbo } from "@/components/SubjectJokbo";
import { SubjectPack } from "@/lib/subjectPack";
import { MATH_CHAPTERS, MATH_SUBUNITS } from "@/lib/mathNotes";
import { MATH_QUESTIONS } from "@/lib/mathQuestions";

const MATH_PACK: SubjectPack = {
  key: "math",
  subjectLabel: "공통수학2",
  examLabel: "2학기 1차",
  heroWord: "수학",
  sourceNote:
    "동아출판(고호경 외) 공통수학2 · Ⅰ. 평면좌표와 직선의 방정식 ~ Ⅲ. 집합 (p.8~79) + 학습지 1~15호 · 모의고사 학습지 1~3호",
  roundLabel: "세트",
  chapters: MATH_CHAPTERS,
  subUnits: MATH_SUBUNITS,
  questions: MATH_QUESTIONS,
};

export default function MathPage() {
  return <SubjectJokbo pack={MATH_PACK} />;
}
