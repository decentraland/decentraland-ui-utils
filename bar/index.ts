import { canvas } from 'decentraland-ui-utils/utils/default-ui-comopnents'


let backgroundTexture = new Texture("node_modules/decentraland-ui-utils/images/sleekbars.png")

/**
 * Displays a number on the center of the UI
 *
 * @param value starting value
 * @param xOffset position on X, to enable fitting several counters
 * @param yOffset position on Y, to enable fitting several counters
 * @param fillColor color of the bar
 * @param height height of the bar
 * @param width width of the bar
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
	  height?: number,
	  width?: number
	) {
	  super()
	  
	  this.valueAsNum = value >1? 1: value
		this.fullWidth = width? width - 6: 128 -6

	  this.background = new UIImage(canvas, backgroundTexture)
	  this.background.width = width? width: 128
	  this.background.height = height? height : 32
	  this.background.hAlign = 'right'
	  this.background.vAlign = 'bottom'
	  this.background.positionX = xOffset ? xOffset : 0
	  this.background.positionY = yOffset ? yOffset : 0
	  this.background.sourceLeft = 0
	  this.background.sourceTop = 0
	  this.background.sourceWidth = 128
	  this.background.sourceHeight = 32
	  this.background.visible = true

	  this.bar = new UIContainerRect(this.background)
	  this.bar.color = fillColor? fillColor : Color4.Red()
	  this.bar.hAlign = 'left'
	  this.bar.vAlign = 'center'
	  this.bar.positionX = 4
	//   this.bar.positionX = xOffset ? xOffset : 0
	//   this.bar.positionY = yOffset ? yOffset : 0
	this.bar.height = height? height - 6 : 32 - 6
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