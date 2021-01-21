/**
 * Cut out a section of an image file
 *
 * @typedef {Object} ImageSection - Object with data to only display a section of an image
 * @property {number} sourceWidth Width in pixels to select from image, starting from the sourceLeft, going right
 * @property {number} sourceHeight Height in pixels to select from image, starting from the sourceTop, going down
 * @property {number} sourceLeft Leftmost pixel to select from image
 * @property {number} sourceTop Topmost pixel to select from image
 *
 */
export type ImageSection = {
  sourceWidth: number
  sourceHeight: number
  sourceLeft?: number
  sourceTop?: number
}

export enum PromptStyles {
  LIGHT = `light`,
  DARK = `dark`,
  LIGHTLARGE = `lightlarge`,
  DARKLARGE = `darklarge`,
  LIGHTSLANTED = `lightslanted`,
  DARKSLANTED = `darkslanted`
}

export enum BarStyles {
  ROUNDBLACK = `roundblack`,
  ROUNDWHITE = `roundwhite`,
  ROUNDSILVER = `roundsilver`,
  ROUNDGOLD = `roundgold`,
  SQUAREBLACK = `squareblack`,
  SQUAREWHITE = `squarewhite`,
  SQUARESILVER = `squaresilver`,
  SQUAREGOLD = `squaregold`
}

export enum ButtonStyles {
  E = `e`,
  F = `f`,
  DARK = `dark`,
  RED = `red`,
  ROUNDBLACK = `roundblack`,
  ROUNDWHITE = `roundwhite`,
  ROUNDSILVER = `roundsilver`,
  ROUNDGOLD = `roundgold`,
  SQUAREBLACK = `squareblack`,
  SQUAREWHITE = `squarewhite`,
  SQUARESILVER = `squaresilver`,
  SQUAREGOLD = `squaregold`
}

export enum SwitchStyles {
  ROUNDGREEN = `roundgreen`,
  ROUNDRED = `roundred`,
  SQUAREGREEN = `squaregreen`,
  SQUARERED = `squarered`
}

/**
 *
 *
 * @typedef {Object} ImageData - Object with data for displaying an image
 * @property {string} path Path to the image file.
 * @property {number} offsetX Offset on X, relative to the normal position of the image.
 * @property {number} offsetY Offset on Y, relative to the normal position of the image.
 * @property {number} height The height to show the image onscreen.
 * @property {number} width The width to show the image onscreen.
 * @property {ImageSection} section Use only a section of the image file, useful when arranging multiple icons into an image atlas. This field takes an `ImageSection` object, specifying `sourceWidth` and `sourceHeight`, and optionally also `sourceLeft` and `sourceTop`.
 *
 */
export type ImageData = {
  path: string
  offsetX?: number
  offsetY?: number
  height?: number
  width?: number
  section?: ImageSection
}

/**
 * Fragment of a conversation with an NPC
 *
 * @typedef {Object} Dialog - An entry in an NPC conversation
 * @property {string} text The dialog text
 * @property {string} name Optional name of the dialog entry, to link other entries to this one and not worry about changes in the array length
 * @property {number} fontSize Size of the text
 * @property {number} offsetX Offset of the text on the X axis, relative to its normal position.
 * @property {number} offsetY Offset of the text on the Y axis, relative to its normal position.
 * @property {ImageData} portrait Sets the portrait image to use on the left. This field expects a `Portrait` object.
 * @property {ImageData} image Sets a second image to use on the right of the dialog, and slightly up. This field expects an `ImageData` object.
 * @property {number} typeSpeed The text appears one character at a time, simulating typing. Players can click to skip the animation. Tune the speed of this typing (30 by default) to go slower or faster. Set to _-1_ to skip the animation.
 * @property {boolean} isQuestion If true, allows to use buttons to trigger different actions
 * @property {boolean} isFixedScreen If true, has no buttons or "next page" functionality
 * @property {ButtonData[]} buttons An array of buttons `ButtonData` objects to use in a question entry
 *
 */
export class Dialog {
  text: string = ''
  name?: string
  fontSize?: number
  offsetX?: number
  offsetY?: number
  typeSpeed?: number
  isEndOfDialog?: boolean = false
  triggeredByNext?: () => void
  portrait?: ImageData
  image?: ImageData
  isQuestion?: boolean = false
  isFixedScreen?: boolean = false
  buttons?: ButtonData[]
}

/**
 * Data for Button to show on a question in a Dialog entry
 *
 * @typedef {Object} ButtonData - Object with data for a Dialog UI button
 * @property {string|number} goToDialog The index or name of the next dialog entry to display when activated.
 * @property {string} label The label to show on the button.
 * @property {() => void} triggeredActions An additional function to run whenever the button is activated
 * @property {number} fontSize Font size of the text
 * @property {number}offsetX Offset of the text on the X axis, relative to its normal position.
 * @property {number} offsetY Offset of the text on the Y axis, relative to its normal position.
 *
 */
export type ButtonData = {
  goToDialog: number
  label: string
  triggeredActions?: () => void
  fontSize?: number
  offsetX?: number
  offsetY?: number
}
