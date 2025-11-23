import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { usePerformance } from '../hooks/usePerformance'

export default function VideoCanvas() {
  const ref = useRef(null)
  const raf = useRef(0)
  const sceneRef = useRef(null)
  const rendererRef = useRef(null)
  const videoRef = useRef(null)
  const { settings } = usePerformance()

  useEffect(() => {
    const container = ref.current
    if (!container) return

    const scene = new THREE.Scene()
    sceneRef.current = scene
    
    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    )
    camera.position.z = 8

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: settings.antialias ?? false,
      powerPreference: 'high-performance',
      stencil: false,
      depth: true,
    })
    rendererRef.current = renderer
    renderer.setPixelRatio(settings.pixelRatio ?? window.devicePixelRatio)
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setClearColor(0x000000, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    container.appendChild(renderer.domElement)

    // === SMOKE VIDEO TEXTURE ===
    const video = document.createElement('video')
    videoRef.current = video
    video.src = '/videos/smoke-bg-slow.mp4'
    video.loop = true
    video.muted = true
    video.playbackRate = 0.6
    video.autoplay = true
    video.playsInline = true
    video.preload = 'auto'
    video.setAttribute('playsinline', '')
    video.setAttribute('webkit-playsinline', '')
    video.load()
    
    const playPromise = video.play()
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        console.warn('Autoplay blocked, attempting to play on user interaction')
        const handleInteraction = () => {
          video.play().catch(() => {})
          document.removeEventListener('click', handleInteraction)
        }
        document.addEventListener('click', handleInteraction, { once: true })
      })
    }

    const texture = new THREE.VideoTexture(video)
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter
    texture.format = THREE.RGBFormat

    // === SMOKE PLANE (FULL SCREEN) ===
    const aspect = container.clientWidth / container.clientHeight
    const planeGeometry = new THREE.PlaneGeometry(22 * aspect, 22)
    const planeMaterial = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: 0.90,
    })
    const plane = new THREE.Mesh(planeGeometry, planeMaterial)
    plane.position.z = -8
    scene.add(plane)

    // === DUAL RED EDGE GRADIENTS ===
    const gradientGeometry = new THREE.PlaneGeometry(40 * aspect, 25)
    const gradientMaterial = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {},
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        void main() {
          float leftFade = smoothstep(0.0, 0.4, 1.0 - vUv.x);
          float rightFade = smoothstep(0.0, 0.4, vUv.x);
          vec3 redTint = vec3(0.25, 0.0, 0.0);
          float alpha = max(leftFade, rightFade) * 0.68;
          gl_FragColor = vec4(redTint, alpha);
        }
      `,
    })
    const gradient = new THREE.Mesh(gradientGeometry, gradientMaterial)
    gradient.position.z = -7
    scene.add(gradient)

    // === Ambient Red Lighting ===
    const redLightLeft = new THREE.PointLight(0xff0000, 1.2, 25)
    redLightLeft.position.set(-10, 3, 6)
    scene.add(redLightLeft)

    const redLightRight = new THREE.PointLight(0xff0000, 1.2, 25)
    redLightRight.position.set(10, 3, 6)
    scene.add(redLightRight)

    // === Resize Handling ===
    const onResize = () => {
      const aspect = container.clientWidth / container.clientHeight
      renderer.setSize(container.clientWidth, container.clientHeight)
      camera.aspect = aspect
      camera.updateProjectionMatrix()
      plane.scale.set(aspect, 1, 1)
      gradient.scale.set(aspect, 1, 1)
    }
    window.addEventListener('resize', onResize)

    // === Animation Loop ===
    const clock = new THREE.Clock()
    const animate = () => {
      const t = clock.getElapsedTime()

      plane.position.x = Math.sin(t * 0.05) * 0.5

      renderer.render(scene, camera)
      raf.current = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(raf.current)
      window.removeEventListener('resize', onResize)
      
      if (videoRef.current) {
        videoRef.current.pause()
        videoRef.current.src = ''
        videoRef.current = null
      }
      
      if (texture) {
        texture.dispose()
      }
      
      planeMaterial.dispose()
      planeGeometry.dispose()
      gradientGeometry.dispose()
      gradientMaterial.dispose()
      
      if (rendererRef.current) {
        rendererRef.current.dispose()
        rendererRef.current.forceContextLoss()
        rendererRef.current = null
      }
      
      if (sceneRef.current) {
        sceneRef.current.clear()
        sceneRef.current = null
      }
      
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [settings])

  return <div ref={ref} className="absolute inset-0 -z-10" aria-hidden />
}
