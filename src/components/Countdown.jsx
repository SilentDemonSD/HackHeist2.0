import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import * as THREE from 'three'

function useCountdown(targetDate){
  const [now, setNow] = useState(Date.now())
  useEffect(()=>{
    const id = setInterval(()=> setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])
  const diff = Math.max(0, targetDate - now)
  const s = Math.floor(diff/1000)
  const days = Math.floor(s / 86400)
  const hours = Math.floor((s % 86400) / 3600)
  const minutes = Math.floor((s % 3600) / 60)
  const seconds = s % 60
  return { days, hours, minutes, seconds }
}

function Box({ value, label, index }){
  const formatted = useMemo(()=> String(value).padStart(2, '0'), [value])
  const [isHovered, setIsHovered] = useState(false)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 })

  const handleMouseMove = (e) => {
    if (!isHovered) return
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const deltaX = (e.clientX - centerX) / rect.width
    const deltaY = (e.clientY - centerY) / rect.height
    
    x.set(deltaX * 10)
    y.set(deltaY * 10)
    rotateX.set(deltaY * -15)
    rotateY.set(deltaX * 15)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: 'spring', 
        stiffness: 100, 
        damping: 15 
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ 
        perspective: 1000,
        rotateX,
        rotateY,
        x,
        y
      }}
      className="relative group cursor-pointer"
    >
      <motion.div
        whileHover={{ scale: 1.08 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-heist-red/90 via-heist-red/70 to-heist-red/50 backdrop-blur-xl border border-white/20 shadow-2xl"
      >
        {/* Animated gradient overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0"
          animate={{
            x: isHovered ? ['-100%', '100%'] : '0%',
          }}
          transition={{
            duration: 1.5,
            ease: 'easeInOut',
            repeat: isHovered ? Infinity : 0,
          }}
        />
        
        {/* Glow effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-t from-heist-red/40 via-transparent to-transparent blur-2xl" />
        </div>

        {/* Content */}
        <div className="relative px-6 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12 text-center">
          {/* Number with flip animation */}
          <motion.div 
            key={value}
            initial={{ rotateX: -90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            transition={{ duration: 0.4, type: 'spring' }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/80"
            style={{ 
              textShadow: '0 0 30px rgba(179, 0, 0, 0.5), 0 0 60px rgba(179, 0, 0, 0.3)',
              fontFamily: 'Bruno Ace SC, sans-serif'
            }}
          >
            {formatted}
          </motion.div>
          
          {/* Label */}
          <motion.div 
            className="mt-3 text-xs sm:text-sm md:text-base uppercase tracking-[0.3em] text-white/90 font-semibold"
            style={{ fontFamily: 'Oxanium, sans-serif' }}
          >
            {label}
          </motion.div>

          {/* Bottom accent line */}
          <motion.div 
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
          />
        </div>

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-white/30 rounded-tl-3xl" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-white/30 rounded-br-3xl" />
      </motion.div>

      {/* Floating reflection shadow */}
      <motion.div
        className="absolute inset-0 -z-10 rounded-3xl bg-heist-red/20 blur-2xl"
        animate={{
          scale: isHovered ? 1.15 : 1,
          opacity: isHovered ? 0.6 : 0.3,
        }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  )
}

function ParticlesTiny(){
  const ref = useRef(null)
  const raf = useRef(0)
  useEffect(()=>{
    const el = ref.current
    if(!el) return
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, el.clientWidth/el.clientHeight, 0.1, 100)
    camera.position.z = 5
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(el.clientWidth, el.clientHeight)
    el.appendChild(renderer.domElement)
    const g = new THREE.BufferGeometry()
    const n = 240
    const pos = new Float32Array(n*3)
    const vel = new Float32Array(n*3)
    for(let i=0;i<n;i++){
      pos[i*3] = (Math.random()-0.5)*8
      pos[i*3+1] = (Math.random()-0.5)*4
      pos[i*3+2] = (Math.random()-0.5)*4
      vel[i*3+1] = Math.random() * 0.01 + 0.005
    }
    g.setAttribute('position', new THREE.BufferAttribute(pos,3))
    const m = new THREE.PointsMaterial({ 
      color: 0xff6666, 
      size: 0.03, 
      transparent: true, 
      opacity: 0.4,
      blending: THREE.AdditiveBlending
    })
    const p = new THREE.Points(g, m)
    scene.add(p)
    
    const animate = ()=>{
      for(let i=0;i<n;i++){
        pos[i*3+1] += vel[i*3+1]
        if(pos[i*3+1] > 2) pos[i*3+1] = -2
      }
      g.attributes.position.needsUpdate = true
      p.rotation.y += 0.001
      renderer.render(scene,camera)
      raf.current = requestAnimationFrame(animate)
    }
    animate()
    return ()=>{ 
      cancelAnimationFrame(raf.current)
      m.dispose()
      g.dispose()
      renderer.dispose()
      if(el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
    }
  }, [])
  return <div ref={ref} className="absolute inset-0 -z-10" aria-hidden />
}

export default function Countdown(){
  // Set target date to March 28, 2026
  const targetDate = useMemo(() => new Date('2026-03-28T00:00:00').getTime(), [])
  const { days, hours, minutes, seconds } = useCountdown(targetDate)
  
  return (
    <motion.div 
      className="relative py-8 sm:py-12 md:py-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      <ParticlesTiny />
      
      {/* Background glow */}
      <div className="absolute inset-0 -z-20 bg-gradient-radial from-heist-red/10 via-transparent to-transparent blur-3xl" />
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto px-4">
        <Box value={days} label="Days" index={0} />
        <Box value={hours} label="Hours" index={1} />
        <Box value={minutes} label="Minutes" index={2} />
        <Box value={seconds} label="Seconds" index={3} />
      </div>
    </motion.div>
  )
}


