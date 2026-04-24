import { InputManager } from '../engine/InputManager'
import { Platform } from './Platform'

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

  update(dt: number, input: InputManager, platforms: Platform[]) {
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

    // Reset ground state - will be re-set if we land this frame
    this.isOnGround = false

    // Platform collision
    for (const platform of platforms) {
      if (this.isLandingOn(platform)) {
        this.y = platform.y - this.height
        this.velocityY = 0
        this.isOnGround = true
      }
    }
  }

  private isLandingOn(platform: Platform): boolean {
    // x is 0 at left, greater towards right
    const overlapX =
      this.x < platform.x + platform.width && // player's LEFT edge is before the platform's RIGHT edge
      this.x + this.width > platform.x // player's RIGHT edge is past the platform's LEFT edge

    // y is 0 at top, greater towards bottom
    const overlapY =
      this.y + this.height > platform.y && // player's BOTTOM edge is greater than the platforms top
      this.y + this.height < platform.y + platform.height + 20 // players' BOTTOM has not gone past the bottom of the platform

    const fallingDown = this.velocityY >= 0

    return overlapX && overlapY && fallingDown
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#e94560'
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}
