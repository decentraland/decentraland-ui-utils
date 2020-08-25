import { canvas } from '../utils/default-ui-comopnents'
import { ImageSection } from '../utils/types'
import { Delay } from '../utils/timerComponents'

/**
 * Displays an icon of 64x64 on the bottom-left corner
 *
 * @param image path to image file
 * @param xOffset position on X, to enable fitting several counters
 * @param yOffset position on Y, to enable fitting several counters
 * @param width image width
 * @param height image height
 * @param section cut out a section of the imge, as an object specifying sourceLeft, sourceTop, sourceWidth and sourceHeight
 *
 */
export class MediumIcon extends Entity {
  image: UIImage
  constructor(
    image: string,
    xOffset?: number,
    yOffset?: number,
    width?: number,
    height?: number,
    section?: ImageSection
  ) {
    super()

    let texture = new Texture(image)

    this.image = new UIImage(canvas, texture)

    this.image.hAlign = 'right'
    this.image.vAlign = 'bottom'
    this.image.positionX = xOffset ? xOffset : 0
    this.image.positionY = yOffset ? yOffset : 0
    this.image.width = width ? width : 64
    this.image.height = height ? height : 64
    this.image.sourceLeft = section ? section.sourceLeft : 0
    this.image.sourceTop = section ? section.sourceTop : 0
    this.image.sourceWidth = section ? section.sourceWidth : width ? width : 64
    this.image.sourceHeight = section ? section.sourceHeight : height ? height : 64
  }

  public hide(): void {
    this.image.visible = false
  }

  public show(): void {
    this.image.visible = true
  }
}

/**
 * Displays an icon of 32x32 on the bottom-left corner
 *
 * @param image path to image file
 * @param xOffset position on X, to enable fitting several counters
 * @param yOffset position on Y, to enable fitting several counters
 * @param width image width
 * @param height image height
 * @param section cut out a section of the imge, as an object specifying sourceLeft, sourceTop, sourceWidth and sourceHeight
 *
 */
export class SmallIcon extends Entity {
  image: UIImage
  constructor(
    image: string,
    xOffset?: number,
    yOffset?: number,
    width?: number,
    height?: number,
    section?: ImageSection
  ) {
    super()

    let texture = new Texture(image)

    this.image = new UIImage(canvas, texture)

    this.image.hAlign = 'right'
    this.image.vAlign = 'bottom'
    this.image.positionX = xOffset ? xOffset : 0
    this.image.positionY = yOffset ? yOffset : 0
    this.image.width = width ? width : 32
    this.image.height = height ? height : 32
    this.image.sourceLeft = section ? section.sourceLeft : 0
    this.image.sourceTop = section ? section.sourceTop : 0
    this.image.sourceWidth = section ? section.sourceWidth : width ? width : 32
    this.image.sourceHeight = section ? section.sourceHeight : height ? height : 32
  }

  public hide(): void {
    this.image.visible = false
  }

  public show(): void {
    this.image.visible = true
  }
}

/**
 * Displays an icon of 128x128 on the bottom-left corner
 *
 * @param image path to image file
 * @param xOffset position on X, to enable fitting several counters
 * @param yOffset position on Y, to enable fitting several counters
 * @param width image width (128 by default)
 * @param height image height (128 by default)
 * @param section cut out a section of the imge, as an object specifying sourceLeft, sourceTop, sourceWidth and sourceHeight
 *
 */
export class LargeIcon extends Entity {
  image: UIImage
  constructor(
    image: string,
    xOffset?: number,
    yOffset?: number,
    width?: number,
    height?: number,
    section?: ImageSection
  ) {
    super()

    let texture = new Texture(image)

    this.image = new UIImage(canvas, texture)

    this.image.hAlign = 'right'
    this.image.vAlign = 'bottom'
    this.image.positionX = xOffset ? xOffset : 0
    this.image.positionY = yOffset ? yOffset : 0
    this.image.width = width ? width : 128
    this.image.height = height ? height : 128
    this.image.sourceLeft = section ? section.sourceLeft : 0
    this.image.sourceTop = section ? section.sourceTop : 0
    this.image.sourceWidth = section ? section.sourceWidth : width ? width : 128
    this.image.sourceHeight = section ? section.sourceHeight : height ? height : 128
  }

  public hide(): void {
    this.image.visible = false
  }

  public show(): void {
    this.image.visible = true
  }
}

/**
 * Displays an image of 512x512 on the center of the screen for limited time
 *
 * @param image path to image file
 * @param duration seconds to display the image onscreen. 0 keeps it on till you hide it
 * @param xOffset position on X, to enable fitting several counters
 * @param yOffset position on Y, to enable fitting several counters
 * @param width image width
 * @param height image height
 * @param section cut out a section of the imge, as an object specifying sourceLeft, sourceTop, sourceWidth and sourceHeight
 * @param startHidden if true, image starts invisible to load in the background till it runs its show() function.
 *
 */
export class CenterImage extends Entity {
  image: UIImage
  constructor(
    image: string,
    duration: number,
    startHidden?: boolean,
    xOffset?: number,
    yOffset?: number,
    width?: number,
    height?: number,
    section?: ImageSection
  ) {
    super()

    let texture = new Texture(image)

    this.image = new UIImage(canvas, texture)

    this.image.hAlign = 'center'
    this.image.vAlign = 'center'
    this.image.positionX = xOffset ? xOffset : 0
    this.image.positionY = yOffset ? yOffset : 0
    this.image.width = width ? width : 512
    this.image.height = height ? height : 512
    this.image.sourceLeft = section ? section.sourceLeft : 0
    this.image.sourceTop = section ? section.sourceTop : 0
    this.image.sourceWidth = section ? section.sourceWidth : width ? width : 512
    this.image.sourceHeight = section ? section.sourceHeight : height ? height : 512

    this.image.visible = startHidden ? false : true

    if (duration != -1) {
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
