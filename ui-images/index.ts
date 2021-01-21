import { canvas } from '../utils/default-ui-components'
import { ImageSection } from '../utils/types'
import { UIDelay } from '../utils/timerComponents'

/**
 * Displays an icon of 64x64 on the bottom-left corner
 *
 * @param {string} image path to image file
 * @param {number} xOffset position on X, to enable fitting several counters
 * @param {number} yOffset position on Y, to enable fitting several counters
 * @param {number} width image width
 * @param {number} height image height
 * @param {ImageSection} section cut out a section of the imge, as an object specifying sourceLeft, sourceTop, sourceWidth and sourceHeight
 *
 */
export class MediumIcon extends Entity {
  image: UIImage
  canvas: UICanvas = canvas
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
    this.image.sourceLeft = section && section.sourceLeft ? section.sourceLeft : 0
    this.image.sourceTop = section && section.sourceTop ? section.sourceTop : 0
    this.image.sourceWidth =
      section && section.sourceWidth ? section.sourceWidth : width ? width : 64
    this.image.sourceHeight =
      section && section.sourceHeight ? section.sourceHeight : height ? height : 64
  }

  /**
   * Hides the image from view in the screen.
   */
  public hide(): void {
    this.image.visible = false
  }

  /**
   * Makes an invisible image visible again.
   * @param {number} duration Seconds to display the image onscreen. If no value is provided, it stays visible.
   */
  public show(duration?: number): void {
    this.image.visible = true

    if (duration) {
      let dummyEnty = new Entity()
      engine.addEntity(dummyEnty)

      dummyEnty.addComponentOrReplace(
        new UIDelay(duration, () => {
          this.hide()
        })
      )
    }
  }
}

/**
 * Displays an icon of 32x32 on the bottom-left corner
 *
 * @param {string} image path to image file
 * @param {number} xOffset position on X, to enable fitting several counters
 * @param {number} yOffset position on Y, to enable fitting several counters
 * @param {number} width image width
 * @param {number} height image height
 * @param {ImageSection} section cut out a section of the imge, as an object specifying sourceLeft, sourceTop, sourceWidth and sourceHeight
 *
 */
export class SmallIcon extends Entity {
  image: UIImage
  canvas: UICanvas = canvas
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
    this.image.sourceLeft = section && section.sourceLeft ? section.sourceLeft : 0
    this.image.sourceTop = section && section.sourceTop ? section.sourceTop : 0
    this.image.sourceWidth = section ? section.sourceWidth : width ? width : 32
    this.image.sourceHeight = section ? section.sourceHeight : height ? height : 32
  }

  /**
   * Hides the image from view in the screen.
   */
  public hide(): void {
    this.image.visible = false
  }

  /**
   * Makes an invisible image visible again.
   * @param {number} duration Seconds to display the image onscreen. If no value is provided, it stays visible.
   */
  public show(duration?: number): void {
    this.image.visible = true

    if (duration) {
      let dummyEnty = new Entity()
      engine.addEntity(dummyEnty)

      dummyEnty.addComponentOrReplace(
        new UIDelay(duration, () => {
          this.hide()
        })
      )
    }
  }
}

/**
 * Displays an icon of 128x128 on the bottom-left corner
 *
 * @param {string} image path to image file
 * @param {number} xOffset position on X, to enable fitting several counters
 * @param {number} yOffset position on Y, to enable fitting several counters
 * @param {number} width image width (128 by default)
 * @param {number} height image height (128 by default)
 * @param {ImageSection} section cut out a section of the imge, as an object specifying sourceLeft, sourceTop, sourceWidth and sourceHeight
 *
 */
export class LargeIcon extends Entity {
  image: UIImage
  canvas: UICanvas = canvas
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
    this.image.sourceLeft = section && section.sourceLeft ? section.sourceLeft : 0
    this.image.sourceTop = section && section.sourceTop ? section.sourceTop : 0
    this.image.sourceWidth = section ? section.sourceWidth : width ? width : 128
    this.image.sourceHeight = section ? section.sourceHeight : height ? height : 128
  }

  /**
   * Hides the image from view in the screen.
   */
  public hide(): void {
    this.image.visible = false
  }

  /**
   * Makes an invisible image visible again.
   * @param {number} duration Seconds to display the image onscreen. If no value is provided, it stays visible.
   */
  public show(duration?: number): void {
    this.image.visible = true

    if (duration) {
      let dummyEnty = new Entity()
      engine.addEntity(dummyEnty)

      dummyEnty.addComponentOrReplace(
        new UIDelay(duration, () => {
          this.hide()
        })
      )
    }
  }
}

/**
 * Displays an image of 512x512 on the center of the screen for limited time
 *
 * @param {string} image path to image file
 * @param {number} duration seconds to display the image onscreen. 0 keeps it on till you hide it
 * @param {number} xOffset position on X, to enable fitting several counters
 * @param {number} yOffset position on Y, to enable fitting several counters
 * @param {number} width image width
 * @param {number} height image height
 * @param {ImageSection} section cut out a section of the imge, as an object specifying sourceLeft, sourceTop, sourceWidth and sourceHeight
 * @param {boolean} startHidden if true, image starts invisible to load in the background till it runs its show() function.
 *
 */
export class CenterImage extends Entity {
  image: UIImage
  canvas: UICanvas = canvas
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
    this.image.sourceLeft = section && section.sourceLeft ? section.sourceLeft : 0
    this.image.sourceTop = section && section.sourceTop ? section.sourceTop : 0
    this.image.sourceWidth = section ? section.sourceWidth : width ? width : 512
    this.image.sourceHeight = section ? section.sourceHeight : height ? height : 512

    this.image.visible = startHidden ? false : true

    if (duration != -1) {
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
   */
  public hide(): void {
    this.image.visible = false
  }

  /**
   * Makes an invisible image visible again.
   * @param {number} duration Seconds to display the image onscreen. If no value is provided, it stays visible.
   */
  public show(duration?: number): void {
    this.image.visible = true

    if (duration) {
      let dummyEnty = new Entity()
      engine.addEntity(dummyEnty)

      dummyEnty.addComponentOrReplace(
        new UIDelay(duration, () => {
          this.hide()
        })
      )
    }
  }
}
