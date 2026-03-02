import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Target Date: March 28, 2026
const COUNTDOWN_FROM = "2026-03-28T00:00:00";

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

const UNITS = [
  { unit: "Day",    label: "DAYS" },
  { unit: "Hour",   label: "HRS"  },
  { unit: "Minute", label: "MIN"  },
  { unit: "Second", label: "SEC"  },
];

export default function Countdown() {
  return (
    <section
      className="relative w-full flex flex-col items-center justify-center overflow-hidden"
      style={{ padding: "4rem 1.5rem 4.5rem", background: "#06070b" }}
    >
      {/* Deep background radial */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(139,0,0,0.18) 0%, transparent 70%)",
        }}
      />

      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.017) 0px, rgba(255,255,255,0.017) 1px, transparent 1px, transparent 3px)",
          zIndex: 1,
        }}
      />

      {/* Soft bloom */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 640,
          height: 640,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "rgba(180,0,0,0.10)",
          borderRadius: "50%",
          filter: "blur(120px)",
          zIndex: 0,
        }}
      />

      {/* ── Header ── */}
      <motion.div
        className="relative flex flex-col items-center text-center"
        style={{ marginBottom: "2.2rem", zIndex: 2 }}
        initial={{ y: 24 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.75 }}
      >
        {/* Eyebrow label — per-letter fade */}
        <span
          style={{
            display: "block",
            marginBottom: "0.55rem",
          }}
        >
          {"OPERATION: THIRD MAN".split("").map((char, i) =>
            char === " " ? (
              <span key={i} aria-hidden="true" style={{ display: "inline-block", width: "0.38em" }} />
            ) : (
              <motion.span
                key={i}
                style={{
                  display: "inline-block",
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.58rem",
                  fontWeight: 700,
                  letterSpacing: "0.48em",
                  textTransform: "uppercase",
                  color: "rgba(255,77,79,0.7)",
                }}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.03,
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {char}
              </motion.span>
            )
          )}
        </span>

        {/* Main headline — per-letter drop */}
        <h2
          style={{
            fontFamily: "'3rdMan', sans-serif",
            fontSize: "clamp(2.2rem, 5.5vw, 4.2rem)",
            color: "#ffffff",
            textTransform: "uppercase",
            fontWeight: "normal",
            margin: 0,
            lineHeight: 1,
            perspective: "600px",
            cursor: "default",
          }}
        >
          {"Commences In".split("").map((char, i) =>
            char === " " ? (
              <span key={i} aria-hidden="true" style={{ display: "inline-block", width: "0.28em" }} />
            ) : (
              <motion.span
                key={i}
                style={{
                  display: "inline-block",
                  letterSpacing: "0.07em",
                }}
                initial={{ opacity: 0, y: 28, rotateX: -70 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.055,
                  type: "spring",
                  stiffness: 280,
                  damping: 24,
                  mass: 0.9,
                }}
                whileHover={{ color: "#ff4d4f", y: -6, transition: { duration: 0.14 } }}
              >
                {char}
              </motion.span>
            )
          )}
        </h2>

        {/* Red rule */}
        <div
          style={{
            width: 64,
            height: 2,
            marginTop: "1rem",
            background:
              "linear-gradient(90deg, transparent, #ff4d4f 40%, #ff4d4f 60%, transparent)",
            borderRadius: 2,
          }}
        />
      </motion.div>

      {/* ── Timer grid ── */}
      <motion.div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "clamp(0.5rem, 1.5vw, 1.25rem)",
          width: "100%",
          maxWidth: 900,
          zIndex: 2,
          position: "relative",
        }}
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.75, delay: 0.1 }}
      >
        {UNITS.map(({ unit, label }, i) => (
          <CountdownItem key={unit} unit={unit} label={label} index={i} />
        ))}
      </motion.div>

      {/* Bottom tagline */}
      <motion.p
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "0.62rem",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.18)",
          marginTop: "2rem",
          zIndex: 2,
          position: "relative",
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        28 March 2026 &nbsp;·&nbsp; The Heist Begins
      </motion.p>
    </section>
  );
}

function CountdownItem({ unit, label, index }) {
  const time = useTimer(unit);
  const display = String(time).padStart(2, "0");

  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(0.9rem, 2.5vw, 1.75rem) clamp(0.5rem, 1.5vw, 1rem)",
        background:
          "linear-gradient(155deg, rgba(255,255,255,0.038) 0%, rgba(255,255,255,0.012) 100%)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 16,
        backdropFilter: "blur(12px)",
        boxShadow:
          "0 4px 24px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.05)",
        overflow: "hidden",
        cursor: "default",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      {/* Corner accent — top-left */}
      <span
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 28,
          height: 28,
          borderTop: "1.5px solid rgba(255,77,79,0.45)",
          borderLeft: "1.5px solid rgba(255,77,79,0.45)",
          borderTopLeftRadius: 14,
          pointerEvents: "none",
        }}
      />
      {/* Corner accent — bottom-right */}
      <span
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: 28,
          height: 28,
          borderBottom: "1.5px solid rgba(255,77,79,0.45)",
          borderRight: "1.5px solid rgba(255,77,79,0.45)",
          borderBottomRightRadius: 14,
          pointerEvents: "none",
        }}
      />

      {/* Digit */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "clamp(3rem, 8vw, 6.5rem)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            key={display}
            initial={{ y: "55%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-55%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}
            style={{
              position: "absolute",
              fontFamily: "'3rdMan', sans-serif",
              fontSize: "clamp(2rem, 6vw, 5rem)",
              color: "#ffffff",
              lineHeight: 1,
              textShadow:
                "0 0 18px rgba(255,77,79,0.55), 0 0 50px rgba(200,0,0,0.3)",
              letterSpacing: "0.04em",
            }}
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Divider */}
      <div
        style={{
          width: "55%",
          height: 1,
          margin: "0.4rem 0",
          background:
            "linear-gradient(90deg, transparent, rgba(255,77,79,0.4), transparent)",
        }}
      />

      {/* Label */}
      <span
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "clamp(0.48rem, 1.1vw, 0.65rem)",
          fontWeight: 700,
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          color: "rgba(180,180,180,0.5)",
        }}
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
