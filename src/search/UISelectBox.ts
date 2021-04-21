import { deepMerge } from "./commons/shared"
import { UIBase } from "./commons/UIBase"
import { UIClickableContainerRect } from "./UIClickableContainerRect"
import { SearchPromptOption, UISearchPrompt, UISearchPromptConfig, UISearchPromtInitialProperties } from "./UISearchPrompt"
import { UISearchPromptOption } from "./UISearchPromptOption"

export class UISelectBox extends UIBase<UIContainerRect> {

  private readonly uiSearchPrompt: UISearchPrompt
  private readonly config: UISearchPromptConfig
  private readonly initialText: UIText

  constructor(
    parent: UIShape,
    searchItems: {
      items: SearchPromptOption[],
      initialItemId?: string,
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

    const insideContainer = new UIClickableContainerRect(this.shape, {
      color: this.config.backgroundColor,
      width: this.config.width - this.config.borderSize * 2,
      height: this.config.initialHeight - this.config.borderSize * 2,
      onClick: () => this.uiSearchPrompt.open()
    })

    const option = new UISearchPromptOption(insideContainer.shape, {
      ...this.config.options,
      height: this.config.initialHeight,
      color: Color4.Clear(),
      width: this.config.width - this.config.borderSize * 2 - 20,
      visible: true,
      hAlign: 'left',
      isPointerBlocker: false,
    })

    const initialText = new UIText(insideContainer.shape)
    initialText.value = 'Click to select an option'
    initialText.fontSize = this.config.search.fontSize
    initialText.color = this.config.search.placeholder.textColor
    initialText.vTextAlign = initialText.hTextAlign = 'center'
    initialText.positionX = -this.config.borderSize - 10
    initialText.isPointerBlocker = false
    initialText.opacity = initialText.color.a
    this.initialText = initialText

    if (searchItems?.initialItemId) {
      const initialOption = searchItems.items.filter(({ id }) => id === searchItems.initialItemId)[0]
      if (initialOption) {
        option.setOption(initialOption)
        this.initialText.visible = false
      }
    }

    const openSearchTexture = new Texture('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABAAgMAAADXB5lNAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAAN5AAADeQELGyzWAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAAlQTFRF////AAAAAAAAflGpXQAAAAJ0Uk5TAICbK04YAAAAeklEQVQ4je3PsRXEMAgE0VFCEapG9agaiiDRVXkJxlpq8IYT/AfwTbZ/ssPUEJgGZ2hYDTmgSIAiDoqsdskBRQIUcVBktXdO/jeVuBDPMBpRyEMUEhVMiUKKSOQlEokrmBKJXARsJWAqAaYEjEbAVgJmtGDewmjEt9wfISOqAUzY2sAAAAAASUVORK5CYII=')
    const openSearchButton = new UIImage(insideContainer.shape, openSearchTexture)
    openSearchButton.sourceWidth = openSearchButton.sourceHeight = 64
    openSearchButton.height = 15
    openSearchButton.width = 12
    openSearchButton.hAlign = 'right'
    openSearchButton.vAlign = 'center'
    openSearchButton.positionX = -10
    openSearchButton.visible = true
    openSearchButton.isPointerBlocker = false

    this.uiSearchPrompt = new UISearchPrompt(this.shape,
      searchItems,
      { ...initialConfig,
        visible: false,
        vAlign: 'top',
        initialHeight: this.config.initialHeight - this.config.borderSize * 2
      },
      (selectedOption: SearchPromptOption) => {
        option.setOption(selectedOption)
        this.initialText.visible = false
        this.onSuccessfulSelection(selectedOption)
    })
  }

  /**
   * Opens the select box
   */
  public open() {
    this.setProperties({ visible: true })
  }

  /**
   * Close the select box
   */
  public close() {
    this.setProperties({ visible: false })
  }

  /**
   * Sets all options available on the select box
   */
  public setSearchItems(options: SearchPromptOption[], dropdownDefaults?: string[]) {
    this.uiSearchPrompt.setItems(options, dropdownDefaults)
  }

  /**
   * Sets the options with the given ids as the ones that will be shown when there is no text on the select box
   */
  public setSearchDropdownDefaults(defaults: string[]) {
    this.uiSearchPrompt.setDropdownDefaults(defaults)
  }
}
