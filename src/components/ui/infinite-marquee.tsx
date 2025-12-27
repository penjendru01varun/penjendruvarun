"use client";

import { motion } from "framer-motion";

interface MarqueeProps {
    items: string[];
    direction?: "left" | "right";
    speed?: number;
}

export const InfiniteMarquee = ({ items, direction = "left", speed = 20 }: MarqueeProps) => {
    const duplicatedItems = [...items, ...items, ...items, ...items];

    return (
        <div className="relative flex overflow-hidden w-full py-10">
            <motion.div
                className="flex whitespace-nowrap"
                animate={{
                    x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
                }}
                transition={{
                    duration: speed,
                    repeat: Infinity,
                    ease: "linear",
                }}
            >
                {duplicatedItems.map((item, idx) => (
                    <span
                        key={idx}
                        className="text-4xl md:text-6xl font-black text-white/5 mx-8 uppercase tracking-widest hover:text-purple-500/20 transition-colors pointer-events-none"
                    >
                        {item}
                    </span>
                ))}
            </motion.div>
        </div>
    );
};
