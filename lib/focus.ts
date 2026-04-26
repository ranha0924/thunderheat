/**
 * Focus session timer — pure helper, no setInterval.
 * Caller drives via requestAnimationFrame.
 *
 * 25 min work → 5 min break, repeated.
 */

const WORK_MS = 25 * 60 * 1000;
const BREAK_MS = 5 * 60 * 1000;
const CYCLE = WORK_MS + BREAK_MS;

export type FocusPhase = "work" | "break";

export interface FocusTick {
  phase: FocusPhase;
  remainingMs: number;
  cycle: number; // 0-indexed
}

export function tickFocus(startedAtMs: number, now = Date.now()): FocusTick {
  const elapsed = Math.max(0, now - startedAtMs);
  const cycle = Math.floor(elapsed / CYCLE);
  const inCycle = elapsed - cycle * CYCLE;
  if (inCycle < WORK_MS) {
    return { phase: "work", remainingMs: WORK_MS - inCycle, cycle };
  }
  return { phase: "break", remainingMs: CYCLE - inCycle, cycle };
}

export function formatMMSS(ms: number): string {
  const total = Math.max(0, Math.round(ms / 1000));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}
