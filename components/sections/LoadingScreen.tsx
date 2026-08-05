"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<"counting" | "shutter" | "done">("counting");

  useEffect(() => {
    // Count from 0 to 100
    let start = 0;
    const duration = 2000;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * 100);
      setCount(start);

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        // Trigger shutter
        setTimeout(() => setPhase("shutter"), 200);
        setTimeout(() => {
          setPhase("done");
          onComplete();
        }, 1400);
      }
    };

    requestAnimationFrame(tick);
  }, [onComplete]);

  const blades = 6;

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100000] flex flex-col items-center justify-center bg-[#050505]"
        >
          {/* Shutter blades */}
          <div
            className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none"
            style={{ zIndex: 2 }}
          >
            {Array.from({ length: blades }).map((_, i) => {
              const angle = (360 / blades) * i;
              return (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    width: "60vmax",
                    height: "60vmax",
                    originX: "0%",
                    originY: "50%",
                    rotate: angle,
                    left: "50%",
                    top: "50%",
                    marginTop: "-30vmax",
                  }}
                  animate={
                    phase === "shutter"
                      ? { scaleX: [1, 0], originX: "0%" }
                      : { scaleX: 0 }
                  }
                  initial={{ scaleX: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.04,
                    ease: [0.76, 0, 0.24, 1],
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      background:
                        "linear-gradient(90deg, #050505 60%, rgba(139,92,246,0.3))",
                      clipPath: "polygon(0 50%, 100% 0, 100% 100%)",
                    }}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
              className="flex flex-col items-center gap-3"
            >
              {/* Image Logo */}
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white/20 shadow-[0_0_30px_rgba(139,92,246,0.5)]">
                <Image src="/Logo.jpeg" alt="Updraft Logo" fill className="object-cover" />
              </div>

              {/* Agency name */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex gap-1"
              >
                {"UPDRAFT".split("").map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.05, duration: 0.4 }}
                    className="font-space-grotesk text-xl tracking-[0.3em] text-white"
                    style={{ display: char === " " ? "inline-block" : undefined, width: char === " " ? "12px" : undefined }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>

            {/* Counter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="font-space-grotesk text-5xl font-bold tabular-nums"
              style={{
                background: "linear-gradient(135deg, #a78bfa, #22d3ee)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {String(count).padStart(2, "0")}
            </motion.div>

            {/* Loading bar */}
            <div className="w-48 h-px bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #8b5cf6, #06b6d4, #ec4899)",
                }}
                initial={{ width: "0%" }}
                animate={{ width: `${count}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
