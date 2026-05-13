"use clinet";

import { useEffect, useState } from "react";

export const SystemTelemetry = () => {
    const [time, setTime] = useState("00:00:00:00")
    const [ping, setPing] = useState(12);
    const [memory, setMemory] = useState(42.3);

    useEffect(() => {
        const interval = setInterval(() => {
            // 1. Live time with Miliseconds.
            const now = new Date();
            const h = String(now.getHours()).padStart(2, '0');
            const m = String(now.getMinutes()).padStart(2, '0');
            const s = String(now.getSeconds()).padStart(2, '0');
            const ms = String(Math.floor(now.getMilliseconds() / 10)).padStart(2, '0');
            setTime(`${h}:${m}:${s}:${ms}`);

            // 2. Fluctuating Ping (10ms - 18ms)
            if (Math.random() > 0.7) setPing(Math.floor(Math.random() * 8) + 10);

            // 3. Fluctuating Memory Usage
            if (Math.random() > 0.8) setMemory(+(Math.random() * 5 + 40).toFixed(1));
        }, 50);  // Updates Extremly fast to look "active".

        return () => clearInterval(interval);
    }, []);

    return (
    <div className="fixed top-0 left-0 w-full p-5 pointer-events-none z-50 flex justify-between items-start font-mono text-[9px] uppercase tracking-widest text-zinc-500">
      
      {/* Left Side: Coordinates & Time */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-neon-blue rounded-full animate-pulse" />
          <span className="text-neon-blue">UPLINK ACTIVE</span>
        </div>
        <span>COORD: 22.5726° N, 88.3639° E</span>
        <span className="text-white/80 pr-2">SYS_T: {time}</span>
      </div>

      {/* Right Side: Agent Server Stats */}
      <div className="flex flex-col items-end gap-1 text-right">
        <span>MEM_ALLOC: {memory}%</span>
        <span>PING: {ping}ms</span>
        <span>AGENT_STATUS: IDLE</span>
      </div>

    </div>
  );
}