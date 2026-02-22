import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Timeline from '../components/Timeline'
import FAQ from '../components/FAQ'
import Footer from '../components/Footer'
import Mask from '../components/Mask'
import Countdown from '../components/Countdown'
import AboutHeist from '../components/AboutHeist'
import TeamSection from '../components/TeamSection'
import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'



const gallerySources = [
  new URL('../assets/gallery/WhatsApp Image 2025-11-20 at 9.40.47 PM.jpeg', import.meta.url).href,
  new URL('../assets/gallery/WhatsApp Image 2025-11-20 at 9.40.47 PM (1).jpeg', import.meta.url).href,
  new URL('../assets/gallery/WhatsApp Image 2025-11-20 at 9.40.48 PM.jpeg', import.meta.url).href,
  new URL('../assets/gallery/WhatsApp Image 2025-11-20 at 9.40.48 PM (1).jpeg', import.meta.url).href,
  new URL('../assets/gallery/WhatsApp Image 2025-11-20 at 9.40.48 PM (2).jpeg', import.meta.url).href,
  new URL('../assets/gallery/WhatsApp Image 2025-11-20 at 9.40.49 PM.jpeg', import.meta.url).href,
  new URL('../assets/gallery/WhatsApp Image 2025-11-20 at 9.40.49 PM (1).jpeg', import.meta.url).href,
  new URL('../assets/gallery/WhatsApp Image 2025-11-20 at 9.41.14 PM.jpeg', import.meta.url).href,
  new URL('../assets/gallery/WhatsApp Image 2025-11-20 at 9.41.15 PM.jpeg', import.meta.url).href,
  new URL('../assets/gallery/WhatsApp Image 2025-11-20 at 9.41.15 PM (2).jpeg', import.meta.url).href,
]

const pastGallery = [
  {

    caption: 'Registration desk crew keeping the queue efficient.',
    src: gallerySources[0],
  },
  {

    caption: 'Product mentors giving teams live feedback.',
    src: gallerySources[1],
  },
  {

    caption: 'Opening talk that set the pulse for 36 hours.',
    src: gallerySources[2],
  },
  {

    caption: 'Hardware + swag handoff to the winning squad.',
    src: gallerySources[3],
  },
  {

    caption: 'Teams heading into the arena with MIET kits.',
    src: gallerySources[4],
  },
  {

    caption: 'Builders showing their dashboards on-device.',
    src: gallerySources[5],
  },
  {

    caption: 'Organizing team synced before the rush.',
    src: gallerySources[6],
  },
  {

    caption: 'Community partners and crew outside the arena.',
    src: gallerySources[9],
  },
  {

    caption: 'Judges awarding the precision trophy.',
    src: gallerySources[7],
  },
  {

    caption: 'Tradition + tech to open the build floor.',
    src: gallerySources[8],
  },
]

const gallerySpan = ['md:col-span-2 md:row-span-2', 'md:row-span-1', 'md:row-span-2', 'md:row-span-1', 'md:row-span-2', '', 'md:row-span-2', 'md:row-span-2', 'md:col-span-2', 'md:row-span-1']

function SectionShell({ id, title, subtitle, children, centeredHeading = false }) {
  const headingClasses = centeredHeading
    ? 'text-3xl font-bold text-center uppercase tracking-[0.18em]'
    : 'text-3xl font-bold'
  const subtitleClasses = centeredHeading
    ? 'text-gray-300 mt-2 text-center max-w-2xl mx-auto'
    : 'text-gray-300 mt-2'
  const headingStyle = centeredHeading ? { fontSize: 'clamp(2rem, 4vw, 3.4rem)' } : undefined
  



  return (
    <section id={id} className="container my-16">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className={headingClasses}
        style={headingStyle}
      >{title}</motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className={subtitleClasses}
        >{subtitle}</motion.p>
      )}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.05 }}
        className="mt-6"
      >{children}</motion.div>
    </section>
  )
}

export default function Landing() {
  return (
    <div className="bg-black text-white relative">
      <Navbar />
      <Mask />
      <main>
        <Hero />

        {/* Countdown Section - Moved below Hero */}
        <section className="container my-16">
          <Countdown target={new Date('2025-03-29T09:00:00+05:30').getTime()} />
        </section>

        <AboutHeist />
        <section id="timeline">
          <Timeline />
        </section>

        {/* The Loot Section */}
        <motion.section
          id="prizes"
          className="relative py-20 md:py-32 overflow-hidden"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {/* Dark Red to Black Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a0000] via-[#0d0000] to-black" />

          {/* Faint Grid Overlay */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(179, 0, 0, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(179, 0, 0, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          />

          {/* Vignette Effect */}
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.6) 100%)',
            }}
          />

          {/* Vertical Laser Scan */}
          <motion.div
            className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-transparent via-heist-red to-transparent opacity-60 blur-sm z-10"
            animate={{
              x: ['0%', '100%'],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: 'linear',
              repeatDelay: 0,
            }}
            style={{
              boxShadow: '0 0 20px rgba(179, 0, 0, 0.8), 0 0 40px rgba(179, 0, 0, 0.6)',
            }}
          />

          <div className="container relative z-20">
            {/* Section Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <motion.h2
                className="text-4xl md:text-6xl font-bold mb-4"
                style={{
                  fontFamily: 'Oxanium, sans-serif',
                  textShadow: '0 0 30px rgba(179, 0, 0, 0.5), 0 4px 20px rgba(0, 0, 0, 0.8)',
                  background: 'linear-gradient(135deg, #ffffff 0%, #ffcccc 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                THE LOOT
              </motion.h2>
              <motion.p
                className="text-gray-400 text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Secure Vault Interface
              </motion.p>
            </motion.div>

            {/* Revealing Soon Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center mb-12"
            >
              <motion.div
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full border-2 border-[#D4AF37]/50 bg-gradient-to-r from-[#D4AF37]/10 via-[#D4AF37]/5 to-[#D4AF37]/10 backdrop-blur-md"
                animate={{
                  boxShadow: [
                    '0 0 30px rgba(212, 175, 55, 0.3)',
                    '0 0 50px rgba(212, 175, 55, 0.5)',
                    '0 0 30px rgba(212, 175, 55, 0.3)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <motion.span
                  className="text-[#D4AF37] text-base md:text-lg font-bold uppercase tracking-widest"
                  style={{ fontFamily: 'Oxanium, sans-serif' }}
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  To Be Revealed Soon
                </motion.span>
                <motion.div
                  className="flex gap-1.5"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Hover Hint */}
            <motion.p
              className="mb-6 text-center text-sm md:text-base text-gray-300 uppercase tracking-[0.25em]"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ fontFamily: 'Oxanium, sans-serif' }}
            >
              Hover on the vaults to see the prizes
            </motion.p>

            {/* Premium Prize Cards */}
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-end">
              {[1, 2, 3].map((tier, i) => {
                const isTier1 = tier === 1
                return (
                  <motion.div
                    key={tier}
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.8,
                      delay: i * 0.2,
                      ease: 'easeOut'
                    }}
                    whileHover={{
                      scale: isTier1 ? 1.08 : 1.05,
                      y: -10,
                      transition: { duration: 0.4 },
                    }}
                    className={`group relative flex flex-col items-center ${isTier1 ? 'md:translate-y-0' : tier === 2 ? 'md:translate-y-4' : 'md:translate-y-8'}`}
                  >
                    {/* Premium Glass Card */}
                    <div
                      className="relative h-80 md:h-80 rounded-2xl overflow-hidden backdrop-blur-xl border-2 w-full"
                      style={{
                        background: 'linear-gradient(135deg, rgba(179, 0, 0, 0.15) 0%, rgba(179, 0, 0, 0.05) 50%, rgba(0, 0, 0, 0.3) 100%)',
                        borderColor: isTier1 ? '#D4AF37' : 'rgba(212, 175, 55, 0.6)',
                        boxShadow: isTier1
                          ? '0 0 40px rgba(212, 175, 55, 0.4), 0 0 80px rgba(179, 0, 0, 0.3), inset 0 0 60px rgba(179, 0, 0, 0.1)'
                          : '0 0 30px rgba(212, 175, 55, 0.2), 0 0 60px rgba(179, 0, 0, 0.2), inset 0 0 40px rgba(179, 0, 0, 0.05)',
                      }}
                    >
                      {/* Inner Glow */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-heist-red/20 via-transparent to-transparent"
                        animate={{
                          opacity: isTier1 ? [0.3, 0.5, 0.3] : [0.2, 0.35, 0.2],
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
                      />

                      {/* Shine Swipe on Hover */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100"
                        initial={{ x: '-200%' }}
                        whileHover={{ x: '200%' }}
                        transition={{ duration: 0.6, ease: 'easeInOut' }}
                      />

                      {/* Gold Border Glow */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl"
                        style={{
                          border: `2px solid ${isTier1 ? '#D4AF37' : 'rgba(212, 175, 55, 0.6)'}`,
                        }}
                        animate={{
                          boxShadow: [
                            `0 0 20px ${isTier1 ? 'rgba(212, 175, 55, 0.4)' : 'rgba(212, 175, 55, 0.2)'}`,
                            `0 0 40px ${isTier1 ? 'rgba(212, 175, 55, 0.6)' : 'rgba(212, 175, 55, 0.4)'}`,
                            `0 0 20px ${isTier1 ? 'rgba(212, 175, 55, 0.4)' : 'rgba(212, 175, 55, 0.2)'}`,
                          ],
                        }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
                      />

                      {/* Content (revealed when vault door opens) */}
                      <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100">
                        {/* Tier Badge */}
                        <motion.div
                          className="mb-6"
                          animate={{
                            scale: isTier1 ? [1, 1.05, 1] : 1,
                          }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        >
                          <motion.div
                            className="inline-flex items-center justify-center w-20 h-20 rounded-full border-2 border-[#D4AF37]/60 bg-gradient-to-br from-[#D4AF37]/20 to-transparent"
                            style={{
                              boxShadow: '0 0 30px rgba(212, 175, 55, 0.4), inset 0 0 20px rgba(212, 175, 55, 0.1)',
                            }}
                          >
                            <motion.span
                              className="text-[#D4AF37] font-bold text-2xl"
                              style={{
                                fontFamily: 'Oxanium, sans-serif',
                                textShadow: '0 0 20px rgba(212, 175, 55, 0.8), 0 2px 10px rgba(0, 0, 0, 0.8)',
                              }}
                            >
                              {tier}
                            </motion.span>
                          </motion.div>
                        </motion.div>

                        {/* Central Diamond in Vault */}
                        <motion.div
                          className="mb-6 flex items-center justify-center"
                          animate={{
                            scale: [1, 1.04, 1],
                            opacity: [0.95, 1, 0.95],
                          }}
                          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 }}
                        >
                          <div className="relative flex items-center justify-center">
                            {/* Vault ring */}
                            <div
                              className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-[#D4AF37]/40"
                              style={{
                                boxShadow: '0 0 35px rgba(0,0,0,0.9), 0 0 40px rgba(179,0,0,0.5)',
                                background:
                                  'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.3) 0%, rgba(179,0,0,0.15) 35%, rgba(0,0,0,0.9) 100%)',
                              }}
                            />

                            {/* Inner ring */}
                            <div
                              className="absolute w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#D4AF37]/60"
                              style={{
                                boxShadow: '0 0 18px rgba(212,175,55,0.6)',
                              }}
                            />

                            {/* Diamond core */}
                            <motion.div
                              className="absolute w-7 h-7 md:w-9 md:h-9 rotate-45 border border-[#ffdde1]/80 shadow-[0_0_25px_rgba(255,77,79,0.9)]"
                              style={{
                                background:
                                  'linear-gradient(135deg, #ffffff 0%, #ff8a8a 35%, #ff4d4f 60%, #b30000 100%)',
                                boxShadow:
                                  '0 0 25px rgba(255,77,79,0.9), 0 0 45px rgba(179,0,0,0.9)',
                              }}
                              animate={{
                                scale: [1, 1.12, 1],
                              }}
                              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: i * 0.12 }}
                            />

                            {/* Specular highlight sweep */}
                            <motion.div
                              className="absolute w-16 md:w-20 h-[2px] bg-gradient-to-r from-transparent via-white/70 to-transparent"
                              animate={{ rotate: [0, 45, 0] }}
                              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
                            />

                          </div>
                        </motion.div>

                        {/* Tier Label */}
                        <motion.h3
                          className="text-3xl md:text-4xl font-bold mb-4 text-center"
                          style={{
                            fontFamily: 'Oxanium, sans-serif',
                            background: 'linear-gradient(135deg, #ffffff 0%, #ffcccc 50%, #ffffff 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            textShadow: '0 0 30px rgba(179, 0, 0, 0.5)',
                            filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.8))',
                          }}
                          animate={{
                            textShadow: [
                              '0 0 30px rgba(179, 0, 0, 0.5)',
                              '0 0 50px rgba(179, 0, 0, 0.8)',
                              '0 0 30px rgba(179, 0, 0, 0.5)',
                            ],
                          }}
                          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }}
                        >
                          TIER {tier}
                        </motion.h3>

                        {/* Placeholder Text */}
                        <motion.p
                          className="text-gray-400 text-sm md:text-base text-center uppercase tracking-wider"
                          style={{ fontFamily: 'Oxanium, sans-serif' }}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                        >
                          {isTier1 ? 'PREMIUM REWARDS' : 'EXCLUSIVE PRIZES'}
                        </motion.p>

                        {/* Decorative Elements */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                          {[1, 2, 3].map((dot) => (
                            <motion.div
                              key={dot}
                              className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/60"
                              animate={{
                                opacity: [0.3, 0.8, 0.3],
                                scale: [1, 1.2, 1],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                delay: dot * 0.2 + i * 0.1,
                              }}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Additional Glow for Tier 1 */}
                      {isTier1 && (
                        <motion.div
                          className="absolute inset-0 rounded-2xl bg-[#D4AF37]/10 blur-2xl"
                          animate={{
                            opacity: [0.3, 0.5, 0.3],
                            scale: [1, 1.1, 1],
                          }}
                          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        />
                      )}

                      {/* Vault Door overlay - covers whole card, opens on hover */}
                      <div
                        className="absolute inset-0 rounded-2xl border border-[#661616]/80 bg-gradient-to-b from-[#5e0505] via-[#2a0303] to-black/95 shadow-[0_18px_45px_rgba(120,0,0,0.9)]
                                   flex items-center justify-center overflow-hidden
                                   transition-transform transition-opacity duration-500 ease-out
                                   origin-bottom transform group-hover:-translate-y-full group-hover:opacity-0"
                      >
                        {/* Door details */}
                        <div className="relative w-full h-full flex items-center justify-center">
                          {/* Concentric rings on door */}
                          <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border border-[#861c1c] bg-gradient-to-br from-[#7b1010] via-[#380404] to-black shadow-[0_0_40px_rgba(120,0,0,0.9)]" />
                          <div className="absolute w-16 h-16 md:w-18 md:h-18 rounded-full border border-[#ffb3b3]/60" />

                          {/* Center knob/lock */}
                          <div className="absolute w-6 h-6 md:w-7 md:h-7 rounded-full border border-[#ffcccc]/80 bg-gradient-to-br from-[#ffe6e6] via-[#bf4a4a] to-[#3b0505] shadow-[0_0_18px_rgba(255,77,79,0.6)]" />

                          {/* Subtle handle lines */}
                          <div className="absolute w-14 h-[1px] bg-gradient-to-r from-transparent via-[#ffcccc] to-transparent opacity-60" />
                          <div className="absolute h-14 w-[1px] bg-gradient-to-b from-transparent via-[#ffb3b3] to-transparent opacity-40" />
                        </div>
                      </div>
                    </div>

                    {/* Stair / Pedestal under each tier */}
                    <div className="mt-4 w-10/12">
                      <div
                        className={`mx-auto rounded-t-2xl bg-gradient-to-t from-black/80 via-heist-red/40 to-heist-red/10 border border-heist-red/40 ${isTier1 ? 'h-10' : tier === 2 ? 'h-7' : 'h-5'
                          }`}
                        style={{
                          boxShadow: isTier1
                            ? '0 -10px 30px rgba(179,0,0,0.6)'
                            : '0 -8px 20px rgba(179,0,0,0.4)',
                        }}
                      />
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.section>

        <SectionShell id="partners" title="Partners" subtitle="Our trusted allies in this heist." centeredHeading>
          <div className="relative">
            {/* Revealing Soon Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <motion.div
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-heist-red/30 bg-gradient-to-r from-heist-red/10 via-heist-red/5 to-heist-red/10 backdrop-blur-sm"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(179, 0, 0, 0.2)',
                    '0 0 30px rgba(179, 0, 0, 0.4)',
                    '0 0 20px rgba(179, 0, 0, 0.2)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <motion.span
                  className="text-heist-red text-sm md:text-base font-semibold uppercase tracking-wider"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  Revealing Very Soon
                </motion.span>
                <motion.div
                  className="flex gap-1"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-heist-red" />
                  <span className="w-1.5 h-1.5 rounded-full bg-heist-red" />
                  <span className="w-1.5 h-1.5 rounded-full bg-heist-red" />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Animated Placeholder Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.1,
                    ease: 'easeOut'
                  }}
                  whileHover={{
                    scale: 1.05,
                    y: -5,
                    transition: { duration: 0.3 }
                  }}
                  className="group relative h-32 rounded-2xl overflow-hidden"
                >
                  {/* Animated Background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/3 to-transparent border border-white/10 rounded-2xl"
                    animate={{
                      background: [
                        'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.03) 50%, transparent 100%)',
                        'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.05) 50%, transparent 100%)',
                        'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.03) 50%, transparent 100%)',
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
                  />

                  {/* Glowing Border Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl border border-heist-red/20"
                    animate={{
                      borderColor: [
                        'rgba(179, 0, 0, 0.2)',
                        'rgba(179, 0, 0, 0.4)',
                        'rgba(179, 0, 0, 0.2)',
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }}
                  />

                  {/* Pulsing Glow */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-heist-red/5 blur-xl"
                    animate={{
                      opacity: [0.2, 0.4, 0.2],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 }}
                  />

                  {/* Shimmer Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                    animate={{
                      x: ['-100%', '200%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'linear',
                      delay: i * 0.3,
                    }}
                  />

                  {/* Center Icon/Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center"
                      animate={{
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 0.2,
                      }}
                    >
                      <motion.div
                        className="w-6 h-6 rounded bg-heist-red/30"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: i * 0.15,
                        }}
                      />
                    </motion.div>
                  </div>

                  {/* Hover Glow */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-heist-red/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </SectionShell>

        <SectionShell id="tracks" title="Our Tracks" subtitle="Choose your path in this heist." centeredHeading>
          <div className="relative">
            {/* Animated Track Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[
                'AI/ML',
                'Web3 & Blockchain',
                'IoT',
                'AR/VR',
                'App Development',
                'Open Innovation'
              ].map((track, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.1,
                    ease: 'easeOut'
                  }}
                  whileHover={{
                    scale: 1.05,
                    y: -5,
                    transition: { duration: 0.3 }
                  }}
                  className="group relative h-32 rounded-2xl overflow-hidden cursor-pointer"
                >
                  {/* Animated Background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-heist-red/20 via-heist-red/10 to-transparent border border-heist-red/30 rounded-2xl"
                    animate={{
                      background: [
                        'linear-gradient(135deg, rgba(179,0,0,0.2) 0%, rgba(179,0,0,0.1) 50%, transparent 100%)',
                        'linear-gradient(135deg, rgba(179,0,0,0.3) 0%, rgba(179,0,0,0.15) 50%, transparent 100%)',
                        'linear-gradient(135deg, rgba(179,0,0,0.2) 0%, rgba(179,0,0,0.1) 50%, transparent 100%)',
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
                  />

                  {/* Glowing Border Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl border border-heist-red/40"
                    animate={{
                      borderColor: [
                        'rgba(179, 0, 0, 0.4)',
                        'rgba(179, 0, 0, 0.6)',
                        'rgba(179, 0, 0, 0.4)',
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }}
                  />

                  {/* Pulsing Glow */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-heist-red/10 blur-xl"
                    animate={{
                      opacity: [0.3, 0.5, 0.3],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 }}
                  />

                  {/* Shimmer Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                    animate={{
                      x: ['-100%', '200%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'linear',
                      delay: i * 0.3,
                    }}
                  />

                  {/* Track Name */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <motion.h3
                      className="text-white font-bold text-lg md:text-xl text-center px-4"
                      style={{ fontFamily: 'Oxanium, sans-serif' }}
                      animate={{
                        textShadow: [
                          '0 0 10px rgba(179, 0, 0, 0.5)',
                          '0 0 20px rgba(179, 0, 0, 0.8)',
                          '0 0 10px rgba(179, 0, 0, 0.5)',
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 }}
                    >
                      {track}
                    </motion.h3>
                  </div>

                  {/* Hover Glow */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-heist-red/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </SectionShell>

        <SectionShell id="past" title="Our Past Heists" subtitle="Gallery playback from previous ops." centeredHeading>
          <div className="relative max-w-6xl mx-auto">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-heist-red/10 via-transparent to-heist-red/10 blur-3xl pointer-events-none" />
            <div className="relative grid gap-4 md:grid-cols-3 auto-rows-[200px]">
              {pastGallery.map((item, idx) => (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-[0_25px_50px_rgba(0,0,0,0.35)] ${gallerySpan[idx] ?? ''}`}
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105 group-hover:rotate-1"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent transition-opacity duration-500 group-hover:opacity-70" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <motion.h3
                      className="text-lg font-semibold tracking-wide"
                      style={{ fontFamily: 'Oxanium, sans-serif' }}
                      whileHover={{ x: 4 }}
                    >
                      {item.title}
                    </motion.h3>
                  </div>
                  <motion.div
                    className="absolute inset-0 border-2 border-transparent rounded-3xl pointer-events-none"
                    whileHover={{ borderColor: 'rgba(255,77,79,0.55)' }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.article>
              ))}
            </div>
          </div>
        </SectionShell>

        <SectionShell id="team" title="Meet Our Organizers" centeredHeading>
          <TeamSection />
        </SectionShell>



              
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}


