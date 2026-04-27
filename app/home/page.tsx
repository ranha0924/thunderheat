"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Chip } from "@/components/Chip";
import { ProgressBar } from "@/components/ProgressBar";
import { SubjectCard } from "@/components/SubjectCard";
import { getState } from "@/lib/storage";
import { getLevel } from "@/lib/session";
import { AppState, INITIAL_STATE } from "@/lib/types";

export default function Home() {
  const [state, setState] = useState<AppState>(INITIAL_STATE);
  useEffect(() => {
    setState(getState());
  }, []);

  const { level, rank } = getLevel(state.xp.total);
  const todayMissionPct = Math.min(
    100,
    Math.round((state.xp.sessionXP / 100) * 100),
  );

  return (
    <main className="px-5 pt-10 pb-6">
      <header className="mb-5">
        <p className="text-[11px] text-ink-500 font-semibold mb-1">
          오늘 저녁, 한 시간만 같이 가요.
        </p>
        <h1 className="text-2xl font-extrabold tracking-tight">
          {state.selectedGrade || "고1"} 학생
        </h1>
        <div className="flex gap-1.5 mt-3 flex-wrap">
          <Chip variant="terracotta">🔥 {state.streak.current}일</Chip>
          <Chip variant="butter">XP {state.xp.total}</Chip>
          <Chip variant="lavender">
            Lv.{level} · {rank}
          </Chip>
        </div>
      </header>

      <section className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-bold text-ink-500 uppercase tracking-widest">
            오늘의 미션
          </h2>
          <span className="text-[11px] text-ink-400">{state.xp.sessionXP}/100 XP</span>
        </div>
        <ProgressBar value={todayMissionPct} variant="sage" />
      </section>

      <section className="mb-5">
        <div className="grid grid-cols-2 gap-2">
          <SubjectCard
            subject="공통영어1"
            mode="compact"
            onClick={() => (window.location.href = "/upload")}
          />
          <SubjectCard
            subject="통합사회1"
            mode="compact"
            onClick={() => (window.location.href = "/social")}
          />
          <SubjectCard subject="수학" mode="compact" disabled />
          <SubjectCard subject="국어" mode="compact" disabled />
          <SubjectCard subject="과학" mode="compact" disabled />
          <Link
            href="/upload"
            className="bg-white rounded-card p-4 flex items-center justify-center text-center border border-dashed border-ink-200 text-sm font-bold text-ink-500"
          >
            + 과목 추가
          </Link>
        </div>
      </section>

      <div className="mt-5 grid grid-cols-3 gap-2">
        <Link
          href="/study"
          className="bg-ink-900 text-paper text-center py-3 rounded-card text-xs font-bold"
        >
          학습 시작
        </Link>
        <Link
          href="/boss"
          className="bg-white border border-ink-200 text-center py-3 rounded-card text-xs font-bold text-ink-900"
        >
          약점 보스
        </Link>
        <Link
          href="/mock"
          className="bg-white border border-ink-200 text-center py-3 rounded-card text-xs font-bold text-ink-900"
        >
          실전 모의
        </Link>
      </div>
    </main>
  );
}
