"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatAgent from "@/components/ChatAgent";
// import { BackgroundBeams } from "@/components/BackgroundBeams"; // Removed as we use NeuralFloor now
import { BentoGrid } from "@/components/BentoGrid";
import { SystemLog } from "@/components/SystemLog";
import { BootSequence } from "@/components/BootSequence";
import { SystemTelemetry } from "@/components/SystemTelemetry";
import { CustomCursor } from "@/components/CustomCursor";
import { NeuralFloor } from "@/components/NeuralFloor";
import { AboutCore } from "@/components/AboutCore";
import { ArchiveNode } from "@/components/ArchiveNode";
  
export default function Home() {
  // 1. Boot State
  const [isBooted, setIsBooted] = useState(false);
  
  // 2. Scramble State
  const [displayTitle, setDisplayTitle] = useState("RISHAV");
  const chars = "!@#$%^&*()_+NKJHIUY654321";

  // --- NEW: THE SCROLL OVERRIDE ---
  useEffect(() => {
    // 1. Disable the browser's automatic scroll memory
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    // 2. Force the window to absolute top of the page on load
    window.scrollTo(0, 0);
  }, []);

  const scramble = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayTitle(prev =>
        prev.split("").map((_, index) => {
          if(index < iteration) return "RISHAV"[index];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("")
      );
      if(iteration >= 6) clearInterval(interval);
      iteration += 1/3;
    }, 30);
  };

  // Only trigger the scramble effect AFTER the boot sequence is complete
  useEffect(() => { 
    if (isBooted) {
      scramble(); 
    }
  }, [isBooted]);

  return (
    <>
      {/* THE BOOT SEQUENCE OVERLAY */}
      <AnimatePresence>
        {!isBooted && <BootSequence onComplete={() => setIsBooted(true)} />}
      </AnimatePresence>

      {/* THE MAIN OS INTERFACE */}
      <main className="relative flex flex-col items-center bg-[#050505] selection:bg-neon-purple/30 min-h-screen">
        <NeuralFloor />
        
        {/* 1. HERO SECTION */}
        <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
          
          {/* Top HUD decoration */}
          <div className="absolute top-10 flex flex-col items-center gap-2">
              <motion.div 
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="h-[1px] w-32 bg-gradient-to-r from-transparent via-neon-blue to-transparent" 
              />
              <span className="text-[10px] tracking-[0.4em] text-zinc-500 uppercase">System Initialized</span>
          </div>

          <motion.div 
            // The Hero waits for the boot sequence to finish before scaling up & unblurring
            initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            animate={isBooted ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-center z-10"
          >
            <h1 className="text-[18vw] font-black tracking-tighter leading-none text-mask-beams select-none w-full text-center">
              {displayTitle}
            </h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={isBooted ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              className="text-zinc-500 tracking-[1.2em] uppercase text-[10px] md:text-xs ml-[1.2em]"
            >
              Architecting Digital Intelligence
            </motion.p>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-10 flex flex-col items-center gap-2 opacity-30"
          >
            <span className="text-[8px] uppercase tracking-widest">Scroll to Access</span>
            <div className="w-[1px] h-12 bg-white" />
          </motion.div>
        </section>

        {/* 2. THE SYSTEM DASHBOARD (Bento Grid) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full flex justify-center pt-24 pb-32 relative z-20"
        >
          <BentoGrid />
        </motion.div>

        {/* 3. THE DEPTH RIFT (About Section) */}
        <AboutCore />

        {/* 4. THE PROJECT VAULT (Archive Node) */}
        <ArchiveNode />

        {/* 4. FLOATING HUD ELEMENTS */}
        <SystemLog />
        <SystemTelemetry />
        <CustomCursor />
        <ChatAgent />
      </main>
    </>
  );
}