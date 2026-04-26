"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";
import { getState, updateState } from "@/lib/storage";

const GRADES = ["중1", "중2", "중3", "고1", "고2", "고3", "N수"];
const SUBJECTS = [
  { id: "english", label: "영어", enabled: true },
  { id: "math", label: "수학", enabled: false },
  { id: "korean", label: "국어", enabled: false },
  { id: "society", label: "사회", enabled: false },
  { id: "science", label: "과학", enabled: false },
  { id: "history", label: "한국사", enabled: false },
];

export default function Onboarding() {
  const router = useRouter();
  const [grade, setGrade] = useState<string>("");
  const [subjects, setSubjects] = useState<string[]>(["english"]);

  useEffect(() => {
    const s = getState();
    if (s.selectedGrade) setGrade(s.selectedGrade);
    if (s.selectedSubjects.length) setSubjects(s.selectedSubjects);
  }, []);

  const toggleSubject = (id: string) => {
    if (subjects.includes(id)) setSubjects(subjects.filter((s) => s !== id));
    else setSubjects([...subjects, id]);
  };

  const start = () => {
    updateState((s) => ({
      ...s,
      selectedGrade: grade || "고1",
      selectedSubjects: subjects.length ? subjects : ["english"],
    }));
    router.push("/home");
  };

  return (
    <main className="px-5 pt-12 pb-8 flex flex-col min-h-screen">
      <div className="mb-8">
        <span className="text-[11px] uppercase tracking-widest font-bold text-terracotta">
          시험 전날 밤 · CRAM-NIGHT COMPANION
        </span>
        <h1 className="text-[40px] leading-[1.05] font-extrabold tracking-tight mt-3">
          벼락치기
          <br />
          <span className="bg-terracotta-soft px-2 inline-block">도우미</span>
        </h1>
        <p className="mt-5 text-sm text-ink-700 leading-relaxed">
          시험까지 남은 시간에 맞춘
          <br />
          <strong className="text-ink-900">AI 과외</strong>. 폰으로 한 시간 반.
        </p>
      </div>

      <section className="mb-7">
        <h2 className="text-xs font-bold text-ink-500 uppercase tracking-widest mb-3">
          학년
        </h2>
        <div className="flex flex-wrap gap-2">
          {GRADES.map((g) => (
            <button
              key={g}
              onClick={() => setGrade(g)}
              className={cn(
                "px-3.5 py-2 rounded-chip text-xs font-bold border transition",
                grade === g
                  ? "bg-ink-900 text-paper border-ink-900"
                  : "bg-white text-ink-700 border-ink-200",
              )}
            >
              {g}
            </button>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xs font-bold text-ink-500 uppercase tracking-widest mb-3">
          과목 (다중 선택)
        </h2>
        <div className="grid grid-cols-3 gap-2">
          {SUBJECTS.map((s) => {
            const active = subjects.includes(s.id);
            return (
              <button
                key={s.id}
                onClick={() => s.enabled && toggleSubject(s.id)}
                disabled={!s.enabled}
                className={cn(
                  "py-3 rounded-card text-sm font-bold border relative transition",
                  active && s.enabled
                    ? "bg-ink-900 text-paper border-ink-900"
                    : "bg-white text-ink-700 border-ink-200",
                  !s.enabled && "opacity-50 cursor-not-allowed",
                )}
              >
                {s.label}
                {!s.enabled && (
                  <span className="absolute top-1 right-1 text-[8px] font-bold text-ink-400">
                    Soon
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      <div className="mt-auto space-y-2">
        <Button onClick={start} fullWidth>
          시작하기
        </Button>
        <Button variant="ghost" fullWidth onClick={start}>
          가입은 나중에
        </Button>
      </div>
    </main>
  );
}
