import { useEffect, useRef } from 'react'
import { GameLoop } from './engine/GameLoop'

export const App = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let x = 100

    const loop = new GameLoop(
      // onUpdate
      (dt) => {
        // Move the square rightward over time
        x += 100 * dt
        if (x > canvas.width) x = -60
      },
      // onRender
      () => {
        // background
        ctx.fillStyle = '#1a1a2e'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        // square
        ctx.fillStyle = '#e94560'
        ctx.fillRect(x, 100, 60, 60)
      },
    )

    loop.start()
    return () => loop.stop()
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
