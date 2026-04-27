// All game logic

import { ECS } from './ECS'
import { InputManager } from './InputManager'
import { Platform } from '../game/Platform'
import type {
  TransformComponent,
  VelocityComponent,
  PlayerTagComponent,
  SpriteComponent,
} from './Components'

const GRAVITY = 1800
const JUMP_FORCE = -600

export function inputSystem(ecs: ECS, input: InputManager) {
  const entities = ecs.query('transform', 'velocity', 'player')

  for (const entity of entities) {
    const vel = ecs.getComponent<VelocityComponent>(entity, 'velocity')!
    const player = ecs.getComponent<PlayerTagComponent>(entity, 'player')!

    if (input.isDown('KeyD')) vel.vx = player.speed
    else if (input.isDown('KeyA')) vel.vx = -player.speed
    else vel.vx = 0

    if (input.wasPressed('Space') && vel.isOnGround) {
      vel.vy = JUMP_FORCE
      vel.isOnGround = false
    }
  }
}

export function physicsSystem(ecs: ECS, dt: number, platforms: Platform[]) {
  const entities = ecs.query('transform', 'velocity')

  for (const entity of entities) {
    const tf = ecs.getComponent<TransformComponent>(entity, 'transform')!
    const vel = ecs.getComponent<VelocityComponent>(entity, 'velocity')!

    vel.vy += GRAVITY * dt
    tf.x += vel.vx * dt
    tf.y += vel.vy * dt

    vel.isOnGround = false

    for (const platform of platforms) {
      const overlapX =
        tf.x < platform.x + platform.width && tf.x + tf.width > platform.x

      const overlapY =
        tf.y + tf.height > platform.y &&
        tf.y + tf.height < platform.y + platform.height + 20

      const fallingDown = vel.vy >= 0

      if (overlapX && overlapY && fallingDown) {
        tf.y = platform.y - tf.height
        vel.vy = 0
        vel.isOnGround = true
      }
    }
  }
}

export function renderSystem(ecs: ECS, ctx: CanvasRenderingContext2D) {
  const entities = ecs.query('transform', 'sprite')

  for (const entity of entities) {
    const tf = ecs.getComponent<TransformComponent>(entity, 'transform')!
    const sprite = ecs.getComponent<SpriteComponent>(entity, 'sprite')!

    ctx.fillStyle = sprite.color
    ctx.fillRect(tf.x, tf.y, tf.width, tf.height)
  }
}
