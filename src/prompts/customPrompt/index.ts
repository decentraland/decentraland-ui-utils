import resources, { setSection, buttonIconPos } from '../../utils/resources'
import {
  darkTheme,
  lightTheme,
  promptBackground,
  SFFont,
  canvas
} from '../../utils/default-ui-components'
import { PromptStyles, ButtonStyles, SwitchStyles, ImageSection } from '../../utils/types'

/**
 * Creates a prompt object that includes a background and a close icon, and supports adding as many custom UI elements as desired
 *
 * @param {PromptStyles| string} style: Pick from a few predefined options of color, shape and size, or provide the string path to a custom image
 * @param {number} width Background width
 * @param {number} height Background height
 * @param {boolean} startHidden If true, prompt starts invisible to load in the background till calling the `show()` function of the prompt object.
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
  texture: Texture = lightTheme
  darkTheme: boolean = false
  background: UIImage = new UIImage(canvas, lightTheme)
  closeIcon: UIImage = new UIImage(this.background, this.texture)
  UIOpenTime: number = 0
  canvas: UICanvas = canvas

  constructor(
    style?: PromptStyles | string,
    width?: number,
    height?: number,
    startHidden?: boolean
  ) {
    super()

    this.UIOpenTime = +Date.now()

    this.background = new UIImage(canvas, lightTheme)
    this.background.hAlign = 'center'
    this.background.vAlign = 'center'

    switch (style) {
      case PromptStyles.LIGHT:
        this.texture = lightTheme
        setSection(this.background, resources.backgrounds.promptBackground)
        setSection(this.closeIcon, resources.icons.closeD)
        this.closeIcon.positionX = width ? width / 2 - 25 : 175
        this.closeIcon.positionY = height ? height / 2 - 25 : 145
        break
      case PromptStyles.DARK:
        this.texture = darkTheme
        this.darkTheme = true
        setSection(this.background, resources.backgrounds.promptBackground)
        setSection(this.closeIcon, resources.icons.closeW)
        this.closeIcon.positionX = width ? width / 2 - 25 : 175
        this.closeIcon.positionY = height ? height / 2 - 25 : 145
        break
      case PromptStyles.LIGHTLARGE:
        this.texture = lightTheme
        setSection(this.background, resources.backgrounds.promptLargeBackground)
        setSection(this.closeIcon, resources.icons.closeD)
        this.closeIcon.positionX = width ? width / 2 - 25 : 175 + 40
        this.closeIcon.positionY = height ? height / 2 - 25 : 145 + 20
        break
      case PromptStyles.DARKLARGE:
        this.texture = darkTheme
        this.darkTheme = true
        setSection(this.background, resources.backgrounds.promptLargeBackground)
        setSection(this.closeIcon, resources.icons.closeW)
        this.closeIcon.positionX = width ? width / 2 - 25 : 175 + 40
        this.closeIcon.positionY = height ? height / 2 - 25 : 145 + 20
        break
      case PromptStyles.LIGHTSLANTED:
        this.texture = lightTheme
        setSection(this.background, resources.backgrounds.promptSlantedBackground)
        setSection(this.closeIcon, resources.icons.closeD)
        this.closeIcon.positionX = width ? width / 2 - 25 : 175 + 40
        this.closeIcon.positionY = height ? height / 2 - 25 : 100 + 38
        break

      case PromptStyles.DARKSLANTED:
        this.texture = darkTheme
        this.darkTheme = true
        setSection(this.background, resources.backgrounds.promptSlantedBackground)
        setSection(this.closeIcon, resources.icons.closeW)
        this.closeIcon.positionX = width ? width / 2 - 25 : 175 + 40
        this.closeIcon.positionY = height ? height / 2 - 25 : 100 + 38
        break
      default:
        this.texture = new Texture(style)
        this.closeIcon.visible = false
    }
    this.background.source = this.texture

    this.background.width = width ? width : this.background.sourceWidth
    this.background.height = height ? height : this.background.sourceHeight
    this.background.visible = true

    this.closeIcon.width = 32
    this.closeIcon.height = 32
    this.closeIcon.source = this.texture

    this.closeIcon.onClick = new OnClick(() => {
      this.hide()
    })

    if (startHidden) {
      this.hide()
    }
  }

  /**
   * Hides the prompt from view in the screen.
   */
  public hide(): void {
    this.background.visible = false
    this.closeIcon.visible = false

    for (let element of this.elements) {
      element.hide()
    }
  }
  /**
   * Makes an invisible prompt visible again.
   */
  public show(): void {
    this.background.visible = true
    this.closeIcon.visible = true

    for (let element of this.elements) {
      element.show()
    }
  }

  /**
   * Adds a text UI element to the custom prompt
   * @param {string} value Text to display
   * @param {number} [posX=0] Position on X on the prompt, counting from the center of the prompt
   * @param {number} [posY=0] Position on Y on the prompt, counting from the center of the prompt
   * @param {Color4} color Color of the text. By default black over light themes and white over dark themes
   * @param {number} size Font size
   */
  public addText(value: string, posX: number, posY: number, color?: Color4, size?: number) {
    let text = new CustomPromptText(
      this,
      value,
      posX,
      posY,
      this.darkTheme,
      color ? color : undefined,
      size ? size : undefined
    )

    this.elements.push(text)
    return text
  }

  /**
   * Adds a button UI element to the custom prompt
   * @param {string} label Text to display as a label
   * @param {number} [posX=0] Position on X on the prompt, counting from the center of the prompt
   * @param {number} [posY=0] Position on Y on the prompt, counting from the center of the prompt
   * @param {() => void} onClick Function to call every time the button is clicked
   * @param {ButtonStyles} style Appearance of the button, selecting from several predefined options for different colors and shapes
   */
  public addButton(
    label: string,
    posX: number,
    posY: number,
    onClick: () => void,
    style?: ButtonStyles
  ) {
    let button = new CustomPromptButton(
      this,
      this.texture,
      this.UIOpenTime,
      label,
      posX,
      posY,
      onClick,
      style ? style : undefined
    )

    this.elements.push(button)
    return button
  }

  /**
   * Adds a checkbox UI element to the custom prompt
   * @param {string} label Text to display on the right of the box
   * @param {number} [posX=0] Position on X on the prompt, counting from the center of the prompt
   * @param {number} [posY=0] Position on Y on the prompt, counting from the center of the prompt
   * @param {() => void} onCheck Function to call every time the box is checked
   * @param {() => void} onUncheck Function to call every time the box is unchecked
   * @param {ButtonStyles} style Appearance of the button, selecting from several predefined options for different colors and shapes
   * @param {boolean} large Makes the checkbox significantly larger
   * @param {boolean} startChecked Starts the checkbox in a default state of already checked
   */
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
      this,
      this.texture,
      this.darkTheme,
      label,
      posX,
      posY,
      onCheck ? onCheck : undefined,
      onUncheck ? onUncheck : undefined,
      large ? large : undefined,
      startChecked ? startChecked : undefined
    )

    this.elements.push(checkBox)
    return checkBox
  }

  /**
   * Adds a switch UI element to the custom prompt
   * @param {string} label Text to display on the right of the switch
   * @param {number} [posX=0] Position on X on the prompt, counting from the center of the prompt
   * @param {number} [posY=0] Position on Y on the prompt, counting from the center of the prompt
   * @param {() => void} onCheck Function to call every time the switch is activated
   * @param {() => void} onUncheck Function to call every time the switch is deactivated
   * @param {SwitchStyles} style Appearance of the switch, selecting from several predefined options for different colors and shapes
   * @param {boolean} startChecked Starts the switch in a default state of already activated
   */
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
      this,
      this.texture,
      this.darkTheme,
      label,
      posX,
      posY,
      onCheck ? onCheck : undefined,
      onUncheck ? onUncheck : undefined,
      style ? style : undefined,
      startChecked ? startChecked : undefined
    )

    this.elements.push(uiswitch)
    return uiswitch
  }

  /**
   * Adds a switch UI element to the custom prompt
   * @param {string} image Path to the image file
   * @param {number} [xOffset=0] Position on X on the prompt, counting from the center of the prompt
   * @param {number} [yOffset=0] Position on Y on the prompt, counting from the center of the prompt
   * @param {number} [width=0] Width of the image
   * @param {number} [height=0] Height of the image
   * @param {ImageSection} section ImageSection object to specify a specific region of the image file
   */
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
      this,
      iconTexture,
      xOffset,
      yOffset,
      width ? width : undefined,
      height ? height : undefined,
      section ? section : undefined
    )

    this.elements.push(icon)
    return icon
  }

  /**
   * Adds a textbox UI element to the custom prompt, for the player to fill in an input value
   * @param {number} [posX=0] Position on X on the prompt, counting from the center of the prompt
   * @param {number} [posY=0] Position on Y on the prompt, counting from the center of the prompt
   * @param {string} placeholder Default string to display in the box
   * @param {e: string => void} onChange Function to call every time the value in the text box is modified by the player
   */
  public addTextBox(
    posX: number,
    posY: number,
    placeholder?: string,
    onChange?: (e: string) => void
  ) {
    let texBox = new CustomPromptTextBox(
      this,
      posX,
      posY,
      placeholder ? placeholder : undefined,
      onChange ? onChange : undefined
    )

    this.elements.push(texBox)
    return texBox
  }
}

/**
 * A button UI element to use in a custom prompt
 */
export class CustomPromptButton extends Entity {
  label: UIText
  image: UIImage
  icon: UIImage | null = null
  constructor(
    parent: CustomPrompt,
    texture: Texture,
    UIOpenTime: number,
    label: string,
    posX: number,
    posY: number,
    onClick: () => void,
    style?: ButtonStyles
  ) {
    super()
    this.image = new UIImage(parent.background, texture)
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
          this.icon = new UIImage(this.image, texture)
          this.icon.width = 26
          this.icon.height = 26
          this.icon.hAlign = 'center'
          this.icon.vAlign = 'center'
          this.icon.isPointerBlocker = false
          setSection(this.icon, resources.buttonLabels.E)
          this.icon.positionX = buttonIconPos(label.length)
          break
        case ButtonStyles.F:
          setSection(this.image, resources.buttons.buttonF)
          this.label.positionX = 25
          this.icon = new UIImage(this.image, texture)
          this.icon.width = 26
          this.icon.height = 26
          this.icon.hAlign = 'center'
          this.icon.vAlign = 'center'
          this.icon.isPointerBlocker = false
          setSection(this.icon, resources.buttonLabels.F)
          this.icon.positionX = buttonIconPos(label.length)
          break
        case ButtonStyles.RED:
          setSection(this.image, resources.buttons.buttonRed)
          break
        case ButtonStyles.DARK:
          setSection(this.image, resources.buttons.buttonDark)
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
        default:
          setSection(this.image, resources.buttons.roundSilver)
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
      Input.instance.subscribe('BUTTON_DOWN', ActionButton.PRIMARY, false, e => {
        if (this.image.visible && +Date.now() - UIOpenTime > 100) {
          onClick()
        }
      })
    } else if (style == ButtonStyles.F) {
      Input.instance.subscribe('BUTTON_DOWN', ActionButton.SECONDARY, false, e => {
        if (this.image.visible && +Date.now() - UIOpenTime > 100) {
          onClick()
        }
      })
    }
  }

  /**
   * Hides the item from view in the screen. It can't be clicked while invisible.
   */
  public hide(): void {
    this.image.visible = false
  }

  /**
   * Makes an invisible item visible again.
   */
  public show(): void {
    this.image.visible = true
  }

  /**
   * Grays out the item so it can't be clicked.
   */
  public grayOut(): void {
    this.label.color = Color4.Gray()
    this.image.isPointerBlocker = false
    if (this.icon) {
      this.icon.visible = false
    }
  }

  /**
   * The opposite action of graying out, so it can't be clicked again.
   */
  public enable(): void {
    this.label.color = Color4.White()
    this.image.isPointerBlocker = true
    if (this.icon) {
      this.icon.visible = true
    }
  }
}

/**
 * A checkbox UI element to use in a custom prompt
 */
export class CustomPromptCheckBox extends Entity {
  label: UIText
  image: UIImage
  checked: boolean
  private darkTheme: boolean
  private large: boolean
  constructor(
    parent: CustomPrompt,
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
    this.large = large ? large : false

    this.image = new UIImage(parent.background, texture)
    this.image.positionX = posX
    this.image.positionY = posY
    this.image.width = large ? 32 : 24
    this.image.height = large ? 32 : 24

    if (this.checked == false) {
      this.uncheck()
    } else {
      this.check()
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
      //this.checked = !this.checked
      if (this.checked == false) {
        this.check()
      } else {
        this.uncheck()
      }

      this.checked ? (onCheck ? onCheck() : null) : onUncheck ? onUncheck() : null
    })
  }

  /**
   * Hides the item from view in the screen. It can't be clicked while invisible.
   */
  public hide(): void {
    this.image.visible = false
    this.label.visible = false
  }

  /**
   * Makes an invisible item visible again.
   */
  public show(): void {
    this.image.visible = true
    this.label.visible = true
  }

  /**
   * Sets the box state to checked.
   */
  public uncheck(): void {
    this.checked = false
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

  /**
   * Sets the box state to unchecked.
   */
  public check(): void {
    this.checked = true
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

/**
 * A switch UI element to use in a custom prompt
 */
export class CustomPromptSwitch extends Entity {
  label: UIText
  image: UIImage
  checked: boolean
  private darkTheme: boolean
  private style: SwitchStyles
  constructor(
    parent: CustomPrompt,
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

    this.image = new UIImage(parent.background, texture)
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
      //this.checked = !this.checked
      if (this.checked == false) {
        this.check()
      } else {
        this.uncheck()
      }

      this.checked ? (onCheck ? onCheck() : null) : onUncheck ? onUncheck() : null
    })
  }

  /**
   * Hides the item from view in the screen. It can't be clicked while invisible.
   */
  public hide(): void {
    this.image.visible = false
    this.label.visible = false
  }

  /**
   * Makes an invisible item visible again.
   */
  public show(): void {
    this.image.visible = true
    this.label.visible = true
  }

  /**
   * Sets the switch state to activated.
   */
  public check(): void {
    this.checked = true
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

  /**
   * Sets the switch state to deactivated.
   */
  public uncheck(): void {
    this.checked = false
    if (this.style == SwitchStyles.ROUNDGREEN || this.style == SwitchStyles.ROUNDRED) {
      setSection(this.image, resources.switches.roundOff)
    } else {
      setSection(this.image, resources.switches.squareOff)
    }
  }
}

/**
 * An icon UI element to use in a custom prompt, by default 128x128 pixels.
 */
export class CustomPromptIcon extends Entity {
  image: UIImage
  constructor(
    parent: CustomPrompt,
    texture: Texture,
    xOffset: number,
    yOffset: number,
    width?: number,
    height?: number,
    section?: ImageSection
  ) {
    super()

    this.image = new UIImage(parent.background, texture)

    this.image.positionX = xOffset
    this.image.positionY = yOffset
    this.image.width = width ? width : 128
    this.image.height = height ? height : 128
    this.image.sourceLeft = section && section.sourceLeft ? section.sourceLeft : 0
    this.image.sourceTop = section && section.sourceTop ? section.sourceTop : 0
    this.image.sourceWidth =
      section && section.sourceWidth ? section.sourceWidth : width ? width : 128
    this.image.sourceHeight =
      section && section.sourceHeight ? section.sourceHeight : height ? height : 128
  }

  /**
   * Hides the item from view in the screen.
   */
  public hide(): void {
    this.image.visible = false
  }

  /**
   * Makes an invisible item visible again.
   */
  public show(): void {
    this.image.visible = true
  }
}

/**
 * A text UI element to use in a custom prompt
 */
export class CustomPromptText extends Entity {
  text: UIText
  constructor(
    parent: CustomPrompt,
    value: string,
    posX: number,
    posY: number,
    darkTheme?: boolean,
    color?: Color4,
    size?: number
  ) {
    super()

    this.text = new UIText(parent.background)
    this.text.value = value
    this.text.positionX = posX ? posX : 0
    this.text.positionY = posY ? posY : 0
    this.text.hTextAlign = 'center'
    this.text.color = color ? color : darkTheme ? Color4.White() : Color4.Black()
    this.text.fontSize = size ? size : 15
  }

  /**
   * Hides the item from view in the screen.
   */
  public hide(): void {
    this.text.visible = false
  }

  /**
   * Makes an invisible item visible again.
   */
  public show(): void {
    this.text.visible = true
  }
}

/**
 * A textbox UI element to use in a custom prompt
 */
export class CustomPromptTextBox extends Entity {
  fillInBox: UIInputText
  currentText: string = ''
  constructor(
    parent: CustomPrompt,
    posX: number,
    posY: number,
    placeholder?: string,
    onChange?: (e: string) => void
  ) {
    super()

    this.fillInBox = new UIInputText(parent.background)
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

    this.fillInBox.onChanged = new OnChanged(x => {
      if (this.fillInBox && !this.fillInBox.visible) return
      this.currentText = x.value
      if (onChange) {
        onChange(this.currentText)
      }
    })

    this.fillInBox.onTextSubmit = new OnTextSubmit(x => {
      if (this.fillInBox && !this.fillInBox.visible) return
      this.currentText = x.text
      if (onChange) {
        onChange(this.currentText)
      }
    })
  }

  /**
   * Hides the item from view in the screen. It can't be clicked while invisible.
   */
  public hide(): void {
    this.fillInBox.visible = false
  }

  /**
   * Makes an invisible item visible again.
   */
  public show(): void {
    this.fillInBox.visible = true
  }
}
