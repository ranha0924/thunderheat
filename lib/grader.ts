/**
 * Strict typed-answer grading for vocabulary.
 * Wishlist #1 (클래스카드 불만): "비슷한 뜻을 정답 처리하지 않는다."
 *
 * Returns:
 *  - "strict": 정확 일치 (정답 + 등록된 strict 변형)
 *  - "similar": 비슷한 뜻 (등록된 similar 목록) — 채점은 오답이지만 badge로 부드럽게 신호
 *  - "wrong": 그 외
 */

const PARTICLES = /[을를이가은는의에서로으]/g;

export function normalizeKo(s: string): string {
  return s
    .replace(/\(.*?\)/g, "")
    .replace(/[\s,，。.;:!?]/g, "")
    .replace(PARTICLES, "")
    .toLowerCase()
    .trim();
}

export function normalizeEn(s: string): string {
  return s.replace(/[^a-z0-9]/gi, "").toLowerCase().trim();
}

export type GradeResult = "strict" | "similar" | "wrong";

export interface GradeOpts {
  /** Comma-separated answer phrase (e.g. "동반자, 친구, 반려") */
  answer: string;
  /** Optional curated strict synonyms list (won't accept anything else exactly). */
  strict?: string[];
  /** Optional curated "비슷한 뜻" list — flagged but not correct. */
  similar?: string[];
  /** "ko" for Korean meaning input, "en" for English word input. */
  language: "ko" | "en";
}

export function gradeTypedVocab(input: string, opts: GradeOpts): GradeResult {
  const norm = opts.language === "ko" ? normalizeKo : normalizeEn;
  const i = norm(input);
  if (!i) return "wrong";

  const strictSet = new Set<string>();
  // split answer by common separators (Korean meaning often "A, B, C")
  for (const part of opts.answer.split(/[,，;/]/)) {
    const v = norm(part);
    if (v) strictSet.add(v);
  }
  for (const v of opts.strict ?? []) {
    const n = norm(v);
    if (n) strictSet.add(n);
  }
  if (strictSet.has(i)) return "strict";

  const similarSet = new Set<string>();
  for (const v of opts.similar ?? []) {
    const n = norm(v);
    if (n) similarSet.add(n);
  }
  if (similarSet.has(i)) return "similar";

  // Korean: token-substring match treated as "similar" (not strict).
  // Caller may decide to count similar as wrong (default) per wishlist#1.
  if (opts.language === "ko" && i.length >= 2) {
    const arr = Array.from(strictSet);
    for (const v of arr) {
      if (v.includes(i) || i.includes(v)) return "similar";
    }
  }

  return "wrong";
}
