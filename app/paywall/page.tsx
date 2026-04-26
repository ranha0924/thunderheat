"use client";
import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";

const TIERS = [
  {
    id: "single",
    name: "시험 1회",
    price: "₩3,000",
    body: "한 번 시험 대비, 단발 결제",
    main: false,
  },
  {
    id: "month",
    name: "월 무제한",
    price: "₩9,900",
    body: "이번 달 시험 전부 / 약점 보스 무제한",
    main: true,
  },
  {
    id: "term",
    name: "학기 무제한",
    price: "₩29,000",
    body: "한 학기 전체 — 27% 할인",
    main: false,
  },
];

export default function Paywall() {
  return (
    <main className="px-5 pt-10 pb-6">
      <header className="mb-6">
        <p className="text-[11px] text-ink-500 font-semibold mb-1">
          PRO PLAN
        </p>
        <h1 className="text-2xl font-extrabold tracking-tight">
          이번 시험, 끝장내고 싶다면
        </h1>
      </header>

      <div className="space-y-3 mb-6">
        {TIERS.map((t) => (
          <div
            key={t.id}
            className={cn(
              "rounded-card p-5 border bg-white relative",
              t.main
                ? "border-[1.5px] border-ink-900 shadow-paper"
                : "border-ink-100",
            )}
          >
            {t.main && (
              <span className="absolute -top-2 left-5 bg-butter text-ink-900 text-[10px] font-bold px-2 py-0.5 rounded-chip">
                추천
              </span>
            )}
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-base font-bold text-ink-900">{t.name}</span>
              <span className="text-xl font-extrabold text-ink-900">
                {t.price}
              </span>
            </div>
            <p className="text-[12px] text-ink-500 leading-relaxed mb-3">
              {t.body}
            </p>
            <Button
              variant={t.main ? "primary" : "secondary"}
              fullWidth
              onClick={() => alert("V2에서 결제 연결")}
            >
              구매
            </Button>
          </div>
        ))}
      </div>

      <p className="text-[11px] text-ink-400 text-center leading-relaxed">
        업로드한 자료는 24시간 후 자동 삭제됩니다.
        <br />
        구독은 언제든 해지 가능.
      </p>
    </main>
  );
}
