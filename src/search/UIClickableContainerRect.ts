import { InitialUIProperties, UIBase } from './commons/UIBase'

/**
 * This is a UIContainerRect, with a configurable click event
 */
export class UIClickableContainerRect extends UIBase<UIContainerRect> {
  private readonly image: UIImage

  constructor(parent: UIShape, initialProperties?: InitialProperties) {
    super(new UIContainerRect(parent), {
      isPointerBlocker: true,
      ...initialProperties
    })

    const image = new UIImage(
      this.shape,
      new Texture(
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='
      )
    )
    image.width = '100%'
    image.height = '100%'
    image.sourceWidth = 1
    image.sourceHeight = 1
    image.isPointerBlocker = true
    this.image = image
    if (initialProperties?.onClick) {
      this.setOnClick(initialProperties.onClick)
    }
  }

  public performClick() {
    this.image.onClick?.callback({})
  }

  public setOnClick(onClick: OnClick) {
    this.image.onClick = new OnClick(onClick)
  }

  public clearOnClick() {
    this.image.onClick = null
  }
}

type InitialProperties = Omit<InitialUIProperties<UIContainerRect>, 'onChange'> & {
  onClick?: OnClick
  placeholderColor?: Color4
}
type OnClick = () => void
