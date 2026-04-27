// world -> screen transform
// Lerp - linear interpolation - smoothly moving a value towards a target
// camera.x += (target.x - camera.x) * speed * dt

export class Camera {
  x = 0
  y = 0
  width: number
  height: number

  constructor(width: number, height: number) {
    this.width = width
    this.height = height
  }

  follow(targetX: number, targetY: number, dt: number) {
    // center the camera on the target
    const desiredX = targetX - this.width / 2
    const desiredY = targetY - this.height / 2

    // lerp toward the desired position
    this.x += (desiredX - this.x) * 8 * dt
    this.y += (desiredY - this.y) * 8 * dt
  }

  apply(ctx: CanvasRenderingContext2D) {
    ctx.save()
    ctx.translate(-Math.round(this.x), -Math.round(this.y))
  }

  restore(ctx: CanvasRenderingContext2D) {
    ctx.restore()
  }
}
