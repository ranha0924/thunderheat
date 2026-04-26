import { LeitnerCard } from "./types";

const BOX_DELAYS_MS = [
  3 * 60 * 1000, // box 0 → resurfaces in 3 min
  10 * 60 * 1000, // box 1 → 10 min
  25 * 60 * 1000, // box 2 → 25 min
  Number.POSITIVE_INFINITY, // box 3 = mastered (don't resurface in session)
];

export function newLeitnerCard(id: string, now = Date.now()): LeitnerCard {
  return { id, box: 0, lastSeen: now, nextDue: now };
}

export function promote(card: LeitnerCard, now = Date.now()): LeitnerCard {
  const nextBox = Math.min(3, card.box + 1) as 0 | 1 | 2 | 3;
  return {
    ...card,
    box: nextBox,
    lastSeen: now,
    nextDue: now + BOX_DELAYS_MS[nextBox],
  };
}

export function demote(card: LeitnerCard, now = Date.now()): LeitnerCard {
  return {
    ...card,
    box: 0,
    lastSeen: now,
    nextDue: now + BOX_DELAYS_MS[0],
  };
}

/** Returns earliest-due card, or undefined if none due. */
export function nextCard(
  cards: LeitnerCard[],
  now = Date.now(),
): LeitnerCard | undefined {
  const due = cards.filter((c) => c.box < 3 && c.nextDue <= now);
  if (!due.length) return undefined;
  due.sort((a, b) => a.nextDue - b.nextDue);
  return due[0];
}

export function remaining(cards: LeitnerCard[]): number {
  return cards.filter((c) => c.box < 3).length;
}
