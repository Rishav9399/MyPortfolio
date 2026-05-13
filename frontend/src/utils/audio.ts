"use client";

// We use a singleton pattern so we don't create 100 audio contexts
let audioCtx: AudioContext | null = null;

const initAudio = () => {
  if (!audioCtx && typeof window !== "undefined") {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioCtx;
};

export const playClick = () => {
  const ctx = initAudio();
  if (!ctx || ctx.state === "suspended") return; // Browsers block audio until first click

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  // High-pitched mechanical "tick"
  osc.type = "square";
  osc.frequency.setValueAtTime(400, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.05);
  
  // Very quiet and very short
  gain.gain.setValueAtTime(0.015, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.05);
};