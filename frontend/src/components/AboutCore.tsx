"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export const AboutCore = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // --- THE SHOCK ABSORBER (NEW) ---
  // This intercepts the harsh scroll wheel ticks and turns them into fluid motion
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 100, // How tight the spring is (lower = smoother)
    damping: 30,    // How much friction (higher = less bounce, smoother stop)
    mass: 0.5       // Makes the text feel heavy and expensive
  });

  // --- THE PHYSICS MATH (WITH FADE-OUT SEQUENCE) ---
  
  // 1. The Giant Text splits.
  const textLeftX = useTransform(smoothScroll, [0, 0.05, 0.4, 1], ["0%", "0%", "-150%", "-150%"]);
  const textRightX = useTransform(smoothScroll, [0, 0.05, 0.4, 1], ["0%", "0%", "150%", "150%"]);
  
  // Notice the two new values at the end of textOpacity: '0.85, 1' and '0.15, 0'
  // It stays at 15% opacity until you reach 85% of the scroll, then fades completely to 0.
  const textOpacity = useTransform(smoothScroll, [0, 0.05, 0.4, 0.85, 1], [1, 1, 0.15, 0.15, 0]);

  // 2. The Bio Content fades in, stays locked, then fades out.
  // It stays fully visible (1) until 85% of the scroll, then smoothly fades out (0) 
  // and floats slightly upwards (-50) to make room for the Archive Node.
  const contentScale = useTransform(smoothScroll, [0, 0.25, 0.6, 0.85, 1], [0.8, 0.8, 1, 1, 0.95]);
  const contentOpacity = useTransform(smoothScroll, [0, 0.25, 0.6, 0.85, 1], [0, 0, 1, 1, 0]);
  const contentY = useTransform(smoothScroll, [0, 0.25, 0.6, 0.85, 1], [50, 50, 0, 0, -50]);

  return (
    <section ref={containerRef} className="relative w-full h-[300vh] bg-[#050505] z-30">
      
      <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden">

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(188,19,254,0.08),transparent_60%)] pointer-events-none" />

        {/* --- THE TEARING TEXT --- */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 overflow-hidden">
          <motion.h2
            style={{ x: textLeftX, opacity: textOpacity }}
            className="text-[12vw] md:text-[10vw] font-black text-white tracking-tighter"
          >
            SYS_
          </motion.h2>
          <motion.h2
            style={{ x: textRightX, opacity: textOpacity }}
            className="text-[12vw] md:text-[10vw] font-black text-neon-blue tracking-tighter"
          >
            ARCHITECT
          </motion.h2>
        </div>

        {/* --- THE ABOUT ME CONTENT --- */}
        <motion.div
          style={{ scale: contentScale, opacity: contentOpacity, y: contentY }}
          className="relative z-30 max-w-4xl px-8 flex flex-col items-center text-center"
        >
          <div className="w-20 h-20 rounded-full border border-neon-purple/50 bg-neon-purple/10 flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(188,19,254,0.3)] backdrop-blur-md">
            <span className="text-neon-purple font-mono text-3xl font-black">R</span>
          </div>

          <h3 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
            ITERATIVE <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-blue">BUILDER</span>
          </h3>

          <div className="space-y-5 text-base md:text-lg text-zinc-400 leading-relaxed font-light">
            <p>
              I am a software engineer bridging the gap between heavy backend AI logic and fluid, human-centric interfaces. I don't carry decades of legacy experience; instead, my foundation is built on an <span className="text-white font-medium">obsessive drive to build, break, and learn at the speed of modern tech.</span>
            </p>
            <p>
              Currently navigating the early months of my first production role, my focus isn't on pretending to know everything—it's on rapid execution. I specialize in wiring up robust RAG pipelines using FastAPI and Python, orchestrating AI agents, and grounding complex language models with precise context engineering.
            </p>
            <p>
              But raw data is useless if the interface feels dead. That’s why I engineer liquid physics, momentum scrolling, and dynamic layouts in Next.js. I believe the best applications don't just compute data—they feel alive, reacting to users with zero-latency precision.
            </p>
            <p>
              My current directive is relentless expansion. I am actively consuming CI/CD pipelines, advanced Vector Database architectures, and secure auth protocols to ensure my deployments aren't just visually stunning, but architecturally bulletproof.
            </p>
            
            <div className="mt-8 flex items-center justify-center gap-3">
              <div className="w-2 h-2 rounded-full bg-neon-blue animate-pulse" />
              <p className="text-neon-blue font-mono text-sm uppercase tracking-widest">
                Current Status: Absorbing Production Data // Ready to Build
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};