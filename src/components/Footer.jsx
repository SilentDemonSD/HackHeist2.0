import { motion } from 'framer-motion'
import instagramIcon from '../assets/links/instagram.png'

const socialLinks = [
  { 
    name: 'Website', 
    icon: '🔗', 
    type: 'emoji',
    href: 'https://gdg.community.dev/gdg-on-campus-meerut-institute-of-engineering-and-technology-meerut-india/' 
  },
  { 
    name: 'Instagram', 
    icon: instagramIcon, 
    type: 'image',
    href: 'https://www.instagram.com/gdg_miet/' 
  },
  { 
    name: 'LinkedIn', 
    icon: 'linkedin', 
    type: 'svg',
    href: 'https://www.linkedin.com/company/google-developer-groups-on-campus-meerut-institute-of-engineering-and-technology/' 
  },
  { 
    name: 'Commudle', 
    icon: 'commudle', 
    type: 'svg',
    href: 'https://www.commudle.com/communities/gdsc-miet' 
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

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

function SocialIcon({ icon, href, name, type = 'emoji' }) {
  const renderIcon = () => {
    if (type === 'image') {
      return <img src={icon} alt={name} width={20} height={20} className="h-5 w-5 object-contain" />
    }
    
    if (type === 'svg') {
      if (icon === 'linkedin') {
        return (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        )
      }
      if (icon === 'commudle') {
        return (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
          </svg>
        )
      }
    }
    
    return <span className="text-lg">{icon}</span>
  }

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-sm transition-all hover:border-heist-red/60 hover:bg-heist-red/10"
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      aria-label={name}
    >
      <span className="text-white" aria-hidden="true">
        {renderIcon()}
      </span>
    </motion.a>
  )
}

export default function Footer() {
  return (
    <footer className="relative mt-20 border-t border-white/10 bg-gradient-to-b from-black via-[#0a0a0a] to-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(179,0,0,0.05),transparent_70%)]" />
      
      <motion.div
        className="container relative z-10 py-12 md:py-16"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Hack Heist Branding */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-white">HACK</span>
              <span className="rounded bg-heist-red px-3 py-1 text-2xl font-bold text-white">
                HEIST
              </span>
            </div>
            <p className="text-sm font-medium text-gray-300">A 36-HOURS HACKATHON</p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <SocialIcon key={index} icon={social.icon} href={social.href} name={social.name} type={social.type} />
              ))}
            </div>
          </motion.div>

          {/* Get In Touch */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Get In Touch</h4>
            <div className="space-y-3 text-sm text-gray-300">
              <motion.a
                href="mailto:gdgoncampus@miet.ac.in"
                className="block transition-colors hover:text-heist-red"
                whileHover={{ x: 4 }}
              >
                <span className="font-medium">Email:</span>{' '}
                <span className="text-gray-400">gdgoncampus@miet.ac.in</span>
              </motion.a>
              <div className="space-y-1">
                <span className="font-medium">Address:</span>
                <p className="text-gray-400 leading-relaxed">
                  N.H. 58, Delhi-Roorkee Highway,<br />
                  Baghpat Bypass Road Crossing,<br />
                  Meerut, Uttar Pradesh 250005
                </p>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {quickLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  className="text-gray-400 transition-colors hover:text-heist-red"
                  whileHover={{ x: 4 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Google Map */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Location</h4>
            <div className="overflow-hidden rounded-lg border border-white/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3490.4832773303665!2d77.63842827582299!3d28.97304697548051!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390c668fdea4d87f%3A0x8795def814a486e7!2sMeerut%20Institute%20of%20Engineering%20and%20Technology!5e0!3m2!1sen!2sin!4v1763614696904!5m2!1sen!2sin"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[200px] w-full"
                title="MIET Location"
              />
            </div>
          </motion.div>
        </div>

        {/* GDG Branding */}
        <motion.div
          variants={itemVariants}
          className="mt-12 flex flex-col items-center gap-4 border-t border-white/10 pt-8 md:flex-row md:justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 p-2">
              <svg viewBox="0 0 24 24" fill="white" className="h-full w-full">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-white">Google Developer Groups</p>
              <p className="text-xs text-gray-400">GDG On Campus, Meerut Institute of Engineering and Technology</p>
            </div>
          </div>
        </motion.div>
              {/* Devfolio Branding */}
<motion.div
  variants={itemVariants}
  className="mt-8 flex flex-col items-center gap-4 border-t border-white/10 pt-6"
>
  <p className="text-xs uppercase tracking-wider text-gray-400">
    Applications Powered By
  </p>

  <a
    href="https://devfolio.co"
    target="_blank"
    rel="noopener noreferrer"
    className="opacity-80 transition hover:opacity-100"
  >
    <img
      src="/devfolio-logo-light.svg"
      alt="Devfolio logo"
      width={120}
      height={28}
      className="h-7 object-contain"
    />
  </a>
</motion.div>
        {/* Copyright */}
        <motion.div
          variants={itemVariants}
          className="mt-8 border-t border-white/10 pt-6 text-center text-xs text-gray-500"
        >
          <p>Copyright © {new Date().getFullYear()} All Rights Reserved GDG OC MIET.</p>
        </motion.div>
      </motion.div>
    </footer>
  )
}
