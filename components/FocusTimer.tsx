"use client";
import { useEffect, useState } from "react";
import { tickFocus, formatMMSS, FocusPhase } from "@/lib/focus";
import { cn } from "@/lib/utils";

interface Props {
  startedAtMs: number;
  paused?: boolean;
  onPhaseChange?: (phase: FocusPhase, cycle: number) => void;
}

const SIZE = 96;
const STROKE = 6;
const RADIUS = (SIZE - STROKE) / 2;
const CIRC = 2 * Math.PI * RADIUS;

export default function FocusTimer({
  startedAtMs,
  paused = false,
  onPhaseChange,
}: Props) {
  const [tick, setTick] = useState(() => tickFocus(startedAtMs));
  const [pausedAt, setPausedAt] = useState<number | null>(null);

  useEffect(() => {
    if (paused) {
      setPausedAt((p) => (p ?? Date.now()));
      return;
    }
    setPausedAt(null);
    let raf = 0;
    const loop = () => {
      setTick(tickFocus(startedAtMs));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [paused, startedAtMs]);

  useEffect(() => {
    onPhaseChange?.(tick.phase, tick.cycle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick.phase]);

  const phaseTotal = tick.phase === "work" ? 25 * 60 * 1000 : 5 * 60 * 1000;
  const ratio = tick.remainingMs / phaseTotal;
  const dashOffset = CIRC * (1 - ratio);
  const isBreak = tick.phase === "break";

  return (
    <div className="flex items-center gap-3">
      <div className="relative" style={{ width: SIZE, height: SIZE }}>
        <svg width={SIZE} height={SIZE} aria-hidden>
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="currentColor"
            className="text-ink-100"
            strokeWidth={STROKE}
          />
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="currentColor"
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={CIRC}
            strokeDashoffset={dashOffset}
            transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
            className={cn(
              "transition-[stroke-dashoffset] duration-300 ease-linear",
              isBreak ? "text-sage-deep" : "text-lavender-deep",
            )}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-base font-bold text-ink-900 tabular-nums leading-none">
            {formatMMSS(tick.remainingMs)}
          </span>
          <span className="text-[9px] uppercase tracking-widest text-ink-400 font-bold mt-0.5">
            {isBreak ? "쉼" : "집중"}
          </span>
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[11px] text-ink-500 leading-relaxed">
          {isBreak
            ? "쉬는 동안 단어 들어볼래요?"
            : "25분 집중 → 5분 쉼. 반복."}
        </div>
        <div className="text-[10px] text-ink-400 mt-0.5">
          {tick.cycle + 1}번째 사이클
          {pausedAt && " · 일시정지"}
        </div>
      </div>
    </div>
  );
}
