"use client";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const OPTIONS = [
  {
    id: "pdf",
    icon: "📄",
    title: "PDF 업로드",
    body: "교과서·족보 PDF 파일",
    enabled: true,
  },
  {
    id: "photo",
    icon: "📷",
    title: "사진 찍기",
    body: "교과서 페이지 촬영",
    enabled: true,
  },
  {
    id: "share",
    icon: "👥",
    title: "친구 공유 받기",
    body: "다른 학생이 만든 카드",
    enabled: false,
  },
];

export default function Upload() {
  const router = useRouter();
  const start = (id: string, enabled: boolean) => {
    if (!enabled) return;
    router.push("/upload/analyzing");
  };
  return (
    <main className="px-5 pt-10 pb-6">
      <header className="mb-6">
        <p className="text-[11px] text-ink-500 font-semibold mb-1">STEP 1 / 3</p>
        <h1 className="text-2xl font-extrabold tracking-tight">
          시험 범위를 알려줘요
        </h1>
        <p className="text-sm text-ink-500 mt-2">PDF·사진 어느 쪽이든 OK.</p>
      </header>

      <div className="space-y-3">
        {OPTIONS.map((o) => (
          <button
            key={o.id}
            onClick={() => start(o.id, o.enabled)}
            disabled={!o.enabled}
            className={cn(
              "w-full bg-white rounded-card p-5 flex items-center gap-4 text-left border border-ink-100 shadow-paper-soft transition relative",
              !o.enabled && "opacity-60 cursor-not-allowed",
            )}
          >
            <div className="w-12 h-12 rounded-card bg-paper flex items-center justify-center text-xl border border-ink-100">
              {o.icon}
            </div>
            <div className="flex-1">
              <div className="font-bold text-ink-900 text-sm">{o.title}</div>
              <div className="text-[12px] text-ink-500 mt-0.5">{o.body}</div>
            </div>
            {!o.enabled && (
              <span className="absolute top-3 right-3 text-[10px] font-bold text-ink-400 bg-ink-100 px-2 py-0.5 rounded-chip">
                Soon
              </span>
            )}
          </button>
        ))}
      </div>

      <p className="text-[11px] text-ink-400 text-center mt-6 leading-relaxed">
        업로드한 자료는 24시간 후 자동 삭제돼요.
      </p>
    </main>
  );
}
