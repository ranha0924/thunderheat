import { Question } from "./types";

/**
 * Round-robin interleave by question.type to avoid type blocks.
 * Rohrer & Taylor 2007 — interleaving helps discrimination.
 */
export function interleave(pool: Question[]): Question[] {
  const buckets = new Map<string, Question[]>();
  for (const q of pool) {
    if (!buckets.has(q.type)) buckets.set(q.type, []);
    buckets.get(q.type)!.push(q);
  }
  const out: Question[] = [];
  const keys = [...buckets.keys()];
  let i = 0;
  while (out.length < pool.length) {
    let progressed = false;
    for (let k = 0; k < keys.length; k++) {
      const key = keys[(i + k) % keys.length];
      const arr = buckets.get(key)!;
      if (arr.length) {
        out.push(arr.shift()!);
        progressed = true;
      }
    }
    if (!progressed) break;
    i++;
  }
  return out;
}

/**
 * Apply pretest weights — failed items get higher pull priority.
 * weights[id] in [1, 3]; sort pool descending by weight, then shuffle within ties.
 */
export function applyWeights(
  pool: Question[],
  weights: Record<string, number>,
): Question[] {
  const w = (q: Question) => weights[q.id] ?? 1;
  return [...pool].sort((a, b) => {
    const dw = w(b) - w(a);
    if (dw !== 0) return dw;
    return Math.random() - 0.5;
  });
}
