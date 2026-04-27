// Pure data definitions

export interface TransformComponent {
  x: number
  y: number
  width: number
  height: number
}

export interface VelocityComponent {
  vx: number
  vy: number
  isOnGround: boolean
}

export interface SpriteComponent {
  color: string
}

export interface PlayerTagComponent {
  speed: number
}
