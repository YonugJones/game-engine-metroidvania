import { useEffect, useRef } from 'react'

export const App = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Test rectangle
    ctx.fillStyle = '#1a1a2e'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = '#e94560'
    ctx.fillRect(100, 100, 60, 60)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={450}
      style={{ display: 'block', background: '#000' }}
    />
  )
}
