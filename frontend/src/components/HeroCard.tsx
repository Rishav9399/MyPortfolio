"use client";
import React, { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export const HeroCard = ({ title, description }: { title: string; description: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className="relative h-96 w-72 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 p-8 shadow-2xl backdrop-blur-sm group cursor-pointer"
    >
      <div
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
        className="absolute inset-4 grid place-content-center rounded-xl bg-black/40 border border-white/10 shadow-lg"
      >
        <div 
           style={{ transform: "translateZ(50px)" }}
           className="text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
          <p className="text-xs text-zinc-400 uppercase tracking-widest">{description}</p>
        </div>
      </div>
      
      {/* Background Glow that follows mouse */}
      <div style={{ transform: "translateZ(20px)" }} className="absolute -inset-2 rounded-xl bg-neon-purple/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
};