export interface ITimerComponent {
  elapsedTime: number
  targetTime: number
  onTargetTimeReached: (ownerEntity: IEntity) => void
}

/**
 * Execute once after X milliseconds
 */
@Component('UItimerDelay')
export class UIDelay implements ITimerComponent {
  elapsedTime: number
  targetTime: number
  onTargetTimeReached: (ownerEntity: IEntity) => void

  private onTimeReachedCallback: () => void

  /**
   * @param seconds amount of time in seconds
   * @param onTimeReachedCallback callback for when time is reached
   */
  constructor(seconds: number, onTimeReachedCallback: () => void) {
    TimerSystem.createAndAddToEngine()

    this.elapsedTime = 0
    this.targetTime = seconds
    this.onTimeReachedCallback = onTimeReachedCallback
    this.onTargetTimeReached = entity => {
      this.onTimeReachedCallback()
      entity.removeComponent(UIDelay)
    }
  }

  setCallback(onTimeReachedCallback: () => void) {
    this.onTimeReachedCallback = onTimeReachedCallback
  }
}

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
