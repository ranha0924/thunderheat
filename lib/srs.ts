import { WeaknessEntry } from "./types";

const FIVE_MIN = 5 * 60 * 1000;
const THIRTY_MIN = 30 * 60 * 1000;
const ONE_DAY = 24 * 60 * 60 * 1000;

export function nextDueFor(failures: number, now = Date.now()): number {
  if (failures <= 1) return now + FIVE_MIN;
  if (failures === 2) return now + THIRTY_MIN;
  return now + ONE_DAY;
}

export function pushWeakness(
  list: WeaknessEntry[],
  id: string,
  now = Date.now(),
): WeaknessEntry[] {
  const existing = list.find((w) => w.id === id);
  if (existing) {
    existing.failures += 1;
    existing.nextDue = nextDueFor(existing.failures, now);
    return [...list];
  }
  return [...list, { id, failures: 1, nextDue: nextDueFor(1, now) }];
}

export function removeFromWeakness(
  list: WeaknessEntry[],
  id: string,
): WeaknessEntry[] {
  return list.filter((w) => w.id !== id);
}

export function dueNow(list: WeaknessEntry[], now = Date.now()): WeaknessEntry[] {
  return list.filter((w) => w.nextDue <= now);
}
