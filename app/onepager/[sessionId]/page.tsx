"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/Button";
import { ALL_QUESTIONS } from "@/lib/questions";
import { buildOnepager, OnepagerData } from "@/lib/onepager";
import { getState } from "@/lib/storage";

export default function OnepagerPage() {
  const [data, setData] = useState<OnepagerData | null>(null);

  useEffect(() => {
    const s = getState();
    setData(buildOnepager(s, ALL_QUESTIONS));
  }, []);

  if (!data) {
    return (
      <main className="px-5 pt-12 text-center text-sm text-ink-500">
        요약 만드는 중…
      </main>
    );
  }

  const date = new Date(data.generatedAt);
  const dateStr = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

  const print = () => {
    if (typeof window !== "undefined") window.print();
  };

  const share = async () => {
    if (typeof window === "undefined") return;
    const md = [
      `# 오늘밤 요약 · ${dateStr}`,
      `세션: ${data.durationMin}분 · 정답률 ${data.accuracy}% · 마스터 ${data.masteredCount}개`,
      "",
      "## 약점 단어",
      ...data.weakWords.map(
        (w) => `- ${w.word} (${w.failures}회) — ${w.meaning}`,
      ),
      "",
      "## 함정 3선",
      ...data.topTraps.map((t) => `- ${t}`),
      "",
      "## 본문 outline",
      data.passageOutline,
    ].join("\n");
    if ((navigator as Navigator & { share?: (data: ShareData) => Promise<void> }).share) {
      try {
        await (navigator as Navigator & { share: (data: ShareData) => Promise<void> }).share({
          title: "벼락치기 도우미 — 오늘밤 요약",
          text: md,
        });
      } catch {}
    } else {
      try {
        await navigator.clipboard.writeText(md);
        alert("요약이 클립보드에 복사됐어요");
      } catch {}
    }
  };

  return (
    <main className="px-5 pt-10 pb-6 print:px-0 print:pt-0">
      <header className="mb-5 print:mb-3">
        <p className="text-[11px] text-terracotta font-bold uppercase tracking-widest mb-1 print:hidden">
          ONE-PAGER · 시험 직전 5분
        </p>
        <h1 className="text-2xl font-extrabold tracking-tight print:text-xl">
          오늘밤 요약 · {dateStr}
        </h1>
        <p className="text-[12px] text-ink-500 mt-2">
          {data.durationMin}분 학습 · 정답률 {data.accuracy}% · 마스터{" "}
          {data.masteredCount}개
        </p>
      </header>

      <Section title="약점 단어 (10)">
        {data.weakWords.length === 0 ? (
          <p className="text-[12px] text-ink-500 p-3">
            오늘은 약점이 없어요. 한 라운드 더 풀어보세요.
          </p>
        ) : (
          <ol className="space-y-1.5 p-3">
            {data.weakWords.map((w, i) => (
              <li
                key={w.word}
                className="text-[13px] text-ink-900 leading-snug flex gap-2"
              >
                <span className="font-bold text-ink-500 tabular-nums shrink-0">
                  {(i + 1).toString().padStart(2, "0")}.
                </span>
                <div>
                  <span className="font-bold">{w.word}</span>
                  <span className="text-ink-500"> — {w.meaning}</span>
                  <span className="text-[10px] text-terracotta-deep ml-1.5 font-bold">
                    {w.failures}회
                  </span>
                </div>
              </li>
            ))}
          </ol>
        )}
      </Section>

      {data.weakQuestions.length > 0 && (
        <Section title="다시 풀 문제">
          <ul className="space-y-1.5 p-3">
            {data.weakQuestions.map((q) => (
              <li
                key={q.id}
                className="text-[12px] text-ink-700 leading-snug"
              >
                <span className="font-bold">{q.label}</span>
                <span className="text-terracotta-deep ml-1.5 font-bold">
                  {q.failures}회
                </span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section title="함정 3선">
        <ul className="space-y-1.5 p-3">
          {data.topTraps.map((t) => (
            <li
              key={t}
              className="text-[12px] text-ink-700 leading-snug flex gap-2"
            >
              <span className="text-terracotta font-bold shrink-0">→</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="본문 outline">
        <p className="text-[12px] text-ink-700 p-3 leading-relaxed">
          {data.passageOutline || "선택한 레슨 없음"}
        </p>
      </Section>

      <div className="bg-butter-soft rounded-card p-3 mt-4 border border-ink-100 print:break-inside-avoid">
        <p className="text-[12px] text-ink-900 leading-relaxed">
          ✱ <strong>자정 전 자기 + 7시 30분 한 번만 더 스캔</strong> = 최강 컨디션
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-5 print:hidden">
        <Button variant="secondary" fullWidth onClick={share}>
          공유 / 복사
        </Button>
        <Button variant="primary" fullWidth onClick={print}>
          A4 인쇄
        </Button>
      </div>
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
    <section className="mb-3 print:break-inside-avoid">
      <h2 className="text-xs font-bold text-ink-500 uppercase tracking-widest mb-2 px-1">
        {title}
      </h2>
      <div className="bg-white rounded-card border border-ink-100">
        {children}
      </div>
    </section>
  );
}
