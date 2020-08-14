import { canvas, lightTheme } from 'decentraland-ui-utils/utils/default-ui-comopnents'
import { BarStyles } from 'decentraland-ui-utils/utils/types'

// export enum BarStyles {
// 	ROUNDBLACK = `roundblack`,
// 	ROUNDGREY = `roundgrey`,
// 	ROUNDSILVER = `roundsilver`,
// 	ROUNDGOLD = `roundgold`,
// 	// "SquareBlack" = 4,
// 	// "SquareGrey" = 5,
// 	// "SquareSilver" = 6,
// 	// "SquareGold" = 7,
//   }

/**
 * Displays a number on the center of the UI
 *
 * @param value starting value
 * @param xOffset position on X, to enable fitting several counters
 * @param yOffset position on Y, to enable fitting several counters
 * @param fillColor color of the bar
 * @param style margin style of the bar, from the BarStyles enum
 * @param scale multiplier for the size of the bar. 1 = 128 x 32
 *
 */
export class UIBar extends Entity {
  valueAsNum: number
  background: UIImage
  bar: UIContainerRect
  fullWidth: number
  constructor(
    value: number,
    xOffset?: number,
    yOffset?: number,
    fillColor?: Color4,
    style?: BarStyles,
    scale?: number
  ) {
    super()

    this.valueAsNum = value > 1 ? 1 : value
    this.fullWidth = scale ? 128 * scale : 128

    this.background = new UIImage(canvas, lightTheme)
    this.background.width = scale ? scale * 128 : 128
    this.background.height = scale ? scale * 32 : 32
    this.background.hAlign = 'right'
    this.background.vAlign = 'bottom'
    this.background.positionX = xOffset ? xOffset : 0
    this.background.positionY = yOffset ? yOffset : 0

    if (!style) {
      this.background.sourceLeft = 512
      this.background.sourceTop = 531
    } else {
      switch (style) {
        case BarStyles.ROUNDBLACK:
          this.background.sourceLeft = 512
          this.background.sourceTop = 458
          break
        case BarStyles.ROUNDWHITE:
          this.background.sourceLeft = 512
          this.background.sourceTop = 494
          break
        case BarStyles.ROUNDSILVER:
          this.background.sourceLeft = 512
          this.background.sourceTop = 531
          break
        case BarStyles.ROUNDGOLD:
          this.background.sourceLeft = 512
          this.background.sourceTop = 567
          break

        case BarStyles.SQUAREBLACK:
          this.background.sourceLeft = 646
          this.background.sourceTop = 457
          break
        case BarStyles.SQUAREWHITE:
          this.background.sourceLeft = 646
          this.background.sourceTop = 493
          break
        case BarStyles.SQUARESILVER:
          this.background.sourceLeft = 646
          this.background.sourceTop = 531
          break
        case BarStyles.SQUAREGOLD:
          this.background.sourceLeft = 646
          this.background.sourceTop = 567
          break
      }
    }

    this.background.sourceWidth = 128
    this.background.sourceHeight = 32
    this.background.visible = true

    this.bar = new UIContainerRect(this.background)
    this.bar.color = fillColor ? fillColor : Color4.Red()
    this.bar.thickness = 0

    this.bar.hAlign = 'left'
    this.bar.vAlign = 'center'
    this.bar.positionX = 3
    this.bar.positionY = 0
    this.bar.height = scale ? scale * 32 - 8 : 32 - 8
    this.bar.width = this.fullWidth * this.valueAsNum - 6
  }

  public read(): number {
    return this.valueAsNum
  }
  public increase(amount?: number): void {
    this.valueAsNum += amount ? amount : 1
    this.bar.width = this.fullWidth * this.valueAsNum - 6
  }

  public decrease(amount?: number): void {
    this.valueAsNum -= amount ? amount : 1
    this.bar.width = this.fullWidth * this.valueAsNum - 6
  }
}
