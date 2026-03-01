import React, { useEffect, useRef, useState } from "react";
import { useAnimate, motion } from "framer-motion";

// Target Date: March 28, 2026
const COUNTDOWN_FROM = "2026-03-28T00:00:00";

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

export default function Countdown() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden z-10 w-full">
      {/* Background soft red gradient */}
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_center,rgba(139,0,0,0.15)_0%,rgba(10,10,10,1)_70%)] pointer-events-none" />

      {/* Cyber scanline overlay */}
      <div className="absolute inset-0 -z-10 pointer-events-none bg-noise opacity-20 mix-blend-overlay" />

      {/* Subtle moving red particles (CSS simulated) */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute w-[800px] h-[800px] bg-red-900/10 rounded-full blur-[120px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDuration: '4s' }} />
      </div>

      <div className="flex flex-col items-center z-10 w-full max-w-5xl">
        {/* Header Section */}
        <motion.div
          className="flex items-center gap-4 mb-10 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_15px_rgba(255,26,26,0.8)] animate-pulse" style={{ animationDuration: '1.5s' }} />
          <h2
            className="text-2xl md:text-3xl lg:text-4xl text-white tracking-widest uppercase font-semibold text-center"
            style={{ fontFamily: "'Oxanium', sans-serif" }}
          >
            HackHeist Begins In
          </h2>
          <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_15px_rgba(255,26,26,0.8)] animate-pulse" style={{ animationDuration: '1.5s', animationDelay: '0.75s' }} />
        </motion.div>

        {/* Timer Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <CountdownItem unit="Day" label="DAYS" />
          <CountdownItem unit="Hour" label="HOURS" />
          <CountdownItem unit="Minute" label="MINUTES" />
          <CountdownItem unit="Second" label="SECONDS" />
        </motion.div>

        {/* Progress Bar under timer */}
        <motion.div
          className="w-full max-w-2xl mt-12 md:mt-16 h-1 bg-black/60 rounded-full overflow-hidden border border-red-900/30 shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-red-900 via-red-600 to-red-500 shadow-[0_0_15px_rgba(255,26,26,0.8)]"
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }} // Static 65% for visual effect, can be made dynamic
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 0.8, ease: "easeOut" }}
          />
        </motion.div>
      </div>
    </section>
  );
}

function CountdownItem({ unit, label }) {
  const { ref, time } = useTimer(unit);
  const display = unit === "Second" ? String(time).padStart(2, '0') : time;

  return (
    <motion.div
      className="group flex flex-col items-center justify-center p-6 md:p-8 bg-black/80 backdrop-blur-md rounded-xl border border-red-900/40 shadow-[0_8px_32px_rgba(0,0,0,0.8)] relative overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-red-600/60 hover:shadow-[0_10px_40px_rgba(139,0,0,0.4)] cursor-default"
      whileHover={{ scale: 1.02 }}
    >
      {/* Animated Red Border Glow */}
      <div className="absolute inset-0 border border-red-600/0 group-hover:border-red-500/50 rounded-xl transition-all duration-700 shadow-[inset_0_0_20px_rgba(255,26,26,0)] group-hover:shadow-[inset_0_0_30px_rgba(255,26,26,0.2)]" />

      {/* Container for slide animation to prevent layout shifts */}
      <div className="relative w-full h-[80px] sm:h-[100px] md:h-[130px] lg:h-[160px] overflow-hidden flex items-center justify-center">
        <span
          ref={ref}
          className="absolute text-6xl sm:text-7xl md:text-[6rem] lg:text-[8rem] text-white leading-none z-10"
          style={{
            fontFamily: "'3rdMan', 'Compacta MT Bold', sans-serif",
            textShadow: '0 0 15px rgba(255,26,26,0.6), 0 5px 25px rgba(139,0,0,0.8)'
          }}
        >
          {display}
        </span>
      </div>

      {/* Divider */}
      <div className="h-px w-2/3 bg-gradient-to-r from-transparent via-red-900/60 to-transparent mt-2 mb-4 group-hover:via-red-500/80 transition-all duration-500" />

      <span
        className="text-xs sm:text-sm md:text-base text-gray-400 group-hover:text-red-200 tracking-[0.2em] md:tracking-[0.3em] uppercase font-bold transition-colors duration-300 z-10"
        style={{ fontFamily: "'Oxanium', sans-serif" }}
      >
        {label}
      </span>
    </motion.div>
  );
}

function useTimer(unit) {
  const [ref, animate] = useAnimate();
  const intervalRef = useRef(null);
  const timeRef = useRef(0);
  const [time, setTime] = useState(0);

  useEffect(() => {
    handleCountdown();
    intervalRef.current = setInterval(handleCountdown, 1000);
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCountdown = async () => {
    const end = new Date(COUNTDOWN_FROM);
    const now = new Date();
    const distance = end - now;

    let newTime = 0;
    switch (unit) {
      case "Day":
        newTime = Math.max(0, Math.floor(distance / DAY));
        break;
      case "Hour":
        newTime = Math.max(0, Math.floor((distance % DAY) / HOUR));
        break;
      case "Minute":
        newTime = Math.max(0, Math.floor((distance % HOUR) / MINUTE));
        break;
      default:
        newTime = Math.max(0, Math.floor((distance % MINUTE) / SECOND));
    }

    if (newTime !== timeRef.current) {
      // Slide up & fade out the old number
      await animate(
        ref.current,
        { y: ["0%", "-60%"], opacity: [1, 0], scale: [1, 0.9] },
        { duration: 0.3, ease: "anticipate" }
      );

      timeRef.current = newTime;
      setTime(newTime);

      // Slide in from bottom & fade in the new number
      await animate(
        ref.current,
        { y: ["60%", "0%"], opacity: [0, 1], scale: [0.9, 1] },
        { duration: 0.4, type: "spring", stiffness: 100, damping: 15 }
      );
    }
  };

  return { ref, time };
}
