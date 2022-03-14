import { lightTheme } from "../utils/default-ui-components"
import { deepMerge, RecursivePartial } from "./commons/shared"
import { UIBase } from "./commons/UIBase"
import { UIPoweredInputText } from "./UIPoweredInputText"
import { UISearchPromptOption } from "./UISearchPromptOption"

export class UISearchPrompt extends UIBase<UIContainerRect> {

  public static readonly DEFAULTS: UISearchPromptConfig = {
    borderColor: Color4.FromInts(232, 236, 253, 255),
    backgroundColor: Color4.White(),
    borderSize: 2,
    width: 300,
    initialHeight: 60,
    search: {
      fontSize: 16,
      textColor: Color4.FromInts(24, 26, 70, 255),
      placeholder: {
        defaultText: 'Click to search',
        textColor: Color4.FromInts(118, 120, 181, 200)
      }
    },
    options: {
      maxVisibleOptions: 5,
      oddBackgroundColor: Color4.FromInts(246, 246, 255, 255),
      topFontSize: 14,
      bottomFontSize: 14,
      imageSize: 36,
      topTextColor: Color4.FromInts(14, 16, 60, 255),
      bottomTextColor: Color4.FromInts(117, 120, 181, 255),
    },
    errorMessage: {
      fontSize: 13,
      textColor: Color4.FromInts(125, 127, 157, 255)
    }
  }

  private readonly config: UISearchPromptConfig
  private readonly inputText: UIPoweredInputText
  private readonly insideContainer: UIContainerRect
  private readonly errorMessage: UIText
  private readonly uiOptions: UISearchPromptOption[] = []
  private options: { [id: string]: SearchPromptOption } = {}
  private defaultOptions: string[] | undefined

  constructor(
    parent: UIShape,
    searchItems: {
      items: SearchPromptOption[],
      dropdownDefaultItemIds?: string[],
    },
    initialConfig: UISearchPromtInitialProperties,
    private readonly onSuccessfulSelection: (selected: SearchPromptOption) => void) {
    super(new UIContainerRect(parent), {
      ...initialConfig
    })

    const { visible, opacity, hAlign, vAlign, positionX, positionY, ...otherConfig } = initialConfig
    this.config = deepMerge(UISearchPrompt.DEFAULTS, otherConfig)

    this.setProperties({
      width: this.config.width,
      height: this.config.initialHeight,
      color: this.config.borderColor,
    })

    this.setItems(searchItems.items, searchItems.dropdownDefaultItemIds)

    const insideContainer = new UIContainerRect(this.shape)
    insideContainer.color = this.config.backgroundColor
    insideContainer.width = this.config.width - this.config.borderSize * 2
    insideContainer.height = this.config.initialHeight - this.config.borderSize * 2
    this.insideContainer = insideContainer

    const inputText = new UIPoweredInputText(insideContainer, {
      vAlign: 'top',
      hTextAlign: 'left',
      vTextAlign: 'center',
      width: '92%',
      fontSize: this.config.search.fontSize,
      placeholder: this.config.search.placeholder.defaultText,
      color: this.config.search.textColor,
      focusedBackground: Color4.Clear(),
      height: this.config.initialHeight * 0.95,
      onBlur: () => this.close(),
      onTextSubmit: () => {
        const isThereAnOption = this.uiOptions[0].getProperty('visible')
        if (isThereAnOption) {
          this.uiOptions[0].performClick()
        } else {
          this.close()
        }
      },
      onChanged: (value) => {
        this.hideAllOptions()
        if (value === this.config.search.placeholder.defaultText || value === '') {
          this.showDefaultOptions()
        } else {
          const textToSearch = value.toLowerCase()
          const result: SearchPromptOption[] = []
          for (const optionId in this.options) {
            const option = this.options[optionId]
            if (option.searchBy!.toLowerCase().indexOf(textToSearch) >= 0) {
              result.push(option)
              if (result.length === this.config.options.maxVisibleOptions) {
                break;
              }
            }
          }
          if (result.length > 0) {
            this.showOptions(result)
          } else {
            this.showErrorMessage(`Sorry, we can't find "${value}"`)
          }
        }
      }
    })
    this.inputText = inputText

    for (let i = 0; i < this.config.options.maxVisibleOptions; i++) {
      const newOption = new UISearchPromptOption(insideContainer, {
        ...this.config.options,
        height: this.config.initialHeight,
        positionY: -this.config.initialHeight - this.config.initialHeight * i,
        color: i % 2 === 0 ? this.config.options.oddBackgroundColor : insideContainer.color
      })
      this.uiOptions.push(newOption)
    }

    const closeButton = new UIImage(insideContainer, lightTheme)
    closeButton.onClick = new OnClick(() => this.close())
    closeButton.sourceTop = 305
    closeButton.sourceLeft = 985
    closeButton.sourceWidth = closeButton.sourceHeight = 35
    closeButton.width = closeButton.height = 18
    closeButton.hAlign = 'right'
    closeButton.vAlign = 'top'
    closeButton.positionX = -12
    closeButton.positionY = -12
    closeButton.visible = closeButton.isPointerBlocker = true

    const cantFindMessage = new UIText(insideContainer)
    cantFindMessage.height = 20
    cantFindMessage.visible = false
    cantFindMessage.width = '92%'
    cantFindMessage.hTextAlign = 'center'
    cantFindMessage.vAlign = 'bottom'
    cantFindMessage.positionY = 20
    cantFindMessage.fontSize = this.config.errorMessage.fontSize
    cantFindMessage.color = this.config.errorMessage.textColor
    this.errorMessage = cantFindMessage
  }

  /**
   * Opens the search box
   */
  public open() {
    this.setProperties({ visible: true })
    this.showDefaultOptions()
  }

  /**
   * Close the search box
   */
  public close() {
    this.setProperties({ visible: false })
    this.inputText.reset()
  }

  /**
   * Sets all options available on the search box
   */
  public setItems(options: SearchPromptOption[], dropdownDefaults?: string[]) {
    this.options = options.reduce((acc, curr) => {
      curr.searchBy = curr.searchBy ?? (typeof curr.visualText === 'string' ? curr.visualText : ('text' in curr.visualText ? curr.visualText.text : curr.visualText.topLeft))
      acc[curr.id] = curr;
      return acc
    }, {} as { [id: string]: SearchPromptOption });
    if (dropdownDefaults) {
      this.setDropdownDefaults(dropdownDefaults)
    } else {
      this.defaultOptions = dropdownDefaults
    }
    this.hideAllOptions()
  }

  /**
   * Sets the options with the given ids as the ones that will be shown when there is no text on the search box
   */
  public setDropdownDefaults(defaults: string[]) {
    for (const optionId of defaults) {
      if (!(optionId in this.options)) {
        error(`Couldn't find an option with id '${optionId}'. Will not set new defaults`)
        return
      }
    }
    this.defaultOptions = defaults
  }

  private showDefaultOptions() {
    let options: SearchPromptOption[]
    if (this.defaultOptions) {
      options = this.defaultOptions.map(id => this.options[id]).slice(0, this.config.options.maxVisibleOptions)
    } else {
      options = []
      for (const optionId in this.options) {
        options.push(this.options[optionId])
        if (options.length === this.config.options.maxVisibleOptions) {
          break
        }
      }

    }
    this.showOptions(options)
  }

  private showOptions(options: SearchPromptOption[]) {
    this.resizeHeight(this.config.initialHeight * options.length + this.config.borderSize * 2)
    options.forEach((option, index) => {
      const uiOption: UISearchPromptOption = this.uiOptions[index]
      uiOption.setOption(option, () => {
        this.onSuccessfulSelection(option)
        this.setProperties({ visible: false })
      })
      uiOption.setProperties({ visible: true })
    })
    this.errorMessage.visible = false
  }

  private hideAllOptions() {
    this.uiOptions.forEach(option => option.setProperties({ visible: false }))
  }

  private showErrorMessage(errorMessage: string) {
    this.errorMessage.visible = true
    this.errorMessage.value = errorMessage
    this.resizeHeight(+60)
  }

  private resizeHeight(relativeHeight: number) {
    this.setProperties({ height: this.config.initialHeight + relativeHeight })
    this.insideContainer.height = this.config.initialHeight + relativeHeight - this.config.borderSize * 2
  }
}

export type SearchPromptOption = {
  id: string,
  // If not set, then we will search for the top or topLeft text
  searchBy?: string
  visualText: SearchPromptOptionText,
  image?: {
    src: string,
    sourceWidth: number
    sourceHeight: number
  }
}

export type UISearchPromptConfig = {
  borderColor: Color4
  backgroundColor: Color4
  borderSize: number
  width: number
  initialHeight: number
  search: {
    fontSize: number
    textColor: Color4
    placeholder: {
      defaultText: string
      textColor: Color4
    }
  }
  options: {
    maxVisibleOptions: number
    oddBackgroundColor: Color4
    imageSize: number
    topFontSize: number
    bottomFontSize: number
    topTextColor: Color4
    bottomTextColor: Color4
  }
  errorMessage: {
    fontSize: number
    textColor: Color4
  }
}

export type UISearchPromtInitialProperties = RecursivePartial<Pick<UIContainerRect, 'visible' | 'opacity' | 'hAlign' | 'vAlign' | 'positionX' | 'positionY'> & UISearchPromptConfig>

type SearchPromptOptionText =
  string |
  { text: string, subText: string } |
  { topLeft: string, topRight: string, bottomLeft: string, bottomRight: string }