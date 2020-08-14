import { canvas, SFFont, lightTheme, darkTheme } from '../utils/default-ui-comopnents'


class Dialog {
	text: string
	fontSize?: number
	positionY: number
	isQuestion?: boolean = false
	labelE?: {
	  label: string
	  fontSize?: number
	  positionX?: number
	  positionY?: number
	}
	ifPressE?: number
	labelF?: {
	  label: string
	  fontSize?: number
	  positionX?: number
	  positionY?: number
	}
	ifPressF?: number
	isEndOfDialog?: boolean = false
	portrait?: { path: string; positionX?: number; positionY?: number }
  }
  
  class Dialogs {
	dialogs: Dialog[]
  }




export enum ConfirmMode {
	Confirm = 0,
	Cancel = 1,
	Next = 2,
  }
  
  export class DialogWindow {
	private container: UIContainerRect
	private textPanel: UIImage
	private portrait: UIImage
	private text: UIText
	private buttonE: UIImage
	private buttonELabel: UIText
	private buttonF: UIImage
	private buttonFLabel: UIText
	public leftClickIcon: UIImage
	public isDialogOpen: boolean
	public isInfoPanel: boolean
	public isQuestionPanel: boolean
	public activeTextId: number
	public NPCScript: Dialogs

  
	constructor(
		useDarkTheme?: boolean
	) {

		let uiTheme = useDarkTheme? darkTheme : lightTheme


	  // Container
	  this.container = new UIContainerRect(canvas)
	  this.container.adaptWidth = true
	  this.container.width = '100%'
	  this.container.vAlign = 'bottom'
	  this.container.positionY = 100
	  this.container.visible = false
  
	  // Text Panel
	  this.textPanel = new UIImage(this.container, uiTheme)
	  this.textPanel.sourceWidth = 766
	  this.textPanel.sourceHeight = 248
	  this.textPanel.width = 766
	  this.textPanel.height = 248
	  this.textPanel.sourceLeft = 22
	  this.textPanel.sourceTop = 756
	  this.textPanel.onClick = new OnClick((): void => {
		this.confirmText(ConfirmMode.Next)
	  })
  
	  // Portrait
	  this.portrait = new UIImage(
		this.container,
		new Texture('images/portraits/alice.png')
	  )
	  this.portrait.sourceWidth = 256
	  this.portrait.sourceHeight = 256
	  this.portrait.width = 256
	  this.portrait.height = 256
	  this.portrait.positionX = -256
	  this.portrait.positionY = 0
	  this.portrait.onClick = new OnClick((): void => {
		this.confirmText(ConfirmMode.Next)
	  })
  
	  // Dialog Text
	  this.text = new UIText(this.container)
	  this.text.adaptWidth = false
	  this.text.textWrapping = true
	  this.text.width = 340
	  this.text.positionX = 10
	  this.text.hAlign = 'center'
	  this.text.vAlign = 'center'
	  this.text.font = SFFont
	  this.text.fontSize = 14
	  this.text.fontWeight = 'normal'
	  this.text.color = Color4.Black()
	  this.text.isPointerBlocker = false
  
	  // Button E
	  this.buttonE = new UIImage(this.container, uiTheme)
	  this.buttonE.width = 174
	  this.buttonE.height = 46
	  this.buttonE.sourceWidth = 174
	  this.buttonE.sourceHeight = 46
	  this.buttonE.sourceTop = 662
	  this.buttonE.sourceLeft = 512
	  this.buttonE.positionX = 60
	  this.buttonE.positionY = -35
	  this.buttonE.visible = false
	  this.buttonE.isPointerBlocker = true
	  this.buttonE.onClick = new OnClick((): void => {
		this.confirmText(ConfirmMode.Confirm)
	  })
  
	  // Label E Text
	  this.buttonELabel = new UIText(this.buttonE)
	 this.buttonELabel.hTextAlign = 'center'
	 this.buttonELabel.vTextAlign = 'center'
	 this.buttonELabel.positionX = 30
	 this.buttonELabel.fontSize = 18
	 this.buttonELabel.font = SFFont
	 this.buttonELabel.color = Color4.White()
	 this.buttonELabel.isPointerBlocker = false
  
	  // Button F
	  this.buttonF = new UIImage(this.container, uiTheme)
	  this.buttonF.width = 174
	this.buttonF.height = 46
	this.buttonF.sourceWidth = 174
	this.buttonF.sourceHeight = 46
	this.buttonF.sourceTop = 612
	this.buttonF.sourceLeft = 512
	  this.buttonF.positionX = -60
	  this.buttonF.positionY = -35
	  this.buttonF.visible = false
	  this.buttonF.isPointerBlocker = true
	  this.buttonF.onClick = new OnClick((): void => {
		this.confirmText(ConfirmMode.Cancel)
	  })
  
	  // Label F Text
	  this.buttonFLabel = new UIText(this.buttonF)
	  this.buttonFLabel.hTextAlign = 'center'
	  this.buttonFLabel.vTextAlign = 'center'
	  this.buttonFLabel.positionX = 30
	  this.buttonFLabel.fontSize = 18
	  this.buttonFLabel.font = SFFont
	  this.buttonFLabel.color = Color4.White()
	  this.buttonFLabel.isPointerBlocker = false
  
	  // Left Click Icon
	  this.leftClickIcon = new UIImage(
		this.container,
		uiTheme
	  )
	  this.leftClickIcon.sourceWidth = 38
	  this.leftClickIcon.sourceHeight = 54
	  this.leftClickIcon.width = 19
	  this.leftClickIcon.height = 27
	  this.leftClickIcon.positionX = 220
	  this.leftClickIcon.positionY = -44
	  this.leftClickIcon.visible = false
	}
  
	public openDialogWindow(NPCScript: Dialogs, textId: number): void {
	  this.isDialogOpen = true

	  this.NPCScript = NPCScript 
	  this.activeTextId = textId
  
	  let currentText = NPCScript[textId]
  
	  // Set portrait
	  // Looks for portrait in current text, otherwise portrait is always set at the 0 index of the dialog
	  this.portrait.source = new Texture(
		NPCScript[textId].portrait? NPCScript[textId].portrait.path : NPCScript[0].portrait.path
	  )
	  this.portrait.positionX = NPCScript[textId].portrait.positionX? NPCScript[textId].portrait.positionX : NPCScript[0].portrait.positionX? NPCScript[textId].portrait.positionX : -272
	  this.portrait.positionY = NPCScript[textId].portrait.positionY? NPCScript[textId].portrait.positionY : NPCScript[0].portrait.positionY? NPCScript[textId].portrait.positionY : 10
	  this.portrait.visible = true
  
	  // Set text
	  this.text.value = currentText.text
	  if (currentText.fontSize) this.text.fontSize = currentText.fontSize
	  this.text.positionY = currentText.positionY? currentText.positionY: 6
	  this.text.visible = true
	  this.container.visible = true
  
	  // Layout panel buttons and icon
	  this.layoutDialogWindow(textId)
	}
  
	// Progresses text
	public confirmText(mode: ConfirmMode): void {
	  let currentText = this.NPCScript[this.activeTextId]
  
	  // Update active text
	  if (mode == ConfirmMode.Next) {
		if (currentText.isEndOfDialog) {
		  this.closeDialogWindow()
		  return
		} else if (!currentText.isQuestion) {
		  this.activeTextId++
		}
	  }
  
	  if (mode == ConfirmMode.Confirm && currentText.ifPressE) {
		this.activeTextId = currentText.ifPressE
	  }
  
	  if (mode == ConfirmMode.Cancel && currentText.ifPressF) {
		this.activeTextId = currentText.ifPressF
	  }
  
	  // Update active text with new active text
	  currentText = this.NPCScript[this.activeTextId]
  
	  // Update text
	  this.text.value = currentText.text
	  if (currentText.fontSize) this.text.fontSize = currentText.fontSize
	  if (currentText.positionY) this.text.positionY = currentText.positionY
	  this.layoutDialogWindow( this.activeTextId)
	}
  
	// Adds the buttons or mouse icon depending on the type of window
	private layoutDialogWindow(textId: number): void {
	  let currentText = this.NPCScript[textId]
  
	  this.isQuestionPanel = currentText.isQuestion
  
	  if (currentText.isQuestion) {
		// Button E and label
		if (currentText.labelE['positionX'] || currentText.labelE['positionY']) {
		  this.buttonELabel.positionX = currentText.labelE['positionX']
		  this.buttonELabel.positionY = currentText.labelE['positionY']
		}
		this.buttonE.visible = true
		this.buttonELabel.value = currentText.labelE['label']
		this.buttonELabel.fontSize = currentText.labelE['fontSize']
		this.buttonELabel.visible = true
  
		// Button F and label
		if (currentText.labelF['positionX'] || currentText.labelF['positionY']) {
		  this.buttonFLabel.positionX = currentText.labelF['positionX']
		  this.buttonFLabel.positionY = currentText.labelF['positionY']
		}
  
		this.buttonF.visible = true
		this.buttonFLabel.value = currentText.labelF['label']
		this.buttonFLabel.fontSize = currentText.labelF['fontSize']
		this.buttonFLabel.visible = true
  
		// Mouse icon
		this.leftClickIcon.visible = false
	  } else {
		this.buttonE.visible = false
		this.buttonELabel.visible = false
		this.buttonF.visible = false
		this.buttonFLabel.visible = false
		this.leftClickIcon.visible = true
	  }
	}
  
	public closeDialogWindow(): void {
	  // Stop robot from tracking the user
	  if (this.isDialogOpen) {
  
		this.isDialogOpen = false
		this.isInfoPanel = false
		this.container.visible = false
		this.portrait.visible = false
		this.text.visible = false
		this.buttonE.visible = false
		this.buttonELabel.visible = false
		this.buttonF.visible = false
		this.buttonFLabel.visible = false
		this.leftClickIcon.visible = false
	  }
	}
  }
  