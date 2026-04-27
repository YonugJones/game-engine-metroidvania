// Orchestrates everything

import { InputManager } from '../engine/InputManager'
import { Camera } from '../engine/Camera'
import { ECS } from '../engine/ECS'
import { inputSystem, physicsSystem, renderSystem } from '../engine/Systems'
import { Platform } from './Platform'

export class Scene {
  private ecs: ECS
  private platforms: Platform[]
  private camera: Camera
  private playerEntity: number

  constructor(canvasWidth: number, canvasHeight: number) {
    this.ecs = new ECS()
    this.camera = new Camera(canvasWidth, canvasHeight)

    this.platforms = [
      new Platform(0, 410, 400, 20),
      new Platform(500, 410, 400, 20),
      new Platform(150, 300, 200, 20),
      new Platform(450, 250, 200, 20),
      new Platform(750, 200, 200, 20),
    ]

    // create player entity
    this.playerEntity = this.ecs.createEntity()
    this.ecs.addComponent(this.playerEntity, 'transform', {
      x: 100,
      y: 300,
      width: 40,
      height: 40,
    })
    this.ecs.addComponent(this.playerEntity, 'velocity', {
      vx: 0,
      vy: 0,
      isOnGround: false,
    })
    this.ecs.addComponent(this.playerEntity, 'sprite', {
      color: '#e94560',
    })
    this.ecs.addComponent(this.playerEntity, 'player', {
      speed: 200,
    })
  }

  update(dt: number, input: InputManager) {
    inputSystem(this.ecs, input)
    physicsSystem(this.ecs, dt, this.platforms)

    const tf = this.ecs.getComponent<{ x: number; y: number }>(
      this.playerEntity,
      'transform',
    )!
    this.camera.follow(tf.x + 20, tf.y + 20, dt)
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#1a1a2e'
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    this.camera.apply(ctx)
    this.platforms.forEach((p) => p.draw(ctx))
    renderSystem(this.ecs, ctx)
    this.camera.restore(ctx)
  }
}
