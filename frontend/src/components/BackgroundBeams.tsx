"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const BackgroundBeams = () => {
    const [mounted, setMounted] = useState<boolean>(false);

    // Only run this on the client
    useEffect(() => {
        setMounted(true);
    }, []);

    // If not mounted, return an empty version or null
    // to avoid the server/clinet mismatch
    if(!mounted) return <div className="absolute inset-0 bg-[#050505]" />

    return (
        <div className="absolute inset-0 overflow-hidden [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]">
      <svg
        className="absolute h-full w-full opacity-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="beam-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#bc13fe" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        {/* We'll generate 10 random beams */}
        {[...Array(10)].map((_, i) => (
          <motion.rect
            key={i}
            width="300"
            height="1"
            fill="url(#beam-grad)"
            initial={{ x: "-100%", y: `${Math.random() * 100}%` }}
            animate={{ x: "200%" }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </svg>
    </div>
  );
};