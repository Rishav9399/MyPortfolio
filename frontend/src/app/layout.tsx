"use client";

import { useEffect } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Lenis from "lenis";
import "./globals.css";
import { html } from "framer-motion/client";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
 

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  useEffect(() => {
    // 1. Initialize Lenis smooth scroll.
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy(); // Clean up on unmount
    };
  }, []);

  return (
    <html lang="en" className="dark selection:bg-cyan-500/30">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#020202] text-white overflow-x-hidden`}
      >
        {/* THE NEURAL GRAIN OVERLAY - Makes the UI look high-end */}
        <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(188,19,254,0.05), transparent_70%)]" />

        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}
