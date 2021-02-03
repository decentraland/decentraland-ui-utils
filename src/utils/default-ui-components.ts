export const canvas = new UICanvas()
canvas.visible = true

export let SFFont = new Font(Fonts.SanFrancisco)

export let SFHeavyFont = new Font(Fonts.SanFrancisco_Heavy)

export let lightTheme = new Texture('https://decentraland.org/images/ui/light-atlas-v2.png')
export let darkTheme = new Texture('https://decentraland.org/images/ui/dark-atlas-v2.png')

export const message = new UIText(canvas) //messageBackground
message.vAlign = 'center'
message.hAlign = 'center'
message.hTextAlign = 'center'
message.vTextAlign = 'center'
message.font = SFFont
message.fontSize = 60
message.color = new Color4(0, 0, 0, 1)
message.visible = false
message.positionY = 80

export const promptBackground = new UIImage(canvas, lightTheme)
promptBackground.hAlign = 'center'
promptBackground.vAlign = 'center'
promptBackground.width = 400
promptBackground.height = 250
promptBackground.visible = false
