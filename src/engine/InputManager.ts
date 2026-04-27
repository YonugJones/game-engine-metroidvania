// Keyboard state

export class InputManager {
  private held = new Set<string>()
  private pressedThisFrame = new Set<string>()

  constructor() {
    window.addEventListener('keydown', this.onKeyDown)
    window.addEventListener('keyup', this.onKeyUp)
  }

  private onKeyDown = (e: KeyboardEvent) => {
    if (!this.held.has(e.code)) {
      this.pressedThisFrame.add(e.code)
    }
    this.held.add(e.code)
  }

  private onKeyUp = (e: KeyboardEvent) => {
    this.held.delete(e.code)
  }

  isDown(code: string): boolean {
    return this.held.has(code)
  }

  wasPressed(code: string): boolean {
    return this.pressedThisFrame.has(code)
  }

  flush() {
    this.pressedThisFrame.clear()
  }

  destroy() {
    window.removeEventListener('keydown', this.onKeyDown)
    window.removeEventListener('keyup', this.onKeyUp)
  }
}
