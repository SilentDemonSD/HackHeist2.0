import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import useIsMobile from '../hooks/useIsMobile'
import './HiringBlimp.css'

const CAREERS_URL = 'https://hack-heist-2.devfolio.co/'

/* ── Rope SVG — thin cables from behind blimp to banner ────────────────── */
function RopeSVG() {
  return (
    <svg
      viewBox="0 0 100 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="hb-rope-svg"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <path
        d="M35,0 Q33,20 30,40 Q28,50 26,60"
        stroke="rgba(160,160,160,0.45)"
        strokeWidth="0.6"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M65,0 Q67,20 70,40 Q72,50 74,60"
        stroke="rgba(160,160,160,0.45)"
        strokeWidth="0.6"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M50,0 Q50,20 50,40 Q50,50 50,60"
        stroke="rgba(140,140,140,0.25)"
        strokeWidth="0.4"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  )
}

/* ── Main Component ────────────────────────────────────────────────────── */
/* Architecture: 3 nested layers to avoid Framer Motion conflicts
   Layer 1 (div.hb-entry)  — CSS transition for entry slide (bottom-right → top-left)
   Layer 2 (motion.hb-wrap) — Framer Motion drag only (x + y, no animation lock)
   Layer 3 (motion.hb-hitarea) — Bob effect via useSpring (visual only) */

export default function HiringBlimp() {
  const isMobile = useIsMobile()
  const wrapRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [entered, setEntered] = useState(false)
  const [hasLanded, setHasLanded] = useState(false)

  /* ── Idle bob — smooth sine, 6.8s cycle ── */
  const bobY = useMotionValue(0)
  const bobYSmooth = useSpring(bobY, { stiffness: 16, damping: 7, mass: 1.4 })

  useEffect(() => {
    if (!hasLanded) return
    const CYCLE = 6800
    const start = performance.now()
    let raf
    const tick = (now) => {
      const t = ((now - start) % CYCLE) / CYCLE
      bobY.set(Math.sin(t * Math.PI * 2) * 5)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [hasLanded, bobY])

  /* ── Trigger CSS entry after delay ── */
  useEffect(() => {
    const delay = isMobile ? 1500 : 2000
    const timer = setTimeout(() => setEntered(true), delay)
    return () => clearTimeout(timer)
  }, [isMobile])

  /* ── When CSS slide finishes, enable drag ── */
  const handleTransitionEnd = useCallback((e) => {
    if (e.propertyName === 'transform') {
      setHasLanded(true)
    }
  }, [])

  /* ── Full-page drag bounds ── */
  const getDragBounds = useCallback(() => {
    const vw = window.innerWidth
    const vh = window.innerHeight
    return {
      top: -20,
      bottom: vh - 120,
      left: -(vw * 0.05),
      right: vw - 280,
    }
  }, [])

  const [dragBounds, setDragBounds] = useState(getDragBounds)
  useEffect(() => {
    const update = () => setDragBounds(getDragBounds())
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [getDragBounds])

  const handleClick = useCallback(() => {
    if (!isDragging) {
      window.open(CAREERS_URL, '_blank', 'noopener,noreferrer')
    }
  }, [isDragging])

  return (
    /* Layer 1: CSS entry slide (bottom-right → top-left) */
    <div
      className={`hb-entry ${entered ? 'hb-entered' : ''}`}
      onTransitionEnd={handleTransitionEnd}
    >
      {/* Layer 2: Framer Motion drag (both x + y, no animation lock) */}
      <motion.div
        ref={wrapRef}
        className="hb-wrap"
        drag={hasLanded}
        dragConstraints={dragBounds}
        dragElastic={0.08}
        dragMomentum
        dragTransition={{ bounceStiffness: 50, bounceDamping: 14 }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setTimeout(() => setIsDragging(false), 150)}
        whileDrag={{ scale: 1.05 }}
        role="complementary"
        aria-label="Hiring opportunity — drag to move"
      >
        {/* Layer 3: Bob effect (visual only, doesn't block drag) */}
        <motion.div
          className="hb-hitarea"
          style={{ y: hasLanded ? bobYSmooth : 0 }}
          onClick={handleClick}
        >
        {/* ── Blimp image (z-index: 3 — front) ── */}
        <div className="hb-blimp-layer">
          <picture>
            <source srcSet="/blimp.webp" type="image/webp" />
            <img
              src="/blimp_trimmed.png"
              alt=""
              className="hb-blimp-img"
              draggable={false}
            />
          </picture>
          {/* Heist red pulse glow — visible on idle */}
          <div className="hb-heist-glow" aria-hidden="true" />
        </div>

        {/* ── Ropes (z-index: 1 — behind blimp) ── */}
        <div className="hb-ropes-layer">
          <RopeSVG />
        </div>

        {/* ── Banner ── */}
        <div className="hb-banner-sway">
          <div className="hb-banner">
            <div className="hb-banner__glow" aria-hidden="true" />

            <span className="hb-banner__eyebrow">HIRING OPPORTUNITY</span>

            <span className="hb-banner__headline">
              WANT TO GET{isMobile ? ' ' : <br />}HIRED?
            </span>

            <div className="hb-banner__divider" />

            <picture className="hb-banner__company-logo">
              <source srcSet="/webreinvent.webp" type="image/webp" />
              <img
                src="/webreinvent.png"
                alt="WebReinvent"
                className="hb-banner__company-img"
                draggable={false}
              />
            </picture>

            <span className="hb-banner__cta">
              Apply Now <span className="hb-arrow">&rarr;</span>
            </span>
          </div>
        </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
