import { useState, useRef, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import useInView from '../hooks/useInView'

/* Only AnimatePresence + motion kept for accordion height animation */

const faqs = [
  {
    q: 'Who can participate?',
    a: "Anyone from beginners to pros — whether you're a developer, designer, or innovator, Hack Heist welcomes all.",
  },
  {
    q: 'Is it free?',
    a: 'Yes — participation is 100% free, including access to mentors, sessions, and the venue.',
  },
  {
    q: 'Do I need a team?',
    a: "Teams of 2-4 members are allowed. You can register solo and we'll help you form a team at the venue if needed.",
  },
  {
    q: 'What should I bring?',
    a: "A laptop, charger, valid student ID, and lots of energy. We'll handle the rest.",
  },
  {
    q: "What's the judging criteria?",
    a: 'Innovation, Impact, Technical Strength, UI/UX, and Presentation.',
  },
]

function Cursor() {
  return (
    <span
      className="inline-block w-[2px] h-[1em] bg-red-500 ml-1 align-middle"
      style={{ animation: 'cursorBlink 0.7s ease-in-out infinite alternate' }}
      aria-hidden
    />
  )
}

function FAQItem({ item, idx, isOpen, toggle }) {
  return (
    <div
      className="reveal-section revealed"
      style={{ '--delay': `${idx * 60}ms` }}
    >
      <button
        onClick={() => toggle(idx)}
        className="w-full flex items-center gap-3 text-left group
                   px-5 py-4 rounded-2xl rounded-bl-sm
                   bg-white/[0.03] border border-white/[0.06]
                   hover:border-red-500/30 hover:translate-x-1
                   active:scale-[0.985] transition-all duration-200"
      >
        <span
          className="shrink-0 text-red-500/70 text-xs font-mono select-none"
          aria-hidden
        >
          &gt;_
        </span>

        <span
          className="flex-1 text-gray-100 text-sm sm:text-[0.95rem] leading-snug"
          style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}
        >
          {item.q}
        </span>

        <span
          className="shrink-0 w-7 h-7 flex items-center justify-center
                     rounded-full border border-white/10
                     text-red-500 text-lg leading-none select-none
                     group-hover:border-red-500/40 transition-all duration-250"
          style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
        >
          +
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div
              className="relative mt-2 ml-4 sm:ml-8 px-5 py-4
                         rounded-2xl rounded-br-sm
                         bg-gradient-to-br from-red-500/[0.07] to-transparent
                         border border-red-500/[0.12]"
            >
              <div
                className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-[0.03]"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.08) 2px, rgba(255,255,255,0.08) 4px)',
                }}
              />

              <span
                className="text-red-500/50 text-[0.65rem] font-mono tracking-wider uppercase select-none"
                aria-hidden
              >
                sys://response
              </span>
              <p
                className="mt-1.5 text-gray-300 text-sm leading-relaxed whitespace-pre-line"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {item.a}
                <Cursor />
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function HeadingBlock() {
  const [ref, inView] = useInView({ threshold: 0.3 })
  const cls = inView ? 'revealed' : ''

  return (
    <div ref={ref} className={`reveal-section ${cls} text-center mb-12`}>
      <span
        className="block text-[0.65rem] font-semibold tracking-[0.45em] uppercase mb-2"
        style={{ fontFamily: "'Montserrat', sans-serif", color: 'rgba(255,77,79,0.75)' }}
      >
        Intel Briefing
      </span>

      <h2
        style={{
          fontFamily: "'3rdMan', 'Montserrat', sans-serif",
          fontSize: 'clamp(1.9rem, 4.5vw, 3.6rem)',
          fontWeight: 'normal',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: '#fff',
          margin: 0,
          lineHeight: 1.1,
        }}
      >
        {"FAQ's".split('').map((ch, i) => (
          <span
            key={i}
            className={`letter-char ${cls}`}
            style={{ '--i': i }}
          >
            {ch === ' ' ? '\u00A0' : ch}
          </span>
        ))}
      </h2>

      <p
        className="mt-2 text-sm tracking-wide"
        style={{ fontFamily: "'Montserrat', sans-serif", color: 'rgba(200,200,200,0.5)' }}
      >
        Laser-scanned intel for your heist questions.
      </p>
    </div>
  )
}

export default function FAQ() {
  const [openSet, setOpenSet] = useState(new Set())
  const faqEndRef = useRef(null)
  const prevSize = useRef(0)

  const toggle = (idx) => {
    setOpenSet((prev) => {
      const next = new Set(prev)
      next.has(idx) ? next.delete(idx) : next.add(idx)
      return next
    })
  }

  const allOpen = openSet.size === faqs.length
  const toggleAll = () =>
    setOpenSet(allOpen ? new Set() : new Set(faqs.map((_, i) => i)))

  useEffect(() => {
    if (openSet.size > prevSize.current) {
      faqEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
    prevSize.current = openSet.size
  }, [openSet])

  return (
    <section
      id="faq"
      className="relative py-16 md:py-28 overflow-hidden"
      aria-label="FAQ"
    >
      <div className="absolute inset-0 bg-[#0a0a0a]" />

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-red-500/[0.06] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6">
        <HeadingBlock />

        <div className="flex justify-center mb-8">
          <button
            onClick={toggleAll}
            className="px-6 py-2 rounded-full text-[0.65rem] uppercase tracking-[0.25em]
                       border border-red-500/30 text-red-500
                       hover:bg-red-500/10 transition font-medium"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {allOpen ? 'Collapse All' : 'Expand All'}
          </button>
        </div>

        <div className="space-y-4">
          {faqs.map((item, idx) => (
            <FAQItem
              key={item.q}
              item={item}
              idx={idx}
              isOpen={openSet.has(idx)}
              toggle={toggle}
            />
          ))}
          <div ref={faqEndRef} />
        </div>
      </div>
    </section>
  )
}
