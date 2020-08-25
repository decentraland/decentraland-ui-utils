import { lightTheme, canvas } from '../utils/default-ui-comopnents'
import { Delay } from '../utils/timerComponents'
import resources, { setSection } from '../utils/resources'

/**
 * Displays a loading icon on the center of the screen
 * @param duration seconds to display the image onscreen. 0 keeps it on till you hide it
 * @param xOffset position on X, to enable fitting several counters
 * @param yOffset position on Y, to enable fitting several counters
 * @param scale multiplier for the size of the bar. 1 = 48 x 64
 *
 */
export class LoadingIcon extends Entity {
  image: UIImage
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
        new Delay(duration ? duration : 3, () => {
          this.hide()
        })
      )
    }
  }

  public hide(): void {
    this.image.visible = false
  }

  public show(): void {
    this.image.visible = true
  }
}
