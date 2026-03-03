import { motion } from 'framer-motion'
import instagramIcon from '../assets/links/instagram.webp'

/* ─── Data ─── */
const socialLinks = [
  {
    name: 'Website',
    icon: 'link',
    type: 'svg',
    href: 'https://gdg.community.dev/gdg-on-campus-meerut-institute-of-engineering-and-technology-meerut-india/',
  },
  {
    name: 'Instagram',
    icon: instagramIcon,
    type: 'image',
    href: 'https://www.instagram.com/gdg_miet/',
  },
  {
    name: 'LinkedIn',
    icon: 'linkedin',
    type: 'svg',
    href: 'https://www.linkedin.com/company/google-developer-groups-on-campus-meerut-institute-of-engineering-and-technology/',
  },
  {
    name: 'Commudle',
    icon: 'commudle',
    type: 'svg',
    href: 'https://www.commudle.com/communities/gdsc-miet',
  },
]

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#past', label: 'Past Events' },
  { href: '#timeline', label: 'Schedule' },
  { href: '#prizes', label: 'Prizes' },
  { href: '#partners', label: 'Sponsors' },
  { href: '#faq', label: 'FAQs' },
  { href: '#team', label: 'Our Team' },
]

/* ─── Stagger variants ─── */
const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
}

const rise = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

/* ─── SVG icons ─── */
function SvgIcon({ icon }) {
  if (icon === 'link') {
    return (
      <svg className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.102 1.101" />
      </svg>
    )
  }
  if (icon === 'linkedin') {
    return (
      <svg className="h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    )
  }
  if (icon === 'commudle') {
    return (
      <svg className="h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
      </svg>
    )
  }
  return null
}

function SocialIcon({ icon, href, name, type }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex h-10 w-10 items-center justify-center rounded-full
                 border border-white/10 bg-white/[0.03] transition-all
                 hover:border-red-500/50 hover:bg-red-500/10"
      whileHover={{ scale: 1.12, y: -2 }}
      whileTap={{ scale: 0.92 }}
      aria-label={name}
    >
      {/* Glow ring on hover */}
      <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100
                       shadow-[0_0_12px_rgba(239,68,68,0.35)] transition-opacity" />
      <span className="relative text-gray-400 group-hover:text-white transition-colors">
        {type === 'image'
          ? <img src={icon} alt={name} width={18} height={18} className="h-[18px] w-[18px] object-contain" />
          : <SvgIcon icon={icon} />
        }
      </span>
    </motion.a>
  )
}

/* ─── Footer ─── */
export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-[#060606]">
      {/* Background texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />

      {/* Top-edge red accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[180px] bg-red-500/[0.04] rounded-full blur-[100px]" />

      <motion.div
        className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 py-14 md:py-20"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={stagger}
      >
        {/* ─── 4-column grid ─── */}
        <div className="grid gap-12 sm:gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Col 1 — Brand */}
          <motion.div variants={rise} className="space-y-5">
            <div className="flex items-center gap-1.5 select-none">
              <span
                className="text-[1.65rem] tracking-wider text-white"
                style={{ fontFamily: "'3rdMan', 'Montserrat', sans-serif", fontWeight: 'normal' }}
              >
                HACK
              </span>
              <span
                className="rounded-md bg-red-600 px-2.5 py-0.5 text-[1.65rem] tracking-wider text-white"
                style={{ fontFamily: "'3rdMan', 'Montserrat', sans-serif", fontWeight: 'normal' }}
              >
                HEIST
              </span>
            </div>

            <p
              className="text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-gray-500"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              A 36-Hour Hackathon
            </p>

            <div className="flex gap-2.5 pt-1">
              {socialLinks.map((s, i) => (
                <SocialIcon key={i} {...s} />
              ))}
            </div>
          </motion.div>

          {/* Col 2 — Get In Touch */}
          <motion.div variants={rise} className="space-y-5">
            <h4
              className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-red-500/80"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Get In Touch
            </h4>
            <div className="space-y-4">
              <motion.a
                href="mailto:gdgoncampus@miet.ac.in"
                className="group flex items-start gap-2 text-sm transition-colors"
                whileHover={{ x: 3 }}
              >
                <span className="text-red-500/50 mt-0.5 text-xs font-mono select-none" aria-hidden>&gt;</span>
                <span>
                  <span className="text-gray-400 group-hover:text-white transition-colors" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    gdgoncampus@miet.ac.in
                  </span>
                </span>
              </motion.a>

              <div className="flex items-start gap-2 text-sm">
                <span className="text-red-500/50 mt-0.5 text-xs font-mono select-none" aria-hidden>&gt;</span>
                <p
                  className="text-gray-500 leading-relaxed"
                  style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '0.82rem' }}
                >
                  N.H. 58, Delhi-Roorkee Highway,<br />
                  Baghpat Bypass Road Crossing,<br />
                  Meerut, Uttar Pradesh 250005
                </p>
              </div>
            </div>
          </motion.div>

          {/* Col 3 — Quick Links */}
          <motion.div variants={rise} className="space-y-5">
            <h4
              className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-red-500/80"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
              {quickLinks.map((link, i) => (
                <motion.a
                  key={i}
                  href={link.href}
                  className="text-[0.82rem] text-gray-500 hover:text-white transition-colors"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                  whileHover={{ x: 3 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Col 4 — Map */}
          <motion.div variants={rise} className="space-y-5">
            <h4
              className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-red-500/80"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Location
            </h4>
            <div className="overflow-hidden rounded-xl border border-white/[0.06] ring-1 ring-white/[0.03]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3490.4832773303665!2d77.63842827582299!3d28.97304697548051!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390c668fdea4d87f%3A0x8795def814a486e7!2sMeerut%20Institute%20of%20Engineering%20and%20Technology!5e0!3m2!1sen!2sin!4v1763614696904!5m2!1sen!2sin"
                width="100%"
                height="180"
                style={{ border: 0, filter: 'grayscale(0.85) contrast(1.1) brightness(0.55)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
                title="MIET Location"
              />
            </div>
          </motion.div>
        </div>

        {/* ─── Divider ─── */}
        <div className="mt-14 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

        {/* ─── GDG branding row ─── */}
        <motion.div
          variants={rise}
          className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between"
        >
          <div className="flex items-center gap-3">
            {/* Google G icon */}
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.06]">
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            </div>
            <div>
              <p
                className="text-[0.78rem] text-gray-300"
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}
              >
                Google Developer Groups
              </p>
              <p
                className="text-[0.65rem] text-gray-600"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                GDG On Campus, Meerut Institute of Engineering and Technology
              </p>
            </div>
          </div>
        </motion.div>

        {/* ─── Devfolio row ─── */}
        <div className="mt-8 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

        <motion.div
          variants={rise}
          className="mt-6 flex flex-col items-center gap-3"
        >
          <p
            className="text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-gray-600"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Applications Powered By
          </p>
          <a
            href="https://devfolio.co"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-60 transition hover:opacity-100"
          >
            <img
              src="/devfolio-logo-light.svg"
              alt="Devfolio logo"
              width={115}
              height={26}
              className="h-6 object-contain"
            />
          </a>
        </motion.div>

        {/* ─── Copyright ─── */}
        <div className="mt-8 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

        <motion.p
          variants={rise}
          className="mt-6 text-center text-[0.65rem] tracking-wider text-gray-700"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Copyright © {new Date().getFullYear()} All Rights Reserved GDG OC MIET.
        </motion.p>
      </motion.div>
    </footer>
  )
}
