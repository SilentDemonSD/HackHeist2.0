import { useRef, useState, useEffect, useLayoutEffect } from 'react'
import { motion, useMotionValue, AnimatePresence } from 'framer-motion'
import useIsMobile from '../hooks/useIsMobile'

/* Individual static imports — Rspack requires statically analyzable paths */
import imgHimanshu from '../assets/team/Himanshu.webp'
import imgPalak from '../assets/team/Palak.webp'
import imgTanishq from '../assets/team/Tanishq.webp'
import imgAkshit from '../assets/team/Akshit.webp'
import imgAyush from '../assets/team/Ayush.webp'
import imgArya from '../assets/team/Arya.webp'
import imgNirdesh from '../assets/team/Nirdesh.webp'
import imgGaura from '../assets/team/Gaura.webp'
import imgItika from '../assets/team/Itika.webp'
import imgManan from '../assets/team/Manan.webp'
import imgSubhadip from '../assets/team/Subhadip.webp'
import imgSrishti from '../assets/team/Srishti.webp'
import imgAnshika from '../assets/team/Anshika.webp'
import imgAbheer from '../assets/team/Abheer.webp'
import imgSumit from '../assets/team/Sumit.webp'
import imgAbhishikt from '../assets/team/Abhishikt.webp'
import imgHarsh from '../assets/team/Harsh.webp'
import imgKhushbu from '../assets/team/Khushbu.webp'
import imgRajveer from '../assets/team/Rajveer.webp'

const teamMembers = [
  { name: 'Himanshu', img: imgHimanshu, role: 'Organizer', link: 'https://www.linkedin.com/in/himanshukumard/' },
  { name: 'Palak', img: imgPalak, role: 'Organizer', link: 'https://www.linkedin.com/in/palak-singhal-14a78324a/' },
  { name: 'Tanishq', img: imgTanishq, role: 'Organizer', link: 'https://www.linkedin.com/in/tanishq-taliyan/' },
  { name: 'Akshit', img: imgAkshit, role: 'Organizer', link: 'https://www.linkedin.com/in/sharmaakshit07/' },
  { name: 'Ayush', img: imgAyush, role: 'Organizer', link: 'https://www.linkedin.com/in/ayushsharma81/' },
  { name: 'Arya', img: imgArya, role: 'Organizer', link: 'https://www.linkedin.com/in/arya-kant-rajvanshi-141bbb28a/' },
  { name: 'Nirdesh', img: imgNirdesh, role: 'Organizer', link: 'https://www.linkedin.com/in/nirdesh-tyagi-441300291/' },
  { name: 'Gaura', img: imgGaura, role: 'Organizer', link: 'https://www.linkedin.com/in/gaura-siwach-b21a752a9/' },
  { name: 'Itika', img: imgItika, role: 'Organizer', link: 'https://www.linkedin.com/in/itika-singhal-a2b675325/' },
  { name: 'Manan', img: imgManan, role: 'Organizer', link: 'https://www.linkedin.com/in/manan-bhatia-7818a62a5/' },
  { name: 'Subhadip', img: imgSubhadip, role: 'Organizer', link: 'http://linkedin.com/in/mysterysd/' },
  { name: 'Srishti', img: imgSrishti, role: 'Organizer', link: 'https://www.linkedin.com/in/srishti-ruhal-931193317/' },
  { name: 'Anshika', img: imgAnshika, role: 'Organizer', link: 'https://www.linkedin.com/in/anshika1919' },
  { name: 'Abheer', img: imgAbheer, role: 'Organizer', link: 'https://www.linkedin.com/in/abheer-rajput-160839311/' },
  { name: 'Sumit', img: imgSumit, role: 'Organizer', link: 'https://www.linkedin.com/in/sumit-aggarwal-7457b02a3/' },
  { name: 'Abhishikt', img: imgAbhishikt, role: 'Organizer', link: 'https://www.linkedin.com/in/abhishikt-issac-1234653b1/' },
  { name: 'Harsh', img: imgHarsh, role: 'Organizer', link: 'https://www.linkedin.com/in/harsh-mavi-83944b380/' },
  { name: 'Khushbu', img: imgKhushbu, role: 'Organizer', link: 'https://www.linkedin.com/in/khushbu-rawat-258533331/' },
  { name: 'Rajveer', img: imgRajveer, role: 'Organizer', link: 'https://www.linkedin.com/in/rajveer-deshwal-a28469289/' },
]

const CARD_W = 160
const CARD_W_MOBILE = 130
const CARD_GAP = 20
const CARD_GAP_MOBILE = 14

// duplicate for seamless loop
const belt = [...teamMembers, ...teamMembers]

function LinkedInIcon() {
  return (
    <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function CrewCard({ member, onHover, onLeave, cardWidth }) {
  const w = cardWidth || CARD_W
  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="group select-none flex-shrink-0"
      style={{ width: w }}
    >
      <div className="relative overflow-hidden rounded-2xl bg-neutral-900/60 border border-white/[0.06] transition-all duration-500 group-hover:border-red-500/30 group-hover:shadow-[0_0_40px_rgba(255,77,79,0.12)]">
        <div className="relative" style={{ aspectRatio: '3 / 4' }}>
          <img
            src={member.img}
            alt={member.name}
            width={240}
            height={320}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover grayscale brightness-[0.65] transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:brightness-105 group-hover:scale-[1.05]"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none" />
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-red-500/60 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
        </div>

        <div className="relative px-2 py-2.5 bg-black/60 backdrop-blur-md flex items-center">
          <div className="flex-1 min-w-0 text-center">
            <p
              className="text-[0.72rem] font-semibold text-white/90 group-hover:text-white tracking-wide truncate transition-colors duration-300"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {member.name}
            </p>
            <p
              className="text-[0.52rem] text-white/30 group-hover:text-red-400/70 uppercase tracking-[0.18em] mt-0.5 transition-colors duration-300"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {member.role}
            </p>
          </div>

          {member.link && member.link !== '#' && (
            <a
              href={member.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="shrink-0 ml-1.5 flex h-6 w-6 items-center justify-center rounded-full
                         border border-white/10 text-gray-500
                         hover:border-red-500/40 hover:text-white hover:bg-red-500/10
                         transition-all duration-300"
              aria-label={`${member.name} LinkedIn`}
            >
              <LinkedInIcon />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function TeamSection() {
  const isMobile = useIsMobile()
  const x = useMotionValue(0)
  const [paused, setPaused] = useState(false)
  const [active, setActive] = useState(null)
  const beltRef = useRef(null)
  const [singleWidth, setSingleWidth] = useState(0)

  const SPEED = isMobile ? 0.5 : 0.8
  const currentGap = isMobile ? CARD_GAP_MOBILE : CARD_GAP
  const currentCardW = isMobile ? CARD_W_MOBILE : CARD_W

  useEffect(() => {
    let rafId
    const loop = () => {
      if (!paused) {
        const next = x.get() - SPEED
        x.set(next)
        if (singleWidth > 0 && next <= -singleWidth) {
          x.set(next + singleWidth)
        }
      }
      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafId)
  }, [paused, x, singleWidth, SPEED])

  useLayoutEffect(() => {
    const updateWidth = () => {
      if (!beltRef.current) return
      setSingleWidth(beltRef.current.scrollWidth / 2)
    }
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [beltRef, isMobile])

  return (
    <section className="relative overflow-hidden py-6">
      <div className="absolute top-0 bottom-0 left-0 w-20 md:w-48 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, #000 0%, transparent 100%)' }} />
      <div className="absolute top-0 bottom-0 right-0 w-20 md:w-48 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, #000 0%, transparent 100%)' }} />

      <motion.div
        ref={beltRef}
        className="flex w-max cursor-grab active:cursor-grabbing"
        style={{ x, gap: currentGap }}
        drag="x"
        dragConstraints={{ left: singleWidth ? -singleWidth : -4000, right: 0 }}
        dragElastic={0.04}
        onDragStart={() => setPaused(true)}
        onDragEnd={() => setPaused(false)}
        onMouseEnter={() => !isMobile && setPaused(true)}
        onMouseLeave={() => !isMobile && setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        {belt.map((member, i) => (
          <CrewCard
            key={`${member.name}-${i}`}
            member={member}
            cardWidth={currentCardW}
            onHover={() => {
              if (!isMobile) {
                setActive(member)
                setPaused(true)
              }
            }}
            onLeave={() => {
              if (!isMobile) {
                setActive(null)
                setPaused(false)
              }
            }}
          />
        ))}
      </motion.div>

      {!isMobile && (
        <div className="flex justify-center mt-6 h-9">
          <AnimatePresence mode="wait">
            {active && (
              <motion.div
                key={active.name}
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="px-6 py-1.5 rounded-full bg-black/70 backdrop-blur-lg border border-red-500/25 shadow-[0_0_24px_rgba(255,77,79,0.15)]"
              >
                <span className="text-[0.78rem] font-semibold text-white/90 tracking-wide" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  {active.name}
                </span>
                <span className="text-[0.6rem] text-red-400/60 ml-2 uppercase tracking-widest" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  {active.role}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </section>
  )
}
