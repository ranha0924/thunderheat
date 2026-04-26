"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getState, setState } from "@/lib/storage";

const CUTOFF_HOUR = 23;
const CUTOFF_MIN = 30;
const SNOOZE_MS = 10 * 60 * 1000;

function isAfterCutoff(now = new Date()): boolean {
  const h = now.getHours();
  const m = now.getMinutes();
  return h > CUTOFF_HOUR || (h === CUTOFF_HOUR && m >= CUTOFF_MIN);
}

function shouldShow(): boolean {
  if (!isAfterCutoff()) return false;
  const s = getState();
  if (!s.sleepCutoffSnoozedAt) return true;
  return Date.now() - s.sleepCutoffSnoozedAt > SNOOZE_MS;
}

export default function SleepCutoffModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const check = () => setOpen(shouldShow());
    check();
    const id = setInterval(check, 60 * 1000);
    return () => clearInterval(id);
  }, []);

  const snooze = () => {
    const s = getState();
    setState({ ...s, sleepCutoffSnoozedAt: Date.now() });
    setOpen(false);
  };

  const goSleep = () => {
    const s = getState();
    setState({ ...s, sleepCutoffSnoozedAt: Date.now() });
    setOpen(false);
    if (typeof window !== "undefined") {
      window.location.href = `/onepager/${s.currentFlow?.startedAt ?? "latest"}`;
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[60] bg-ink-900/40 flex items-end sm:items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="sleep-cutoff-title"
        >
          <motion.div
            initial={{ y: 4, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 4, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="w-full max-w-[380px] bg-paper rounded-card p-6 border border-ink-100"
          >
            <div className="text-2xl mb-2" aria-hidden>
              🌙
            </div>
            <h2
              id="sleep-cutoff-title"
              className="text-lg font-extrabold tracking-tight text-ink-900 mb-2"
            >
              지금 자는 게 더 점수 올려요
            </h2>
            <p className="text-[13px] text-ink-700 leading-relaxed mb-3">
              내일 오전 8시 시험이라면 지금 자야 6시간 이상 자요.
              수면 부족 시 회상이 <strong>20–40% 떨어집니다</strong>.
            </p>
            <p className="text-[11px] text-ink-400 leading-relaxed mb-5">
              근거: Diekelmann &amp; Born (2010), <em>Nature Reviews Neuroscience</em>;
              Walker (2017) <em>Why We Sleep</em>.
            </p>
            <div className="space-y-2">
              <button
                onClick={goSleep}
                className="w-full bg-ink-900 text-paper py-3 rounded-card font-bold text-sm"
              >
                요약 보고 자러 가기
              </button>
              <button
                onClick={snooze}
                className="w-full bg-white text-ink-700 py-3 rounded-card border border-ink-200 font-semibold text-sm"
              >
                10분만 더
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
