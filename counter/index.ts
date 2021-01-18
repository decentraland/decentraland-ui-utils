import { canvas, SFFont } from '../utils/default-ui-components'

/**
 * Displays a number on the center of the UI
 *
 * @param value starting value
 * @param xOffset position on X, to enable fitting several counters
 * @param yOffset position on Y, to enable fitting several counters
 * @param color text color
 * @param size text size
 * @param bordersOff remove black border around text
 * @param fixedDigits display a specific amount of digits, regardless of the value, adding preceding 0s
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

  public read(): number {
    return this.valueAsNum
  }
  public increase(amount?: number): void {
    this.valueAsNum += amount ? amount : 1
    this.uiText.value = this.toFixedLengthString(this.valueAsNum)
  }

  public decrease(amount?: number): void {
    this.valueAsNum -= amount ? amount : 1
    this.uiText.value = this.toFixedLengthString(this.valueAsNum)
  }

  public set(amount: number): void {
    this.valueAsNum = amount
    this.uiText.value = this.toFixedLengthString(this.valueAsNum)
  }
  public toFixedLengthString(value: number) {
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
