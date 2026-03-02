import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

const faqs = [
  {
    q: 'Who can participate?',
    a: 'Anyone from beginners to pros! Whether you’re a developer, designer, or innovator—Hack Heist welcomes all.',
  },
  {
    q: 'Is it free?',
    a: 'Yes! Participation is 100% free, including access to mentors, sessions, and the venue.',
  },
  {
    q: 'Do I need a team?',
    a: 'Teams of 2–4 members are allowed.\nYou can register solo and we’ll help you form a team at the venue if needed.',
  },
  {
    q: 'What should I bring?',
    a: 'A laptop, charger, valid student ID, and lots of energy. We’ll handle the rest.',
  },
  {
    q: "What's the judging criteria?",
    a: 'Innovation, Impact, Technical Strength, UI/UX, and Presentation.',
  },
]

export default function FAQ() {
  const [openSet, setOpenSet] = useState(new Set())
  const faqEndRef = useRef(null)
  const prevSize = useRef(0)

  const toggleFAQ = (idx) => {
    setOpenSet((prev) => {
      const next = new Set(prev)
      next.has(idx) ? next.delete(idx) : next.add(idx)
      return next
    })
  }

  const allOpen = openSet.size === faqs.length

  const toggleAll = () => {
    setOpenSet(allOpen ? new Set() : new Set(faqs.map((_, i) => i)))
  }

  /* ✅ Scroll ONLY when something is opened */
  useEffect(() => {
    if (openSet.size > prevSize.current) {
      faqEndRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      })
    }
    prevSize.current = openSet.size
  }, [openSet])

  return (
    <section
      id="faq"
      className="relative py-16 md:py-24 overflow-hidden"
      aria-label="FAQ"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#0d0d0d]" />
      <div className="absolute inset-0 -z-10 blur-[140px] opacity-40 bg-heist-red/30" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative container">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <span style={{
            display: 'block',
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '0.65rem',
            fontWeight: 600,
            letterSpacing: '0.45em',
            textTransform: 'uppercase',
            color: 'rgba(255,77,79,0.75)',
            marginBottom: '0.55rem',
          }}>
            Intel Briefing
          </span>
          <h2
            style={{
              fontFamily: "'3rdMan', 'Montserrat', sans-serif",
              fontSize: 'clamp(1.9rem, 4.5vw, 3.6rem)',
              fontWeight: 'normal',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: '#ffffff',
              margin: 0,
              lineHeight: 1.1,
              cursor: 'default',
            }}
          >
            {"FAQ's".split('').map((char, i) => (
              <motion.span
                key={i}
                style={{ display: 'inline-block' }}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.028 * i, duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -5, color: '#ff4d4f', transition: { duration: 0.15 } }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </h2>
          <p style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '0.88rem',
            color: 'rgba(200,200,200,0.6)',
            marginTop: '0.6rem',
            letterSpacing: '0.02em',
          }}>
            Laser-scanned intel for your heist questions.
          </p>
        </motion.div>

        {/* Toggle All */}
        <div className="mb-8">
          <button
            onClick={toggleAll}
            className="px-6 py-2 rounded-full text-xs uppercase tracking-widest
                       border border-heist-red/40 text-heist-red
                       hover:bg-heist-red/10 transition"
          >
            {allOpen ? 'Collapse All' : 'Expand All'}
          </button>
        </div>

        {/* FAQ List */}
        <div className="relative max-w-3xl space-y-8">
          {faqs.map((item, idx) => {
            const open = openSet.has(idx)

            return (
              <div key={item.q} className="space-y-3">
                {/* Question */}
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleFAQ(idx)}
                  className="relative max-w-[90%] sm:max-w-[85%]
                             px-6 py-4 text-left text-gray-100
                             bg-white/5 border border-white/10
                             transition-colors hover:border-heist-red/40
                             [border-radius:28px_28px_28px_8px]"
                >
                  <span className="absolute inset-0 -z-10 blur-lg bg-white/5 rounded-[inherit]" />
                  {item.q}
                </motion.button>

                {/* Answer */}
                <motion.div
                  initial={false}
                  animate={{
                    maxHeight: open ? 500 : 0,
                    opacity: open ? 1 : 0,
                  }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="ml-auto max-w-[90%] sm:max-w-[85%]
                             overflow-hidden
                             bg-gradient-to-br from-heist-red/20 to-black
                             border border-heist-red/40
                             shadow-[0_0_36px_rgba(255,0,0,0.35)]
                             [border-radius:28px_28px_8px_28px]"
                >
                  <div className="px-6 py-4 text-gray-200">
                    <p className="whitespace-pre-line leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                </motion.div>
              </div>
            )
          })}
          <div ref={faqEndRef} />
        </div>
      </div>
    </section>
  )
}
