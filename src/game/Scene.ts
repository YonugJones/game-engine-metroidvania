import { InputManager } from '../engine/InputManager'
import { Platform } from './Platform'
import { Player } from './Player'

export class Scene {
  private player: Player
  private platforms: Platform[]

  constructor() {
    this.player = new Player(100, 100)

    this.platforms = [
      new Platform(0, 410, 800, 40),
      new Platform(150, 300, 200, 20),
      new Platform(450, 220, 200, 20),
    ]
  }

  update(dt: number, input: InputManager) {
    this.player.update(dt, input, this.platforms)
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#1a1a2e' // background
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height) // background
    this.platforms.forEach((p) => p.draw(ctx))
    this.player.draw(ctx)
  }
}
