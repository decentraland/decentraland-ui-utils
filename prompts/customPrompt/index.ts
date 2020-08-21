import resources, { setSection } from '../../utils/resources'
import {
  darkTheme,
  lightTheme,
  promptBackground,
  SFFont,
  PlayCloseSound,
  setOpenUITime
} from '../../utils/default-ui-comopnents'
import {
  PromptStyles,
  ButtonStyles,
  SwitchStyles,
  ImageSection
} from 'decentraland-ui-utils/utils/types'

/**
 * Displays a number on the center of the UI
 *
 * @param style: Pick from a few predefined options
 * @param width image width
 * @param height image height
 *
 */
export class CustomPrompt extends Entity {
  elements: (UIText | UIImage)[] = []
  texture: Texture
  darkTheme: boolean
  closeIcon: UIImage = new UIImage(promptBackground, this.texture)
  UIOpenTime: number
  constructor(style?: PromptStyles, width?: number, height?: number) {
    super()

    this.UIOpenTime = +Date.now()

    switch (style) {
      case PromptStyles.LIGHT:
        this.texture = lightTheme
        setSection(promptBackground, resources.backgrounds.promptBackground)
        setSection(this.closeIcon, resources.icons.closeD)
        this.closeIcon.positionX = width ? width / 2 - 25 : 175
        this.closeIcon.positionY = height ? height / 2 - 25 : 145
        break
      case PromptStyles.DARK:
        this.texture = darkTheme
        this.darkTheme = true
        setSection(promptBackground, resources.backgrounds.promptBackground)
        setSection(this.closeIcon, resources.icons.closeW)
        this.closeIcon.positionX = width ? width / 2 - 25 : 175
        this.closeIcon.positionY = height ? height / 2 - 25 : 145
        break
      case PromptStyles.LIGHTLARGE:
        this.texture = lightTheme
        setSection(promptBackground, resources.backgrounds.promptLargeBackground)
        setSection(this.closeIcon, resources.icons.closeD)
        this.closeIcon.positionX = width ? width / 2 - 25 : 175 + 40
        this.closeIcon.positionY = height ? height / 2 - 25 : 145 + 20
        break
      case PromptStyles.DARKLARGE:
        this.texture = darkTheme
        this.darkTheme = true
        setSection(promptBackground, resources.backgrounds.promptLargeBackground)
        setSection(this.closeIcon, resources.icons.closeW)
        this.closeIcon.positionX = width ? width / 2 - 25 : 175 + 40
        this.closeIcon.positionY = height ? height / 2 - 25 : 145 + 20
        break
      case PromptStyles.LIGHTSLANTED:
        this.texture = lightTheme
        setSection(promptBackground, resources.backgrounds.promptSlantedBackground)
        setSection(this.closeIcon, resources.icons.closeD)
        this.closeIcon.positionX = width ? width / 2 - 25 : 175 + 40
        this.closeIcon.positionY = height ? height / 2 - 25 : 100 + 38
        break

      case PromptStyles.DARKSLANTED:
        this.texture = darkTheme
        this.darkTheme = true
        setSection(promptBackground, resources.backgrounds.promptSlantedBackground)
        setSection(this.closeIcon, resources.icons.closeW)
        this.closeIcon.positionX = width ? width / 2 - 25 : 175 + 40
        this.closeIcon.positionY = height ? height / 2 - 25 : 100 + 38
        break
    }
    promptBackground.source = this.texture

    promptBackground.width = width ? width : promptBackground.sourceWidth
    promptBackground.height = height ? height : promptBackground.sourceHeight
    promptBackground.visible = true

    this.closeIcon.width = 32
    this.closeIcon.height = 32
    this.closeIcon.source = this.texture

    this.closeIcon.onClick = new OnClick(() => {
      PlayCloseSound()
      this.close()
    })
  }

  public close(): void {
    promptBackground.visible = false
    this.closeIcon.visible = false

    for (let element of this.elements) {
      element.visible = false
    }
  }
  public reopen(): void {
    promptBackground.visible = true
    this.closeIcon.visible = true

    for (let element of this.elements) {
      element.visible = true
    }
  }

  public addText(value: string, posX: number, posY: number, color?: Color4, size?: number): void {
    let text = new UIText(promptBackground)
    text.value = value
    text.positionX = posX ? posX : 0
    text.positionY = posY ? posY : 0
    text.hTextAlign = 'center'
    text.color = color ? color : this.darkTheme ? Color4.White() : Color4.Black()
    text.fontSize = size ? size : 15

    this.elements.push(text)
  }

  // add button

  public addButton(
    label: string,
    posX: number,
    posY: number,
    onClick: () => void,
    style?: ButtonStyles
  ): void {
    let button = new UIImage(promptBackground, this.texture)
    button.positionX = posX
    button.positionY = posY
    button.width = 174
    button.height = 46

    let buttonLabel = new UIText(button)

    if (style) {
      switch (style) {
        case ButtonStyles.E:
          setSection(button, resources.buttons.buttonE)
          buttonLabel.positionX = 25
          break
        case ButtonStyles.F:
          setSection(button, resources.buttons.buttonF)
          buttonLabel.positionX = 25
          break
        case ButtonStyles.ROUNDBLACK:
          setSection(button, resources.buttons.roundBlack)
          break
        case ButtonStyles.ROUNDWHITE:
          setSection(button, resources.buttons.roundWhite)
          break
        case ButtonStyles.ROUNDSILVER:
          setSection(button, resources.buttons.roundSilver)
          break
        case ButtonStyles.ROUNDGOLD:
          setSection(button, resources.buttons.roundGold)
          break
        case ButtonStyles.SQUAREBLACK:
          setSection(button, resources.buttons.squareBlack)
          break
        case ButtonStyles.SQUAREWHITE:
          setSection(button, resources.buttons.squareWhite)
          break
        case ButtonStyles.SQUARESILVER:
          setSection(button, resources.buttons.squareSilver)
          break
        case ButtonStyles.SQUAREGOLD:
          setSection(button, resources.buttons.squareGold)
          break
      }
    } else {
      setSection(button, resources.buttons.roundSilver)
    }

    buttonLabel.value = label
    buttonLabel.hTextAlign = 'center'
    buttonLabel.vTextAlign = 'center'
    buttonLabel.fontSize = 20
    buttonLabel.font = SFFont
    buttonLabel.color =
      style == ButtonStyles.ROUNDWHITE || style == ButtonStyles.SQUAREWHITE
        ? Color4.Black()
        : Color4.White()
    buttonLabel.isPointerBlocker = false

    button.onClick = new OnClick(() => {
      onClick()
    })

    if (style == ButtonStyles.E) {
      Input.instance.subscribe('BUTTON_DOWN', ActionButton.PRIMARY, false, e => {
        if (button.visible && +Date.now() - this.UIOpenTime > 100) {
          onClick()
        }
      })
    } else if (style == ButtonStyles.F) {
      Input.instance.subscribe('BUTTON_DOWN', ActionButton.SECONDARY, false, e => {
        if (button.visible && +Date.now() - this.UIOpenTime > 100) {
          onClick()
        }
      })
    }

    this.elements.push(button)
  }

  public addCheckbox(
    label: string,
    posX: number,
    posY: number,
    onCheck?: () => void,
    onUncheck?: () => void,
    large?: boolean,
    startChecked?: boolean
  ): void {
    let checked: boolean = startChecked ? true : false

    let button = new UIImage(promptBackground, this.texture)
    button.positionX = posX
    button.positionY = posY
    button.width = large ? 32 : 24
    button.height = large ? 32 : 24

    if (checked == false) {
      if (this.darkTheme) {
        if (large) {
          setSection(button, resources.checkboxes.wLargeOff)
        } else {
          setSection(button, resources.checkboxes.wOff)
        }
      } else {
        if (large) {
          setSection(button, resources.checkboxes.dLargeOff)
        } else {
          setSection(button, resources.checkboxes.dOff)
        }
      }
    } else {
      if (this.darkTheme) {
        if (large) {
          setSection(button, resources.checkboxes.wLargeOn)
        } else {
          setSection(button, resources.checkboxes.wOn)
        }
      } else {
        if (large) {
          setSection(button, resources.checkboxes.dLargeOn)
        } else {
          setSection(button, resources.checkboxes.dOn)
        }
      }
    }

    let buttonLabel = new UIText(button)
    buttonLabel.positionX = large ? 40 : 30
    buttonLabel.value = label
    buttonLabel.hTextAlign = 'left'
    buttonLabel.vTextAlign = 'center'
    buttonLabel.fontSize = 20
    buttonLabel.font = SFFont
    buttonLabel.color = this.darkTheme ? Color4.White() : Color4.Black()
    buttonLabel.isPointerBlocker = false

    button.onClick = new OnClick(() => {
      checked = !checked
      if (checked == false) {
        if (this.darkTheme) {
          if (large) {
            setSection(button, resources.checkboxes.wLargeOff)
          } else {
            setSection(button, resources.checkboxes.wOff)
          }
        } else {
          if (large) {
            setSection(button, resources.checkboxes.dLargeOff)
          } else {
            setSection(button, resources.checkboxes.dOff)
          }
        }
      } else {
        if (this.darkTheme) {
          if (large) {
            setSection(button, resources.checkboxes.wLargeOn)
          } else {
            setSection(button, resources.checkboxes.wOn)
          }
        } else {
          if (large) {
            setSection(button, resources.checkboxes.dLargeOn)
          } else {
            setSection(button, resources.checkboxes.dOn)
          }
        }
      }

      checked ? onCheck() : onUncheck()
    })

    this.elements.push(button)
  }

  public addSwitch(
    label: string,
    posX: number,
    posY: number,
    onCheck?: () => void,
    onUncheck?: () => void,
    style?: SwitchStyles,
    startChecked?: boolean
  ): void {
    let checked: boolean = startChecked ? true : false

    let button = new UIImage(promptBackground, this.texture)
    button.positionX = posX
    button.positionY = posY
    button.width = 64
    button.height = 32

    if (style == undefined) style = SwitchStyles.ROUNDGREEN

    if (checked == false) {
      if (style == SwitchStyles.ROUNDGREEN || style == SwitchStyles.ROUNDRED) {
        setSection(button, resources.switches.roundOff)
      } else {
        setSection(button, resources.switches.squareOff)
      }
    } else {
      switch (style) {
        case SwitchStyles.ROUNDGREEN:
          setSection(button, resources.switches.roundGreen)
          break
        case SwitchStyles.ROUNDRED:
          setSection(button, resources.switches.roundRed)
          break
        case SwitchStyles.SQUAREGREEN:
          setSection(button, resources.switches.squareGreen)
          break
        case SwitchStyles.SQUARERED:
          setSection(button, resources.switches.squareRed)
          break
      }
    }

    let buttonLabel = new UIText(button)
    buttonLabel.positionX = 80
    buttonLabel.value = label
    buttonLabel.hTextAlign = 'left'
    buttonLabel.vTextAlign = 'center'
    buttonLabel.fontSize = 20
    buttonLabel.font = SFFont
    buttonLabel.color = this.darkTheme ? Color4.White() : Color4.Black()
    buttonLabel.isPointerBlocker = false

    button.onClick = new OnClick(() => {
      checked = !checked
      if (checked == false) {
        if (style == SwitchStyles.ROUNDGREEN || style == SwitchStyles.ROUNDRED) {
          setSection(button, resources.switches.roundOff)
        } else {
          setSection(button, resources.switches.squareOff)
        }
      } else {
        switch (style) {
          case SwitchStyles.ROUNDGREEN:
            setSection(button, resources.switches.roundGreen)
            break
          case SwitchStyles.ROUNDRED:
            setSection(button, resources.switches.roundRed)
            break
          case SwitchStyles.SQUAREGREEN:
            setSection(button, resources.switches.squareGreen)
            break
          case SwitchStyles.SQUARERED:
            setSection(button, resources.switches.squareRed)
            break
        }
      }

      checked ? onCheck() : onUncheck()
    })

    this.elements.push(button)
  }

  public addIcon(
    image: string,
    xOffset: number,
    yOffset: number,
    width?: number,
    height?: number,
    section?: ImageSection
  ) {
    let iconTexture = new Texture(image)

    let icon = new UIImage(promptBackground, iconTexture)

    icon.positionX = xOffset
    icon.positionY = yOffset
    icon.width = width ? width : 128
    icon.height = height ? height : 128
    icon.sourceLeft = section ? section.sourceLeft : 0
    icon.sourceTop = section ? section.sourceTop : 0
    icon.sourceWidth = section ? section.sourceWidth : width ? width : 128
    icon.sourceHeight = section ? section.sourceHeight : height ? height : 128
  }
}
