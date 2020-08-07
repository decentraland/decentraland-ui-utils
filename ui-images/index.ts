

import { canvas } from 'decentraland-ui-utils/utils/default-ui-comopnents'
import {ImageSection} from 'decentraland-ui-utils/utils/types'

/**
 * Displays an icon of 64x64 on the bottom-left corner
 *
 * @param value starting value
 * @param xOffset position on X, to enable fitting several counters
 * @param yOffset position on Y, to enable fitting several counters
 * @param width image width
 * @param height image height 
 * @param section cut out a section of the imge, as an object specifying sourceLeft, sourceTop, sourceWidth and sourceHeight
 *
 */
export class MediumIcon extends Object {
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
	  this.image.sourceLeft = section? section.sourceLeft: 0
	  this.image.sourceTop= section? section.sourceTop: 0
	  this.image.sourceWidth = section? section.sourceWidth: width? width : 64
	  this.image.sourceHeight= section? section.sourceHeight: height? height: 64
	}

  }



/**
 * Displays an icon of 64x64 on the bottom-left corner
 *
 * @param value starting value
 * @param xOffset position on X, to enable fitting several counters
 * @param yOffset position on Y, to enable fitting several counters
 * @param width image width 
 * @param height image height 
* @param section cut out a section of the imge, as an object specifying sourceLeft, sourceTop, sourceWidth and sourceHeight
 *
 */
export class SmallIcon extends Object {
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
	  this.image.sourceLeft = section? section.sourceLeft: 0
	  this.image.sourceTop= section? section.sourceTop: 0
	  this.image.sourceWidth = section? section.sourceWidth: width? width : 32
	  this.image.sourceHeight= section? section.sourceHeight: height? height: 32
	}

  }



/**
 * Displays an icon of 64x64 on the bottom-left corner
 *
 * @param value starting value
 * @param xOffset position on X, to enable fitting several counters
 * @param yOffset position on Y, to enable fitting several counters
 * @param width image width (128 by default)
 * @param height image height (128 by default)
* @param section cut out a section of the imge, as an object specifying sourceLeft, sourceTop, sourceWidth and sourceHeight
 *
 */
export class LargeIcon extends Object {
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
	  this.image.sourceLeft = section? section.sourceLeft: 0
	  this.image.sourceTop= section? section.sourceTop: 0
	  this.image.sourceWidth = section? section.sourceWidth: width? width : 128
	  this.image.sourceHeight= section? section.sourceHeight: height? height: 128
	}

  }




/**
 * Displays an icon of 64x64 on the bottom-left corner
 *
 * @param value starting value
 * @param xOffset position on X, to enable fitting several counters
 * @param yOffset position on Y, to enable fitting several counters
 * @param width image width (128 by default)
 * @param height image height (128 by default)
* @param section cut out a section of the imge, as an object specifying sourceLeft, sourceTop, sourceWidth and sourceHeight
 *
 */
export class CenterImage extends Object {
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

	  this.image.hAlign = 'center'
	  this.image.vAlign = 'center'
	  this.image.positionX = xOffset ? xOffset : 0
	  this.image.positionY = yOffset ? yOffset : 0
	  this.image.width = width ? width : 512
	  this.image.height = height ? height : 512
	  this.image.sourceLeft = section? section.sourceLeft: 0
	  this.image.sourceTop= section? section.sourceTop: 0
	  this.image.sourceWidth = section? section.sourceWidth: width? width : 512
	  this.image.sourceHeight= section? section.sourceHeight: height? height: 512
	}

  }