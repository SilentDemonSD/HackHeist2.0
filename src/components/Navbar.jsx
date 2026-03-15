import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

function MaskLogo({ className = 'w-8 h-8' }) {
  return (
    <div
      className={`relative mask-logo-wrap ${className}`}
      aria-hidden
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
    </div>
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
  return (
    <a
      href={href}
      className="nav-link-entry nav-link-hover relative text-sm font-semibold text-gray-300 hover:text-white px-2.5 py-2 rounded-full transition-colors group whitespace-nowrap"
      style={{
        fontFamily: "'Montserrat', sans-serif",
        letterSpacing: '0.02em',
        '--delay': `${600 + index * 50}ms`,
      }}
    >
      <span className="relative z-10">{label}</span>
    </a>
  )
}

function MobileNavLink({ href, label, onClick, index }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="mobile-nav-link block rounded-2xl px-4 py-3 text-gray-200 hover:text-white transition-colors font-medium"
      style={{
        fontFamily: "'Montserrat', sans-serif",
        letterSpacing: '0.02em',
        '--delay': `${index * 50}ms`,
      }}
    >
      <span className="flex items-center gap-3">
        <span className="mobile-nav-bullet w-1.5 h-1.5 rounded-full bg-heist-red" />
        {label}
      </span>
    </a>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
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
          className="group relative bg-black/40 backdrop-blur-2xl rounded-full
      border border-white/10 px-6 sm:px-8 py-1.5 overflow-hidden w-full"
          aria-label="Global"
          style={{
            boxShadow:
              '0 8px 32px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* Hover shimmer — CSS animated */}
          <div className="nav-shimmer" />

          {/* Hover glow — CSS transition */}
          <div className="nav-hover-glow" />

          <div className="relative flex items-center justify-between w-full">
            <div className="flex items-center flex-shrink-0 z-10">
              <Link to="/" className="flex items-center gap-2 sm:gap-3 text-white font-semibold group">
                <MaskLogo className="w-7 h-7 sm:w-8 sm:h-8" />
                <span
                  className="hack-heist-title text-lg sm:text-xl font-normal hidden sm:block whitespace-nowrap"
                  style={{ fontFamily: "'3rdMan', 'Montserrat', sans-serif", letterSpacing: '0.12em', wordSpacing: '0.15em' }}
                >
                  {['H', 'a', 'c', 'k', ' ', 'H', 'e', 'i', 's', 't'].map((letter, i) => (
                    <span
                      key={i}
                      className="hack-heist-letter"
                      style={{ '--delay': `${50 * i}ms` }}
                    >
                      {letter === ' ' ? '\u00A0' : letter}
                    </span>
                  ))}
                </span>
                <span
                  className="mobile-text-hover text-base font-normal sm:hidden"
                  style={{ fontFamily: "'3rdMan', 'Montserrat', sans-serif", letterSpacing: '0.12em', wordSpacing: '0.15em' }}
                >
                  HACK HEIST
                </span>
              </Link>

              <div
                className="trae-scroll-reveal flex items-center gap-1 sm:gap-1.5 ml-2 sm:ml-3"
                style={{
                  width: scrolled ? 'auto' : 0,
                  opacity: scrolled ? 1 : 0,
                }}
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
              </div>
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
                  <img src="/logo/image.png" alt="ACIC" className="h-6 sm:h-8 lg:h-9 w-auto object-contain rounded-sm" />
                </a>
              </div>

              <button
                aria-controls="mobile-menu"
                aria-expanded={open}
                onClick={() => setOpen(v => !v)}
                className="hamburger-btn lg:hidden inline-flex items-center justify-center rounded-full p-2 text-gray-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-heist-red transition-colors"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className={`hamburger-svg h-6 w-6`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ transform: open ? 'rotate(90deg)' : 'rotate(0deg)' }}
                >
                  {/* SVG d-attribute animation requires motion.path — CSS cannot animate d */}
                  <motion.path
                    d="M3 6h18"
                    animate={{
                      d: open ? 'M6 6L18 18' : 'M3 6h18',
                      opacity: 1
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
                      opacity: 1
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </svg>
              </button>
            </div>
          </div>
        </motion.nav>

        {/* Mobile slide panel — CSS transition */}
        <div
          ref={panelRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className={`mobile-panel lg:hidden fixed inset-y-0 right-0 w-72 sm:w-80 bg-black/95 backdrop-blur-2xl border-l border-white/10 shadow-2xl rounded-l-3xl ${open ? 'mobile-panel--open' : ''}`}
        >
          <div className="mobile-panel-header p-4 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-2 text-white font-normal">
              <MaskLogo className="w-7 h-7" />
              <span style={{ fontFamily: "'3rdMan', 'Montserrat', sans-serif", letterSpacing: '0.12em', wordSpacing: '0.15em' }}>HACK HEIST</span>
            </div>
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="close-btn p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-4 space-y-2">
            {open && navLinks.map((link, index) => (
              <MobileNavLink
                key={link.href}
                {...link}
                index={index}
                onClick={() => setOpen(false)}
              />
            ))}
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-heist-red/10 to-transparent pointer-events-none" />
        </div>

        {/* Backdrop overlay — CSS transition */}
        <div
          onClick={() => setOpen(false)}
          className={`mobile-backdrop lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm -z-10 ${open ? 'mobile-backdrop--visible' : ''}`}
        />
      </div>
    </motion.header>
  )
}
