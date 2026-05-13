"use client";
import { motion } from "framer-motion";
import { Terminal, FolderGit2, ExternalLink, Plus } from "lucide-react";
import { playClick } from "@/utils/audio";

// 1. Only your actual core project remains
const PROJECTS = [
  { 
    id: "sys_core", 
    name: "neural_os_v1.0", 
    type: "DIR", 
    date: "2026-05-14", // Update this to your actual start date if you want
    tech: "Next.js / TypeScript /FastAPI / Python / RAG / AI", 
    link: "http://localhost:3000" 
  },
];

export const ArchiveNode = () => {
  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-32 relative z-20">
      
      <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
        <Terminal className="text-neon-blue w-5 h-5" />
        <h2 className="text-xl font-mono font-bold text-white tracking-widest uppercase">
          Archive_Node
        </h2>
        <span className="text-xs font-mono text-zinc-500 ml-auto">ls -la /projects</span>
      </div>

      <div className="flex flex-col font-mono text-sm md:text-base">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 text-zinc-500 pb-4 px-4 uppercase tracking-widest text-[10px]">
          <div className="col-span-2 hidden md:block">Permission</div>
          <div className="col-span-3 md:col-span-2">Date</div>
          <div className="col-span-6 md:col-span-4">Entity_Name</div>
          <div className="col-span-3 md:col-span-3 text-right md:text-left">Tech_Stack</div>
          <div className="col-span-1 hidden md:block text-right">Link</div>
        </div>

        {/* 1. Active Project Rows */}
        {PROJECTS.map((proj, i) => (
          <motion.a
            href={proj.link}
            target="_blank"
            rel="noopener noreferrer"
            key={proj.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            onMouseEnter={playClick} // The mechanical audio tick!
            className="grid grid-cols-12 gap-4 items-center px-4 py-4 border-b border-white/5 hover:bg-white/[0.02] hover:border-neon-blue/30 transition-colors group cursor-pointer"
          >
            <div className="col-span-2 hidden md:block text-zinc-600">drwxr-xr-x</div>
            <div className="col-span-3 md:col-span-2 text-zinc-400">{proj.date}</div>
            <div className="col-span-6 md:col-span-4 flex items-center gap-2 text-white group-hover:text-neon-blue transition-colors">
              <FolderGit2 className="w-4 h-4 text-zinc-500 group-hover:text-neon-blue" />
              {proj.name}
            </div>
            <div className="col-span-3 md:col-span-3 text-xs text-zinc-500 text-right md:text-left">{proj.tech}</div>
            <div className="col-span-1 hidden md:flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
              <ExternalLink className="w-4 h-4 text-neon-blue" />
            </div>
          </motion.a>
        ))}

        {/* 2. The "Awaiting Input" Placeholder Row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-12 gap-4 items-center px-4 py-4 border-b border-dashed border-white/10 text-zinc-600 bg-white/[0.005] group"
        >
          <div className="col-span-2 hidden md:block opacity-50">--w-------</div>
          <div className="col-span-3 md:col-span-2 opacity-50">PENDING...</div>
          <div className="col-span-6 md:col-span-4 flex items-center gap-2">
            <div className="relative flex items-center justify-center w-4 h-4">
              <Plus className="w-4 h-4 text-zinc-500 absolute" />
              <div className="w-4 h-4 border border-zinc-500 rounded-sm animate-ping absolute opacity-20"></div>
            </div>
            <span className="tracking-widest uppercase text-xs md:text-sm group-hover:text-zinc-400 transition-colors">
              Awaiting_Directive
            </span>
          </div>
          <div className="col-span-3 md:col-span-3 text-[10px] md:text-xs text-right md:text-left opacity-50 uppercase tracking-widest">
            Allocating_Space
          </div>
          <div className="col-span-1 hidden md:flex justify-end">
            <div className="w-2 h-2 rounded-full bg-zinc-800 animate-pulse"></div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};