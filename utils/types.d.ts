export type ImageSection = {
  sourceLeft: number
  sourceTop: number
  sourceWidth: number
  sourceHeight: number
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
  'RoundBlack' = 0,
  'RoundGrey' = 1,
  'RoundSilver' = 2,
  'RoundGold' = 3,
  'SquareBlack' = 4,
  'SquareGrey' = 5,
  'SquareSilver' = 6,
  'SquareGold' = 7,
}
