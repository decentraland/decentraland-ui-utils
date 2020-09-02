export const canvas = new UICanvas()
canvas.visible = true

export let SFFont = new Font(Fonts.SanFrancisco)

export let SFHeavyFont = new Font(Fonts.SanFrancisco_Heavy)

export let lightTheme = new Texture('https://decentraland.org/images/ui/light-atlas.png')
export let darkTheme = new Texture('https://decentraland.org/images/ui/dark-atlas.png')

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

// Open dialog sound
export const openDialogSound = new Entity()
openDialogSound.addComponent(new Transform())
openDialogSound.addComponent(
  new AudioSource(new AudioClip('node_modules/@dcl/ui-utils/sounds/navigationForward.mp3'))
)
engine.addEntity(openDialogSound)
openDialogSound.setParent(Attachable.PLAYER)

// Close dialog sound
export const closeDialogSound = new Entity()
closeDialogSound.addComponent(new Transform())
closeDialogSound.addComponent(
  new AudioSource(new AudioClip('node_modules/@dcl/ui-utils/sounds/navigationBackward.mp3'))
)
engine.addEntity(closeDialogSound)
closeDialogSound.setParent(Attachable.PLAYER)

export function PlayOpenSound() {
  openDialogSound.getComponent(AudioSource).playOnce()
}

export function PlayCloseSound() {
  closeDialogSound.getComponent(AudioSource).playOnce()
}
