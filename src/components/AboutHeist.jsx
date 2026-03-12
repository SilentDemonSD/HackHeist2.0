import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import clsx from 'clsx'
import styles from './AboutHeist.module.css'
import blueprintStatic from '../assets/svg/vault-blueprint.svg'
import useParallax from '../hooks/useParallax'

const stats = [
  { value: '36', unit: 'HRS', label: 'Non-stop hackathon' },
  { value: '50+', unit: '', label: 'Projects showcased' },
  { value: '1500+', unit: 'USERS', label: 'Registered participants' },
]

const metadata = [
  { id: 'date', label: 'Date', value: 'Mar 28–29, 2026' },
  { id: 'location', label: 'Location', value: 'MIET Meerut' },
]

const highlights = [
  { icon: '⚡', title: 'High Intensity', desc: '36 hours of non-stop building, learning, and competing.' },
  { icon: '🧠', title: 'Expert Mentors', desc: 'Continuous guidance from industry professionals throughout.' },
  { icon: '🌐', title: 'Open to All', desc: 'Beginners to veterans — everyone has a place at the heist.' },
]

const blueprintNodes = [
  { id: 'vault-core',   label: 'Vault Core',       top: '28%', left: '82%' },
  { id: 'server-room',  label: 'Server Room',       top: '19%', left: '18%' },
  { id: 'entry-point',  label: 'Access Shaft',      top: '71%', left: '83%' },
  { id: 'security',     label: 'Security',          top: '71%', left: '20%' },
  { id: 'corridor',     label: 'Main Corridor',     top: '52%', left: '50%' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' },
  }),
}

const sectionVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const iconPaths = {
  date: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="17" rx="2" stroke="#FF4D4F" strokeWidth="1.5" />
      <path d="M8 2V6M16 2V6" stroke="#FF4D4F" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3 10H21" stroke="#FF4D4F" strokeWidth="1.5" />
    </svg>
  ),
  location: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <path d="M12 21.5C12 21.5 5 13.985 5 9.5C5 5.91 7.91 3 11.5 3C15.09 3 18 5.91 18 9.5C18 13.985 11 21.5 11 21.5H12Z" stroke="#FF4D4F" strokeWidth="1.5" />
      <circle cx="11.5" cy="9.5" r="2.5" stroke="#FF4D4F" strokeWidth="1.5" />
    </svg>
  ),
}

function StatCard({ value, unit, label, index }) {
  return (
    <motion.div className={styles.statCard} variants={fadeUp} custom={index}>
      <div className={styles.statValue}>
        {value}<span className={styles.statUnit}>{unit}</span>
      </div>
      <div className={styles.statLabel}>{label}</div>
    </motion.div>
  )
}

function HighlightCard({ icon, title, desc, index }) {
  return (
    <motion.div className={styles.highlightCard} variants={fadeUp} custom={index}>
      <span className={styles.highlightIcon}>{icon}</span>
      <div>
        <div className={styles.highlightTitle}>{title}</div>
        <div className={styles.highlightDesc}>{desc}</div>
      </div>
    </motion.div>
  )
}

export default function AboutHeist() {
  const prefersReducedMotion = useReducedMotion()
  const [laserFast, setLaserFast] = useState(false)
  const { ref: blueprintRef, style: parallaxStyle } = useParallax({
    maxOffset: 10,
    disabled: prefersReducedMotion,
  })

  return (
    <motion.section
      id="about"
      aria-labelledby="mission-brief-heading"
      className={clsx('relative overflow-hidden', styles.missionSection)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={sectionVariants}
    >
      <div className={styles.radialGlow} aria-hidden="true" />
      <div className={styles.gridOverlay} aria-hidden="true" />
      <div className={styles.topBorder} aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-16 md:py-24">

        <motion.p className={styles.eyebrow} variants={fadeUp} custom={0}>
          Mission Brief
        </motion.p>

        <div className={styles.headingRow}>
          <h2 id="mission-brief-heading" className={styles.heading} style={{ cursor: "default" }}>
            {"About Hack Heist".split("").map((char, i) =>
              char === " " ? (
                <span key={i} aria-hidden="true" style={{ display: "inline-block", width: "0.22em" }} />
              ) : (
                <motion.span
                  key={i}
                  style={{ display: "inline-block" }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.042, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ color: "#ff4d4f", y: -6, transition: { duration: 0.13 } }}
                >
                  {char}
                </motion.span>
              )
            )}
          </h2>
          <span className={styles.headingRule} />
        </div>

        <div className={styles.mainGrid}>

          <div className={styles.leftCol}>

            <motion.div className={styles.copyBlock} variants={fadeUp} custom={1}>
              <p className={styles.leadLine}>
                <strong>Hack Heist 2.0 – The Vault Opens Again</strong>
                <span className={styles.dot}>·</span>
                Presented by GDG On Campus MIET
              </p>
              <p>
                Hack Heist 2.0 is a 36-hour high-intensity hackathon that brings together
                developers, designers, and innovators to build impactful solutions for
                real-world problems. From ideation and team formation to building and
                showcasing working prototypes — it&apos;s a complete end-to-end experience.
              </p>
              <p>
                Collaborate with peers, work on industry-relevant problem statements, get
                continuous mentorship, and push your limits with nonstop coding and
                exciting challenges.
              </p>
              <p>
                Whether you&apos;re a beginner eager to learn or an experienced hacker ready
                to compete, Hack Heist 2.0 is the arena where bold ideas become real impact.
              </p>
            </motion.div>

            <motion.div className={styles.statsRow} variants={sectionVariants}>
              {stats.map((s, i) => (
                <StatCard key={s.label} {...s} index={i} />
              ))}
            </motion.div>

            <motion.div className={styles.highlightsRow} variants={sectionVariants}>
              {highlights.map((h, i) => (
                <HighlightCard key={h.title} {...h} index={i} />
              ))}
            </motion.div>

            <motion.div className={styles.metaRow} variants={fadeUp} custom={2}>
              {metadata.map((item) => (
                <div key={item.id} className={styles.metaChip}>
                  <span aria-hidden="true">{iconPaths[item.id]}</span>
                  <span className={styles.metaLabel}>{item.label}</span>
                  <span className={styles.metaValue}>{item.value}</span>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            className={styles.blueprintShell}
            variants={{ hidden: { opacity: 0, scale: 0.96 }, show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } } }}
            ref={prefersReducedMotion ? null : blueprintRef}
            style={parallaxStyle}
            onPointerEnter={() => setLaserFast(true)}
            onPointerLeave={() => setLaserFast(false)}
          >
            {prefersReducedMotion ? (
              <img src={blueprintStatic} alt="Vault blueprint schematic" width={460} height={500} loading="lazy" decoding="async" className="h-full w-full object-cover" />
            ) : (
              <>
                <svg
                  className={styles.blueprintSvg}
                  viewBox="0 0 460 500"
                  role="img"
                  aria-label="Hack Heist vault floor plan"
                >
                  <defs>
                    <filter id="vaultGlow">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                    <filter id="redGlow">
                      <feGaussianBlur stdDeviation="2.5" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                    <radialGradient id="vaultFill" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="rgba(255,77,79,0.12)" />
                      <stop offset="100%" stopColor="rgba(255,77,79,0.03)" />
                    </radialGradient>
                    <radialGradient id="roomFill" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="rgba(167,209,255,0.07)" />
                      <stop offset="100%" stopColor="rgba(167,209,255,0.02)" />
                    </radialGradient>
                    <marker id="arrow" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M0,0 L8,4 L0,8 Z" fill="rgba(255,77,79,0.85)" />
                    </marker>
                  </defs>

                  <rect width="460" height="500" fill="#050c13" />
                  <g className={styles.gridAnimate} stroke="rgba(167,209,255,0.1)" strokeWidth="0.5">
                    {Array.from({ length: 25 }).map((_, i) => (
                      <line key={`h${i}`} x1="0" x2="460" y1={(i + 1) * 20} y2={(i + 1) * 20} />
                    ))}
                    {Array.from({ length: 23 }).map((_, i) => (
                      <line key={`v${i}`} x1={(i + 1) * 20} x2={(i + 1) * 20} y1="0" y2="500" />
                    ))}
                  </g>

                  <rect x="18" y="32" width="424" height="444" fill="none" stroke="rgba(167,209,255,0.28)" strokeWidth="1" />
                  {[60,100,140,180,220,260,300,340,380,420].map(x => (
                    <g key={`xt${x}`}>
                      <line x1={x} y1="28" x2={x} y2="32" stroke="rgba(167,209,255,0.4)" strokeWidth="0.8" />
                      <line x1={x} y1="476" x2={x} y2="480" stroke="rgba(167,209,255,0.4)" strokeWidth="0.8" />
                    </g>
                  ))}
                  {[60,100,140,180,220,260,300,340,380,420,460].map(y => (
                    <g key={`yt${y}`}>
                      <line x1="14" y1={y} x2="18" y2={y} stroke="rgba(167,209,255,0.4)" strokeWidth="0.8" />
                      <line x1="442" y1={y} x2="446" y2={y} stroke="rgba(167,209,255,0.4)" strokeWidth="0.8" />
                    </g>
                  ))}

                  <rect x="18" y="10" width="424" height="22" fill="rgba(167,209,255,0.04)" stroke="rgba(167,209,255,0.25)" strokeWidth="0.8" />
                  <text x="30" y="24" fill="rgba(167,209,255,0.5)" fontSize="6" fontFamily="monospace" letterSpacing="2">CLASSIFIED</text>
                  <text x="230" y="24" textAnchor="middle" fill="rgba(167,209,255,0.6)" fontSize="6.5" fontFamily="monospace" letterSpacing="3">VAULT-B2 FLOOR PLAN</text>
                  <text x="432" y="24" textAnchor="end" fill="rgba(255,77,79,0.55)" fontSize="6" fontFamily="monospace" letterSpacing="1.5">HH-2.0</text>

                  <rect x="30" y="50" width="102" height="92" fill="url(#roomFill)" stroke="rgba(167,209,255,0.5)" strokeWidth="1.2" />
                  <rect x="42" y="64" width="14" height="56" fill="none" stroke="rgba(167,209,255,0.5)" strokeWidth="0.8" rx="1" />
                  <rect x="62" y="64" width="14" height="56" fill="none" stroke="rgba(167,209,255,0.5)" strokeWidth="0.8" rx="1" />
                  <rect x="82" y="64" width="14" height="56" fill="none" stroke="rgba(167,209,255,0.5)" strokeWidth="0.8" rx="1" />
                  {[0,1,2,3,4,5].map(r => <circle key={r} cx="46" cy={68 + r*8} r="1" fill="rgba(167,209,255,0.7)" />)}
                  {[0,1,2,3,4,5].map(r => <circle key={r} cx="66" cy={68 + r*8} r="1" fill="rgba(255,77,79,0.7)" />)}
                  {[0,1,2,3,4,5].map(r => <circle key={r} cx="86" cy={68 + r*8} r="1" fill="rgba(167,209,255,0.7)" />)}
                  <text x="81" y="152" textAnchor="middle" fill="rgba(167,209,255,0.55)" fontSize="6.5" fontFamily="monospace" letterSpacing="1.5">SERVER</text>
                  <line x1="62" y1="142" x2="100" y2="142" stroke="#050c13" strokeWidth="2.5" />
                  <path d="M62,142 Q62,155 100,142" fill="none" stroke="rgba(167,209,255,0.4)" strokeWidth="0.7" strokeDasharray="2 3" />

                  <rect x="155" y="50" width="140" height="192" fill="url(#roomFill)" stroke="rgba(167,209,255,0.45)" strokeWidth="1.2" />
                  <rect x="167" y="62" width="30" height="20" fill="none" stroke="rgba(167,209,255,0.4)" strokeWidth="0.8" rx="1" />
                  <rect x="207" y="62" width="30" height="20" fill="none" stroke="rgba(167,209,255,0.4)" strokeWidth="0.8" rx="1" />
                  <rect x="247" y="62" width="30" height="20" fill="none" stroke="rgba(167,209,255,0.4)" strokeWidth="0.8" rx="1" />
                  <rect x="167" y="92" width="30" height="20" fill="none" stroke="rgba(167,209,255,0.4)" strokeWidth="0.8" rx="1" />
                  <rect x="207" y="92" width="30" height="20" fill="none" stroke="rgba(167,209,255,0.4)" strokeWidth="0.8" rx="1" />
                  <rect x="247" y="92" width="30" height="20" fill="none" stroke="rgba(167,209,255,0.4)" strokeWidth="0.8" rx="1" />
                  {[[167,62],[207,62],[247,62],[167,92],[207,92],[247,92]].map(([dx,dy],i) => (
                    <rect key={i} x={dx+9} y={dy+5} width="12" height="9" fill="none" stroke="rgba(167,209,255,0.6)" strokeWidth="0.6" rx="0.5" />
                  ))}
                  <text x="225" y="138" textAnchor="middle" fill="rgba(167,209,255,0.5)" fontSize="7" fontFamily="monospace" letterSpacing="2">HACK LAB</text>
                  <text x="225" y="149" textAnchor="middle" fill="rgba(167,209,255,0.3)" fontSize="5.5" fontFamily="monospace">RM-02</text>
                  <circle cx="225" cy="162" r="4" fill="none" stroke="rgba(255,200,0,0.5)" strokeWidth="0.8" />
                  <path d="M225,162 L218,172 L232,172 Z" fill="none" stroke="rgba(255,200,0,0.35)" strokeWidth="0.7" />
                  <text x="225" y="183" textAnchor="middle" fill="rgba(255,200,0,0.35)" fontSize="5" fontFamily="monospace">CAM-A</text>
                  <line x1="295" y1="108" x2="295" y2="136" stroke="#050c13" strokeWidth="2.5" />
                  <path d="M295,108 Q308,122 295,136" fill="none" stroke="rgba(167,209,255,0.4)" strokeWidth="0.7" strokeDasharray="2 3" />

                  <rect x="320" y="50" width="112" height="192" fill="url(#vaultFill)" stroke="rgba(255,77,79,0.65)" strokeWidth="1.8" filter="url(#redGlow)" />
                  <rect x="325" y="55" width="102" height="182" fill="none" stroke="rgba(255,77,79,0.2)" strokeWidth="3" />
                  <circle cx="376" cy="140" r="52" fill="none" stroke="rgba(255,77,79,0.18)" strokeWidth="1" />
                  <circle cx="376" cy="140" r="38" fill="rgba(255,77,79,0.06)" stroke="rgba(255,77,79,0.5)" strokeWidth="1.4" className={styles.ringDash} />
                  <circle cx="376" cy="140" r="26" fill="none" stroke="rgba(255,77,79,0.4)" strokeWidth="1" />
                  <circle cx="376" cy="140" r="10" fill="rgba(255,77,79,0.15)" stroke="rgba(255,77,79,0.7)" strokeWidth="1" />
                  <circle cx="376" cy="140" r="3" fill="#ff4d4f" />
                  {[0,60,120,180,240,300].map(deg => {
                    const rad = (deg * Math.PI) / 180
                    const bx = 376 + 33 * Math.cos(rad)
                    const by = 140 + 33 * Math.sin(rad)
                    return <circle key={deg} cx={bx} cy={by} r="2.5" fill="rgba(255,77,79,0.5)" stroke="rgba(255,77,79,0.8)" strokeWidth="0.6" />
                  })}
                  {[0,90,180,270].map(deg => {
                    const rad = (deg * Math.PI) / 180
                    return <line key={deg} x1={376 + 10*Math.cos(rad)} y1={140 + 10*Math.sin(rad)} x2={376 + 24*Math.cos(rad)} y2={140 + 24*Math.sin(rad)} stroke="rgba(255,77,79,0.5)" strokeWidth="0.8" />
                  })}
                  <text x="376" y="76" textAnchor="middle" fill="rgba(255,77,79,0.8)" fontSize="7.5" fontFamily="monospace" letterSpacing="2.5">VAULT</text>
                  <text x="376" y="87" textAnchor="middle" fill="rgba(255,77,79,0.45)" fontSize="5.5" fontFamily="monospace" letterSpacing="1">B2-CORE</text>
                  <text x="376" y="218" textAnchor="middle" fill="rgba(255,77,79,0.35)" fontSize="5" fontFamily="monospace">RESTRICTED ACCESS</text>
                  <line x1="320" y1="108" x2="320" y2="136" stroke="#050c13" strokeWidth="2.5" />
                  <path d="M320,108 Q307,122 320,136" fill="none" stroke="rgba(255,77,79,0.5)" strokeWidth="0.8" strokeDasharray="2 3" />

                  <rect x="30" y="162" width="102" height="80" fill="url(#roomFill)" stroke="rgba(167,209,255,0.45)" strokeWidth="1.2" />
                  <line x1="81" y1="205" x2="81" y2="180" stroke="rgba(167,209,255,0.55)" strokeWidth="1" />
                  <line x1="68" y1="185" x2="94" y2="185" stroke="rgba(167,209,255,0.4)" strokeWidth="0.8" />
                  <line x1="72" y1="192" x2="90" y2="192" stroke="rgba(167,209,255,0.35)" strokeWidth="0.7" />
                  <path d="M63,175 Q81,165 99,175" fill="none" stroke="rgba(167,209,255,0.3)" strokeWidth="0.8" strokeDasharray="2 2" />
                  <path d="M58,170 Q81,157 104,170" fill="none" stroke="rgba(167,209,255,0.2)" strokeWidth="0.7" strokeDasharray="2 3" />
                  <text x="81" y="233" textAnchor="middle" fill="rgba(167,209,255,0.5)" fontSize="6.5" fontFamily="monospace" letterSpacing="1.5">COMMS</text>
                  <line x1="132" y1="192" x2="132" y2="218" stroke="#050c13" strokeWidth="2.5" />
                  <path d="M132,192 Q145,205 132,218" fill="none" stroke="rgba(167,209,255,0.35)" strokeWidth="0.7" strokeDasharray="2 3" />

                  <rect x="30" y="142" width="102" height="20" fill="rgba(167,209,255,0.015)" stroke="rgba(167,209,255,0.2)" strokeWidth="0.7" />

                  <rect x="30" y="242" width="402" height="40" fill="rgba(167,209,255,0.03)" stroke="rgba(167,209,255,0.4)" strokeWidth="1.2" />
                  <line x1="80" y1="262" x2="380" y2="262" stroke="rgba(167,209,255,0.2)" strokeWidth="0.7" strokeDasharray="6 8" />
                  <text x="230" y="267" textAnchor="middle" fill="rgba(167,209,255,0.4)" fontSize="6" fontFamily="monospace" letterSpacing="3.5">MAIN CORRIDOR</text>
                  <circle cx="150" cy="249" r="3" fill="none" stroke="rgba(255,200,0,0.45)" strokeWidth="0.8" />
                  <path d="M150,249 L143,255 L157,255 Z" fill="none" stroke="rgba(255,200,0,0.3)" strokeWidth="0.7" />
                  <circle cx="320" cy="249" r="3" fill="none" stroke="rgba(255,200,0,0.45)" strokeWidth="0.8" />
                  <path d="M320,249 L313,255 L327,255 Z" fill="none" stroke="rgba(255,200,0,0.3)" strokeWidth="0.7" />

                  <rect x="30" y="302" width="120" height="108" fill="url(#roomFill)" stroke="rgba(167,209,255,0.45)" strokeWidth="1.2" />
                  <circle cx="90" cy="330" r="6" fill="rgba(255,200,0,0.15)" stroke="rgba(255,200,0,0.7)" strokeWidth="1" />
                  <path d="M90,330 L66,360 L114,360 Z" fill="rgba(255,200,0,0.06)" stroke="rgba(255,200,0,0.4)" strokeWidth="0.8" />
                  <line x1="76" y1="342" x2="104" y2="342" stroke="rgba(255,200,0,0.25)" strokeWidth="0.5" />
                  <line x1="72" y1="350" x2="108" y2="350" stroke="rgba(255,200,0,0.2)" strokeWidth="0.5" />
                  <line x1="70" y1="372" x2="82" y2="384" stroke="rgba(255,77,79,0.55)" strokeWidth="1" />
                  <line x1="82" y1="372" x2="70" y2="384" stroke="rgba(255,77,79,0.55)" strokeWidth="1" />
                  <text x="90" y="400" textAnchor="middle" fill="rgba(167,209,255,0.5)" fontSize="6.5" fontFamily="monospace" letterSpacing="1.5">SECURITY</text>
                  <line x1="64" y1="302" x2="116" y2="302" stroke="#050c13" strokeWidth="2.5" />
                  <path d="M64,302 Q64,291 116,302" fill="none" stroke="rgba(167,209,255,0.4)" strokeWidth="0.7" strokeDasharray="2 3" />

                  <rect x="170" y="302" width="140" height="108" fill="url(#roomFill)" stroke="rgba(167,209,255,0.4)" strokeWidth="1.2" />
                  <rect x="200" y="322" width="80" height="42" fill="none" stroke="rgba(167,209,255,0.4)" strokeWidth="0.8" rx="2" />
                  {[0,1,2,3].map(i => <rect key={i} x={206 + i*18} y="318" width="10" height="6" fill="none" stroke="rgba(167,209,255,0.3)" strokeWidth="0.6" rx="1" />)}
                  {[0,1,2,3].map(i => <rect key={i} x={206 + i*18} y="364" width="10" height="6" fill="none" stroke="rgba(167,209,255,0.3)" strokeWidth="0.6" rx="1" />)}
                  <text x="240" y="386" textAnchor="middle" fill="rgba(167,209,255,0.5)" fontSize="6.5" fontFamily="monospace" letterSpacing="1.5">BRIEFING</text>
                  <line x1="210" y1="302" x2="270" y2="302" stroke="#050c13" strokeWidth="2.5" />
                  <path d="M210,302 Q210,291 270,302" fill="none" stroke="rgba(167,209,255,0.4)" strokeWidth="0.7" strokeDasharray="2 3" />

                  <rect x="330" y="302" width="102" height="108" fill="rgba(255,77,79,0.04)" stroke="rgba(167,209,255,0.5)" strokeWidth="1.2" />
                  {[0,1,2,3,4,5].map(i => (
                    <line key={i} x1={330 + i*17} y1="302" x2={330} y2={302 + i*17} stroke="rgba(167,209,255,0.12)" strokeWidth="0.7" />
                  ))}
                  {[1,2,3,4,5,6].map(i => (
                    <line key={i} x1={432} y1={302 + i*17} x2={432 - i*17 + (i>6?0:0)} y2="302" stroke="rgba(167,209,255,0.12)" strokeWidth="0.7" />
                  ))}
                  <line x1="370" y1="316" x2="370" y2="396" stroke="rgba(167,209,255,0.5)" strokeWidth="1" />
                  <line x1="385" y1="316" x2="385" y2="396" stroke="rgba(167,209,255,0.5)" strokeWidth="1" />
                  {[0,1,2,3,4,5,6].map(i => <line key={i} x1="370" y1={320+i*12} x2="385" y2={320+i*12} stroke="rgba(167,209,255,0.45)" strokeWidth="0.8" />)}
                  <text x="381" y="408" textAnchor="middle" fill="rgba(167,209,255,0.55)" fontSize="6.5" fontFamily="monospace" letterSpacing="1.5">ACCESS</text>
                  <line x1="356" y1="302" x2="406" y2="302" stroke="#050c13" strokeWidth="2.5" />
                  <path d="M356,302 Q356,291 406,302" fill="none" stroke="rgba(255,77,79,0.5)" strokeWidth="0.8" strokeDasharray="2 3" />

                  <path
                    d="M381 410 L381 302 L381 262 L335 262 L335 242"
                    fill="none"
                    stroke="rgba(255,77,79,0.8)"
                    strokeWidth="2"
                    strokeDasharray="7 6"
                    markerEnd="url(#arrow)"
                    className={styles.routeFlow}
                    filter="url(#redGlow)"
                  />

                  <text x="128" y="148" textAnchor="end" fill="rgba(167,209,255,0.25)" fontSize="5" fontFamily="monospace">RM-01</text>
                  <text x="291" y="238" textAnchor="end" fill="rgba(167,209,255,0.25)" fontSize="5" fontFamily="monospace">RM-02</text>
                  <text x="428" y="238" textAnchor="end" fill="rgba(255,77,79,0.35)" fontSize="5" fontFamily="monospace">SEC-B2</text>
                  <text x="128" y="238" textAnchor="end" fill="rgba(167,209,255,0.25)" fontSize="5" fontFamily="monospace">RM-03</text>
                  <text x="148" y="406" textAnchor="end" fill="rgba(167,209,255,0.25)" fontSize="5" fontFamily="monospace">RM-04</text>
                  <text x="308" y="406" textAnchor="end" fill="rgba(167,209,255,0.25)" fontSize="5" fontFamily="monospace">RM-05</text>
                  <text x="430" y="406" textAnchor="end" fill="rgba(167,209,255,0.25)" fontSize="5" fontFamily="monospace">ACC-01</text>

                  <line x1="30" y1="488" x2="110" y2="488" stroke="rgba(167,209,255,0.35)" strokeWidth="0.8" />
                  <line x1="30" y1="484" x2="30" y2="492" stroke="rgba(167,209,255,0.35)" strokeWidth="0.8" />
                  <line x1="110" y1="484" x2="110" y2="492" stroke="rgba(167,209,255,0.35)" strokeWidth="0.8" />
                  <text x="70" y="496" textAnchor="middle" fill="rgba(167,209,255,0.3)" fontSize="5" fontFamily="monospace">10m</text>

                  <line x1="430" y1="492" x2="430" y2="476" stroke="rgba(167,209,255,0.4)" strokeWidth="1" />
                  <polygon points="426,480 430,470 434,480" fill="rgba(167,209,255,0.5)" />
                  <text x="430" y="498" textAnchor="middle" fill="rgba(167,209,255,0.4)" fontSize="6" fontFamily="monospace">N</text>

                  <g stroke="rgba(255,77,79,0.4)" strokeWidth="0.8">
                    <line x1="14" y1="38" x2="24" y2="38" /><line x1="19" y1="33" x2="19" y2="43" />
                    <line x1="436" y1="38" x2="446" y2="38" /><line x1="441" y1="33" x2="441" y2="43" />
                    <line x1="14" y1="470" x2="24" y2="470" /><line x1="19" y1="465" x2="19" y2="475" />
                    <line x1="436" y1="470" x2="446" y2="470" /><line x1="441" y1="465" x2="441" y2="475" />
                  </g>

                  <text x="230" y="495" textAnchor="middle" fill="rgba(255,77,79,0.28)" fontSize="5" fontFamily="monospace" letterSpacing="1.5">HACKHEIST 2.0 · GDG ON CAMPUS MIET · CLASSIFIED</text>
                </svg>

                <div className={clsx(styles.laser, laserFast && styles.laserFast)} />

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

      </div>
    </motion.section>
  )
}
