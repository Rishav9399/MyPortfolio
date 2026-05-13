"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { div } from "framer-motion/client";

const LOGS = [
    "[SYS]: INITIALIZING_NEURAL_LINK...",
    "[SYS]: CONNECTING_TO_FASTAPI_V1.1...",
    "[SYS]: RAG_VECTOR_SEARCH_READY",
    "[SYS]: LOADING_IDENTITY_MEMORY...",
    "[SYS]: ENCRYTION_STABLE",
    "[SYS]: TAVILY_SEARCH_UPLINK_ACTIVE",
];

export const SystemLog = () => {
    const [visibleLogs, setVisibleLogs] = useState<string[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setVisibleLogs((prev) => {
                const nextLog = LOGS[Math.floor(Math.random() * LOGS.length)];
                return [...prev.slice(-4), nextLog]; // Keep last 5 logs
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed bottom-6 left-6 z-50 pointer-events-none font-mono text-[8px] text-zinc-600 space-y-1">
            <AnimatePresence>
                {visibleLogs.map((log, i) => (
                    <motion.div
                    key={i + log}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0}}
                    exit={{ opacity: 0, x: 5 }}
                >
                    {log}
                </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}