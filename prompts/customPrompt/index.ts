import resources, { setSection } from '../../utils/resources'
import {
  darkTheme,
  lightTheme,
  promptBackground,
  SFFont,
  PlayCloseSound,
} from '../../utils/default-ui-comopnents'
import { PromptStyles, ButtonStyles, SwitchStyles, ImageSection } from '../../utils/types'

/**
 * Displays a number on the center of the UI
 *
 * @param style: Pick from a few predefined options
 * @param width image width
 * @param height image height
 *
 */
export class CustomPrompt extends Entity {
  elements: (
    | CustomPromptText
    | CustomPromptIcon
    | CustomPromptSwitch
    | CustomPromptCheckBox
    | CustomPromptButton
    | CustomPromptTextBox
  )[] = []
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
      element.hide()
    }
  }
  public reopen(): void {
    promptBackground.visible = true
    this.closeIcon.visible = true

    for (let element of this.elements) {
      element.show()
    }
  }

  public addText(value: string, posX: number, posY: number, color?: Color4, size?: number) {
    let text = new CustomPromptText(
      value,
      posX,
      posY,
      this.darkTheme,
      color ? color : null,
      size ? size : null
    )

    this.elements.push(text)
    return text
  }

  // add button

  public addButton(
    label: string,
    posX: number,
    posY: number,
    onClick: () => void,
    style?: ButtonStyles
  ) {
    let button = new CustomPromptButton(
      this.texture,
      this.UIOpenTime,
      label,
      posX,
      posY,
      onClick,
      style ? style : null
    )

    this.elements.push(button)
    return button
  }

  public addCheckbox(
    label: string,
    posX: number,
    posY: number,
    onCheck?: () => void,
    onUncheck?: () => void,
    large?: boolean,
    startChecked?: boolean
  ) {
    let checkBox = new CustomPromptCheckBox(
      this.texture,
      this.darkTheme,
      label,
      posX,
      posY,
      onCheck ? onCheck : null,
      onUncheck ? onUncheck : null,
      large ? large : null,
      startChecked ? startChecked : null
    )

    this.elements.push(checkBox)
    return checkBox
  }

  public addSwitch(
    label: string,
    posX: number,
    posY: number,
    onCheck?: () => void,
    onUncheck?: () => void,
    style?: SwitchStyles,
    startChecked?: boolean
  ) {
    let uiswitch = new CustomPromptSwitch(
      this.texture,
      this.darkTheme,
      label,
      posX,
      posY,
      onCheck ? onCheck : null,
      onUncheck ? onUncheck : null,
      style ? style : null,
      startChecked ? startChecked : null
    )

    this.elements.push(uiswitch)
    return uiswitch
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

    let icon = new CustomPromptIcon(
      iconTexture,
      xOffset,
      yOffset,
      width ? width : null,
      height ? height : null,
      section ? section : null
    )

    this.elements.push(icon)
    return icon
  }

  public addTextBox(
    posX: number,
    posY: number,
    placeholder?: string,
    onChange?: (e: string) => void
  ) {
    let texBox = new CustomPromptTextBox(
      posX,
      posY,
      placeholder ? placeholder : null,
      onChange ? onChange : null
    )

    this.elements.push(texBox)
    return texBox
  }
}

export class CustomPromptButton extends Entity {
  label: UIText
  image: UIImage
  constructor(
    texture: Texture,
    UIOpenTime: number,
    label: string,
    posX: number,
    posY: number,
    onClick: () => void,
    style?: ButtonStyles
  ) {
    super()
    this.image = new UIImage(promptBackground, texture)
    this.image.positionX = posX
    this.image.positionY = posY
    this.image.width = 174
    this.image.height = 46

    this.label = new UIText(this.image)

    if (style) {
      switch (style) {
        case ButtonStyles.E:
          setSection(this.image, resources.buttons.buttonE)
          this.label.positionX = 25
          break
        case ButtonStyles.F:
          setSection(this.image, resources.buttons.buttonF)
          this.label.positionX = 25
          break
        case ButtonStyles.ROUNDBLACK:
          setSection(this.image, resources.buttons.roundBlack)
          break
        case ButtonStyles.ROUNDWHITE:
          setSection(this.image, resources.buttons.roundWhite)
          break
        case ButtonStyles.ROUNDSILVER:
          setSection(this.image, resources.buttons.roundSilver)
          break
        case ButtonStyles.ROUNDGOLD:
          setSection(this.image, resources.buttons.roundGold)
          break
        case ButtonStyles.SQUAREBLACK:
          setSection(this.image, resources.buttons.squareBlack)
          break
        case ButtonStyles.SQUAREWHITE:
          setSection(this.image, resources.buttons.squareWhite)
          break
        case ButtonStyles.SQUARESILVER:
          setSection(this.image, resources.buttons.squareSilver)
          break
        case ButtonStyles.SQUAREGOLD:
          setSection(this.image, resources.buttons.squareGold)
          break
      }
    } else {
      setSection(this.image, resources.buttons.roundSilver)
    }

    this.label.value = label
    this.label.hTextAlign = 'center'
    this.label.vTextAlign = 'center'
    this.label.fontSize = 20
    this.label.font = SFFont
    this.label.color =
      style == ButtonStyles.ROUNDWHITE || style == ButtonStyles.SQUAREWHITE
        ? Color4.Black()
        : Color4.White()
    this.label.isPointerBlocker = false

    this.image.onClick = new OnClick(() => {
      onClick()
    })

    if (style == ButtonStyles.E) {
      Input.instance.subscribe('BUTTON_DOWN', ActionButton.PRIMARY, false, (e) => {
        if (this.image.visible && +Date.now() - UIOpenTime > 100) {
          onClick()
        }
      })
    } else if (style == ButtonStyles.F) {
      Input.instance.subscribe('BUTTON_DOWN', ActionButton.SECONDARY, false, (e) => {
        if (this.image.visible && +Date.now() - UIOpenTime > 100) {
          onClick()
        }
      })
    }
  }

  public hide(): void {
    this.image.visible = false
  }

  public show(): void {
    this.image.visible = true
  }

  public grayOut(): void {
    this.label.color = Color4.Gray()
    this.image.isPointerBlocker = false
  }

  public enable(): void {
    this.label.color = Color4.White()
    this.image.isPointerBlocker = true
  }
}

export class CustomPromptCheckBox extends Entity {
  label: UIText
  image: UIImage
  checked: boolean
  private darkTheme: boolean
  private large: boolean
  constructor(
    texture: Texture,
    darkTheme: boolean,
    label: string,
    posX: number,
    posY: number,
    onCheck?: () => void,
    onUncheck?: () => void,
    large?: boolean,
    startChecked?: boolean
  ) {
    super()

    this.checked = startChecked ? true : false
    this.darkTheme = darkTheme
    this.large = large

    this.image = new UIImage(promptBackground, texture)
    this.image.positionX = posX
    this.image.positionY = posY
    this.image.width = large ? 32 : 24
    this.image.height = large ? 32 : 24

    if (this.checked == false) {
      this.check()
    } else {
      this.uncheck()
    }

    this.label = new UIText(this.image)

    this.label.positionX = large ? 40 : 30

    this.label.color = darkTheme ? Color4.White() : Color4.Black()

    this.label.value = label
    this.label.hTextAlign = 'left'
    this.label.vTextAlign = 'center'
    this.label.fontSize = 20
    this.label.font = SFFont
    this.label.isPointerBlocker = false

    this.image.onClick = new OnClick(() => {
      this.checked = !this.checked
      if (this.checked == false) {
        this.check()
      } else {
        this.uncheck()
      }

      this.checked ? onCheck() : onUncheck()
    })
  }

  public hide(): void {
    this.image.visible = false
    this.label.visible = false
  }

  public show(): void {
    this.image.visible = true
    this.label.visible = true
  }

  public check(): void {
    if (this.darkTheme) {
      if (this.large) {
        setSection(this.image, resources.checkboxes.wLargeOff)
      } else {
        setSection(this.image, resources.checkboxes.wOff)
      }
    } else {
      if (this.large) {
        setSection(this.image, resources.checkboxes.dLargeOff)
      } else {
        setSection(this.image, resources.checkboxes.dOff)
      }
    }
  }

  public uncheck(): void {
    if (this.darkTheme) {
      if (this.large) {
        setSection(this.image, resources.checkboxes.wLargeOn)
      } else {
        setSection(this.image, resources.checkboxes.wOn)
      }
    } else {
      if (this.large) {
        setSection(this.image, resources.checkboxes.dLargeOn)
      } else {
        setSection(this.image, resources.checkboxes.dOn)
      }
    }
  }
}

export class CustomPromptSwitch extends Entity {
  label: UIText
  image: UIImage
  checked: boolean
  private darkTheme: boolean
  private style: SwitchStyles
  constructor(
    texture: Texture,
    darkTheme: boolean,
    label: string,
    posX: number,
    posY: number,
    onCheck?: () => void,
    onUncheck?: () => void,
    style?: SwitchStyles,
    startChecked?: boolean
  ) {
    super()

    this.checked = startChecked ? true : false
    this.darkTheme = darkTheme
    this.style = style ? style : SwitchStyles.ROUNDGREEN

    this.image = new UIImage(promptBackground, texture)
    this.image.positionX = posX
    this.image.positionY = posY
    this.image.width = 64
    this.image.height = 32

    if (this.checked == false) {
      this.check()
    } else {
      this.uncheck()
    }

    this.label = new UIText(this.image)

    this.label.positionX = 80

    this.label.color = darkTheme ? Color4.White() : Color4.Black()

    this.label.value = label
    this.label.hTextAlign = 'left'
    this.label.vTextAlign = 'center'
    this.label.fontSize = 20
    this.label.font = SFFont
    this.label.isPointerBlocker = false

    this.image.onClick = new OnClick(() => {
      this.checked = !this.checked
      if (this.checked == false) {
        this.check()
      } else {
        this.uncheck()
      }

      this.checked ? onCheck() : onUncheck()
    })
  }

  public hide(): void {
    this.image.visible = false
    this.label.visible = false
  }

  public show(): void {
    this.image.visible = true
    this.label.visible = true
  }

  public check(): void {
    switch (this.style) {
      case SwitchStyles.ROUNDGREEN:
        setSection(this.image, resources.switches.roundGreen)
        break
      case SwitchStyles.ROUNDRED:
        setSection(this.image, resources.switches.roundRed)
        break
      case SwitchStyles.SQUAREGREEN:
        setSection(this.image, resources.switches.squareGreen)
        break
      case SwitchStyles.SQUARERED:
        setSection(this.image, resources.switches.squareRed)
        break
    }
  }

  public uncheck(): void {
    if (this.style == SwitchStyles.ROUNDGREEN || this.style == SwitchStyles.ROUNDRED) {
      setSection(this.image, resources.switches.roundOff)
    } else {
      setSection(this.image, resources.switches.squareOff)
    }
  }
}

export class CustomPromptIcon extends Entity {
  image: UIImage
  constructor(
    texture: Texture,
    xOffset: number,
    yOffset: number,
    width?: number,
    height?: number,
    section?: ImageSection
  ) {
    super()

    this.image = new UIImage(promptBackground, texture)

    this.image.positionX = xOffset
    this.image.positionY = yOffset
    this.image.width = width ? width : 128
    this.image.height = height ? height : 128
    this.image.sourceLeft = section ? section.sourceLeft : 0
    this.image.sourceTop = section ? section.sourceTop : 0
    this.image.sourceWidth = section ? section.sourceWidth : width ? width : 128
    this.image.sourceHeight = section ? section.sourceHeight : height ? height : 128
  }

  public hide(): void {
    this.image.visible = false
  }

  public show(): void {
    this.image.visible = true
  }
}

export class CustomPromptText extends Entity {
  text: UIText
  constructor(
    value: string,
    posX: number,
    posY: number,
    darkTheme?: boolean,
    color?: Color4,
    size?: number
  ) {
    super()

    this.text = new UIText(promptBackground)
    this.text.value = value
    this.text.positionX = posX ? posX : 0
    this.text.positionY = posY ? posY : 0
    this.text.hTextAlign = 'center'
    this.text.color = color ? color : darkTheme ? Color4.White() : Color4.Black()
    this.text.fontSize = size ? size : 15
  }

  public hide(): void {
    this.text.visible = false
  }

  public show(): void {
    this.text.visible = true
  }
}

export class CustomPromptTextBox extends Entity {
  fillInBox: UIInputText
  currentText: string = ''
  constructor(posX: number, posY: number, placeholder?: string, onChange?: (e: string) => void) {
    super()

    this.fillInBox = new UIInputText(promptBackground)
    this.fillInBox.color = Color4.Black()
    this.fillInBox.font = SFFont
    this.fillInBox.width = 312
    this.fillInBox.height = 46
    this.fillInBox.positionX = posX
    this.fillInBox.positionY = posY
    this.fillInBox.placeholder = placeholder ? placeholder : 'Fill in'
    this.fillInBox.hTextAlign = 'center'
    this.fillInBox.vTextAlign = 'center'
    this.fillInBox.fontSize = 22

    this.fillInBox.onChanged = new OnChanged((x) => {
      if (!this.fillInBox.visible) return
      this.currentText = x.value
      onChange(this.currentText)
    })

    this.fillInBox.onTextSubmit = new OnTextSubmit((x) => {
      if (!this.fillInBox.visible) return
      this.currentText = x.text
      onChange(this.currentText)
    })
  }

  public hide(): void {
    this.fillInBox.visible = false
  }

  public show(): void {
    this.fillInBox.visible = true
  }
}
