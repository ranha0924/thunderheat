/**
 * Blurting / 백지복습 grader.
 *
 * Diff user's free-recall text against a list of source bullets (key phrases / vocab).
 * No fuzzy/AI grading; exact substring on normalized strings + Levenshtein ≤2 for typos.
 */

import { normalizeEn, normalizeKo } from "./grader";

function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  const m = a.length,
    n = b.length;
  const dp: number[] = new Array(n + 1).fill(0).map((_, i) => i);
  for (let i = 1; i <= m; i++) {
    let prev = dp[0];
    dp[0] = i;
    for (let j = 1; j <= n; j++) {
      const cur = dp[j];
      dp[j] =
        a[i - 1] === b[j - 1]
          ? prev
          : 1 + Math.min(prev, dp[j], dp[j - 1]);
      prev = cur;
    }
  }
  return dp[n];
}

export interface BlurtKey {
  /** Display label, e.g. "kindness" or "친절함" */
  label: string;
  /** Optional alternate spellings/forms */
  aliases?: string[];
  /** Was this a key vocab (require strict) or a phrase (substring OK)? */
  kind?: "vocab" | "phrase";
}

export interface BlurtGrade {
  matched: string[];
  missed: string[];
  score: number; // 0..1
}

function tokenize(text: string): string[] {
  // Words: ASCII or Hangul runs
  return text.match(/[A-Za-z]+|[가-힣]+/g) ?? [];
}

function looksKorean(s: string): boolean {
  return /[가-힣]/.test(s);
}

export function gradeBlurt(userText: string, keys: BlurtKey[]): BlurtGrade {
  const tokens = tokenize(userText);
  const norm = tokens.map((t) =>
    looksKorean(t) ? normalizeKo(t) : normalizeEn(t),
  );
  const lowered = userText.toLowerCase();
  const matched: string[] = [];
  const missed: string[] = [];

  for (const k of keys) {
    const variants = [k.label, ...(k.aliases ?? [])];
    let hit = false;
    for (const v of variants) {
      const isKo = looksKorean(v);
      const normV = isKo ? normalizeKo(v) : normalizeEn(v);
      if (!normV) continue;

      // Phrase check (substring on raw lowered text)
      if (k.kind === "phrase") {
        if (lowered.includes(v.toLowerCase())) {
          hit = true;
          break;
        }
        continue;
      }

      // Token exact match
      if (norm.includes(normV)) {
        hit = true;
        break;
      }

      // Levenshtein ≤2 for typo tolerance (vocab only)
      const tol = normV.length <= 4 ? 1 : 2;
      if (norm.some((t) => levenshtein(t, normV) <= tol)) {
        hit = true;
        break;
      }
    }
    if (hit) matched.push(k.label);
    else missed.push(k.label);
  }

  const score = keys.length ? matched.length / keys.length : 0;
  return { matched, missed, score };
}
