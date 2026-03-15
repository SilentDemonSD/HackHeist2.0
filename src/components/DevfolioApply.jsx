import { useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import useIsMobile from '../hooks/useIsMobile'

const DEVFOLIO_URL = 'https://hack-heist-2.devfolio.co'

/* Devfolio "D" icon — dark fill */
function DevfolioIcon({ size = 22 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M61.3135 35.24c.0615 7.107-2.5405 13.98-7.2936 19.264-4.753 5.285-11.3126 8.598-18.3866 9.287 0 0-18.436.471-24.5365 0-1.1171-.134-2.1788-.562-3.077-1.24a7.462 7.462 0 01-2.0366-2.618c.8582.378 1.7775.598 2.7138.65 1.9961.18 5.4052.27 10.16.27 6.9752 0 14.5783-.202 14.6456-.202h.1346c7.6-6.454 14.6673-9.976 19.7592-15.655 4.3673-4.813 7.1336-10.863 7.917-17.315v1.75z"
        fill="#1a1a1a"
      />
      <path
        d="M59.0705 28.982c.055 7.11-2.556 13.984-7.318 19.264-4.7618 5.281-11.3291 8.586-18.4073 9.265 0 0-18.436.47-24.5365 0-1.6476-.256-3.1458-1.102-4.2148-2.382-1.069-1.28-1.6357-2.904-1.5942-4.571V7.115c-.0206-1.676.5724-3.3 1.6672-4.57C5.7622 1.278 7.2831.452 8.9435.23c6.123-.516 24.5364.229 24.5364.229 7.093.713 13.6595 4.064 18.399 9.389 4.7394 5.325 7.3061 12.236 7.1916 19.364z"
        fill="#1a1a1a"
      />
    </svg>
  )
}

const MAGNETIC_RANGE = 320
const MAGNETIC_STRENGTH = 0.55

export default function DevfolioApply() {
  const isMobile = useIsMobile()
  const btnRef = useRef(null)
  const [hovered, setHovered] = useState(false)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const springX = useSpring(mx, { stiffness: 100, damping: 10, mass: 1.2 })
  const springY = useSpring(my, { stiffness: 100, damping: 10, mass: 1.2 })

  const dist = useTransform(() => Math.sqrt(mx.get() ** 2 + my.get() ** 2))
  const glowOpacity = useTransform(dist, [0, 60], [0.3, 1])
  const glowScale = useTransform(dist, [0, 60], [1, 1.15])
  const rotateX = useTransform(my, [-80, 80], [8, -8])
  const rotateY = useTransform(mx, [-80, 80], [-8, 8])

  const handlePointerMove = useCallback((e) => {
    if (!btnRef.current || isMobile) return
    const rect = btnRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    const d = Math.sqrt(dx * dx + dy * dy)
    if (d < MAGNETIC_RANGE) {
      const factor = MAGNETIC_STRENGTH * (1 - d / MAGNETIC_RANGE)
      mx.set(dx * factor * 1.8)
      my.set(dy * factor * 1.8)
    } else {
      mx.set(0)
      my.set(0)
    }
  }, [isMobile, mx, my])

  const handlePointerLeave = useCallback(() => {
    mx.set(0)
    my.set(0)
    setHovered(false)
  }, [mx, my])

  const handleClick = useCallback(() => {
    window.open(DEVFOLIO_URL, '_blank', 'noopener,noreferrer')
  }, [])

  return (
    <div
      className="flex justify-center"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        padding: isMobile ? '8px 16px' : '16px max(2rem, 10vw)',
        touchAction: 'manipulation',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <motion.div
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: isMobile ? '200px' : '260px',
          height: isMobile ? '56px' : '64px',
          borderRadius: '20px',
          background: 'radial-gradient(ellipse at center, rgba(179,0,0,0.35) 0%, rgba(179,0,0,0.12) 40%, transparent 70%)',
          opacity: glowOpacity,
          scale: glowScale,
          x: isMobile ? 0 : springX,
          y: isMobile ? 0 : springY,
          filter: 'blur(14px)',
          pointerEvents: 'none',
          zIndex: 30,
        }}
      />

      <motion.button
        ref={btnRef}
        type="button"
        onClick={handleClick}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        style={{
          x: isMobile ? 0 : springX,
          y: isMobile ? 0 : springY,
          rotateX: isMobile ? 0 : rotateX,
          rotateY: isMobile ? 0 : rotateY,
          fontFamily: "'Montserrat', sans-serif",
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.08)',
          outline: 'none',
          background: 'linear-gradient(145deg, rgba(240,240,240,0.92) 0%, rgba(215,215,215,0.88) 100%)',
          color: '#1a1a1a',
          fontSize: isMobile ? '1.2rem' : '1.4rem',
          fontWeight: 600,
          letterSpacing: '0.03em',
          padding: isMobile ? '10px 25px' : '10px 30px',
          borderRadius: '14px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '11px',
          boxShadow: '0 2px 16px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.15)',
          zIndex: 40,
          transformStyle: 'preserve-3d',
          backdropFilter: 'blur(4px)',
          WebkitTapHighlightColor: 'transparent',
        }}
        whileHover={isMobile ? {} : {
          scale: 1.04,
          boxShadow: '0 4px 32px rgba(179,0,0,0.2), 0 0 50px rgba(179,0,0,0.1), 0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
          transition: { duration: 0.25, ease: 'easeOut' },
        }}
        whileTap={{ scale: 0.95, transition: { duration: 0.08 } }}
      >
        <motion.span
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.5) 50%, transparent 65%)',
            zIndex: 1,
          }}
          initial={{ x: '-130%' }}
          animate={hovered ? { x: '130%' } : { x: '-130%' }}
          transition={hovered ? { duration: 0.5, ease: [0.22, 1, 0.36, 1] } : { duration: 0 }}
        />

        <span style={{ position: 'relative', zIndex: 2, display: 'inline-flex', alignItems: 'center', gap: '11px' }}>
          <DevfolioIcon size={isMobile ? 20 : 22} />
          <span>Apply with Devfolio</span>
        </span>
      </motion.button>
    </div>
  )
}
