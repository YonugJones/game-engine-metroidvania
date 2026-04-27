import { InputManager } from '../engine/InputManager'
import { Camera } from '../engine/Camera'
import { Platform } from './Platform'
import { Player } from './Player'

export class Scene {
  private player: Player
  private platforms: Platform[]
  private camera: Camera

  constructor(canvasWidth: number, canvasHeight: number) {
    this.player = new Player(100, 300)
    this.camera = new Camera(canvasWidth, canvasHeight)

    this.platforms = [
      // ground
      new Platform(0, 410, 400, 20),
      new Platform(500, 410, 400, 20),

      // higher levels
      new Platform(150, 300, 200, 20),
      new Platform(490, 250, 200, 20),
      new Platform(800, 200, 200, 20),
    ]
  }

  update(dt: number, input: InputManager) {
    this.player.update(dt, input, this.platforms)
    this.camera.follow(
      this.player.x + this.player.width / 2,
      this.player.y + this.player.height / 2,
      dt,
    )
  }

  draw(ctx: CanvasRenderingContext2D) {
    // clear screen
    ctx.fillStyle = '#1a1a2e' // background
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height) // background

    // apply camera transform - everything drawn after this is in world space
    this.camera.apply(ctx)

    this.platforms.forEach((p) => p.draw(ctx))
    this.player.draw(ctx)

    // restore - anything drawn after this is back in screen space (HUD etc)
    this.camera.restore(ctx)
  }
}
