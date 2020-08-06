export const canvas = new UICanvas()

export const messageBackground = new UIContainerRect(canvas)
messageBackground.adaptWidth = true
messageBackground.width = '40%'
messageBackground.positionY = 0
messageBackground.positionX = 0
messageBackground.color = Color4.fromHex('#e6e0d177')
messageBackground.visible = false
//...

export const message = new UIText(messageBackground)
message.vAlign = 'center'
message.hAlign = 'center'
message.hTextAlign = 'center'
message.adaptWidth = true
message.fontSize = 60
message.color = new Color4(0, 0, 0, 1)
message.visible = false

// button ok

// button yes

// button no

// input text

// counter type?

// bar type?

// icon type?

// center image
