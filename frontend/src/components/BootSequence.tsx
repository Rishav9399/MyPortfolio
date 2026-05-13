"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const BootSequence = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  const bootLogs = [
    "WAKING_NEURAL_ENGINE...",
    "ESTABLISHING_TAVILY_UPLINK...",
    "MOUNTING_QDRANT_VECTOR_MEMORY...",
    "DECRYPTING_RISHAV_ARCHIVES...",
    "BYPASSING_FIREWALL...",
    "SYSTEM_READY."
  ];

  useEffect(() => {
    let currentProgress = 0;
    let logIndex = 0;

    const interval = setInterval(() => {
      // 1. SMALLER JUMPS: Adds between 2% and 7% per tick (was 5% to 20%)
      currentProgress += Math.floor(Math.random() * 6) + 2; 
      if (currentProgress > 100) currentProgress = 100;
      setProgress(currentProgress);

      // 2. LOG TIMING: Still tied to percentage so they drop in evenly
      if (currentProgress > (logIndex * 16) && logIndex < bootLogs.length) {
        setLogs(prev => [...prev, bootLogs[logIndex]]);
        logIndex++;
      }

      // 3. THE PAUSE: When it hits 100%, wait longer before snapping away
      if (currentProgress === 100) {
        clearInterval(interval);
        setTimeout(onComplete, 1500); // Increased from 800ms to 1500ms
      }
    }, 200); // 4. SLOWER TICKS: Increased from 150ms to 200ms

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div 
      exit={{ y: "-100%", opacity: 0, filter: "blur(20px)" }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[99999] flex flex-col justify-end bg-[#020202] text-neon-blue p-8 font-mono"
    >
      <div className="max-w-3xl w-full mx-auto flex flex-col gap-4">
        {/* The Logs */}
        <div className="flex flex-col gap-1 text-[10px] md:text-sm uppercase tracking-widest opacity-70">
          {logs.map((log, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {`> ${log}`}
            </motion.div>
          ))}
        </div>

        {/* The Loading Bar */}
        <div className="w-full h-[1px] bg-white/10 relative mt-4">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-neon-purple shadow-[0_0_15px_#bc13fe]"
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear", duration: 0.2 }}
          />
        </div>

        {/* The Percentage */}
        <div className="flex justify-between items-end mt-2">
          <span className="text-white text-6xl md:text-8xl font-black tracking-tighter leading-none">
            {progress}%
          </span>
          <span className="text-[10px] text-zinc-500 uppercase tracking-widest pb-2">
            Loading_OS
          </span>
        </div>
      </div>
    </motion.div>
  );
};