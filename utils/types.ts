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

export class Portrait {
  path: string
  offsetX?: number
  offsetY?: number
  section?: ImageSection
}

export class Dialog {
  text: string
  fontSize?: number
  offsetY?: number
  isQuestion?: boolean = false
  labelE?: {
    label: string
    fontSize?: number
    offsetX?: number
    offsetY?: number
  }
  ifPressE?: number
  labelF?: {
    label: string
    fontSize?: number
    offsetX?: number
    offset?: number
  }
  ifPressF?: number
  isEndOfDialog?: boolean = false
  portrait?: Portrait
}

export class Dialogs {
  dialogs: Dialog[]
}
