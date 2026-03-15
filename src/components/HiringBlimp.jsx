import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import useIsMobile from '../hooks/useIsMobile'
import './HiringBlimp.css'

const CAREERS_URL = 'https://hack-heist-2.devfolio.co/'

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

export default function HiringBlimp() {
  const isMobile = useIsMobile()
  const wrapRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [entered, setEntered] = useState(false)
  const [hasLanded, setHasLanded] = useState(false)

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

  useEffect(() => {
    const delay = isMobile ? 1500 : 2000
    const timer = setTimeout(() => setEntered(true), delay)
    return () => clearTimeout(timer)
  }, [isMobile])

  const handleTransitionEnd = useCallback((e) => {
    if (e.propertyName === 'transform') {
      setHasLanded(true)
    }
  }, [])

  const getDragBounds = useCallback(() => {
    const vw = window.innerWidth
    const vh = window.innerHeight
    const hitW = vw <= 768 ? 180 : 260
    return {
      top: -20,
      bottom: vh - 120,
      left: -(vw * 0.05),
      right: vw - hitW - 20,
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
    <div
      className={`hb-entry ${entered ? 'hb-entered' : ''}`}
      onTransitionEnd={handleTransitionEnd}
    >
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
        <motion.div
          className="hb-hitarea"
          style={{ y: hasLanded ? bobYSmooth : 0 }}
          onClick={handleClick}
        >
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
          <div className="hb-heist-glow" aria-hidden="true" />
        </div>

        <div className="hb-ropes-layer">
          <RopeSVG />
        </div>

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
