import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Target Date: March 28, 2026
const COUNTDOWN_FROM = "2026-03-28T00:00:00";

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

export default function Countdown() {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden bg-black py-16">

      {/* Background radial red glow */}
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_center,rgba(139,0,0,0.25)_0%,rgba(10,10,10,1)_70%)]" />

      {/* Soft animated pulse glow */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
        <div className="w-[900px] h-[900px] bg-red-900/20 rounded-full blur-[160px] animate-pulse" style={{ animationDuration: "4s" }} />
      </div>

      {/* Content Wrapper */}
      <div className="w-full flex flex-col items-center px-6 md:px-16">

        {/* Header */}
        <motion.div
          className="flex items-center gap-4 mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "200px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_20px_rgba(255,26,26,0.8)] animate-pulse" />

          <h2
            className="text-3xl md:text-4xl lg:text-5xl text-white tracking-widest uppercase font-semibold text-center"
            style={{ fontFamily: "'Oxanium', sans-serif" }}
          >
            HackHeist Begins In
          </h2>

          <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_20px_rgba(255,26,26,0.8)] animate-pulse" />
        </motion.div>

        {/* Timer Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-[1600px]"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "200px" }}
          transition={{ duration: 0.8 }}
        >
          <CountdownItem unit="Day" label="DAYS" />
          <CountdownItem unit="Hour" label="HOURS" />
          <CountdownItem unit="Minute" label="MINUTES" />
          <CountdownItem unit="Second" label="SECONDS" />
        </motion.div>

      </div>
    </section>
  );
}

function CountdownItem({ unit, label }) {
  const time = useTimer(unit);
  const display = unit === "Second" ? String(time).padStart(2, "0") : time;

  return (
    <motion.div
      className="group flex flex-col items-center justify-center p-8 bg-black/80 backdrop-blur-md rounded-xl border border-red-900/40 shadow-[0_8px_32px_rgba(0,0,0,0.8)] relative overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-red-600/60 hover:shadow-[0_10px_40px_rgba(139,0,0,0.4)]"
      whileHover={{ scale: 1.03 }}
    >
      {/* Hover inner glow */}
      <div className="absolute inset-0 border border-red-600/0 group-hover:border-red-500/50 rounded-xl transition-all duration-700 shadow-[inset_0_0_20px_rgba(255,26,26,0)] group-hover:shadow-[inset_0_0_40px_rgba(255,26,26,0.3)]" />

      <div className="relative h-[140px] flex items-center justify-center overflow-hidden w-full">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={display}
            initial={{ y: "60%", opacity: 0, scale: 0.9 }}
            animate={{ y: "0%", opacity: 1, scale: 1 }}
            exit={{ y: "-60%", opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
            className="absolute text-[5rem] md:text-[7rem] text-white leading-none"
            style={{
              fontFamily: "'3rdMan', 'Compacta MT Bold', sans-serif",
              textShadow:
                "0 0 20px rgba(255,26,26,0.6), 0 10px 40px rgba(139,0,0,0.8)",
            }}
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="h-px w-2/3 bg-gradient-to-r from-transparent via-red-900/60 to-transparent mt-4 mb-4" />

      <span
        className="text-sm text-gray-400 tracking-[0.3em] uppercase font-bold group-hover:text-red-200 transition-colors duration-300"
        style={{ fontFamily: "'Oxanium', sans-serif" }}
      >
        {label}
      </span>
    </motion.div>
  );
}

function useTimer(unit) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const handleCountdown = () => {
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

      setTime(newTime);
    };

    handleCountdown();
    const interval = setInterval(handleCountdown, 1000);
    return () => clearInterval(interval);
  }, [unit]);

  return time;
}
