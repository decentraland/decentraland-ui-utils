import {
  darkTheme,
  lightTheme,
  promptBackground,
  SFFont,
  SFHeavyFont,
  canvas
} from '../../utils/default-ui-components'
import resources, { buttonIconPos, setSection } from '../../utils/resources'

/**
 * Displays a prompt window with a field that can be filled in
 *
 * @param  {string} title: Notification string
 * @param {(e:string) => void} onAccept: Function that gets executed if player clicks button
 * @param  {string} acceptLabel: String to go in the accept button
 * @param  {string} placeholder: Text to display as placeholder in the fill in box
 * @param {boolean} useDarkTheme: Switch to the dark theme
 *
 */
export class FillInPrompt extends Entity {
  text: UIText
  button: UIImage
  buttonLabel: UIText
  icon: UIImage
  closeIcon: UIImage
  onAccept: (e: string) => void
  EButtonAction: () => false | Subscription[]
  fillInBox: UIInputText
  UIOpenTime: number
  canvas: UICanvas = canvas
  background: UIImage = promptBackground
  constructor(
    title: string,
    onAccept: (e: string) => void,
    acceptLabel?: string,
    placeholder?: string,
    useDarkTheme?: boolean
  ) {
    super()

    this.UIOpenTime = +Date.now()

    this.onAccept = onAccept

    let uiTheme = useDarkTheme ? darkTheme : lightTheme

    promptBackground.source = uiTheme
    promptBackground.width = 400
    promptBackground.height = 250

    setSection(promptBackground, resources.backgrounds.promptBackground)

    promptBackground.visible = true

    this.text = new UIText(promptBackground)

    this.text.value = title //splitTextIntoLines(instructions,30,3)

    this.text.adaptWidth = false
    this.text.textWrapping = true
    this.text.width = 320

    this.text.hAlign = 'center'
    this.text.vAlign = 'top'
    this.text.positionX = 0
    this.text.positionY = -20
    this.text.fontSize = 24
    this.text.font = SFHeavyFont
    this.text.vTextAlign = 'center'
    this.text.hTextAlign = 'center'
    this.text.color = useDarkTheme ? Color4.White() : Color4.Black()

    this.closeIcon = new UIImage(promptBackground, uiTheme)
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
      this.hide()
    })

    this.button = new UIImage(promptBackground, uiTheme)
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
    this.icon.positionX = buttonIconPos(acceptLabel ? acceptLabel.length : 6)

    this.buttonLabel = new UIText(this.button)
    this.buttonLabel.value = acceptLabel ? acceptLabel : 'Submit'
    this.buttonLabel.hTextAlign = 'center'
    this.buttonLabel.vTextAlign = 'center'
    this.buttonLabel.positionX = 30
    this.buttonLabel.fontSize = 18
    this.buttonLabel.font = SFFont
    this.buttonLabel.color = Color4.White()
    this.buttonLabel.isPointerBlocker = false

    this.fillInBox = new UIInputText(promptBackground)
    this.fillInBox.color = Color4.Black()
    this.fillInBox.font = SFFont
    this.fillInBox.width = 312
    this.fillInBox.height = 46
    this.fillInBox.positionX = 0
    this.fillInBox.positionY = 15
    this.fillInBox.placeholder = placeholder ? placeholder : 'Fill in'
    this.fillInBox.hTextAlign = 'center'
    this.fillInBox.vTextAlign = 'center'
    this.fillInBox.fontSize = 22

    let submittedText: string = ''

    this.fillInBox.onChanged = new OnChanged(x => {
      submittedText = x.value
    })

    this.fillInBox.onTextSubmit = new OnTextSubmit(x => {
      //submittedText = x.text
      this.accept(submittedText)
    })

    this.button.onClick = new OnClick(() => {
      this.accept(submittedText)
    })

    this.EButtonAction = Input.instance.subscribe('BUTTON_DOWN', ActionButton.PRIMARY, false, e => {
      if (this.button.visible && +Date.now() - this.UIOpenTime > 100) {
        this.accept(submittedText)
      }
    })
  }

  /**
   * Hides the prompt from view in the screen.
   */
  public close(): void {
    promptBackground.visible = false
    this.closeIcon.visible = false
    this.button.visible = false
    this.text.visible = false
    this.buttonLabel.visible = false
    this.fillInBox.visible = false
    //Input.instance.unsubscribe('BUTTON_DOWN', ActionButton.PRIMARY, this.EButtonAction)
  }

  /**
   * Hides the prompt, but first reads the provided value and runs the onAccept function with it
   */
  public accept(submittedText: string): void {
    this.onAccept(submittedText)

    this.close()
    //Input.instance.unsubscribe('BUTTON_DOWN', ActionButton.PRIMARY, this.EButtonAction)
  }

  /**
   * Hides the prompt from view in the screen.
   */
  public hide(): void {
    promptBackground.visible = false
    this.closeIcon.visible = false
    this.button.visible = false
    this.text.visible = false
    this.buttonLabel.visible = false
    this.fillInBox.visible = false
  }

  /**
   * Makes an invisible prompt visible again.
   */
  public show(): void {
    promptBackground.visible = true
    this.closeIcon.visible = true
    this.button.visible = true
    this.text.visible = true
    this.buttonLabel.visible = true
    this.fillInBox.visible = true
  }
}
