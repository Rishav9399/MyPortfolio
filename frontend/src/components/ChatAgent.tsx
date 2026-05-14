"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X, Send, Cpu, Zap } from "lucide-react";
import { playSystemVoice } from "@/utils/audio";
import axios from "axios";

export default function ChatAgent() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [chat, setChat] = useState<{role: string, content: string}[]>([
    { role: "agent", content: "System initialized. I am Rishav's neural proxy. Query my database regarding his architecture, projects, or technical stack." }
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const [remaining, setRemaining] = useState<number>(33); // The Fuel Gauge

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, isOpen, loading]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setChat((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:8000/chat", { message: userMsg.content });
      setChat((prev) => [...prev, { role: "agent", content: res.data.response }]);
      if (res.data.remaining !== undefined) setRemaining(res.data.remaining);
    } catch (err) {
      setChat((prev) => [...prev, { role: "agent", content: "[ERR]: Mainframe link failed. Check backend connection on port 8000." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* 1. THE FLOATING TRIGGER BUTTON */}
      <motion.button
        onClick={() => {
          if (!isOpen) {
            playSystemVoice("Establishing secure link to Neural Proxy.");
          }
          setIsOpen(true);
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`fixed bottom-6 right-6 z-[90] w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 shadow-[0_0_30px_rgba(0,243,255,0.3)] ${isOpen ? "opacity-0 pointer-events-none scale-75" : "opacity-100 bg-neon-blue/10 border border-neon-blue/50 backdrop-blur-md hover:bg-neon-blue/20"}`}
      >
        <div className="absolute inset-0 rounded-full border border-neon-blue animate-[ping_3s_linear_infinite] opacity-50" />
        <Cpu className="w-6 h-6 text-neon-blue" />
      </motion.button>

      {/* 2. THE HOLOGRAPHIC HUD PANEL */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 20, scale: 0.95, filter: "blur(10px)" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-6 right-6 z-[100] w-[calc(100vw-3rem)] md:w-[400px] h-[550px] max-h-[80vh] flex flex-col bg-[#050505]/90 backdrop-blur-3xl border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,243,255,0.1)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-blue opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-neon-blue"></span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-neon-blue font-bold leading-none mb-1">Neural Proxy v1.0</span>
                  <span className="text-xs text-zinc-500 font-mono leading-none">Status: Connected</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Neural Bandwidth Gauge (Your Fuel Gauge integrated into the Cyberpunk theme) */}
            <div className="px-5 py-3 bg-white/5 border-b border-white/5">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-1.5">
                  <Zap size={12} className={remaining < 5 ? "text-red-500" : "text-neon-purple"} />
                  <span className="text-[9px] uppercase tracking-widest text-zinc-500 font-mono">API Bandwidth</span>
                </div>
                <span className={`text-[10px] font-mono ${remaining < 5 ? 'text-red-500 animate-pulse' : 'text-neon-purple'}`}>
                  {remaining} / 33 CYCLES
                </span>
              </div>
              <div className="w-full h-[2px] bg-white/10 overflow-hidden">
                <motion.div 
                  initial={{ width: "100%" }}
                  animate={{ width: `${(remaining / 33) * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className={`h-full ${remaining < 5 ? 'bg-red-500 shadow-[0_0_10px_red]' : 'bg-neon-purple shadow-[0_0_10px_#bc13fe]'}`}
                />
              </div>
            </div>

            {/* Chat History */}
            <div
              className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 custom-scrollbar overscroll-contain"
              onWheel={(e) => e.stopPropagation()}
              data-lenis-prevent="true"
            >
              {chat.map((msg, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: msg.role === "user" ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex flex-col max-w-[85%] ${msg.role === "user" ? "self-end items-end" : "self-start items-start"}`}
                >
                  <span className="text-[9px] uppercase tracking-widest text-zinc-600 mb-1 font-mono">
                    {msg.role === "user" ? "Guest_User" : "Sys_Agent"}
                  </span>
                  <div 
                    className={`p-3 rounded-2xl text-sm font-mono leading-relaxed ${
                      msg.role === "user" 
                        ? "bg-white/5 border border-white/10 text-zinc-300 rounded-tr-sm" 
                        : "bg-neon-blue/5 border border-neon-blue/20 text-neon-blue rounded-tl-sm shadow-[inset_0_0_20px_rgba(0,243,255,0.05)]"
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              
              {/* Loading State */}
              {loading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="self-start flex items-center gap-2 mt-2">
                  <div className="w-1.5 h-1.5 bg-neon-blue rounded-full animate-ping" />
                  <span className="text-[10px] text-neon-blue font-mono uppercase tracking-widest">Awaiting_Uplink...</span>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Terminal */}
            <form onSubmit={handleSend} className="p-4 border-t border-white/5 bg-[#020202]">
              <div className="relative flex items-center">
                <Terminal className="absolute left-3 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Execute query..."
                  disabled={loading}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-12 text-sm font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-neon-blue/50 focus:ring-1 focus:ring-neon-blue/50 transition-all disabled:opacity-50"
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="absolute right-2 p-1.5 bg-white/5 hover:bg-neon-blue/20 text-zinc-400 hover:text-neon-blue rounded-lg transition-colors disabled:opacity-50 disabled:hover:bg-white/5 disabled:hover:text-zinc-400"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}