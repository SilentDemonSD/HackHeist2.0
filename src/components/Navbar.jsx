import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

function MaskLogo({ className = 'w-8 h-8' }) {
  return (
    <motion.div
      className={`relative ${className}`}
      aria-hidden
      whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
      transition={{ type: 'spring', stiffness: 500, damping: 20 }}
    >
      <div
        className="absolute inset-0 rounded-full bg-heist-red/40 blur-md"
        style={{ animation: 'logoGlow 3s ease-in-out infinite' }}
      />
      <img
        src="/mask-logo.webp"
        alt="Hack Heist Logo"
        className="relative z-10 w-full h-full object-contain"
        style={{
          filter: 'drop-shadow(0 0 6px rgba(179,0,0,0.65))',
          animation: 'logoShadow 2s ease-in-out infinite',
        }}
      />
    </motion.div>
  )
}

const navLinks = [
  { href: '/#about', label: 'About' },
  { href: '/#timeline', label: 'Timeline' },
  { href: '/#prizes', label: 'Loot' },
  { href: '/#partners', label: 'Partners' },
  { href: '/#tracks', label: 'Tracks' },
  { href: '/#past', label: 'Past Heists' },
  { href: '/#team', label: 'Our Team' },
  { href: '/#faq', label: 'FAQ' }
]

function NavigationLink({ href, label, index }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.a
      href={href}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 + index * 0.05, duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative text-sm font-semibold text-gray-300 hover:text-white px-2.5 py-2 rounded-full transition-colors overflow-hidden group whitespace-nowrap"
      style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: '0.02em' }}
    >
      <motion.span
        className="absolute inset-0 rounded-full border border-heist-red/50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: isHovered ? 1 : 0,
          opacity: isHovered ? 1 : 0
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      />

      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-heist-red/20 via-heist-red/35 to-heist-red/20 rounded-full"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: isHovered ? 1 : 0,
          opacity: isHovered ? 1 : 0
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      />

      <motion.span
        className="absolute inset-0 bg-heist-red/20 rounded-full blur-md"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: isHovered ? 1.8 : 0,
          opacity: isHovered ? 0.4 : 0
        }}
        transition={{ duration: 0.3 }}
      />

      <span className="relative z-10">{label}</span>
    </motion.a>
  )
}

function MobileNavLink({ href, label, onClick, index }) {
  return (
    <motion.a
      href={href}
      onClick={onClick}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ x: 5, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
      whileTap={{ scale: 0.98 }}
      className="block rounded-2xl px-4 py-3 text-gray-200 hover:text-white transition-colors font-medium"
      style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: '0.02em' }}
    >
      <span className="flex items-center gap-3">
        <motion.span
          className="w-1.5 h-1.5 rounded-full bg-heist-red"
          initial={{ scale: 0 }}
          whileHover={{ scale: 1.5 }}
          transition={{ type: 'spring', stiffness: 500 }}
        />
        {label}
      </span>
    </motion.a>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const panelRef = useRef(null)
  const location = useLocation()

  useEffect(() => { setOpen(false) }, [location.pathname])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      className="fixed top-4 left-0 right-0 z-50 px-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.nav
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 'auto', opacity: 1 }}
          transition={{
            duration: 0.8,
            ease: [0.34, 1.56, 0.64, 1],
            delay: 0.2,
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative bg-black/40 backdrop-blur-2xl rounded-full
      border border-white/10 px-6 sm:px-8 py-1.5 overflow-hidden w-full"
          aria-label="Global"
          style={{
            boxShadow:
              '0 8px 32px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.1)',
          }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-heist-red/0 via-heist-red/10 to-heist-red/0"
            animate={{
              x: isHovered ? ['0%', '100%'] : '0%',
            }}
            transition={{
              duration: 2,
              ease: 'linear',
              repeat: isHovered ? Infinity : 0,
            }}
          />

          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              boxShadow: isHovered
                ? '0 0 30px rgba(179, 0, 0, 0.4), 0 8px 32px rgba(0, 0, 0, 0.6)'
                : '0 8px 32px rgba(0, 0, 0, 0.6)'
            }}
            transition={{ duration: 0.3 }}
          />

          <div className="relative flex items-center justify-between w-full">
            <div className="flex items-center flex-shrink-0 z-10">
              <Link to="/" className="flex items-center gap-2 sm:gap-3 text-white font-semibold group">
                <MaskLogo className="w-7 h-7 sm:w-8 sm:h-8" />
                <motion.span
                  className="text-lg sm:text-xl font-normal hidden sm:block whitespace-nowrap"
                  style={{ fontFamily: "'3rdMan', 'Montserrat', sans-serif", letterSpacing: '0.12em', wordSpacing: '0.15em' }}
                  whileHover={{
                    scale: 1.05,
                    textShadow: '0 0 8px rgba(179, 0, 0, 0.6)'
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                >
                  {['H', 'a', 'c', 'k', ' ', 'H', 'e', 'i', 's', 't'].map((letter, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * i, duration: 0.3 }}
                      whileHover={{ y: -2, color: '#ff4444' }}
                      style={{ display: 'inline-block' }}
                    >
                      {letter === ' ' ? '\u00A0' : letter}
                    </motion.span>
                  ))}
                </motion.span>
                <motion.span
                  className="text-base font-normal sm:hidden"
                  style={{ fontFamily: "'3rdMan', 'Montserrat', sans-serif", letterSpacing: '0.12em', wordSpacing: '0.15em' }}
                  whileHover={{ scale: 1.08 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                >
                  HACK HEIST
                </motion.span>
              </Link>

              <motion.div
                className="flex items-center gap-1 sm:gap-1.5 ml-2 sm:ml-3 overflow-hidden"
                initial={false}
                animate={{
                  width: scrolled ? 'auto' : 0,
                  opacity: scrolled ? 1 : 0,
                }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
              >
                <span
                  className="text-[0.5rem] sm:text-[0.6rem] text-white/40 tracking-[0.15em] uppercase whitespace-nowrap"
                  style={{ fontFamily: "'3rdMan', sans-serif" }}
                >/</span>
                <img
                  src="/trae.webp"
                  alt="Trae"
                  className="h-3 sm:h-4 w-auto object-contain opacity-50"
                  onClick={() => window.open('https://www.trae.ai', '_blank', 'noopener,noreferrer')}
                  style={{ cursor: 'pointer' }}
                />
              </motion.div>
            </div>

            <div className="hidden lg:flex items-center justify-center flex-1 mx-2 xl:mx-4 z-10 w-full">
              {navLinks.map((link, index) => (
                <NavigationLink key={link.href} {...link} index={index} />
              ))}
            </div>

            <div className="flex items-center gap-3 lg:gap-4 flex-shrink-0 z-10">
              <div className="flex items-center gap-1.5 sm:gap-2 bg-white/5 py-1 px-2.5 sm:px-3 rounded-xl border border-white/10 backdrop-blur-md group hover:bg-white/10 transition-colors">
                <a
                  href="https://gdg.community.dev/gdg-on-campus-meerut-institute-of-engineering-and-technology-meerut-india/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-105 transition-transform"
                >
                  <img src="/logo/gdg.png" alt="GDG" className="h-5 sm:h-7 lg:h-8 w-auto object-contain rounded-sm" />
                </a>
                <span className="text-white/40 font-bold text-xs sm:text-sm">x</span>
                <a
                  href="https://acicmeerut.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-105 transition-transform"
                >
                  <img src="/logo/ACICMIET.png" alt="ACIC" className="h-6 sm:h-8 lg:h-9 w-auto object-contain rounded-sm" />
                </a>
              </div>

              <motion.button
                aria-controls="mobile-menu"
                aria-expanded={open}
                onClick={() => setOpen(v => !v)}
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                whileTap={{ scale: 0.95 }}
                className="lg:hidden inline-flex items-center justify-center rounded-full p-2 text-gray-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-heist-red transition-colors"
              >
                <span className="sr-only">Open main menu</span>
                <motion.svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  animate={{ rotate: open ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.path
                    d="M3 6h18"
                    animate={{
                      d: open ? 'M6 6L18 18' : 'M3 6h18',
                      opacity: open ? 1 : 1
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.path
                    d="M3 12h18"
                    animate={{ opacity: open ? 0 : 1 }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.path
                    d="M3 18h18"
                    animate={{
                      d: open ? 'M6 18L18 6' : 'M3 18h18',
                      opacity: open ? 1 : 1
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.svg>
              </motion.button>
            </div>
          </div>
        </motion.nav>

        <motion.div
          ref={panelRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          initial={{ x: '100%', opacity: 0 }}
          animate={{
            x: open ? 0 : '100%',
            opacity: open ? 1 : 0
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30
          }}
          className="lg:hidden fixed inset-y-0 right-0 w-72 sm:w-80 bg-black/95 backdrop-blur-2xl border-l border-white/10 shadow-2xl rounded-l-3xl"
        >
          <motion.div
            className="p-4 flex items-center justify-between border-b border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: open ? 1 : 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-2 text-white font-normal">
              <MaskLogo className="w-7 h-7" />
              <span style={{ fontFamily: "'3rdMan', 'Montserrat', sans-serif", letterSpacing: '0.12em', wordSpacing: '0.15em' }}>HACK HEIST</span>
            </div>
            <motion.button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              whileHover={{ scale: 1.1, rotate: 90, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          </motion.div>

          <div className="p-4 space-y-2">
            {navLinks.map((link, index) => (
              <MobileNavLink
                key={link.href}
                {...link}
                index={index}
                onClick={() => setOpen(false)}
              />
            ))}
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-heist-red/10 to-transparent pointer-events-none" />
        </motion.div>

        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm -z-10"
          />
        )}
      </div>
    </motion.header>
  )
}


