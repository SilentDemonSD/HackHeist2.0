import { useEffect, useRef, useState } from 'react'

export function useParallax({ maxOffset = 8, disabled = false } = {}) {
  const ref = useRef(null)
  const [style, setStyle] = useState({ transform: 'translate3d(0,0,0)' })

  useEffect(() => {
    if (disabled) return
    const node = ref.current
    if (!node) return

    const handlePointerMove = (event) => {
      const rect = node.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width
      const y = (event.clientY - rect.top) / rect.height

      const offsetX = (x - 0.5) * maxOffset * 2
      const offsetY = (y - 0.5) * maxOffset * 2

      setStyle({
        transform: `translate3d(${offsetX.toFixed(2)}px, ${offsetY.toFixed(2)}px, 0)`,
      })
    }

    const handlePointerLeave = () => {
      setStyle({ transform: 'translate3d(0,0,0)' })
    }

    node.addEventListener('pointermove', handlePointerMove)
    node.addEventListener('pointerleave', handlePointerLeave)

    return () => {
      node.removeEventListener('pointermove', handlePointerMove)
      node.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [maxOffset, disabled])

  return {
    ref,
    style: disabled ? { transform: 'translate3d(0,0,0)' } : style,
  }
}

export default useParallax

