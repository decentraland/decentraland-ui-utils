import { InitialUIProperties, UIBase } from "./commons/UIBase"
import { UIClickableContainerRect } from "./UIClickableContainerRect"
import { SearchBoxOption } from "./UISearchBox"

export class UISearchBoxOption extends UIBase<UIContainerRect> {

  private static readonly DEFAULTS: UISearchBoxOptionConfig = {
    topFontSize: 14,
    bottomFontSize: 14,
    imageSize: 36,
    topTextColor: Color4.FromInts(14, 16, 60, 255),
    bottomTextColor: Color4.FromInts(117, 120, 181, 255),
  }

  private readonly config: UISearchBoxOptionConfig
  private readonly image: UIImage
  private readonly topRightText: UIText
  private readonly topLeftText: UIText
  private readonly bottomLeftText: UIText
  private readonly bottomRightText: UIText
  private readonly clickableContainer: UIClickableContainerRect

  constructor(parent: UIShape, initialProperties?: InitialProperties) {
    super(new UIContainerRect(parent), {
      width: '100%',
      vAlign: 'top',
      visible: false,
      ...initialProperties
    })

    this.config = { ...UISearchBoxOption.DEFAULTS, ...initialProperties }

    const clickableContainer = new UIClickableContainerRect(this.shape, {
      width: '100%',
      height: '100%',
      color: Color4.Clear()
    })
    this.clickableContainer = clickableContainer

    const image = new UIImage(clickableContainer.shape, new Texture('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='))
    image.width = image.height = this.config.imageSize
    image.hAlign = 'left'
    image.positionX = 10
    image.vAlign = 'center'
    this.image = image

    const topLeftText = new UIText(clickableContainer.shape)
    topLeftText.vAlign = 'top'
    topLeftText.hAlign = 'left'
    topLeftText.vTextAlign = 'top'
    topLeftText.fontSize = this.config.topFontSize
    topLeftText.color = this.config.topTextColor
    topLeftText.positionX = 55
    topLeftText.positionY = -10
    topLeftText.isPointerBlocker = false
    this.topLeftText = topLeftText

    const topRightText = new UIText(clickableContainer.shape)
    topRightText.vAlign = 'top'
    topRightText.hAlign = 'right'
    topRightText.vTextAlign = 'top'
    topRightText.hTextAlign = 'right'
    topRightText.fontSize = topLeftText.fontSize
    topRightText.color = topLeftText.color
    topRightText.isPointerBlocker = false
    topRightText.positionX = -10
    topRightText.positionY = topLeftText.positionY
    this.topRightText = topRightText

    const bottomLeftText = new UIText(clickableContainer.shape)
    bottomLeftText.vAlign = 'bottom'
    bottomLeftText.hAlign = 'left'
    bottomLeftText.vTextAlign = 'bottom'
    bottomLeftText.fontSize = this.config.bottomFontSize
    bottomLeftText.color = this.config.bottomTextColor
    bottomLeftText.positionX = topLeftText.positionX
    bottomLeftText.positionY = 10
    bottomLeftText.isPointerBlocker = false
    this.bottomLeftText = bottomLeftText

    const bottomRightText = new UIText(clickableContainer.shape)
    bottomRightText.vAlign = 'bottom'
    bottomRightText.hAlign = 'right'
    bottomRightText.vTextAlign = 'bottom'
    bottomRightText.hTextAlign = 'right'
    bottomRightText.fontSize = bottomLeftText.fontSize
    bottomRightText.color = bottomLeftText.color
    bottomRightText.isPointerBlocker = false
    bottomRightText.positionX = topRightText.positionX
    bottomRightText.positionY = bottomLeftText.positionY
    this.bottomRightText = bottomRightText
  }

  public setOption(option: SearchBoxOption, onClick?: () => void) {
    this.image.visible = false
    this.topRightText.visible = false
    this.bottomLeftText.visible = false
    this.bottomRightText.visible = false
    if (option.image) {
      this.image.source = new Texture(option.image.src)
      this.image.sourceWidth = option.image.sourceWidth
      this.image.sourceHeight = option.image.sourceHeight
      this.image.visible = true
      this.topLeftText.positionX = this.config.imageSize + 10 * 2
    } else {
      this.topLeftText.positionX = 10
    }

    if (typeof option.visualText === 'string') {
      this.topLeftText.value = option.visualText
      this.topLeftText.vAlign = this.topLeftText.vTextAlign  = 'center'
      this.topLeftText.positionY = 0
    } else if ('text' in option.visualText) {
      this.topLeftText.vAlign = this.topLeftText.vTextAlign = 'top'
      this.topLeftText.positionY = -10
      this.topLeftText.value = option.visualText.text
      this.bottomLeftText.value = option.visualText.subText
      this.bottomLeftText.visible = true
      this.bottomLeftText.positionX = this.topLeftText.positionX
    } else if ('bottomLeft' in option.visualText) {
      this.topLeftText.vAlign = this.topLeftText.vTextAlign = 'top'
      this.topLeftText.positionY = -10
      this.topLeftText.value = option.visualText.topLeft
      this.topRightText.value = option.visualText.topRight
      this.bottomLeftText.value = option.visualText.bottomLeft
      this.bottomRightText.value = option.visualText.bottomRight
      this.topRightText.visible = true
      this.bottomLeftText.visible = true
      this.bottomRightText.visible = true
      this.bottomLeftText.positionX = this.topLeftText.positionX
    }
    if (onClick) {
      this.clickableContainer.setOnClick(onClick)
    } else {
      this.clickableContainer.clearOnClick()
    }
  }

  public setProperties(prop: Partial<UIContainerRect>) {
    super.setProperties(prop)
  }

  public getProperty<K extends keyof UIContainerRect>(propName: K): UIContainerRect[K] {
    return super.getProperty(propName)
  }

  /**
   * Simulate as if the user had clicked on the option, and perform the corresponding action
   */
  public performClick() {
    this.clickableContainer.performClick()
  }

}

type InitialProperties = InitialUIProperties<UIContainerRect> & UISearchBoxOptionConfig

type UISearchBoxOptionConfig = {
  topFontSize: number,
  bottomFontSize: number,
  imageSize: number,
  topTextColor: Color4,
  bottomTextColor: Color4,
}