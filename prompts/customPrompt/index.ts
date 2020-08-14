import { promptBackground, PlayCloseSound, SFFont, lightTheme } from "../../utils/resources"
import { PromptStyles } from "decentraland-ui-utils/utils/types"

/**
 * Displays a number on the center of the UI
 *
  * @param width image width 
 * @param height image height
 * @param style: Pick from a few predefined options
 *
 */
export class CustomPrompt extends Entity {
	closeIcon: UIImage
	elements: (UIText|UIImage)[] = []
	constructor(
	  width: number,
		height: number,
	  style?: PromptStyles
	) {
	  super()


	  promptBackground.source = lightTheme
	  promptBackground.width = width? width: 400
	  promptBackground.height = height? height : 250
	  promptBackground.visible = true


		this.closeIcon = new UIImage(promptBackground,lightTheme )
		this.closeIcon.positionX =  width? width - 20: 50
		this.closeIcon.positionY =  height? height - 20 :
		this.closeIcon.sourceHeight = 50
		this.closeIcon.sourceWidth = 50
		this.closeIcon.sourceTop = 0
		this.closeIcon.sourceLeft =0

		this.closeIcon.onClick = new OnClick(() => {
			PlayCloseSound()
			this.close()
		 })

		 


	}
  
	public close(): void {
	 
		
		promptBackground.visible = false
		this.closeIcon.visible = false

		for(let element of this.elements){
			element.visible = false
		}
		
	}

	public addText(value: string, posX: number, posY: number):void{


		let text = new UIText(promptBackground )
		text.value = value
		text.positionX = posX? posX: 0
		text.positionY = posY? posY: 0
		text.color = Color4.Black()
		text.fontSize = 15
		
		this.elements.push(text)
	}

	// add button

	public addButton(label: string, posX: number, posY: number, onClick: () => void,  style?: PromptStyles):void{


	let button = new UIImage(promptBackground, lightTheme)
	button.positionX = posX
	button.positionY = posY
	button.width = 206
	button.height = 62
	button.sourceHeight = 62
	button.sourceWidth = 206
	button.sourceTop = 0
	button.sourceLeft =0
   
   let buttonLabel = new UIText(button)
   buttonLabel.value = label
   buttonLabel.hTextAlign = 'center'
   buttonLabel.vTextAlign = 'center'
   buttonLabel.positionX = 25
   buttonLabel.fontSize = 20
   buttonLabel.font = SFFont
   buttonLabel.color = Color4.White()
   buttonLabel.isPointerBlocker = false
 

   button.onClick = new OnClick(() => {
	onClick()
   })

   //if style E
//    Input.instance.subscribe('BUTTON_DOWN', ActionButton.PRIMARY, false, (e) => {
// 	  if(button.visible){
// 		  onClick()
// 	  }
//   })

  this.elements.push(button)

}
	// add checkbox

	// add switch

	// add icon


	
  }







