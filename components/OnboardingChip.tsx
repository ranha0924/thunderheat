"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getState, setState } from "@/lib/storage";

interface Props {
  message?: string;
}

export default function OnboardingChip({
  message = "탭이 바뀌었어요. '오늘밤'에서 90분 가이드 세션을 시작해요.",
}: Props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const s = getState();
    if (!s.tabBarOnboarded) setShow(true);
  }, []);

  const dismiss = () => {
    const s = getState();
    setState({ ...s, tabBarOnboarded: true });
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.18 }}
          className="fixed bottom-[80px] left-1/2 -translate-x-1/2 w-[calc(100%-32px)] max-w-[380px] z-50"
        >
          <div className="bg-ink-900 text-paper rounded-card p-3 flex items-center gap-3 shadow-paper">
            <span className="text-[12px] flex-1 leading-snug">{message}</span>
            <button
              onClick={dismiss}
              className="text-paper/80 text-xs font-bold px-2 py-1"
            >
              닫기
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
