import { useEffect, useRef } from 'react'
import { GameLoop } from './engine/GameLoop'
import { InputManager } from './engine/InputManager'
import { Player } from './game/Player'

export const App = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const input = new InputManager()
    const player = new Player(400, 200)

    const loop = new GameLoop(
      // onUpdate
      (dt) => {
        player.update(dt, input, canvas.height)
        input.flush()
      },
      // onRender
      () => {
        ctx.fillStyle = '#1a1a2e' // background
        ctx.fillRect(0, 0, canvas.width, canvas.height) // background
        player.draw(ctx)
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
