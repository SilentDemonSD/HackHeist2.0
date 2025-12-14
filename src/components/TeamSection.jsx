import { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue } from 'framer-motion'

/* ===== TEAM DATA (20 MEMBERS) ===== */
const teamMembers = [
  { name: 'Akshit Sharma', role: 'Lead Organizer', img: '/team/1.jpg', link: '#' },
  { name: 'Riya Verma', role: 'Operations Head', img: '/team/2.jpg', link: '#' },
  { name: 'Aman Gupta', role: 'Tech Lead', img: '/team/3.jpg', link: '#' },
  { name: 'Neha Singh', role: 'Design Lead', img: '/team/4.jpg', link: '#' },
  { name: 'Harsh Patel', role: 'Backend Lead', img: '/team/5.jpg', link: '#' },
  { name: 'Simran Kaur', role: 'Frontend Lead', img: '/team/6.jpg', link: '#' },
  { name: 'Rohit Jain', role: 'Sponsorships', img: '/team/7.jpg', link: '#' },
  { name: 'Ananya Roy', role: 'PR & Media', img: '/team/8.jpg', link: '#' },
  { name: 'Siddharth', role: 'Logistics', img: '/team/9.jpg', link: '#' },
  { name: 'Pooja Mehta', role: 'Community', img: '/team/10.jpg', link: '#' },

  { name: 'Yash', role: 'DevOps', img: '/team/11.jpg', link: '#' },
  { name: 'Kritika', role: 'Content', img: '/team/12.jpg', link: '#' },
  { name: 'Aditya', role: 'AI Lead', img: '/team/13.jpg', link: '#' },
  { name: 'Nikhil', role: 'Security', img: '/team/14.jpg', link: '#' },
  { name: 'Isha', role: 'UI Engineer', img: '/team/15.jpg', link: '#' },
  { name: 'Aryan', role: 'Infra', img: '/team/16.jpg', link: '#' },
  { name: 'Muskan', role: 'Design', img: '/team/17.jpg', link: '#' },
  { name: 'Kunal', role: 'Mentorship', img: '/team/18.jpg', link: '#' },
  { name: 'Tanya', role: 'Outreach', img: '/team/19.jpg', link: '#' },
  { name: 'Dev', role: 'Core Team', img: '/team/20.jpg', link: '#' },
]

// duplicate for seamless loop
const belt = [...teamMembers, ...teamMembers]

export default function TeamSection() {
  const x = useMotionValue(0)
  const [paused, setPaused] = useState(false)
  const [active, setActive] = useState(null)

  /* ===== HACKVILLE-STYLE CONTINUOUS MOTION ===== */
  const SPEED = 1.1 // px per frame (0.5–0.6 feels premium)

  useEffect(() => {
    let rafId

    const loop = () => {
      if (!paused) {
        x.set(x.get() - SPEED)

        // seamless wrap (tune if avatars change size)
        if (x.get() < -2000) {
          x.set(0)
        }
      }
      rafId = requestAnimationFrame(loop)
    }

    rafId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafId)
  }, [paused, x])

  return (
    <section className="relative overflow-hidden py-14">
      {/* 🔴 Ambient red glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(179,0,0,0.28),transparent_65%)] pointer-events-none" />

      {/* ===== BELT ===== */}
      <motion.div
        className="flex w-max gap-10 px-6 cursor-grab active:cursor-grabbing"
        style={{ x }}
        drag="x"
        dragConstraints={{ left: -2000, right: 0 }}
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
              {/* <img
                src={member.img}
                alt={member.name}
                className="
                  h-full w-full object-cover
                  grayscale
                  transition duration-300
                  group-hover:grayscale-0
                "
                draggable={false}
              /> */}
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
            min-h-[64px]
            px-8 py-3
            rounded-full
            bg-black/60 backdrop-blur
            border border-heist-red/40
            shadow-[0_0_30px_rgba(255,0,0,0.35)]
            text-center
          "
        >
          {active && (
            <>
              <div className="text-gray-100 font-semibold text-sm">
                {active.name}
              </div>
              <div className="text-heist-red text-xs tracking-widest uppercase">
                {active.role}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  )
}
