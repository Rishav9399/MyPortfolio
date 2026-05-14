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

// --- AI SYSTEM VOICE ---
export const playSystemVoice = (text: string) => {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);

  // --- SMOOTH FEMALE TUNING ---
  utterance.rate = 0.95;  
  // Nudging the pitch up slightly (1.1) helps ensure even fallback voices sound softer
  utterance.pitch = 1.1;  
  utterance.volume = 1.0; 

  // --- AGGRESSIVE PREMIUM FEMALE VOICE HUNTING ---
  const voices = window.speechSynthesis.getVoices();
  
  // We check for the absolute best female voices across all major operating systems
  let femaleVoice = voices.find(
    (v) => 
      v.name.includes("Google UK English Female") || // Premium Chrome (Top Tier)
      v.name.includes("Google US English") ||        // Premium Chrome Female
      v.name.includes("Samantha") ||                 // Premium Mac
      v.name.includes("Victoria") ||                 // Premium Mac Alternative
      v.name.includes("Microsoft Zira") ||           // Premium Windows US
      v.name.includes("Microsoft Hazel") ||          // Premium Windows UK
      v.name.includes("Microsoft Catherine") ||      // Premium Windows AU
      v.name.toLowerCase().includes("female")        // Catch-all for any labeled female voice
  );
  
  if (femaleVoice) {
    utterance.voice = femaleVoice;
  }

  window.speechSynthesis.speak(utterance);

  // DEBUG TOOL: Uncomment the line below to see exactly which voices your specific PC has!
  // console.log("Installed Voices:", voices.map(v => v.name));
};