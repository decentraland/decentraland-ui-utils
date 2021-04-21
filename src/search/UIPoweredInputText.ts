import { InitialUIProperties, UIBase } from "./commons/UIBase"

/**
 * This is a UIInputText, but wrapped on a simpler interface
 */
export class UIPoweredInputText extends UIBase<UIInputText> {

  private static readonly DEFAULT_WAIT_TIME = 650
  private readonly placeholder: string
  private readonly placeholderColor: Color4
  private readonly color: Color4
  private inputValue: string = ''
  private isInputFocused: boolean = false

  constructor(parent: UIShape, initialProperties: InitialProperties) {
    super(new UIInputText(parent), {
      ...initialProperties,
      placeholder: initialProperties?.placeholder ?? initialProperties?.value,
      placeholderColor: initialProperties?.placeholderColor ?? initialProperties?.color,
      onFocus: new OnFocus(() => {
        this.isInputFocused = true
        initialProperties?.onFocus?.()
      }),
      onBlur: new OnBlur(() => {
        this.isInputFocused = false
        if (this.inputValue === '' && this.placeholder !== undefined) {
          this.setInputValue(this.placeholder)
          initialProperties?.onBlur?.(true)
        } else {
          initialProperties?.onBlur?.(false)
        }
      }),
      onChanged: new OnChanged(({ value }) => {
        if (this.shape.visible) {
          this.inputValue = value
          if (value === this.placeholder) {
            this.shape.placeholderColor = this.placeholderColor
          } else {
            if (value === '') {
              this.shape.placeholderColor = this.color
              this.shape.placeholder = ''
            }
            if (this.isInputFocused || value === '') {
              const waitTime = initialProperties?.waitTime ?? UIPoweredInputText.DEFAULT_WAIT_TIME
              //@ts-ignore
              setTimeout(() => { // We are adding a waiting time, so if someone is writing a long text, we don't report the event on each key press
                if (this.inputValue === value) {
                  initialProperties?.onChanged?.(value)
                }
              }, waitTime, )
            }
          }
        }

      }),
      onTextSubmit: new OnTextSubmit(({ text }) => {
        const value = text.substr(0, text.length - 1) // We need to remove the last char, that is a return line
        const callBack = initialProperties?.onTextSubmit
        if (callBack) {
          callBack(value)
        } else {
          // If there is no callback set, just re-set the current value. We need to add a timeout, so that the event finished before starting the following one
          //@ts-ignore
          setTimeout(() => this.shape.placeholder = value, 0)
        }
      })
    })
    this.placeholder = this.shape.placeholder
    this.color = this.shape.color
    this.placeholderColor = this.shape.placeholderColor
    this.inputValue = initialProperties?.value ?? (initialProperties?.placeholder ?? '')
    this.isInputFocused = false
  }

  public getValue(): string {
    return this.inputValue
  }

  public isFocused() {
    return this.isInputFocused
  }

  /**
   * Set an input value, without rasing an event
   */
  public setInputValue(text: string) {
    const wasFocused = this.isInputFocused
    this.isInputFocused = false
    this.shape.placeholder = ''
    this.inputValue = this.shape.placeholder = text
    this.isInputFocused = wasFocused
  }

  public reset() {
    this.setInputValue(this.placeholder)
  }

  public hide() {
    this.setProperties({ visible: false })
  }

  public show() {
    this.setProperties({ visible: true })
    this.setInputValue(this.inputValue) // Necessary hack, because if focused when hidden, the text goes away
  }
}

type InitialProperties = Omit<InitialUIProperties<UIInputText>, 'onFocus' | 'onBlur' | 'onChanged' | 'onTextSubmit'> & {
  waitTime?: number // delay in ms that we wait before the user stopped changing the text, so that we consider it finally stopped changing,
  onFocus?: Callback,
  onBlur?: (defaultedToPlaceholder: boolean) => void,
  onChanged?: StringCallback,
  onTextSubmit?: StringCallback
}
type Callback = () => void
type StringCallback = (value: string) => void