import { useRef, useState, useEffect, useLayoutEffect } from 'react'
import { motion, useMotionValue } from 'framer-motion'

/* ===== ORGANIZERS DATA ===== */
const teamMembers = [
  { name: 'Himanshu', img: 'https://iili.io/qFRTD3N.jpg', link: '#' },
  { name: 'Palak', img: 'https://iili.io/qFRYVYQ.jpg', link: '#' },
  { name: 'Tanishq', img: 'https://iili.io/qFRTeCx.jpg', link: '#' },
  { name: 'Akshit', img: 'https://iili.io/qFRAyLG.jpg', link: '#' },
  { name: 'Ayush', img: 'https://iili.io/qqRsdrX.png', link: '#' },
  { name: 'Aryan', img: 'https://iili.io/qFRuGoJ.jpg', link: '#' },
  { name: 'Nirdesh', img: 'https://iili.io/qFRz6S1.jpg', link: '#' },
  { name: 'Gaura', img: 'https://iili.io/qFRuc91.jpg', link: '#' },
  { name: 'Itika', img: 'https://iili.io/qqRkj8N.jpg', link: '#' },
  { name: 'Manan', img: 'https://iili.io/qFRuuMx.jpg', link: '#' },
  { name: 'Subhadip', img: 'https://iili.io/qFRzF6B.png', link: '#' },
  { name: 'Srishti', img: 'https://iili.io/qFR5QDX.jpg', link: '#' },
  { name: 'Anshika', img: 'https://iili.io/qqRNf3B.png', link: '#' },
  { name: 'Abheer', img: 'https://iili.io/qqR7wWg.jpg', link: '#' },
  { name: 'Sumit', img: 'https://iili.io/qqRana4.jpg', link: '#' },
  // { name: 'Aishwarya', img: '/team/16.jpg', link: '#' },
  // { name: 'Ansh', img: '/team/17.jpg', link: '#' },
  { name: 'Abhishikt', img: 'https://iili.io/qqRXgku.png', link: '#' },
  { name: 'Harsh', img: 'https://iili.io/qFRuOAX.jpg', link: '#' },
  { name: 'Khushbu', img: 'https://iili.io/qqRlzQ9.jpg', link: '#' },
  { name: 'Rajveer', img: 'https://iili.io/qFRAQdN.jpg', link: '#' },
]

// duplicate for seamless loop
const belt = [...teamMembers, ...teamMembers]

export default function TeamSection() {
  const x = useMotionValue(0)
  const [paused, setPaused] = useState(false)
  const [active, setActive] = useState(null)
  const beltRef = useRef(null)
  const [singleWidth, setSingleWidth] = useState(0)

  /* ===== HACKVILLE-STYLE CONTINUOUS MOTION ===== */
  const SPEED = 2.5 // px per frame (0.5–0.6 feels premium)

  useEffect(() => {
    let rafId

    const loop = () => {
      if (!paused) {
        const next = x.get() - SPEED
        x.set(next)

        // seamless wrap using measured single belt width
        if (singleWidth > 0 && next <= -singleWidth) {
          // add singleWidth so motion continues seamlessly
          x.set(next + singleWidth)
        }
      }
      rafId = requestAnimationFrame(loop)
    }

    rafId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafId)
  }, [paused, x, singleWidth])

  // measure single belt width (one copy) for seamless looping
  useLayoutEffect(() => {
    function updateWidth() {
      if (!beltRef.current) return
      const total = beltRef.current.scrollWidth || 0
      setSingleWidth(total / 2)
    }

    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [beltRef])

  return (
    <section className="relative overflow-hidden py-14">
      {/* 🔴 Ambient red glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(179,0,0,0.28),transparent_65%)] pointer-events-none" />

      {/* ===== BELT ===== */}
      <motion.div
        ref={beltRef}
        className="flex w-max gap-10 px-6 cursor-grab active:cursor-grabbing"
        style={{ x }}
        drag="x"
        dragConstraints={{ left: singleWidth ? -singleWidth : -2000, right: 0 }}
        dragElastic={0.04}
        onDragStart={() => setPaused(true)}
        onDragEnd={() => setPaused(false)}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        {belt.map((member, i) => (
          <a
            key={i}
            href={member.link}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => {
              setActive(member)
              setPaused(true)
            }}
            onMouseLeave={() => {
              setActive(null)
              setPaused(false)
            }}
            className="group select-none"
          >
            <div
              className="
                h-24 w-24 md:h-28 md:w-28
                rounded-full
                bg-black/50
                border border-white/10
                overflow-hidden
                transition-all duration-300
                group-hover:scale-110
                group-hover:border-heist-red
                shadow-[0_0_30px_rgba(0,0,0,0.8)]
              "
            >
              <img
                src={member.img}
                alt={member.name}
                className="
                  h-full w-full object-cover
                  grayscale
                  transition duration-300
                  group-hover:grayscale-0
                "
                draggable={false}
              />
            </div>
          </a>
        ))}
      </motion.div>

      {/* ===== INFO PANEL ===== */}
      <div className="mt-10 flex justify-center">
        <motion.div
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.25 }}
          className="
            min-h-[40px]
            px-8 py-2
            rounded-full
            bg-black/60 backdrop-blur
            border border-heist-red/40
            shadow-[0_0_30px_rgba(255,0,0,0.35)]
            text-center
          "
        >
          {active && (
            <div className="text-gray-100 font-semibold text-sm">
              {active.name}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
