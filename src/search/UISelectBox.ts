import { deepMerge } from "./commons/shared"
import { UIBase } from "./commons/UIBase"
import { UIClickableContainerRect } from "./UIClickableContainerRect"
import { SearchBoxOption, UISearchBox, UISearchBoxConfig, UISearchBoxInitialProperties } from "./UISearchBox"
import { UISearchBoxOption } from "./UISearchBoxOption"

export class UISelectBox extends UIBase<UIContainerRect> {

  private readonly uiSearchBox: UISearchBox
  private readonly config: UISearchBoxConfig

  constructor(
    parent: UIShape,
    initialOptions: {
      options: SearchBoxOption[],
      initialOptionId?: string,
      searchDefaultOptionIds?: string[],
    },
    initialConfig: UISearchBoxInitialProperties,
    private readonly onSuccessfulSelection: (selected: SearchBoxOption) => void) {
    super(new UIContainerRect(parent), {
      ...initialConfig
    })

    const { visible, opacity, hAlign, vAlign, positionX, positionY, ...otherConfig } = initialConfig
    this.config = deepMerge(UISearchBox.DEFAULTS, otherConfig)

    this.setProperties({
      width: this.config.width,
      height: this.config.initialHeight,
      color: this.config.borderColor,
    })

    const insideContainer = new UIClickableContainerRect(this.shape, {
      color: this.config.backgroundColor,
      width: this.config.width - this.config.borderSize * 2,
      height: this.config.initialHeight - this.config.borderSize * 2,
      onClick: () => this.uiSearchBox.open()
    })

    const option = new UISearchBoxOption(insideContainer.shape, {
        ...this.config.options,
        height: this.config.initialHeight,
        color: Color4.Clear(),
        width: this.config.width - this.config.borderSize * 2 - 20,
        visible: true,
        hAlign: 'left',
        isPointerBlocker: false,
    })
    const initialOption = initialOptions.options.filter(({ id }) => id === initialOptions.initialOptionId)[0] ?? initialOptions.options[0]
    if (initialOption) {
      option.setOption(initialOption)
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

    this.uiSearchBox = new UISearchBox(this.shape,
      initialOptions,
      { ...initialConfig,
        visible: false,
        vAlign: 'top',
        initialHeight: this.config.initialHeight - this.config.borderSize * 2
      },
      (selectedOption: SearchBoxOption) => {
        option.setOption(selectedOption)
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
  public setSearchOptions(options: SearchBoxOption[], defaults?: string[]) {
    this.uiSearchBox.setOptions(options, defaults)
  }

  /**
   * Sets the options with the given ids as the ones that will be shown when there is no text on the select box
   */
  public setSearchDefaults(defaults: string[]) {
    this.uiSearchBox.setDefaults(defaults)
  }
}
