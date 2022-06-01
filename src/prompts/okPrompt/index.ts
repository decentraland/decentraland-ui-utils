import {
  darkTheme,
  lightTheme,
  SFFont,
  canvas
} from '../../utils/default-ui-components'
import resources, { buttonIconPos, setSection } from '../../utils/resources'

/**
 * Displays a prompt window with a custom string and an OK button
 *
 * @param  {string} instructions: Notification string
 * @param {() => void} onAccept: Function that gets executed if player clicks button
 * @param  {string} acceptLabel: String to go in the accept button
 * @param {boolean} useDarkTheme: Switch to the dark theme
 *
 */
export class OkPrompt extends Entity {
  text: UIText
  button: UIImage
  buttonLabel: UIText
  icon: UIImage
  closeIcon: UIImage
  onAccept: null | (() => void)
  EButtonAction: () => void | Subscription[]
  UIOpenTime: number
  canvas: UICanvas = canvas
  background: UIImage
  constructor(
    instructions: string,
    onAccept?: () => void,
    acceptLabel?: string,
    useDarkTheme?: boolean
  ) {
    super()

    this.UIOpenTime = +Date.now()

    this.background = new UIImage(canvas, lightTheme)
    this.background.hAlign = 'center'
    this.background.vAlign = 'center'

    this.onAccept = onAccept ? onAccept : null

    let uiTheme = useDarkTheme ? darkTheme : lightTheme

    this.background.source = uiTheme
    this.background.width = 400
    this.background.height = 250
    this.background.positionY = 0

    setSection(this.background, resources.backgrounds.promptBackground)

    this.background.visible = true

    this.closeIcon = new UIImage(this.background, uiTheme)
    this.closeIcon.positionX = 175
    this.closeIcon.positionY = 100
    this.closeIcon.width = 32
    this.closeIcon.height = 32
    if (useDarkTheme) {
      setSection(this.closeIcon, resources.icons.closeW)
    } else {
      setSection(this.closeIcon, resources.icons.closeD)
    }

    this.closeIcon.onClick = new OnClick(() => {
      this.close()
    })

    this.text = new UIText(this.background)

    this.text.value = instructions //splitTextIntoLines(instructions,30,3)

    this.text.adaptWidth = false
    this.text.textWrapping = true
    this.text.width = 380

    this.text.hAlign = 'center'
    this.text.vAlign = 'top'
    this.text.positionX = 0
    this.text.positionY = -65
    this.text.fontSize = 24
    this.text.font = SFFont
    this.text.vTextAlign = 'center'
    this.text.hTextAlign = 'center'
    this.text.color = useDarkTheme ? Color4.White() : Color4.Black()

    this.button = new UIImage(this.background, uiTheme)
    this.button.positionX = 0
    this.button.positionY = -60
    this.button.width = 174
    this.button.height = 46
    setSection(this.button, resources.buttons.buttonE)

    this.icon = new UIImage(this.button, useDarkTheme == true ? darkTheme : lightTheme)
    this.icon.width = 26
    this.icon.height = 26
    this.icon.hAlign = 'center'
    this.icon.vAlign = 'center'
    this.icon.isPointerBlocker = false
    setSection(this.icon, resources.buttonLabels.E)
    this.icon.positionX = buttonIconPos(acceptLabel ? acceptLabel.length : 2)

    this.buttonLabel = new UIText(this.button)
    this.buttonLabel.value = acceptLabel ? acceptLabel : 'Ok'
    this.buttonLabel.hTextAlign = 'center'
    this.buttonLabel.vTextAlign = 'center'
    this.buttonLabel.positionX = 30
    this.buttonLabel.fontSize = 18
    this.buttonLabel.font = SFFont
    this.buttonLabel.color = Color4.White()
    this.buttonLabel.isPointerBlocker = false

    this.button.onClick = new OnClick(() => {
      this.accept()
    })

    this.EButtonAction = Input.instance.subscribe('BUTTON_DOWN', ActionButton.PRIMARY, false, e => {
      if (this.button.visible && +Date.now() - this.UIOpenTime > 100) {
        this.accept()
      }
    })
  }

  /**
   * Hides the prompt from view in the screen.
   */
  public close(): void {
    this.background.visible = false
    this.closeIcon.visible = false
    this.button.visible = false
    this.text.visible = false
    this.buttonLabel.visible = false
  }

  /**
   * Runs the onAccept function, then hides the prompt from view in the screen.
   */
  public accept(): void {
    if (this.onAccept) {
      this.onAccept()
    }

    this.hide()
  }

  /**
   * Hides the prompt from view in the screen.
   */
  public hide(): void {
    this.background.visible = false
    this.closeIcon.visible = false
    this.button.visible = false
    this.text.visible = false
    this.buttonLabel.visible = false
    Input.instance.unsubscribe('BUTTON_DOWN', ActionButton.PRIMARY, this.EButtonAction)
  }

  /**
   * Makes an invisible prompt visible again.
   */
  public show(): void {
    this.background.visible = true
    this.closeIcon.visible = true
    this.button.visible = true
    this.text.visible = true
    this.buttonLabel.visible = true
    Input.instance.subscribe('BUTTON_DOWN', ActionButton.PRIMARY, false, this.EButtonAction)
  }
}
