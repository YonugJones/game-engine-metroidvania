import { useEffect, useRef } from 'react'
import { GameLoop } from './engine/GameLoop'
import { InputManager } from './engine/InputManager'

export const App = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const input = new InputManager()
    let x = 400
    let y = 200

    const loop = new GameLoop(
      // onUpdate
      (dt) => {
        if (input.isDown('KeyD')) x += 200 * dt
        if (input.isDown('KeyA')) x -= 200 * dt
        if (input.isDown('KeyS')) y += 200 * dt
        if (input.isDown('KeyW')) y -= 200 * dt
        input.flush()
      },

      // onRender
      () => {
        ctx.fillStyle = '#1a1a2e'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = '#e94560'
        ctx.fillRect(x, y, 60, 60)
      },
    )

    loop.start()

    // Cleanup function
    return () => {
      loop.stop()
      input.destroy()
    }
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
