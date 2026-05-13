"use client";
import { motion, useScroll, useTransform, AnimatePresence, Transition } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// --- UNIFIED VAULT DATA ---
// We now use this data for BOTH the small grid cards and the large popups 
// so Framer Motion morphs them flawlessly without text mismatch.
// --- THE MASTER DATA DICTIONARY ---
const VAULT_DATA: Record<string, any> = {
  core: {
    id: "core",
    pill: "System Architecture",
    title: "Neural OS (v1.0)",
    desc: "You are currently interacting with it. This is not a static template; it is a custom-engineered Next.js application leveraging liquid physics, framer-motion, and dynamic layout morphing to create a living web environment.",
    tech: ["Next.js 16", "TypeScript", "Framer Motion", "Tailwind v4"],
  },
  identity: {
    id: "identity",
    pill: "Core Stack • Indexed Skills",
    title: "Vector Identity",
    desc: "A production-ready stack bridging frontend interfaces with heavy backend AI logic. Proficient in architecting RAG pipelines, context engineering, and managing robust relational databases.",
    tech: ["Python", "FastAPI", "GenAI / RAG", "PostgreSQL", "C/C++"],
  },
  frontend: {
    id: "frontend",
    pill: "Active Directive: Production",
    title: "Expanding Horizons",
    desc: "Currently accelerating through my first months in a professional engineering role. Actively upgrading my internal systems by mastering CI/CD edge deployments, advanced AI orchestrations, and secure authentication protocols.",
    tech: ["CI/CD (Vercel)", "LangChain", "Vector DBs", "JWT Auth", "CrewAI"],
  },
  system: {
    id: "system",
    pill: "External Handshake",
    title: "Secure Uplink",
    desc: "Initialize a secure connection to my external repositories and professional networks. CV payload is currently undergoing a structural rewrite and will be deployed in a future patch.",
    tech: ["GitHub", "LinkedIn", "X (Twitter)"],
  }
};

// --- CUSTOM PHYSICS SPRING ---
// This forces Framer Motion to use a specific, ultra-smooth curve instead of the default snap.
const liquidSpring: Transition = { 
  type: "spring", 
  stiffness: 280, 
  damping: 25, 
  mass: 0.8 
};

export const BentoGrid = () => {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeCard, setActiveCard] = useState<string | null>(null);

  // --- THE NEW SCROLL LOCK ---
  useEffect(() => {
    if (activeCard) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    // CleanUp in case the component Unmounts.
    return () => { document.body.style.overflow = ""; };
  }, [activeCard]); 

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 20]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const activeData = activeCard ? VAULT_DATA[activeCard] : null;

  return (
    <>
      <section ref={containerRef} className="w-full max-w-7xl px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[700px]">
          
          {/* 1. LARGE CARD: Neural Core */}
          <motion.div 
            layoutId="core-vault"
            transition={liquidSpring}
            onClick={() => setActiveCard("core")}
            style={{ y: y1 }}
            onMouseMove={handleMouseMove}
            className="md:col-span-2 md:row-span-2 group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-10 backdrop-blur-3xl transition-colors hover:border-neon-blue/30 z-10 cursor-pointer"
          >
            <div className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100" style={{ background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0,243,255,0.08), transparent 40%)` }} />
            <div className="relative z-10 mt-8 flex flex-col">
              <motion.div layoutId="core-pill" transition={liquidSpring} className="text-neon-blue text-[10px] font-bold tracking-[0.4em] uppercase opacity-60">{VAULT_DATA.core.pill}</motion.div>
              <motion.h3 layoutId="core-title" transition={liquidSpring} className="text-4xl font-bold text-white mt-4 mb-6 tracking-tight">{VAULT_DATA.core.title}</motion.h3>
              <p className="text-zinc-400 leading-relaxed text-lg max-w-xs">Orchestrating high-speed inference with FastAPI, Groq LPU, and custom semantic routing logic.</p>
              <div className="mt-20 flex gap-1">
                {[...Array(20)].map((_, i) => ( <motion.div key={i} animate={{ height: [4, 12, 4] }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }} className="w-[2px] bg-neon-blue/20" /> ))}
              </div>
            </div>
          </motion.div>

          {/* 2. WIDE CARD: Vector Identity (Hierarchy Fixed) */}
          <motion.div 
            layoutId="identity-vault"
            transition={liquidSpring}
            onClick={() => setActiveCard("identity")}
            style={{ y: y2 }}
            className="md:col-span-2 relative overflow-hidden bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-8 flex flex-col justify-between group hover:border-neon-purple/30 transition-all z-10 cursor-pointer"
          >
            <div className="neural-scan opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 flex justify-between items-start">
              
              {/* FIXED: Pill is now above Title to match expanded state */}
              <div className="flex flex-col">
                <motion.div layoutId="identity-pill" transition={liquidSpring} className="text-zinc-500 text-xs mb-1 uppercase tracking-widest font-mono">{VAULT_DATA.identity.pill}</motion.div>
                <motion.h3 layoutId="identity-title" transition={liquidSpring} className="text-2xl font-bold tracking-tight">{VAULT_DATA.identity.title}</motion.h3>
              </div>

              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-neon-purple/50 transition-all">
                <div className="w-2 h-2 rounded-full bg-neon-purple shadow-[0_0_10px_#bc13fe] animate-pulse" />
              </div>
            </div>
            <div className="relative z-10 text-5xl md:text-6xl mt-12 font-black text-white/[0.03] select-none tracking-tighter group-hover:text-neon-purple/5 transition-colors truncate">MEMORY_CLUSTER</div>
          </motion.div>

          {/* 3. SMALL CARD: Frontend */}
          <motion.div 
            layoutId="frontend-vault"
            transition={liquidSpring}
            onClick={() => setActiveCard("frontend")}
            whileHover={{ y: -8, scale: 0.99 }}
            className="relative z-20 bg-white/5 border border-white/5 rounded-[2.5rem] p-8 flex flex-col justify-center items-center text-center group transition-all hover:bg-white/[0.07] cursor-pointer"
          >
            <motion.div layoutId="frontend-pill" transition={liquidSpring} className="text-neon-purple font-mono text-[10px] mb-3 tracking-[0.3em] uppercase">{VAULT_DATA.frontend.pill}</motion.div>
            <motion.h3 layoutId="frontend-title" transition={liquidSpring} className="text-2xl font-bold tracking-tight">{VAULT_DATA.frontend.title}</motion.h3>
            <div className="mt-4 w-12 h-[1px] bg-white/10 group-hover:w-20 transition-all group-hover:bg-neon-purple" />
          </motion.div>

          {/* 4. SMALL CARD: System Status */}
          <motion.div 
            layoutId="system-vault"
            transition={liquidSpring}
            onClick={() => setActiveCard("system")}
            whileHover={{ y: -8, scale: 0.99 }}
            className="relative z-20 bg-white/5 border border-white/5 rounded-[2.5rem] p-8 flex flex-col justify-center items-center text-center overflow-hidden group transition-all hover:bg-white/[0.07] cursor-pointer"
          >
             <div className="absolute inset-0 bg-neon-blue/5 opacity-0 group-hover:opacity-100 transition-opacity" />
             <motion.div layoutId="system-pill" transition={liquidSpring} className="text-zinc-500 text-[10px] uppercase tracking-[0.4em] mb-3 relative z-10">{VAULT_DATA.system.pill}</motion.div>
             <motion.h3 layoutId="system-title" transition={liquidSpring} className="text-3xl font-black italic tracking-tighter text-white group-hover:text-neon-blue transition-colors relative z-10">{VAULT_DATA.system.title}</motion.h3>
          </motion.div>

        </div>
      </section>

      {/* === THE DYNAMIC OVERLAY === */}
      {/* 1. The BackDrop (Seperate AnimatePresence so it fades cleanly) */}
      <AnimatePresence>
        {activeCard && (
          <motion.div 
            key="backdrop"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            transition={{ duration: 0.4 }}
            onClick={() => setActiveCard(null)} 
            className="fixed inset-0 z-[99] bg-black/60 backdrop-blur-xl cursor-pointer" 
          />
        )}
      </AnimatePresence>
      
      {/* 2. The Modal Container (Always rendered so React doesn't instantly kill the physics) */}
      <div 
        className={`fixed inset-0 z-[100] flex items-center justify-center px-4 md:px-20 py-10 ${activeCard ? "pointer-events-auto" : "pointer-events-none"}`}
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        data-lenis-prevent="true"
      >
        <AnimatePresence>
          {activeCard && activeData && (
            <motion.div 
              key="vault-card"
              layoutId={`${activeData.id}-vault`}
              transition={liquidSpring}
              className="relative w-full max-w-5xl h-full max-h-[80vh] bg-[#050505] border border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row shadow-[0_0_50px_rgba(188,19,254,0.15)] z-10"
            >
              {/* Left Side: Info */}
              <div className="p-10 flex flex-col justify-between md:w-1/2 border-r border-white/5 bg-white/[0.02]">
                <div>
                  <motion.div layoutId={`${activeData.id}-pill`} transition={liquidSpring} className="text-neon-purple font-mono text-[10px] mb-4 tracking-[0.3em] uppercase inline-block border border-neon-purple/30 px-3 py-1 rounded-full bg-neon-purple/10">
                    {activeData.pill}
                  </motion.div>
                  <motion.h3 layoutId={`${activeData.id}-title`} transition={liquidSpring} className="text-5xl font-black tracking-tighter mb-6">{activeData.title}</motion.h3>
                  <p className="text-zinc-400 leading-relaxed text-sm">{activeData.desc}</p>
                  
                  <div className="mt-8 flex flex-wrap gap-2">
                    {activeData.tech.map((tech: string) => (
                      <span key={tech} className="text-xs text-white/60 bg-white/5 px-3 py-1 rounded-md border border-white/5">{tech}</span>
                    ))}
                  </div>
                </div>

                <button onClick={() => setActiveCard(null)} className="mt-10 self-start text-xs font-mono uppercase tracking-widest text-zinc-500 hover:text-white transition-colors flex items-center gap-2 group cursor-pointer z-50">
                  <div className="w-8 h-[1px] bg-zinc-600 group-hover:bg-white transition-colors" />
                  Terminate Connection
                </button>
              </div>

              {/* Right Side: Mock Terminal */}
              <div className="p-10 md:w-1/2 bg-[#020202] relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(188,19,254,0.05),transparent_70%)] pointer-events-none" />
                
                <div className="w-full bg-[#0d1117] border border-[#30363d] rounded-md p-4 font-mono text-[11px] leading-relaxed relative z-10 shadow-2xl overflow-hidden">
                  <div className="flex items-center justify-between mb-3 border-b border-[#30363d] pb-2 text-[#8b949e] text-[10px] uppercase tracking-wider">
                     <div className="flex gap-4 items-center">
                       <span className="flex items-center gap-1.5">Problems <span className="bg-[#1f6feb] text-white px-1.5 py-0.5 rounded-full text-[8px] font-bold leading-none">1</span></span>
                       <span>Output</span>
                       <span className="border-b border-[#58a6ff] pb-2 text-[#c9d1d9]">Terminal</span>
                     </div>
                     <div className="flex gap-3 text-lg items-center">
                       <span className="text-sm bg-white/5 px-2 py-0.5 rounded-md border border-white/5">bash</span>
                       <span className="cursor-pointer hover:text-white transition-colors">+</span>
                     </div>
                  </div>

                  <div className="flex flex-col gap-1 tracking-tight">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex flex-wrap items-center gap-2">
                      <span className="text-[#3fb950] font-semibold">risha@LapiLapi</span>
                      <span className="text-[#d2a8ff] font-semibold">MINGW64</span>
                      <span className="text-[#e3b341] font-semibold">/d/my-portfolio/{activeData.id}</span>
                      <span className="text-[#58a6ff] font-semibold">(master)</span>
                    </motion.div>

                    {/* DYNAMIC TERMINAL OUTPUTS */}
                    <div className="text-[#c9d1d9] flex flex-col gap-0.5 mt-2">
                      
                      {/* 1. NEURAL OS (Next.js Boot) */}
                      {activeData.id === "core" && (
                        <>
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex gap-2 mb-2"><span className="text-zinc-500">$</span> npm run dev</motion.div>
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>&gt; rishav-os@1.0.0 dev</motion.div>
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mb-2">&gt; next dev --turbo</motion.div>
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="flex items-center gap-2 font-semibold"><span className="text-[#ff7b72]">▲</span> Next.js 16 (Turbopack)</motion.div>
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}><span className="text-zinc-500">-</span> Local:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;http://localhost:3000</motion.div>
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }} className="flex items-center gap-2 mt-1"><span className="text-[#3fb950] font-bold">✓</span> Physics Engine synced in 881ms</motion.div>
                        </>
                      )}

                      {/* 2. VECTOR IDENTITY (FastAPI/Python Boot) */}
                      {activeData.id === "identity" && (
                        <>
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex gap-2 mb-2"><span className="text-zinc-500">$</span> uvicorn main:app --reload --port 8000</motion.div>
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}><span className="text-[#58a6ff]">INFO:</span> Started server process [18452]</motion.div>
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}><span className="text-[#58a6ff]">INFO:</span> PostgreSQL Database connected.</motion.div>
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}><span className="text-[#3fb950]">INFO:</span> RAG Context Engine online. Embeddings loaded.</motion.div>
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}><span className="text-[#58a6ff]">INFO:</span> Application startup complete.</motion.div>
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }} className="mt-1"><span className="text-[#58a6ff]">INFO:</span> Uvicorn running on <span className="underline cursor-pointer">http://127.0.0.1:8000</span></motion.div>
                        </>
                      )}

                      {/* 3. EXPANDING HORIZONS (CI/CD Pipeline Boot) */}
                      {activeData.id === "frontend" && (
                        <>
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex gap-2 mb-2"><span className="text-zinc-500">$</span> ./scripts/upskill_protocol.sh</motion.div>
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>[INFO] Fetching current production targets...</motion.div>
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>[INFO] Downloading modules: [LangChain, CrewAI, Supabase]</motion.div>
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>[INFO] Configuring JWT Auth & Rate Limiting...</motion.div>
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>[INFO] Vercel CI/CD pipeline verified.</motion.div>
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }} className="flex items-center gap-2 mt-1"><span className="text-[#3fb950] font-bold">✓</span> Growth metrics optimized. Ready for next sprint.</motion.div>
                        </>
                      )}

                      {/* 4. SECURE UPLINK (The Clickable Links!) */}
                      {activeData.id === "system" && (
                        <>
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex gap-2 mb-2"><span className="text-zinc-500">$</span> ssh -i rishav.pem root@external_nodes</motion.div>
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>Authenticating handshake protocol...</motion.div>
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>Handshake successful. Establishing secure links:</motion.div>
                          
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="mt-2 ml-4 flex flex-col gap-1">
                            <div>
                              <span className="text-[#e3b341]">├─ Github:</span> <a href="https://github.com/Rishav9399" target="_blank" rel="noreferrer" className="text-[#58a6ff] hover:text-white hover:underline transition-colors">github.com/Rishav9399</a>
                            </div>
                            <div>
                              <span className="text-[#e3b341]">├─ LinkedIn:</span> <a href="https://www.linkedin.com/in/rishav-kumar-das-b60775218" target="_blank" rel="noreferrer" className="text-[#58a6ff] hover:text-white hover:underline transition-colors">/in/rishav-kumar-das</a>
                            </div>
                            <div>
                              <span className="text-[#e3b341]">└─ X (Twitter):</span> <a href="https://x.com/Rishav_ragnarok" target="_blank" rel="noreferrer" className="text-[#58a6ff] hover:text-white hover:underline transition-colors">@Rishav_ragnarok</a>
                            </div>
                          </motion.div>

                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }} className="flex items-center gap-2 mt-3"><span className="text-[#3fb950] font-bold">✓</span> Network paths established. Awaiting user interaction.</motion.div>
                        </>
                      )}

                    </div>

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }} className="mt-2">
                      <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2.5 h-[14px] bg-[#c9d1d9]" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};