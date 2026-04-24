import { InputManager } from '../engine/InputManager'

const GRAVITY = 1800
const JUMP_FORCE = -600
const MOVE_SPEED = 200

export class Player {
  x: number
  y: number
  width = 40
  height = 40

  velocityX = 0
  velocityY = 0
  isOnGround = false

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  update(dt: number, input: InputManager, canvasHeight: number) {
    // Horizontal movement
    if (input.isDown('KeyD')) this.velocityX = MOVE_SPEED
    else if (input.isDown('KeyA')) this.velocityX = -MOVE_SPEED
    else this.velocityX = 0

    // Jumping - only when on ground
    if (input.wasPressed('Space') && this.isOnGround) {
      this.velocityY = JUMP_FORCE
      this.isOnGround = false
    }

    // Gravity - always pulling down
    this.velocityY += GRAVITY * dt

    // Apply velocity to position
    this.x += this.velocityX * dt
    this.y += this.velocityY * dt

    // Temporary ground - bottom of canvas
    const ground = canvasHeight - this.height
    if (this.y >= ground) {
      this.y = ground
      this.velocityY = 0
      this.isOnGround = true
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#e94560'
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}
