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
