"use client";
import { SubjectJokbo } from "@/components/SubjectJokbo";
import { SubjectPack } from "@/lib/subjectPack";
import { KOREAN_CHAPTERS, KOREAN_SUBUNITS } from "@/lib/koreanNotes";
import { KOREAN_QUESTIONS } from "@/lib/koreanQuestions";

const KOREAN_PACK: SubjectPack = {
  key: "korean",
  subjectLabel: "공통국어2",
  examLabel: "2학기 1차",
  heroWord: "국어",
  sourceNote:
    "미래엔(신유식 외) 공통국어2 · 1-01 옛 노래 감상하기(p.10~21) · 1-02 고전 소설 감상하기 · 3-01 변화하는 국어의 모습(p.106~115) + 3·6·9월 학평",
  roundLabel: "세트",
  chapters: KOREAN_CHAPTERS,
  subUnits: KOREAN_SUBUNITS,
  questions: KOREAN_QUESTIONS,
};

export default function KoreanPage() {
  return <SubjectJokbo pack={KOREAN_PACK} />;
}
