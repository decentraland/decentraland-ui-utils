import { canvas, SFFont } from '../utils/default-ui-components'

/**
 * Displays a number on the center of the UI
 *
 * @param {string} value string value
 * @param {number} [xOffset=0] position on X, to enable fitting several UI elements
 * @param {number} [yOffset=0] position on Y, to enable fitting several UI elements
 * @param {Color4} [color Color4.White()] text color
 * @param {number} [size=25] text size
 * @param {boolean} bordersOff if true, text won't have a black margin around it
 *
 */
export class CornerLabel extends Entity {
  uiText: UIText
  canvas: UICanvas = canvas
  constructor(
    value: string,
    xOffset?: number,
    yOffset?: number,
    color?: Color4,
    size?: number,
    bordersOff?: boolean
  ) {
    super()
    this.uiText = new UIText(canvas)

    this.uiText.value = value

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
   * Hides the label from view in the screen. Its values can still be changed and read while hidden.
   */
  public hide(): void {
    this.uiText.visible = false
  }

  /**
   * Makes an label counter visible again.
   */
  public show(): void {
    this.uiText.visible = true
  }

  /**
   * Sets the counter's value to a specific amount, regardless of what it was before.
   *
   * @param {string} newString New value for the label
   *
   */
  public set(newString: string): void {
    this.uiText.value = newString
    this.uiText.visible = true
  }
}
