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
  DARKSLANTED = `darkslanted`,
}

export enum BarStyles {
  ROUNDBLACK = `roundblack`,
  ROUNDWHITE = `roundwhite`,
  ROUNDSILVER = `roundsilver`,
  ROUNDGOLD = `roundgold`,
  SQUAREBLACK = `squareblack`,
  SQUAREWHITE = `squarewhite`,
  SQUARESILVER = `squaresilver`,
  SQUAREGOLD = `squaregold`,
}

export enum ButtonStyles {
  E = `e`,
  F = `f`,
  ROUNDBLACK = `roundblack`,
  ROUNDWHITE = `roundwhite`,
  ROUNDSILVER = `roundsilver`,
  ROUNDGOLD = `roundgold`,
  SQUAREBLACK = `squareblack`,
  SQUAREWHITE = `squarewhite`,
  SQUARESILVER = `squaresilver`,
  SQUAREGOLD = `squaregold`,
}

export enum SwitchStyles {
  ROUNDGREEN = `roundgreen`,
  ROUNDRED = `roundred`,
  SQUAREGREEN = `squaregreen`,
  SQUARERED = `squarered`,
}

export class ImageData {
  path: string
  offsetX?: number
  offsetY?: number
  height?: number
  width?: number
  section?: ImageSection
}

export class Dialog {
  text: string
  fontSize?: number
  offsetX?: number
  offsetY?: number
  isQuestion?: boolean = false
  labelE?: {
    label: string
    fontSize?: number
    offsetX?: number
    offsetY?: number
  }
  ifPressE?: number
  triggeredByE?: () => void
  labelF?: {
    label: string
    fontSize?: number
    offsetX?: number
    offset?: number
  }
  ifPressF?: number
  triggeredByF?: () => void
  isEndOfDialog?: boolean = false
  portrait?: ImageData
  image?: ImageData
}

export class Dialogs {
  dialogs: Dialog[]
}
