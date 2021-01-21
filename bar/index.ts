import { canvas, lightTheme } from '../utils/default-ui-components'
import { BarStyles } from '../utils/types'
import resources, { setSection } from '../utils/resources'

/**
 * Displays a colored bar that can be filled up and updated to different values.
 *
 * @param {number} value starting value
 * @param {number} [xOffset=0] position on X, to enable fitting several counters
 * @param {number} yOffset position on Y, to enable fitting several counters
 * @param {Color4} fillColor color of the bar
 * @param {BarStyles} style margin style of the bar, from the BarStyles enum
 * @param {number} [scale=1] multiplier for the size of the bar. 1 = 128 x 32
 * @param {boolean} startHidden if true, image starts invisible to load in the background till it runs its show() function.
 *
 */
export class UIBar extends Entity {
  valueAsNum: number
  background: UIImage
  bar: UIContainerRect
  canvas: UICanvas = canvas
  fullWidth: number
  constructor(
    value: number,
    xOffset?: number,
    yOffset?: number,
    fillColor?: Color4,
    style?: BarStyles,
    scale?: number,
    startHidden?: boolean
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
      setSection(this.background, resources.buttons.roundSilver)
    } else {
      switch (style) {
        case BarStyles.ROUNDBLACK:
          setSection(this.background, resources.buttons.roundBlack)
          break
        case BarStyles.ROUNDWHITE:
          setSection(this.background, resources.buttons.roundWhite)
          break
        case BarStyles.ROUNDSILVER:
          setSection(this.background, resources.buttons.roundSilver)
          break
        case BarStyles.ROUNDGOLD:
          setSection(this.background, resources.buttons.roundGold)
          break
        case BarStyles.SQUAREBLACK:
          setSection(this.background, resources.buttons.squareBlack)
          break
        case BarStyles.SQUAREWHITE:
          setSection(this.background, resources.buttons.squareWhite)
          break
        case BarStyles.SQUARESILVER:
          setSection(this.background, resources.buttons.squareSilver)
          break
        case BarStyles.SQUAREGOLD:
          setSection(this.background, resources.buttons.squareGold)
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
    this.bar.positionX = scale ? 2.55 * scale : 2.55
    this.bar.positionY = 0
    this.bar.height = scale ? scale * 32 - scale * 7.5 : 32 - 7.5
    this.bar.width = scale
      ? this.fullWidth * this.valueAsNum - 5.1 * scale
      : this.fullWidth * this.valueAsNum - 5.1

    if (startHidden) {
      this.hide()
    }
  }

  /**
   * Get the current value of the bar
   *  * @return {number} The current value of the bar, as a value from 0 to 1
   *
   */
  public read(): number {
    return this.valueAsNum
  }

  /**
   * Increase the value on the bar.
   *
   * @param {number} [amount=0.1] How much to increase the bar, up to a maximum of 1. By default it increases by 0.1
   *
   */
  public increase(amount?: number): void {
    this.valueAsNum += amount ? amount : 0.1
    this.bar.width = this.fullWidth * this.valueAsNum - 6
  }

  /**
   * Decrease the value on the bar.
   *
   * @param {number} [amount=0.1] How much to decrease the bar, down to a minimum of 0. By default it decreases by 0.1
   *
   */
  public decrease(amount?: number): void {
    this.valueAsNum -= amount ? amount : 0.1
    this.bar.width = this.fullWidth * this.valueAsNum - 6
  }

  /**
   * Sets the bar's value to a specific amount, regardless of what it was before.
   *
   * @param {number} amount New value for the bar, between 0 and 1
   *
   */
  public set(amount: number): void {
    this.valueAsNum = amount
    this.bar.width = this.fullWidth * this.valueAsNum - 6
  }

  /**
   * Hides the bar from view in the screen. Its values can still be changed and read while hidden.
   */
  public hide(): void {
    this.background.visible = false
    this.bar.visible = false
  }

  /**
   * Makes an invisible bar visible again.
   */
  public show(): void {
    this.background.visible = true
    this.bar.visible = true
  }
}
