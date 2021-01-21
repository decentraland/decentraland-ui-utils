import { canvas, SFFont } from '../utils/default-ui-components'

/**
 * Displays a number on the center of the UI
 *
 * @param {number} value starting value
 * @param {number} [xOffset=0] position on X, to enable fitting several counters
 * @param {number} [yOffset=0] position on Y, to enable fitting several counters
 * @param {Color4} [color=Color4.White()] text color
 * @param {number} [size=25] text size
 * @param {boolean} bordersOff remove black border around text
 * @param {boolean} fixedDigits display a specific amount of digits, regardless of the value, adding preceding 0s
 *
 */
export class UICounter extends Entity {
  valueAsNum: number
  uiText: UIText
  canvas: UICanvas = canvas
  fixedDigits: number | null
  constructor(
    value: number,
    xOffset?: number,
    yOffset?: number,
    color?: Color4,
    size?: number,
    bordersOff?: boolean,
    fixedDigits?: number
  ) {
    super()
    this.valueAsNum = value
    this.uiText = new UIText(canvas)

    this.fixedDigits = fixedDigits ? fixedDigits : null

    this.uiText.value = this.toFixedLengthString(value)

    this.uiText.hAlign = 'right'
    this.uiText.vAlign = 'bottom'
    this.uiText.positionX = xOffset ? xOffset : 0
    this.uiText.positionY = yOffset ? yOffset : 0
    this.uiText.fontSize = size ? size : 25
    this.uiText.font = SFFont
    this.uiText.vTextAlign = 'center'
    this.uiText.hTextAlign = 'center'
    this.uiText.color = color ? color : Color4.White()

    this.uiText.outlineColor = Color4.Black()
    this.uiText.outlineWidth = bordersOff ? 0 : 0.1
  }

  /**
   * Get the current value of the counter
   *  * @return {number} The current value of the counter
   *
   */
  public read(): number {
    return this.valueAsNum
  }

  /**
   * Increase the value on the counter.
   *
   * @param {number} [amount=1] How much to increase the counter. By default it increases by 1
   *
   */
  public increase(amount?: number): void {
    this.valueAsNum += amount ? amount : 1
    this.uiText.value = this.toFixedLengthString(this.valueAsNum)
  }

  /**
   * Decrease the value on the counter.
   *
   * @param {number} [amount=1] How much to decrease the counter. By default it decreases by 1
   *
   */
  public decrease(amount?: number): void {
    this.valueAsNum -= amount ? amount : 1
    this.uiText.value = this.toFixedLengthString(this.valueAsNum)
  }

  /**
   * Sets the counter's value to a specific amount, regardless of what it was before.
   *
   * @param {number} amount New value for the counter
   *
   */
  public set(amount: number): void {
    this.valueAsNum = amount
    this.uiText.value = this.toFixedLengthString(this.valueAsNum)
  }

  /**
   * Hides the counter from view in the screen. Its values can still be changed and read while hidden.
   */
  public hide(): void {
    this.uiText.visible = false
  }

  /**
   * Makes an invisible counter visible again.
   */
  public show(): void {
    this.uiText.visible = true
  }

  // Adds 0s on the left, or rounds decimals to adjust length
  private toFixedLengthString(value: number) {
    let stringValue = value.toString()
    if (!this.fixedDigits) return stringValue
    let lenDiff = stringValue.length - this.fixedDigits

    while (lenDiff < 0) {
      stringValue = '0'.concat(stringValue)
      lenDiff += 1
    }

    if (lenDiff > 0) {
      stringValue = value.toPrecision(this.fixedDigits)
    }

    return stringValue
  }
}
