// The heartbeat

export class GameLoop {
  private rafId: number = 0
  private lastTime: number = 0
  private onUpdate: (dt: number) => void
  private onRender: () => void

  constructor(onUpdate: (dt: number) => void, onRender: () => void) {
    this.onUpdate = onUpdate
    this.onRender = onRender
  }

  private tick = (timestamp: number) => {
    const dt = Math.min((timestamp - this.lastTime) / 1000, 0.05)
    this.lastTime = timestamp

    this.onUpdate(dt)
    this.onRender()

    this.rafId = requestAnimationFrame(this.tick)
  }

  start() {
    this.lastTime = performance.now()
    this.rafId = requestAnimationFrame(this.tick)
  }

  stop() {
    cancelAnimationFrame(this.rafId)
  }
}
