// Entity Component System -> entity/component registry

export type EntityId = number

export class ECS {
  private nextId = 0
  private components = new Map<string, Map<EntityId, unknown>>()

  createEntity(): EntityId {
    return this.nextId++
  }

  addComponent<T>(entity: EntityId, name: string, data: T): void {
    if (!this.components.has(name)) {
      this.components.set(name, new Map())
    }
    this.components.get(name)!.set(entity, data)
  }

  getComponent<T>(entity: EntityId, name: string): T | undefined {
    return this.components.get(name)?.get(entity) as T | undefined
  }

  hasComponent(entity: EntityId, name: string): boolean {
    return this.components.get(name)?.has(entity) ?? false
  }

  removeComponent(entity: EntityId, name: string): void {
    this.components.get(name)?.delete(entity)
  }

  query(...componentNames: string[]): EntityId[] {
    return [...(this.components.get(componentNames[0])?.keys() ?? [])].filter(
      (entity) =>
        componentNames.every((name) => this.hasComponent(entity, name)),
    )
  }
}
