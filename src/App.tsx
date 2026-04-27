import { useEffect, useRef } from 'react'
import { GameLoop } from './engine/GameLoop'
import { InputManager } from './engine/InputManager'
import { Scene } from './game/Scene'

export const App = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const input = new InputManager()
    const scene = new Scene(canvas.width, canvas.height)

    const loop = new GameLoop(
      // onUpdate
      (dt) => {
        scene.update(dt, input)
        input.flush()
      },
      // onRender
      () => {
        scene.draw(ctx)
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
