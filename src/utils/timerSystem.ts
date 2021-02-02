import { UIDelay } from './timerComponents'

const entitiesWithDelay = engine.getComponentGroup(UIDelay)

export class TimerSystem implements ISystem {
  private static _instance: TimerSystem | null = null

  static createAndAddToEngine(): TimerSystem {
    if (this._instance == null) {
      this._instance = new TimerSystem()
      engine.addSystem(this._instance)
    }
    return this._instance
  }

  private constructor() {
    TimerSystem._instance = this
  }

  update(dt: number) {
    for (let ent of entitiesWithDelay.entities) {
      let timerComponent = ent.getComponent(UIDelay)

      timerComponent.elapsedTime += dt

      if (timerComponent.elapsedTime >= timerComponent.targetTime) {
        timerComponent.onTargetTimeReached(ent)
      }
    }
  }
}
