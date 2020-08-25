import { canvas, SFFont } from '../utils/default-ui-comopnents'

/**
 * Displays a number on the center of the UI
 *
 * @param value string value
 * @param xOffset position on X, to enable fitting several UI elements
 * @param yOffset position on Y, to enable fitting several UI elements
 * @param color text color
 * @param size text size
 * @param bordersOff if true, text won't have a black margin around it
 *
 */
export class CornerLabel extends Entity {
  uiText: UIText
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
}
