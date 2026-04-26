"use client";
import { useState } from "react";
import { TRAPS } from "@/lib/traps";
import { TrapCard } from "@/components/TrapCard";

export default function TrapsPage() {
  const [openId, setOpenId] = useState<string | null>(TRAPS[0]?.id ?? null);

  return (
    <main className="px-5 pt-10 pb-6">
      <header className="mb-5">
        <p className="text-[11px] text-terracotta font-bold uppercase tracking-widest mb-1">
          함정 8선 · 시험 직전 5분
        </p>
        <h1 className="text-2xl font-extrabold tracking-tight">
          어법·빈칸 함정 패턴
        </h1>
        <p className="text-[12px] text-ink-500 mt-2 leading-relaxed">
          출처: Orbi 빈칸 칼럼 · 서울대생 어법 정리 · 나무위키 수능영어
        </p>
      </header>

      <div className="space-y-2">
        {TRAPS.map((t, i) => (
          <TrapCard
            key={t.id}
            index={i}
            trap={t}
            expanded={openId === t.id}
            onToggle={() => setOpenId(openId === t.id ? null : t.id)}
          />
        ))}
      </div>
    </main>
  );
}
