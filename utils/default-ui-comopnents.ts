export const canvas = new UICanvas()
canvas.visible = true

export let SFFont = new Font(Fonts.SanFrancisco)

export let SFHeavyFont = new Font(Fonts.SanFrancisco_Heavy)



export const messageBackground = new UIContainerRect(canvas)
messageBackground.adaptWidth = true
messageBackground.adaptHeight = true
messageBackground.hAlign = 'center'
messageBackground.vAlign = 'center'
//messageBackground.width = '40%'
// messageBackground.positionY = 0
// messageBackground.positionX = 0
messageBackground.color = Color4.Clear()
messageBackground.visible = false
//...

export const message = new UIText(canvas)  //messageBackground
message.vAlign = 'center'
message.hAlign = 'center'
message.hTextAlign = 'center'
message.vTextAlign = 'center'
message.font = SFFont
//message.adaptWidth = true
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
