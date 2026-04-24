import { InputManager } from '../engine/InputManager'

export class Player {
  x: number
  y: number
  width = 40
  height = 40
  speed = 200

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  update(dt: number, input: InputManager) {
    if (input.isDown('KeyD')) this.x += this.speed * dt
    if (input.isDown('KeyA')) this.x -= this.speed * dt
    if (input.isDown('KeyW')) this.y -= this.speed * dt
    if (input.isDown('KeyS')) this.y += this.speed * dt
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#e94560'
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}
