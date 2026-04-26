import { AppState } from "./types";
import { pushWeakness, removeFromWeakness } from "./srs";

const MASTERY_THRESHOLD = 3;
const XP_PER_CORRECT = 10;

export function recordAnswer(
  state: AppState,
  questionId: string,
  isCorrect: boolean,
  now = Date.now(),
): AppState {
  const next: AppState = {
    ...state,
    progress: { ...state.progress },
    consecutiveCorrect: { ...state.consecutiveCorrect },
  };
  next.progress[questionId] = { answered: true, correct: isCorrect, ts: now };

  if (isCorrect) {
    next.combo = state.combo + 1;
    const sessionXP = state.xp.sessionXP + XP_PER_CORRECT;
    const total = state.xp.total + XP_PER_CORRECT;
    next.xp = { total, sessionXP };
    const cc = (state.consecutiveCorrect[questionId] || 0) + 1;
    next.consecutiveCorrect[questionId] = cc;
    if (cc >= MASTERY_THRESHOLD) {
      next.weakness = removeFromWeakness(state.weakness, questionId);
    }
  } else {
    next.combo = 0;
    next.consecutiveCorrect[questionId] = 0;
    next.weakness = pushWeakness(state.weakness, questionId, now);
  }

  // streak: bump if new day
  const today = new Date(now).toISOString().slice(0, 10);
  if (state.streak.lastDate !== today) {
    const yesterday = new Date(now - 86400000).toISOString().slice(0, 10);
    next.streak = {
      current:
        state.streak.lastDate === yesterday ? state.streak.current + 1 : 1,
      lastDate: today,
    };
  }

  return next;
}

export function getLevel(totalXP: number): { level: number; rank: string } {
  const level = Math.floor(totalXP / 100) + 1;
  const ranks = ["연습생", "수련생", "정예", "달인", "마스터", "그랜드마스터"];
  const rankIdx = Math.min(Math.floor(level / 5), ranks.length - 1);
  return { level, rank: ranks[rankIdx] };
}
