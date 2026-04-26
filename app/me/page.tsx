"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Chip } from "@/components/Chip";
import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";
import { getState, setState, clearState } from "@/lib/storage";
import { AppState, INITIAL_STATE } from "@/lib/types";
import { getLevel } from "@/lib/session";

export default function Me() {
  const [state, setLocalState] = useState<AppState>(INITIAL_STATE);
  useEffect(() => setLocalState(getState()), []);

  const update = (patch: Partial<AppState>) => {
    const next = { ...state, ...patch } as AppState;
    setLocalState(next);
    setState(next);
  };

  const { level, rank } = getLevel(state.xp.total);

  const reset = () => {
    if (confirm("정말 모든 데이터를 초기화할까요?")) {
      clearState();
      window.location.href = "/";
    }
  };

  return (
    <main className="px-5 pt-10 pb-6">
      <header className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-full bg-lavender flex items-center justify-center text-xl font-bold">
          {state.selectedGrade?.[0] || "🙂"}
        </div>
        <div>
          <h1 className="text-lg font-extrabold tracking-tight">
            {state.selectedGrade || "고1"} 학생
          </h1>
          <div className="flex gap-1.5 mt-1">
            <Chip variant="lavender" size="sm">
              Lv.{level} · {rank}
            </Chip>
            <Chip variant="butter" size="sm">
              {state.xp.total} XP
            </Chip>
          </div>
        </div>
      </header>

      <Section title="알림">
        <ToggleRow
          label="시험 D-day 알림"
          checked={state.notifications.dDay}
          onChange={(v) =>
            update({ notifications: { ...state.notifications, dDay: v } })
          }
        />
        <ToggleRow
          label="매일 저녁 학습 알림"
          checked={state.notifications.daily}
          onChange={(v) =>
            update({ notifications: { ...state.notifications, daily: v } })
          }
        />
      </Section>

      <Section title="학습">
        <div className="bg-white rounded-card p-4 border border-ink-100">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-semibold text-ink-900">
              하루 목표
            </span>
            <span className="text-sm font-bold text-ink-700">
              {state.dailyGoalMin}분
            </span>
          </div>
          <input
            type="range"
            min={10}
            max={120}
            step={10}
            value={state.dailyGoalMin}
            onChange={(e) => update({ dailyGoalMin: Number(e.target.value) })}
            className="w-full accent-ink-900"
          />
        </div>

        <ToggleRow
          label="조용한 시간 (22:00~08:00)"
          checked={state.quietHours.enabled}
          onChange={(v) =>
            update({ quietHours: { ...state.quietHours, enabled: v } })
          }
        />
      </Section>

      <Section title="구독">
        <Link
          href="/paywall"
          className="block bg-white rounded-card p-4 border border-ink-100"
        >
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm font-semibold text-ink-900">
                월 무제한 플랜
              </div>
              <div className="text-[11px] text-ink-500 mt-0.5">
                ₩9,900 / 월 · 시험 무제한
              </div>
            </div>
            <span className="text-ink-400 text-lg">›</span>
          </div>
        </Link>
      </Section>

      <Section title="데이터">
        <Button variant="secondary" fullWidth onClick={reset}>
          모든 데이터 초기화
        </Button>
        <p className="text-[11px] text-ink-400 text-center mt-2">
          업로드한 자료는 24시간 후 자동 삭제됩니다.
        </p>
      </Section>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-6">
      <h2 className="text-xs font-bold text-ink-500 uppercase tracking-widest mb-2">
        {title}
      </h2>
      <div className="space-y-2">{children}</div>
    </section>
  );
}

function ToggleRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className="w-full bg-white rounded-card p-4 flex items-center justify-between border border-ink-100"
    >
      <span className="text-sm font-semibold text-ink-900">{label}</span>
      <span
        className={cn(
          "w-10 h-6 rounded-chip relative transition",
          checked ? "bg-ink-900" : "bg-ink-200",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 w-5 h-5 bg-white rounded-full transition shadow-paper-soft",
            checked ? "left-[18px]" : "left-0.5",
          )}
        />
      </span>
    </button>
  );
}
