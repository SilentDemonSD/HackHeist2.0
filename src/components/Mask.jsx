import { useRef, useEffect, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment } from '@react-three/drei'
import * as THREE from 'three'
import { usePerformance, useMousePosition } from '../hooks/usePerformance'

function MaskModel({ mousePosition, animationSpeed = 1, ...props }) {
  const meshRef = useRef()
  const { scene } = useGLTF('/models/mask.glb')
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (!scene) return;

    const box = new THREE.Box3().setFromObject(scene);
    const center = new THREE.Vector3();
    box.getCenter(center);
    scene.position.sub(center);

    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const desiredSize = 2.2;
    const scale = desiredSize / maxDim;
    scene.scale.setScalar(scale);

    scene.position.y += 0.2;

    setIsReady(true);
  }, [scene]);

  useFrame((state) => {
    if (!meshRef.current || !mousePosition || !isReady) return

    const bias = -0.3
    const targetY = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      bias + (mousePosition.x - 0.5) * 0.8,
      0.04 * animationSpeed
    )

    const targetX = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      (mousePosition.y - 0.5) * 0.4,
      0.04 * animationSpeed
    )

    meshRef.current.rotation.set(targetX, targetY, 0)
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.15
  })

  if (!isReady) return null

  return (
    <group ref={meshRef} {...props} dispose={null}>
      <primitive object={scene} />
    </group>
  )
}

function Lights() {
  return (
    <>
      <directionalLight
        position={[-6, 6, 5]}
        intensity={2.8}
        color="#ffffff"
        castShadow
      />
      <pointLight 
        position={[3, 4, 6]}
        intensity={1.6}
        color="#ff3e3e"
      />
      <pointLight
        position={[-3, -2, 4]}
        intensity={0.6}
        color="#ffffff"
      />
      <ambientLight intensity={0.45} />

    </>
  )
}

function SmokeBackground() {
  const materialRef = useRef()

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
    }
  })

  return (
    <mesh position={[0, 0, -6]}>
      <shaderMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        uniforms={{
          uTime: { value: 0 },
        }}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          uniform float uTime;

          // Smooth random noise
          float noise(vec2 p) {
            return sin(p.x) * sin(p.y);
          }

          void main() {
            vec2 pos = vUv * 3.0;
            float n = noise(pos + uTime * 0.15) + noise(pos * 0.6 - uTime * 0.1);
            n = smoothstep(-0.3, 1.0, n);
            vec3 color = mix(vec3(0.02, 0.0, 0.0), vec3(0.3, 0.0, 0.0), n);
            gl_FragColor = vec4(color, 0.25); // 25% opacity smoke
          }
        `}
      />
    </mesh>
  )
}


function Loader() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
    </div>
  )
}

export default function Mask() {
  const mousePosition = useMousePosition(16)
  const { settings } = usePerformance()
  const [canvasReady, setCanvasReady] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setCanvasReady(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="w-full h-full overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden">

        {canvasReady && (
          <Canvas
            shadows
            gl={{ 
              alpha: true, 
              antialias: settings.antialias ?? true,
              powerPreference: 'high-performance',
              preserveDrawingBuffer: false
            }}
            camera={{
              position: [0, 0, 11],
              fov: 45,
              near: 0.1,
              far: 100
            }}
            dpr={settings.pixelRatio ?? [1, 2]}
            style={{ background: 'transparent', width: '100%', height: '100%' }}
          >
            <Suspense fallback={null}>
              <Environment preset="city" />
              <Lights />

              <MaskModel
                mousePosition={mousePosition}
                animationSpeed={settings.animationSpeed ?? 1}
                scale={2.5}
                position={[3.3, 1.0, 0]}
              />
            </Suspense>
          </Canvas>
        )}
      </div>
    </div>
  )
}

useGLTF.preload('/models/mask.glb')
