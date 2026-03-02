import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./VaultSection.css";

/* ── Prize data ──────────────────────────────────────────── */
const VAULTS = [
  {
    id: 1,
    label: "CHAMPION",
    numeral: "I",
    amount: "COMING SOON",
    color: "#FFD700",
    glow: "rgba(255,215,0,0.55)",
    borderGlow: "rgba(255,215,0,0.35)",
    barH: 220,
    barHMob: 160,
    eyebrow: "First Prize",
  },
  {
    id: 2,
    label: "RUNNER UP",
    numeral: "II",
    amount: "COMING SOON",
    color: "#c0cfe0",
    glow: "rgba(192,207,224,0.45)",
    borderGlow: "rgba(192,207,224,0.25)",
    barH: 160,
    barHMob: 120,
    eyebrow: "Second Prize",
  },
  {
    id: 3,
    label: "2ND RUNNER UP",
    numeral: "III",
    amount: "COMING SOON",
    color: "#cd7f32",
    glow: "rgba(205,127,50,0.45)",
    borderGlow: "rgba(205,127,50,0.25)",
    barH: 120,
    barHMob: 88,
    eyebrow: "Third Prize",
  },
];

const HOLD_DURATION = 2200; // ms
const GRANT_PROBABILITY = 0.70;

/* ── VaultDoor (ring animation) ─────────────────────────── */
function VaultDoor({ scanning, granted, denied, color }) {
  const ringColor = granted ? color : denied ? "#ff4d4f" : "rgba(255,60,60,0.5)";

  return (
    <motion.div
      className="vcard__door"
      animate={
        denied
          ? { x: [-6, 8, -8, 6, -4, 4, 0], rotate: [0, -3, 3, -2, 2, 0] }
          : scanning
          ? { scale: [1, 1.04, 1] }
          : {}
      }
      transition={
        denied
          ? { duration: 0.55, ease: "easeInOut" }
          : scanning
          ? { duration: 1, repeat: Infinity, ease: "easeInOut" }
          : {}
      }
    >
      <motion.div
        className="vcard__ring vcard__ring--outer"
        style={{ borderColor: ringColor, boxShadow: `0 0 16px ${ringColor}50` }}
        animate={{ rotate: scanning ? [0, 360] : granted ? 720 : [0, 360] }}
        transition={
          scanning
            ? { duration: 2.5, repeat: Infinity, ease: "linear" }
            : granted
            ? { duration: 0.6, ease: "easeOut" }
            : { duration: 28, repeat: Infinity, ease: "linear" }
        }
      />
      <motion.div
        className="vcard__ring vcard__ring--mid"
        style={{ borderColor: scanning ? color : ringColor }}
        animate={{ rotate: scanning ? [360, 0] : granted ? -540 : [360, 0] }}
        transition={
          scanning
            ? { duration: 1.8, repeat: Infinity, ease: "linear" }
            : granted
            ? { duration: 0.5, ease: "easeOut" }
            : { duration: 20, repeat: Infinity, ease: "linear" }
        }
      />
      <motion.div
        className="vcard__ring vcard__ring--inner"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: scanning ? 1 : 8, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="vcard__bolt"
        animate={
          granted
            ? { scale: [1, 1.8, 1] }
            : denied
            ? { scale: [1, 1.4, 1] }
            : {}
        }
        style={granted ? { background: color, boxShadow: `0 0 24px ${color}` } : {}}
        transition={{ duration: 0.5 }}
      />
      <div className="vcard__line vcard__line--h" />
      <div className="vcard__line vcard__line--v" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <div key={deg} className="vcard__tick" style={{ transform: `rotate(${deg}deg)` }} />
      ))}

      <AnimatePresence>
        {granted && (
          <motion.div
            className="vcard__granted-icon"
            style={{ color }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.15 }}
          >✓</motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {denied && (
          <motion.div
            className="vcard__denied-icon"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >✕</motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Sparks ──────────────────────────────────────────────── */
function Sparks({ active, color }) {
  return (
    <AnimatePresence>
      {active &&
        Array.from({ length: 10 }, (_, i) => {
          const angle = (i / 10) * 360;
          const dist = 55 + Math.random() * 45;
          return (
            <motion.span
              key={i}
              className="vcard__spark"
              style={{ background: `radial-gradient(circle, ${color}, #ff4d4f)` }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{
                x: Math.cos((angle * Math.PI) / 180) * dist,
                y: Math.sin((angle * Math.PI) / 180) * dist,
                opacity: 0, scale: 0,
              }}
              exit={{}}
              transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.025 }}
            />
          );
        })}
    </AnimatePresence>
  );
}

/* ── Hold-to-authenticate button ─────────────────────────── */
function HoldButton({ vaultColor, onResult, disabled }) {
  const [progress, setProgress] = useState(0);
  const [holding, setHolding] = useState(false);
  const raf = useRef(null);
  const startTime = useRef(null);

  const startHold = useCallback(() => {
    if (disabled) return;
    setHolding(true);
    startTime.current = performance.now();
    const tick = (now) => {
      const pct = Math.min(((now - startTime.current) / HOLD_DURATION) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        raf.current = requestAnimationFrame(tick);
      } else {
        setHolding(false);
        setProgress(0);
        onResult(Math.random() < GRANT_PROBABILITY);
      }
    };
    raf.current = requestAnimationFrame(tick);
  }, [disabled, onResult]);

  const stopHold = useCallback(() => {
    if (!holding) return;
    cancelAnimationFrame(raf.current);
    setHolding(false);
    setProgress(0);
  }, [holding]);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const progressDeg = (progress / 100) * 360;

  return (
    <div className="vcard__hold-wrap">
      <motion.button
        className="vcard__hold-btn"
        style={{
          borderColor: holding ? vaultColor : "rgba(255,77,79,0.38)",
          boxShadow: holding ? `0 0 20px ${vaultColor}44` : "none",
        }}
        onMouseDown={startHold}
        onMouseUp={stopHold}
        onMouseLeave={stopHold}
        onTouchStart={(e) => { e.preventDefault(); startHold(); }}
        onTouchEnd={stopHold}
        onTouchCancel={stopHold}
        disabled={disabled}
        whileTap={disabled ? {} : { scale: 0.97 }}
      >
        {holding && (
          <span
            className="vcard__hold-ring"
            style={{
              background: `conic-gradient(${vaultColor} ${progressDeg}deg, rgba(255,255,255,0.05) ${progressDeg}deg)`,
            }}
          />
        )}
        <span className="vcard__hold-label">
          {holding ? "SCANNING…" : "HOLD TO AUTHENTICATE"}
        </span>
      </motion.button>

      <AnimatePresence>
        {holding && (
          <motion.span
            className="vcard__progress-pct"
            style={{ color: vaultColor }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {Math.round(progress)}%
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Single vault card ───────────────────────────────────── */
function VaultCard({ vault, index }) {
  const [phase, setPhase] = useState("idle"); // idle | granted | denied
  const [sparks, setSparks] = useState(false);

  const handleResult = useCallback((granted) => {
    setSparks(true);
    setPhase(granted ? "granted" : "denied");
    setTimeout(() => setSparks(false), 700);
    if (!granted) setTimeout(() => setPhase("idle"), 2200);
  }, []);

  const granted = phase === "granted";
  const denied = phase === "denied";

  return (
    <motion.div
      className={`vcard${granted ? " vcard--granted" : ""}${denied ? " vcard--denied" : ""}`}
      style={{
        "--vault-color": vault.color,
        "--vault-glow": vault.glow,
        "--vault-border-glow": vault.borderGlow,
      }}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Corner brackets */}
      <span className="vcard__corner vcard__corner--tl" />
      <span className="vcard__corner vcard__corner--br" />

      <span className="vcard__eyebrow">{vault.eyebrow}</span>
      <h3 className="vcard__numeral">VAULT {vault.numeral}</h3>

      <div className="vcard__door-wrap">
        <VaultDoor scanning={false} granted={granted} denied={denied} color={vault.color} />
        <Sparks active={sparks} color={vault.color} />
      </div>

      {/* Status badge */}
      <AnimatePresence mode="wait">
        {granted ? (
          <motion.div key="g" className="vcard__status vcard__status--granted"
            style={{ color: vault.color, borderColor: `${vault.color}44` }}
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}>
            ● ACCESS GRANTED
          </motion.div>
        ) : denied ? (
          <motion.div key="d" className="vcard__status vcard__status--denied"
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}>
            ✕ ACCESS DENIED — RETRY
          </motion.div>
        ) : (
          <motion.div key="i" className="vcard__status vcard__status--idle"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            ◌ AWAITING AUTHENTICATION
          </motion.div>
        )}
      </AnimatePresence>

      {/* Prize amount reveal on grant */}
      <AnimatePresence>
        {granted && (
          <motion.div
            className="vcard__amount"
            style={{ color: vault.color, textShadow: `0 0 28px ${vault.glow}, 0 0 60px ${vault.glow}` }}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {vault.amount}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hold button — hidden once granted */}
      {!granted && (
        <HoldButton vaultColor={vault.color} onResult={handleResult} disabled={denied} />
      )}

      <p className="vcard__label">{vault.label}</p>
    </motion.div>
  );
}

/* ── Scan line ───────────────────────────────────────────── */
function ScanLine() {
  return (
    <motion.div
      className="vault-scan"
      animate={{ x: ["0%", "110%"] }}
      transition={{ duration: 6, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
    />
  );
}

/* ── Main ────────────────────────────────────────────────── */
export default function VaultSection() {
  return (
    <section className="vault-section" id="prizes">
      <div className="vault-bg" aria-hidden="true">
        <div className="vault-bg__gradient" />
        <div className="vault-bg__grid" />
        <div className="vault-bg__vignette" />
        <ScanLine />
      </div>

      <div className="vault-inner">
        <motion.div
          className="vault-heading-group"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="vault-eyebrow">Secured Intelligence</p>
          <h2 className="vault-title" style={{ cursor: "default" }}>
            {"THE VAULT".split("").map((char, i) =>
              char === " " ? (
                <span key={i} aria-hidden="true" style={{ display: "inline-block", width: "0.2em" }} />
              ) : (
                <motion.span
                  key={i}
                  style={{ display: "inline-block" }}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.05, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ color: "#ff4d4f", y: -7, transition: { duration: 0.13 } }}
                >
                  {char}
                </motion.span>
              )
            )}
          </h2>
          <p className="vault-sub">
            Three classified war chests. Hold to authenticate — breach at your own risk.
          </p>
        </motion.div>

        <div className="vault-cards">
          {VAULTS.map((vault, i) => (
            <VaultCard key={vault.id} vault={vault} index={i} />
          ))}
        </div>

        <div className="vault-floor" aria-hidden="true" />
      </div>
    </section>
  );
}
