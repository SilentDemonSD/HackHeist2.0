import { useState, useEffect, useCallback } from 'react'

// Hook to manage performance based on device capabilities
export function usePerformance() {
  const [performanceLevel, setPerformanceLevel] = useState('high')
  const [isLowPowerMode, setIsLowPowerMode] = useState(false)

  useEffect(() => {
    // Detect device performance capabilities
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')

    if (!gl) {
      setPerformanceLevel('low')
      return
    }

    // Check WebGL capabilities
    const renderer = gl.getParameter(gl.RENDERER)

    // Detect mobile devices
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

    // Check for low-power devices
    if (isMobile || renderer.includes('Intel') || navigator.hardwareConcurrency < 4) {
      setPerformanceLevel('medium')
      setIsLowPowerMode(true)
    }

    // Monitor performance
    let frameCount = 0
    let lastTime = performance.now()

    const checkPerformance = () => {
      frameCount++
      const currentTime = performance.now()

      if (currentTime - lastTime > 1000) { // Check every second
        const fps = frameCount * 1000 / (currentTime - lastTime)

        if (fps < 30) {
          setPerformanceLevel('low')
          setIsLowPowerMode(true)
        } else if (fps < 50) {
          setPerformanceLevel('medium')
        }

        frameCount = 0
        lastTime = currentTime
      }

      requestAnimationFrame(checkPerformance)
    }

    requestAnimationFrame(checkPerformance)
  }, [])

  const getOptimizedSettings = useCallback(() => {
    switch (performanceLevel) {
      case 'low':
        return {
          shadows: false,
          antialias: false,
          pixelRatio: 1,
          animationSpeed: 0.5,
          shadowMapSize: 256
        }
      case 'medium':
        return {
          shadows: true,
          antialias: false,
          pixelRatio: Math.min(window.devicePixelRatio, 1.5),
          animationSpeed: 0.75,
          shadowMapSize: 512
        }
      default:
        return {
          shadows: true,
          antialias: true,
          pixelRatio: Math.min(window.devicePixelRatio, 2),
          animationSpeed: 1,
          shadowMapSize: 1024
        }
    }
  }, [performanceLevel])

  return {
    performanceLevel,
    isLowPowerMode,
    settings: getOptimizedSettings()
  }
}

// Hook for smooth mouse tracking with throttling
export function useMousePosition(throttleMs = 16) {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 })

  useEffect(() => {
    let animationFrame

    const handleMouseMove = (event) => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }

      animationFrame = requestAnimationFrame(() => {
        setMousePosition({
          x: event.clientX / window.innerWidth,
          y: event.clientY / window.innerHeight,
        })
      })
    }

    // Throttle mouse events
    let lastTime = 0
    const throttledMouseMove = (event) => {
      const now = performance.now()
      if (now - lastTime >= throttleMs) {
        handleMouseMove(event)
        lastTime = now
      }
    }

    window.addEventListener('mousemove', throttledMouseMove, { passive: true })

    return () => {
      window.removeEventListener('mousemove', throttledMouseMove)
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [throttleMs])

  return mousePosition
}
