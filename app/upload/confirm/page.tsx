"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LessonChecklist, Lesson } from "@/components/LessonChecklist";
import { Button } from "@/components/Button";

const LESSONS: Lesson[] = [
  { id: "L1", title: "Lesson 1. The Power of Friendliness", questions: 32, estMin: 38 },
  { id: "L2", title: "Lesson 2. Your World, Your Voice", questions: 24, estMin: 28 },
  { id: "L3", title: "Lesson 3. Small Habits, Big Change", questions: 18, estMin: 22 },
  { id: "L4", title: "Lesson 4. A Better Future for Coffee Waste", questions: 24, estMin: 30 },
];

export default function Confirm() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>(["L1", "L4"]);

  const totalQ = LESSONS.filter((l) => selected.includes(l.id)).reduce(
    (a, l) => a + l.questions,
    0,
  );
  const totalMin = LESSONS.filter((l) => selected.includes(l.id)).reduce(
    (a, l) => a + l.estMin,
    0,
  );
  const hr = Math.floor(totalMin / 60);
  const mi = totalMin % 60;
  const timeLabel = hr > 0 ? `${hr}h ${mi}m` : `${mi}m`;

  return (
    <main className="px-5 pt-10 pb-6">
      <header className="mb-5">
        <p className="text-[11px] text-ink-500 font-semibold mb-1">STEP 3 / 3</p>
        <h1 className="text-2xl font-extrabold tracking-tight">
          이 단원으로 시작할까요?
        </h1>
        <p className="text-sm text-ink-500 mt-2">필요 없는 건 빼세요.</p>
      </header>

      <LessonChecklist
        lessons={LESSONS}
        selected={selected}
        onChange={setSelected}
      />

      <div className="mt-5 bg-white rounded-card p-4 border border-ink-100">
        <div className="text-[10px] uppercase tracking-widest font-bold text-ink-400 mb-1">
          예상
        </div>
        <p className="text-base font-bold text-ink-900">
          {selected.length}개 단원 · {totalQ}문제 · {timeLabel}
        </p>
      </div>

      <Button
        fullWidth
        className="mt-6"
        onClick={() => router.push("/study")}
        disabled={selected.length === 0}
      >
        학습 시작
      </Button>
    </main>
  );
}
