import { TimerSystem } from './timerSystem'
export interface ITimerComponent {
  elapsedTime: number
  targetTime: number
  onTargetTimeReached: (ownerEntity: IEntity) => void
}

/**
 * Execute once after X milliseconds
 */
@Component('timerDelay')
export class Delay implements ITimerComponent {
  elapsedTime: number
  targetTime: number
  onTargetTimeReached: (ownerEntity: IEntity) => void

  private onTimeReachedCallback?: () => void

  /**
   * @param seconds amount of time in seconds
   * @param onTimeReachedCallback callback for when time is reached
   */
  constructor(seconds: number, onTimeReachedCallback?: () => void) {
    TimerSystem.createAndAddToEngine()

    this.elapsedTime = 0
    this.targetTime = seconds
    this.onTimeReachedCallback = onTimeReachedCallback
    this.onTargetTimeReached = entity => {
      if (this.onTimeReachedCallback) this.onTimeReachedCallback()
      entity.removeComponent(this)
    }
  }

  setCallback(onTimeReachedCallback: () => void) {
    this.onTimeReachedCallback = onTimeReachedCallback
  }
}
