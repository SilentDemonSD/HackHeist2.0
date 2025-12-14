import { useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import clsx from 'clsx'
import styles from './AboutHeist.module.css'
import blueprintStatic from '../assets/svg/vault-blueprint.svg'
import useParallax from '../hooks/useParallax'

const metadata = [
  { id: 'date', label: 'Date', value: 'Mar 14, 2026' },
  { id: 'location', label: 'Location', value: 'MIET Meerut' },
  // { id: 'tracks', label: 'Tracks', value: 'Defense · AI · FinOps' },
]

const missionCopy = [
  'Hack Heist 2.0 – The Vault Opens Again!',
  'Presented by GDG On Campus MIET',

  'Hack Heist 2.0 is a 36-hour high-intensity hackathon that brings together developers, designers, and innovators to build impactful solutions for real-world problems. Designed to challenge both creativity and technical depth, the event offers a complete end-to-end hackathon experience—from ideation and team collaboration to building and showcasing working prototypes.',
  'Participants will work on industry-relevant problem statements with continuous mentorship, expert guidance, and hands-on exposure to modern technologies. The hackathon environment encourages rapid learning, experimentation, and teamwork through nonstop coding, exciting challenges, and collaborative problem-solving.',
  'Hack Heist 2.0 welcomes beginners eager to learn as well as experienced hackers ready to compete, offering opportunities for networking, skill development, and recognition through exciting rewards. More than just a competition, Hack Heist 2.0 is an immersive experience focused on turning bold ideas into real impact.',
];

const blueprintNodes = [
  { id: 'vault-core', label: 'Vault Core', top: '18%', left: '64%' },
  { id: 'access-handshake', label: 'Access Handshake', top: '42%', left: '78%' },
  { id: 'lock-sequence', label: 'Lock Sequence', top: '66%', left: '58%' },
  { id: 'supply-line', label: 'Supply Line', top: '35%', left: '32%' },
  { id: 'signal-relay', label: 'Signal Relay', top: '62%', left: '24%' },
]

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
      when: 'beforeChildren',
      staggerChildren: 0.08,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.08, ease: 'easeOut' },
  }),
}

const blueprintVariants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
}

function MetaChip({ label, value, icon }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-[rgba(255,77,79,0.35)] px-3 py-1 text-xs text-gray-200/90">
      <span aria-hidden="true">{icon}</span>
      <span className="uppercase tracking-[0.2em] text-[0.55rem] text-gray-400">{label}</span>
      <span className="text-gray-100 font-medium">{value}</span>
    </div>
  )
}

const iconPaths = {
  date: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="17" rx="2" stroke="#FF4D4F" strokeWidth="1.5" />
      <path d="M8 2V6M16 2V6" stroke="#FF4D4F" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3 10H21" stroke="#FF4D4F" strokeWidth="1.5" />
    </svg>
  ),
  location: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <path d="M12 21.5C12 21.5 5 13.985 5 9.5C5 5.91 7.91 3 11.5 3C15.09 3 18 5.91 18 9.5C18 13.985 11 21.5 11 21.5H12Z" stroke="#FF4D4F" strokeWidth="1.5" />
      <circle cx="11.5" cy="9.5" r="2.5" stroke="#FF4D4F" strokeWidth="1.5" />
    </svg>
  ),
  tracks: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <path d="M6 6H18V18H6V6Z" stroke="#FF4D4F" strokeWidth="1.5" />
      <path d="M6 12H10.5L13.5 8.5H18" stroke="#FF4D4F" strokeWidth="1.5" />
      <path d="M6 16H12L15 12.5H18" stroke="#FF4D4F" strokeWidth="1.5" />
    </svg>
  ),
}

export default function AboutHeist() {
  const prefersReducedMotion = useReducedMotion()
  const [laserFast, setLaserFast] = useState(false)
  const { ref: blueprintRef, style: parallaxStyle } = useParallax({
    maxOffset: 10,
    disabled: prefersReducedMotion,
  })

  const missionText = useMemo(() => missionCopy, [])

  return (
    <motion.section
      id="about"
      aria-labelledby="mission-brief-heading"
      className={clsx(
        'relative overflow-hidden py-12 md:py-20',
        styles.missionSection,
      )}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <div className={styles.radialGlow} aria-hidden="true" />
      <div className={styles.gridOverlay} aria-hidden="true" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 md:grid md:grid-cols-3 md:gap-12">
        <motion.div
          className={clsx(
            'col-span-2 rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] p-6 md:p-7',
            styles.missionCard,
          )}
          variants={cardVariants}
          custom={0}
        >
          <motion.div
            variants={cardVariants}
            custom={0.2}
            className="flex flex-col gap-3"
          >
            <span className="text-xs uppercase tracking-[0.4em] text-heist-red/80">
              Mission Brief
            </span>
            <div>
              <h2
                id="mission-brief-heading"
                className="text-3xl font-semibold text-[#EAEAEA] md:text-4xl"
                style={{ textShadow: '0 8px 30px rgba(255,77,79,0.08)' }}
              >
                ABOUT HACK HEIST
              </h2>
              <span className="mt-3 block h-[2px] w-20 rounded-full bg-[#FF4D4F]" />
            </div>
          </motion.div>

          <motion.div
            variants={cardVariants}
            custom={0.4}
            className="mt-4 flex flex-col gap-3 text-sm leading-[1.55] text-[#B9B9B9]"
          >
            {missionText.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </motion.div>

          <motion.div
            variants={cardVariants}
            custom={0.6}
            className="mt-8 flex flex-wrap gap-3"
          >
            {metadata.map((item) => (
              <MetaChip
                key={item.id}
                label={item.label}
                value={item.value}
                icon={iconPaths[item.id]}
              />
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className={clsx(styles.blueprintShell, 'aspect-[4/3] w-full')}
          variants={blueprintVariants}
          ref={prefersReducedMotion ? null : blueprintRef}
          style={parallaxStyle}
          onPointerEnter={() => setLaserFast(true)}
          onPointerLeave={() => setLaserFast(false)}
        >
          {prefersReducedMotion ? (
            <img
              src={blueprintStatic}
              alt="Vault blueprint schematic"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <>
              <svg
                className={clsx(styles.blueprintSvg, 'absolute inset-0')}
                viewBox="0 0 500 400"
                role="img"
                aria-label="Animated vault blueprint"
              >
                <defs>
                  <linearGradient id="gridGlow" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="rgba(167,209,255,0.3)" />
                    <stop offset="100%" stopColor="rgba(10,18,30,0)" />
                  </linearGradient>
                </defs>
                <rect width="500" height="400" fill="rgba(5,10,18,0.6)" />

                <g className={styles.gridAnimate} stroke="rgba(167,209,255,0.2)" strokeWidth="0.6">
                  {Array.from({ length: 20 }).map((_, index) => (
                    <line key={`h-${index}`} x1="0" x2="500" y1={(index + 1) * 20} y2={(index + 1) * 20} />
                  ))}
                  {Array.from({ length: 25 }).map((_, index) => (
                    <line key={`v-${index}`} y1="0" y2="400" x1={(index + 1) * 20} x2={(index + 1) * 20} />
                  ))}
                </g>

                <g stroke="#A7D1FF" strokeWidth="1.4" opacity="0.6">
                  <circle cx="250" cy="200" r="120" fill="none" />
                  <circle cx="250" cy="200" r="90" fill="none" className={styles.ringDash} />
                  <circle cx="250" cy="200" r="50" fill="none" opacity="0.4" />
                  <circle cx="250" cy="200" r="5" fill="#FF4D4F" stroke="none" />
                </g>

                <g stroke="#A7D1FF" strokeWidth="0.8" opacity="0.4">
                  <line x1="250" y1="60" x2="250" y2="340" strokeDasharray="6 8" />
                  <line x1="110" y1="200" x2="390" y2="200" strokeDasharray="6 8" />
                  <line x1="150" y1="90" x2="350" y2="310" strokeDasharray="8 10" />
                  <line x1="150" y1="310" x2="350" y2="90" strokeDasharray="8 10" />
                </g>

                <g stroke="#FF4D4F" strokeWidth="0.8" opacity="0.6">
                  <path d="M160 260L240 140L330 170L360 260" strokeDasharray="4 8" />
                  <path d="M170 150L210 190L290 120L340 150" strokeDasharray="6 12" />
                </g>
              </svg>

              <div
                className={clsx(styles.laser, laserFast && styles.laserFast)}
              />

              {blueprintNodes.map((node) => (
                <button
                  key={node.id}
                  className={styles.blueprintNode}
                  style={{ top: node.top, left: node.left }}
                  type="button"
                  aria-label={node.label}
                >
                  <span>{node.label}</span>
                </button>
              ))}
            </>
          )}
        </motion.div>
      </div>
    </motion.section>
  )
}

