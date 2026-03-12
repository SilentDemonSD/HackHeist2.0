import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

export default function useLenis(options = {}) {
  const lenisRef = useRef(null)
  const rafRef   = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration:      1.1,
      easing:        (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel:   true,
      smoothTouch:   false,
      syncTouch:     false,
      orientation:   'vertical',
      gestureOrientation: 'vertical',
      ...options,
    })

    lenisRef.current = lenis

    function raf(time) {
      lenis.raf(time)
      rafRef.current = requestAnimationFrame(raf)
    }
    rafRef.current = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafRef.current)
      lenis.destroy()
      lenisRef.current = null
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return lenisRef
}
