import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Hero from "./Hero";
import Countdown from "./Countdown";

export default function HeroCountdownTransition() {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    // The total combined height of Hero + Countdown is roughly 200vh.
    // The scroll transition between them corresponds to the first 50% of this container's scroll area.
    // We apply the transition over [0, 0.5] so it finishes exactly when Countdown is completely in view.
    const domain = [0, 0.5];

    // Hero Section Transitions: scale down, fade out, blur, and move up
    const heroScale = useTransform(scrollYProgress, domain, [1, 0.85]);
    const heroOpacity = useTransform(scrollYProgress, domain, [1, 0.4]);
    const heroFilter = useTransform(scrollYProgress, domain, ["blur(0px)", "blur(10px)"]);
    const heroY = useTransform(scrollYProgress, domain, ["0px", "-150px"]);

    // Countdown Section Transitions: scale normal, fade in, unblur, and move to natural position
    const countdownScale = useTransform(scrollYProgress, domain, [1.2, 1]);
    const countdownOpacity = useTransform(scrollYProgress, domain, [0, 1]);
    const countdownFilter = useTransform(scrollYProgress, domain, ["blur(10px)", "blur(0px)"]);
    const countdownY = useTransform(scrollYProgress, domain, ["100px", "0px"]);

    return (
        <div ref={containerRef} className="relative flex flex-col bg-black overflow-hidden w-full">
            {/* Background radial red glow for smooth transition continuity across the sections */}
            <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_center,rgba(139,0,0,0.1)_0%,rgba(0,0,0,1)_80%)]" />

            {/* Hero Container */}
            <motion.div
                style={{
                    scale: heroScale,
                    opacity: heroOpacity,
                    filter: heroFilter,
                    y: heroY,
                }}
                className="w-full origin-top z-10"
            >
                <Hero />
            </motion.div>

            {/* Countdown Container */}
            <motion.div
                style={{
                    scale: countdownScale,
                    opacity: countdownOpacity,
                    filter: countdownFilter,
                    y: countdownY,
                }}
                className="w-full origin-top z-20"
            >
                <Countdown />
            </motion.div>
        </div>
    );
}
