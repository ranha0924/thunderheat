import { cn } from "@/lib/utils";
import { Chip } from "./Chip";
import { ProgressBar } from "./ProgressBar";

interface SubjectCardProps {
  subject: string;
  mode: "expanded" | "compact";
  dDay?: number;
  progress?: number;
  level?: number;
  weakCount?: number;
  disabled?: boolean;
  href?: string;
  onClick?: () => void;
}

export function SubjectCard({
  subject,
  mode,
  dDay,
  progress,
  level,
  weakCount,
  disabled,
  onClick,
}: SubjectCardProps) {
  if (mode === "compact") {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={cn(
          "w-full bg-white rounded-card p-4 flex items-center justify-between text-left shadow-paper-soft border border-ink-100",
          disabled && "opacity-50 cursor-not-allowed",
        )}
      >
        <div className="flex flex-col">
          <span className="font-bold text-ink-900 text-sm">{subject}</span>
          <span className="text-[11px] text-ink-400 mt-0.5">
            {disabled ? "Soon" : "준비 완료"}
          </span>
        </div>
        {disabled && (
          <span className="text-[10px] font-bold text-ink-400 bg-ink-100 px-2 py-0.5 rounded-chip">
            Soon
          </span>
        )}
      </button>
    );
  }
  return (
    <button
      onClick={onClick}
      className="w-full bg-white rounded-card p-5 text-left shadow-paper border border-ink-100"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="text-[11px] text-ink-500 uppercase tracking-wider font-semibold mb-1">
            오늘 공부
          </div>
          <h3 className="text-lg font-bold text-ink-900 tracking-tight">
            {subject}
          </h3>
        </div>
        {dDay !== undefined && (
          <Chip variant="terracotta">D-{dDay}</Chip>
        )}
      </div>
      {progress !== undefined && (
        <ProgressBar
          value={progress}
          variant="terracotta"
          showLabel
          label="진도"
          className="mb-3"
        />
      )}
      <div className="flex gap-2 flex-wrap text-[11px] text-ink-500">
        {level !== undefined && (
          <span className="bg-ink-100 px-2 py-1 rounded-chip">Lv.{level}</span>
        )}
        {weakCount !== undefined && (
          <span className="bg-terracotta-soft text-terracotta-deep px-2 py-1 rounded-chip font-semibold">
            약점 {weakCount}
          </span>
        )}
      </div>
    </button>
  );
}
