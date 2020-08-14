import {
  darkTheme,
  lightTheme,
  promptBackground,
  SFFont,
  PlayOpenSound,
  PlayCloseSound
} from '../../utils/default-ui-comopnents'

/**
 * Displays a number on the center of the UI
 *
 * @param instructions: Notification string
 * @param onAccept: Function that gets executed if player clicks button
 * @param acceptLabel: String to go in the accept button
 * @param useDarkTheme: Switch to the dark theme
 *
 */
export class OkPrompt extends Entity {
  text: UIText
  button: UIImage
  buttonLabel: UIText
  closeIcon: UIImage
  onAccept: () => void
  EButtonAction: () => false | Subscription[]
  constructor(
    instructions: string,
    onAccept: () => void,
    acceptLabel?: string,
    useDarkTheme?: boolean
  ) {
    super()

    this.onAccept = onAccept

    let uiTheme = useDarkTheme ? darkTheme : lightTheme

    promptBackground.source = uiTheme
    promptBackground.width = 400
    promptBackground.height = 250

    promptBackground.sourceTop = 12
    promptBackground.sourceLeft = 501
    promptBackground.sourceWidth = 416
    promptBackground.sourceHeight = 352

    promptBackground.visible = true

    this.closeIcon = new UIImage(promptBackground, uiTheme)
    this.closeIcon.positionX = 175
    this.closeIcon.positionY = 100
    this.closeIcon.width = 32
    this.closeIcon.height = 32
    this.closeIcon.sourceHeight = 32
    this.closeIcon.sourceWidth = 32
    this.closeIcon.sourceTop = 306
    this.closeIcon.sourceLeft = useDarkTheme ? 942 : 986

    this.closeIcon.onClick = new OnClick(() => {
      PlayCloseSound()
      this.close()
    })

    this.text = new UIText(promptBackground)

    this.text.value = instructions //splitTextIntoLines(instructions,30,3)

    this.text.adaptWidth = false
    this.text.textWrapping = true
    this.text.width = 380

    this.text.hAlign = 'center'
    this.text.vAlign = 'top'
    this.text.positionX = 0
    this.text.positionY = -70
    this.text.fontSize = 24
    this.text.vTextAlign = 'center'
    this.text.hTextAlign = 'center'
    this.text.color = useDarkTheme ? Color4.White() : Color4.Black()

    this.button = new UIImage(promptBackground, uiTheme)
    this.button.positionX = 0
    this.button.positionY = -50
    this.button.width = 174
    this.button.height = 46
    this.button.sourceWidth = 174
    this.button.sourceHeight = 46
    this.button.sourceTop = 662
    this.button.sourceLeft = 512

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
      if (this.button.visible) {
        this.accept()
      }
    })
  }

  public close(): void {
    promptBackground.visible = false
    this.closeIcon.visible = false
    this.button.visible = false
    this.text.visible = false
    this.buttonLabel.visible = false
    //Input.instance.unsubscribe('BUTTON_DOWN', ActionButton.PRIMARY, this.EButtonAction)
  }

  public accept(): void {
    this.onAccept()

    this.close()
    PlayOpenSound()
    //Input.instance.unsubscribe('BUTTON_DOWN', ActionButton.PRIMARY, this.EButtonAction)
  }
}
