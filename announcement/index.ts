import { Delay } from '../utils/timerComponents'
import { message, messageBackground } from '../utils/default-ui-comopnents'

/**
 * Displays text in the center of the UI for a specific time
 *
 * @param value string to display
 * @param duration time to keep the text visible (in milliseconds). Default: 3000 milliseconds.
 * @param background boolean to indicate if a background frame should be shown
 * @param color text color, as a Color4. Default: black
 * @param size font size, default 60
 *
 */
export function displayAnnouncement(
  value: string,
  duration?: number,
  background?: boolean,
  color?: Color4,
  size?: number
) {

messageBackground.visible = true
  message.visible = true
  message.value = value

  message.color = color ? color : Color4.Black()

  // background?
  messageBackground.color = background? Color4.FromHexString("#e6e0d177"): Color4.Clear()

  message.fontSize = size ? size : 60


  message.width = value.length * message.fontSize


  let dummyEnty = new Entity()
  engine.addEntity(dummyEnty)

  dummyEnty.addComponent(
    new Delay(duration ? duration : 3000, () => {
	  message.visible = false
	  messageBackground.visible = false
    })
  )
}
