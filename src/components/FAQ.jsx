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
    a: 'Teams of 1–4 members are allowed.\nYou can register solo and we’ll help you form a team at the venue if needed.',
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

/* ───────────────── animations ───────────────── */

const listVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const questionVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
}

export default function FAQ() {
  const [openSet, setOpenSet] = useState(new Set())
  const faqEndRef = useRef(null)

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

  useEffect(() => {
    faqEndRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    })
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
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="text-center mb-10"
        >
          <h2
            className="text-3xl md:text-4xl font-bold tracking-[0.18em] uppercase"
            style={{ fontFamily: 'Oxanium, sans-serif' }}
          >
            FAQ
          </h2>
          <p className="mt-3 text-gray-400">
            Laser-scanned intel for your heist questions.
          </p>
        </motion.div>

        {/* Toggle All */}
        <div className="flex justify-center mb-10">
          <button
            onClick={toggleAll}
            className="px-6 py-2 rounded-full text-xs uppercase tracking-widest
                       border border-heist-red/40 text-heist-red
                       hover:bg-heist-red/10 transition"
          >
            {allOpen ? 'Collapse All' : 'Show All'}
          </button>
        </div>

        {/* FAQ Chat */}
        <motion.div
          variants={listVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="relative max-w-3xl mx-auto space-y-6"
        >
          {faqs.map((item, idx) => {
            const open = openSet.has(idx)

            return (
              <motion.div
                key={item.q}
                variants={questionVariants}
                className="space-y-3"
              >
                {/* QUESTION */}
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleFAQ(idx)}
                  className="max-w-[90%] sm:max-w-[85%] rounded-2xl px-5 py-4 text-left
                             bg-white/5 border border-white/10
                             text-gray-100 hover:border-heist-red/40 transition-colors"
                >
                  {item.q}
                </motion.button>

                {/* ANSWER */}
                <motion.div
                  initial={false}
                  animate={{
                    maxHeight: open ? 500 : 0,
                    opacity: open ? 1 : 0,
                  }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="ml-auto max-w-[90%] sm:max-w-[85%] overflow-hidden rounded-2xl
                             bg-gradient-to-br from-heist-red/20 to-black
                             border border-heist-red/40
                             shadow-[0_0_32px_rgba(255,0,0,0.35)]"
                >
                  <motion.div
                    animate={open ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: open ? 0.12 : 0, duration: 0.25 }}
                    className="px-5 py-4 text-gray-200"
                  >
                    <p className="whitespace-pre-line leading-relaxed">
                      {item.a}
                    </p>
                  </motion.div>
                </motion.div>
              </motion.div>
            )
          })}
          <div ref={faqEndRef} />
        </motion.div>
      </div>
    </section>
  )
}
