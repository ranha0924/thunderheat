"use client";
import { SubjectJokbo } from "@/components/SubjectJokbo";
import { SubjectPack } from "@/lib/subjectPack";
import { ENGLISH2_CHAPTERS, ENGLISH2_SUBUNITS } from "@/lib/english2Notes";
import { ENGLISH2_QUESTIONS } from "@/lib/english2Questions";

const ENGLISH2_PACK: SubjectPack = {
  key: "english2",
  subjectLabel: "공통영어2",
  examLabel: "2학기 1차",
  heroWord: "영어",
  sourceNote:
    "미래엔(김성연 외) 공통영어2 · Lesson 1 We Share, We Care · Lesson 3 The True Art Lovers + 추가 독해자료",
  roundLabel: "세트",
  chapters: ENGLISH2_CHAPTERS,
  subUnits: ENGLISH2_SUBUNITS,
  questions: ENGLISH2_QUESTIONS,
};

export default function English2Page() {
  return <SubjectJokbo pack={ENGLISH2_PACK} />;
}
