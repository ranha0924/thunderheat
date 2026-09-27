import { AppState } from "./types";

/** 소단원 하나의 핵심 정리 (통합사회·국어·수학·영어 공통 형식) */
export interface SubUnitNote {
  id: string; // "1-1" 형식
  chapter: string; // "1. 통합적 관점" 등 대단원
  unitTitle: string; // 소단원 제목
  oneLine: string;
  koreanSummary: string; // **굵게** 마크업 지원, 줄바꿈 \n\n
  keyTerms: { term: string; meaning: string }[];
  commonQuestions: string[];
  trapWarnings: string[];
}

/** 소단원별 5지선다 문항 */
export interface SubUnitQuestion {
  id: string;
  subUnit: string; // "1-1" 등
  subUnitTitle: string;
  round: number; // 족보 회차 또는 세트 번호
  n: number;
  prompt: string;
  passage: string;
  choices: string[];
  answer: number; // 0-based index
  explanation: string;
}

export interface SubjectChapter {
  key: string;
  title: string;
  subUnits: string[];
}

/** 과목 하나를 통째로 묶은 팩 — 페이지 컴포넌트(SubjectJokbo)가 그대로 렌더링 */
export interface SubjectPack {
  key: string; // localStorage 범위 저장 키 ("social", "korean", "math", "english2")
  subjectLabel: string; // "통합사회1"
  examLabel: string; // "1학기 중간" / "2학기 1차"
  heroWord: string; // 큰 제목 앞 단어 ("사회")
  heroTag?: string; // 큰 제목 뒤 강조 단어 (기본 "족보")
  sourceNote?: string; // 교과서·범위 출처 한 줄
  roundLabel?: string; // 문항 칩 라벨 (기본 "회")
  chapters: SubjectChapter[];
  subUnits: SubUnitNote[];
  questions: SubUnitQuestion[];
  /** 구버전 상태 필드에서 범위를 읽어오는 함수 (통합사회 호환용) */
  readLegacyScope?: (s: AppState) => string[];
}

export function questionsBySubUnits(
  questions: SubUnitQuestion[],
  subUnits: string[],
): SubUnitQuestion[] {
  if (subUnits.length === 0) return [];
  const set = new Set(subUnits);
  return questions.filter((q) => set.has(q.subUnit));
}

export function questionsBySubUnit(
  questions: SubUnitQuestion[],
  subUnit: string,
): SubUnitQuestion[] {
  return questions.filter((q) => q.subUnit === subUnit);
}
