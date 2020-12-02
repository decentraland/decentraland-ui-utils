import { TimerSystem } from './timerSystem'

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
    this.onTargetTimeReached = (entity) => {
      this.onTimeReachedCallback()
      entity.removeComponent(UIDelay)
    }
  }

  setCallback(onTimeReachedCallback: () => void) {
    this.onTimeReachedCallback = onTimeReachedCallback
  }
}
