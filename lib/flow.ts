import { FlowPhase, FlowState } from "./types";

const PHASE_ORDER: FlowPhase[] = [
  "pretest",
  "blurt",
  "drill",
  "trap",
  "mock",
  "review",
  "done",
];

const DEFAULT_BUDGET_MS: Record<FlowPhase, number> = {
  pretest: 60 * 1000,
  blurt: 20 * 60 * 1000,
  drill: 20 * 60 * 1000,
  trap: 15 * 60 * 1000,
  mock: 20 * 60 * 1000,
  review: 10 * 60 * 1000,
  done: 0,
};

export function newFlow(now = Date.now(), bedtimeHHMM = "23:50"): FlowState {
  const [hh, mm] = bedtimeHHMM.split(":").map(Number);
  const d = new Date(now);
  d.setHours(hh, mm, 0, 0);
  let bedtimeAt = d.getTime();
  if (bedtimeAt <= now) bedtimeAt += 24 * 60 * 60 * 1000;

  return {
    startedAt: now,
    bedtimeAt,
    phase: "pretest",
    budgetMs: { ...DEFAULT_BUDGET_MS },
    spentMs: {
      pretest: 0,
      blurt: 0,
      drill: 0,
      trap: 0,
      mock: 0,
      review: 0,
      done: 0,
    },
    extensionsUsed: {
      pretest: 0,
      blurt: 0,
      drill: 0,
      trap: 0,
      mock: 0,
      review: 0,
      done: 0,
    },
  };
}

export function phaseRemainingMs(flow: FlowState, phase: FlowPhase): number {
  return Math.max(0, flow.budgetMs[phase] - flow.spentMs[phase]);
}

export function totalRemainingMs(flow: FlowState, now = Date.now()): number {
  const fromPhases = PHASE_ORDER.slice(
    PHASE_ORDER.indexOf(flow.phase),
  ).reduce((a, p) => a + phaseRemainingMs(flow, p), 0);
  const untilBed = Math.max(0, flow.bedtimeAt - now);
  return Math.min(fromPhases, untilBed);
}

export function nextPhase(
  flow: FlowState,
  signal: "done" | "skip" | "ranOut",
): FlowState {
  const idx = PHASE_ORDER.indexOf(flow.phase);
  if (idx < 0) return flow;
  const next = PHASE_ORDER[idx + 1] ?? "done";
  const newBudget = { ...flow.budgetMs };

  if (signal === "skip") {
    // Reallocate the skipped phase's remaining budget to the next non-done phase.
    const remaining = phaseRemainingMs(flow, flow.phase);
    if (next !== "done" && remaining > 0) {
      newBudget[next] = newBudget[next] + remaining;
    }
  }

  return {
    ...flow,
    phase: next,
    budgetMs: newBudget,
    // Mark current phase as fully spent so subsequent reads don't lie
    spentMs: { ...flow.spentMs, [flow.phase]: flow.budgetMs[flow.phase] },
  };
}

const EXTEND_STEP_MS = 5 * 60 * 1000;
const EXTEND_CAP_MS = 10 * 60 * 1000;

export function extendPhase(flow: FlowState): {
  flow: FlowState;
  ok: boolean;
} {
  const used = flow.extensionsUsed[flow.phase];
  if (used >= EXTEND_CAP_MS) return { flow, ok: false };
  const add = Math.min(EXTEND_STEP_MS, EXTEND_CAP_MS - used);
  return {
    ok: true,
    flow: {
      ...flow,
      budgetMs: { ...flow.budgetMs, [flow.phase]: flow.budgetMs[flow.phase] + add },
      extensionsUsed: { ...flow.extensionsUsed, [flow.phase]: used + add },
    },
  };
}

export function recordSpent(
  flow: FlowState,
  phase: FlowPhase,
  deltaMs: number,
): FlowState {
  return {
    ...flow,
    spentMs: { ...flow.spentMs, [phase]: flow.spentMs[phase] + deltaMs },
  };
}

/** True if the flow has crossed the bedtime hard cutoff. Caller should force-finish. */
export function isPastBedtime(flow: FlowState, now = Date.now()): boolean {
  return now >= flow.bedtimeAt && flow.phase !== "done";
}

export const FLOW_PHASES = PHASE_ORDER;
