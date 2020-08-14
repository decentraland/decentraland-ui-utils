import {
  darkTheme,
  lightTheme,
  promptBackground,
  SFFont,
  PlayOpenSound,
  PlayCloseSound,
  SFHeavyFont
} from '../../utils/default-ui-comopnents'

/**
 * Displays a number on the center of the UI
 * @param title: Header on dialog
 * @param instructions: Smaller print instructions
 * @param onAccept: Function that gets executed if player clicks accept
 * @param onReject: Function that gets executed if player clicks reject
 * @param acceptLabel: String to go in the accept button
 * @param rejectLabel: String to go in the reject button
 * @param useDarkTheme: Switch to the dark theme
 *
 */
export class OptionPrompt extends Entity {
  title: UIText
  text: UIText
  buttonE: UIImage
  buttonELabel: UIText
  buttonF: UIImage
  buttonFLabel: UIText
  closeIcon: UIImage
  onAccept: () => void
  onReject: () => void
  EButtonAction: () => false | Subscription[]
  FButtonAction: () => false | Subscription[]
  constructor(
    title: string,
    instructions: string,
    onAccept: () => void,
    onReject: () => void,
    acceptLabel?: string,
    rejectLabel?: string,
    useDarkTheme?: boolean
  ) {
    super()

    this.onAccept = onAccept
    this.onReject = onReject

    let uiTheme = useDarkTheme ? darkTheme : lightTheme

    promptBackground.source = uiTheme
    promptBackground.width = 480
    promptBackground.height = 384

    promptBackground.sourceTop = 12
    promptBackground.sourceLeft = 7
    promptBackground.sourceWidth = 480
    promptBackground.sourceHeight = 384

    promptBackground.visible = true

    this.closeIcon = new UIImage(promptBackground, uiTheme)
    this.closeIcon.positionX = 175 + 40
    this.closeIcon.positionY = 100 + 64
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

    this.title = new UIText(promptBackground)

    this.title.value = title

    this.title.adaptWidth = false
    this.title.textWrapping = true
    this.title.width = 380

    this.title.hAlign = 'center'
    this.title.vAlign = 'top'
    this.title.positionX = 0
    this.title.positionY = -20
    this.title.font = SFHeavyFont
    this.title.fontSize = 24
    this.title.vTextAlign = 'center'
    this.title.hTextAlign = 'center'
    this.title.color = useDarkTheme ? Color4.White() : Color4.Black()

    this.text = new UIText(promptBackground)

    this.text.value = instructions

    this.text.adaptWidth = false
    this.text.textWrapping = true
    this.text.width = 380

    this.text.hAlign = 'center'
    this.text.vAlign = 'top'
    this.text.positionX = 0
    this.text.positionY = -145
    this.text.fontSize = 24
    this.text.font = SFFont
    this.text.vTextAlign = 'center'
    this.text.hTextAlign = 'center'
    this.text.color = useDarkTheme ? Color4.White() : Color4.Black()

    this.buttonE = new UIImage(promptBackground, uiTheme)
    this.buttonE.positionX = 90
    this.buttonE.positionY = -120
    this.buttonE.width = 174
    this.buttonE.height = 46
    this.buttonE.sourceWidth = 174
    this.buttonE.sourceHeight = 46
    this.buttonE.sourceTop = 662
    this.buttonE.sourceLeft = 512

    this.buttonELabel = new UIText(this.buttonE)
    this.buttonELabel.value = acceptLabel ? acceptLabel : 'Ok'
    this.buttonELabel.hTextAlign = 'center'
    this.buttonELabel.vTextAlign = 'center'
    this.buttonELabel.positionX = 30
    this.buttonELabel.fontSize = 18
    this.buttonELabel.font = SFFont
    this.buttonELabel.color = Color4.White()
    this.buttonELabel.isPointerBlocker = false

    this.buttonE.onClick = new OnClick(() => {
      this.accept()
    })

    this.EButtonAction = Input.instance.subscribe('BUTTON_DOWN', ActionButton.PRIMARY, false, e => {
      if (this.buttonE.visible) {
        this.accept()
      }
    })

    this.buttonF = new UIImage(promptBackground, uiTheme)
    this.buttonF.positionX = -90
    this.buttonF.positionY = -120
    this.buttonF.width = 174
    this.buttonF.height = 46
    this.buttonF.sourceWidth = 174
    this.buttonF.sourceHeight = 46
    this.buttonF.sourceTop = 612
    this.buttonF.sourceLeft = 512

    this.buttonFLabel = new UIText(this.buttonF)
    this.buttonFLabel.value = rejectLabel ? rejectLabel : 'Cancel'
    this.buttonFLabel.hTextAlign = 'center'
    this.buttonFLabel.vTextAlign = 'center'
    this.buttonFLabel.positionX = 30
    this.buttonFLabel.fontSize = 18
    this.buttonFLabel.font = SFFont
    this.buttonFLabel.color = Color4.White()
    this.buttonFLabel.isPointerBlocker = false

    this.buttonF.onClick = new OnClick(() => {
      this.reject()
    })

    this.FButtonAction = Input.instance.subscribe(
      'BUTTON_DOWN',
      ActionButton.SECONDARY,
      false,
      e => {
        if (this.buttonF.visible) {
          this.reject()
        }
      }
    )
  }

  public close(): void {
    promptBackground.visible = false
    this.closeIcon.visible = false
    this.buttonE.visible = false
    this.buttonF.visible = false
    this.text.visible = false
    this.buttonELabel.visible = false
    this.buttonFLabel.visible = false
    this.title.visible = false
    //Input.instance.unsubscribe('BUTTON_DOWN', ActionButton.PRIMARY, this.EButtonAction)
  }

  public accept(): void {
    this.onAccept()

    this.close()
    PlayOpenSound()
    //Input.instance.unsubscribe('BUTTON_DOWN', ActionButton.PRIMARY, this.EButtonAction)
  }

  public reject(): void {
    this.onReject()

    this.close()
    PlayCloseSound()
    //Input.instance.unsubscribe('BUTTON_DOWN', ActionButton.PRIMARY, this.EButtonAction)
  }
}
