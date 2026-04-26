"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const STUDY_WITH_ME = [
  { id: "VqFn1QbsjQM", title: "MinSweet · 공방 1.5h" },
  { id: "BHACKCNDMW8", title: "Bot-No-Jam · Lo-fi Study" },
  { id: "jfKfPfyJRdk", title: "Lofi Girl · Live" },
  { id: "5qap5aO4i9A", title: "ChilledCow · Beats" },
];

const NOISE_PRESETS: { id: string; label: string }[] = [
  { id: "off", label: "끔" },
  { id: "brown", label: "갈색소음" },
  { id: "rain", label: "비" },
  { id: "cafe", label: "카페" },
];

export default function AmbientPane() {
  const [open, setOpen] = useState(false);
  const [video, setVideo] = useState<string | null>(null);
  const [noise, setNoise] = useState<string>("off");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    if (noise === "off") {
      a.pause();
    } else {
      a.src = `/audio/${noise}.mp3`;
      a.loop = true;
      a.volume = 0.4;
      a.play().catch(() => {});
    }
  }, [noise]);

  return (
    <div className="w-full">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between bg-white border border-ink-100 rounded-card px-4 py-3 text-left"
        aria-expanded={open}
        aria-controls="ambient-pane"
      >
        <span className="text-[13px] font-bold text-ink-900">
          공방 · 백색소음
        </span>
        <span className="text-xs text-ink-400">
          {open ? "▴ 접기" : "▾ 펴기"}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="ambient-pane"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="bg-white border border-ink-100 border-t-0 rounded-b-card p-4 space-y-3">
              <div>
                <div className="text-[10px] uppercase tracking-widest font-bold text-ink-400 mb-2">
                  공방 영상
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {STUDY_WITH_ME.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setVideo(v.id === video ? null : v.id)}
                      className={cn(
                        "text-left text-[11px] font-semibold p-2 rounded-card border",
                        video === v.id
                          ? "bg-ink-900 text-paper border-ink-900"
                          : "bg-paper text-ink-700 border-ink-200",
                      )}
                    >
                      {v.title}
                    </button>
                  ))}
                </div>
                {video && (
                  <div className="mt-3 aspect-video rounded-card overflow-hidden border border-ink-100">
                    <iframe
                      src={`https://www.youtube.com/embed/${video}?autoplay=1&mute=0`}
                      title="공방"
                      width="100%"
                      height="100%"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                )}
              </div>

              <div>
                <div className="text-[10px] uppercase tracking-widest font-bold text-ink-400 mb-2">
                  백색소음
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  {NOISE_PRESETS.map((n) => (
                    <button
                      key={n.id}
                      onClick={() => setNoise(n.id)}
                      className={cn(
                        "px-3 py-1.5 rounded-chip text-[11px] font-bold border",
                        noise === n.id
                          ? "bg-ink-900 text-paper border-ink-900"
                          : "bg-white text-ink-700 border-ink-200",
                      )}
                    >
                      {n.label}
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-ink-400 mt-2 leading-relaxed">
                  ADHD 외엔 효과 약함 (Oregon HSU 2024). state-cue로만.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <audio ref={audioRef} preload="none" />
    </div>
  );
}
