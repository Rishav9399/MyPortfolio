"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const NeuralFloor = () => {
    const mouseX = useMotionValue(0);
    const MouseY = useMotionValue(0);
    
    // Smooth spring physics for the parallax effect
    const springX = useSpring(mouseX, { stiffness: 40, damping: 30 });
    const springY = useSpring(MouseY, { stiffness: 40, damping: 30 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { innerWidth, innerHeight } = window;
            // Calculate mouse offset from the center of the screen
            const x = (e.clientX - innerWidth / 2) / 30;
            const y = (e.clientY - innerHeight / 2) / 30;
            mouseX.set(x);
            MouseY.set(y);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, MouseY]);

    return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#020202]">
      
      {/* Deep Ambient Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-neon-purple/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-neon-blue/5 rounded-full blur-[150px]" />

      {/* The 3D Perspective Container */}
      <div className="absolute inset-0" style={{ perspective: "1000px" }}>
        
        {/* The Animated Grid */}
        <motion.div
          style={{
            x: springX,
            y: springY,
            rotateX: 75, // Tilts the grid so it looks like a floor
            scale: 3, // Scales it up so edges don't show when moving
          }}
          className="absolute w-full h-[150%] bottom-[-40%] origin-bottom"
        >
          <div 
            className="w-full h-full opacity-40"
            style={{
              // Creates a grid using intersecting linear gradients
              backgroundImage: `
                linear-gradient(to right, rgba(0, 243, 255, 0.15) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0, 243, 255, 0.15) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
              // Fades the grid out as it goes "into the distance"
              maskImage: "linear-gradient(to top, black 20%, transparent 80%)",
              WebkitMaskImage: "linear-gradient(to top, black 20%, transparent 80%)",
            }}
          >
            {/* The "Pulse" light traveling down the grid */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-neon-purple/10 to-transparent animate-[scanline_6s_linear_infinite]" />
          </div>
        </motion.div>
      </div>
      
    </div>
  );
};
