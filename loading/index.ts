import { lightTheme, canvas } from '../utils/default-ui-components'
import { UIDelay } from '../utils/timerComponents'
import resources, { setSection } from '../utils/resources'

/**
 * Displays a loading icon on the center of the screen
 * @param {number} [duration=3] Seconds to display the image onscreen. 0 keeps it on till you hide it manually
 * @param {number} [xOffset=0] Position on X, to enable fitting several counters
 * @param {number} [yOffset=0] Position on Y, to enable fitting several counters
 * @param {number} [scale=1] Multiplier for the size of the bar. 1 = 48 x 64
 *
 */
export class LoadingIcon extends Entity {
  image: UIImage
  canvas: UICanvas = canvas
  constructor(duration?: number, xOffset?: number, yOffset?: number, scale?: number) {
    super()

    this.image = new UIImage(canvas, lightTheme)

    this.image.hAlign = 'center'
    this.image.vAlign = 'center'
    this.image.positionX = xOffset ? xOffset : 0
    this.image.positionY = yOffset ? yOffset + 80 : 80
    this.image.width = scale ? scale * 48 : 48
    this.image.height = scale ? scale * 64 : 64
    setSection(this.image, resources.icons.TimerLarge)

    // TODO: IMAGE NOT GOING AWAY
    if (duration && duration != 0) {
      let dummyEnty = new Entity()
      engine.addEntity(dummyEnty)

      dummyEnty.addComponentOrReplace(
        new UIDelay(duration ? duration : 3, () => {
          this.hide()
        })
      )
    }
  }

  /**
   * Hides the image from view in the screen.
   *
   */
  public hide(): void {
    this.image.visible = false
  }

  /**
   * Makes an invisible image visible again.
   *
   */
  public show(): void {
    this.image.visible = true
  }
}
