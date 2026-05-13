"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const CustomCursor = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);

  // Exact coordinates for the tiny center dot
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring physics for the outer trailing ring
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    setIsMounted(true);

    // --- TOUCH DECTECTION LOGIC ---
    // If the Device has touch points, it's a mobile/tablet. We disable the custom cursor.
    if('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }
    
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // If we hover over anything with the 'group' class (our Bento cards) or a button/link
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest(".group")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  // Id it's not mounted yet OR if it's a phone , DO NOT render the custom cursor.
  if (!isMounted || isTouchDevice) return null; // Prevents hydration mismatch errors

  return (
    <>
      {/* 1. The Core Dot (Moves instantly) */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-neon-blue rounded-full pointer-events-none z-[9999] shadow-[0_0_10px_#00f3ff] mix-blend-screen"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      
      {/* 2. The Trailing Ring (Uses Spring Physics) */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-neon-purple/60 rounded-full pointer-events-none z-[9998]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 2.5 : 1,
          backgroundColor: isHovering ? "rgba(188, 19, 254, 0.05)" : "rgba(188, 19, 254, 0)",
          borderColor: isHovering ? "rgba(0, 243, 255, 0.5)" : "rgba(188, 19, 254, 0.6)",
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
};