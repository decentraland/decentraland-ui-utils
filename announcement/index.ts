import { Delay } from '../utils/timerComponents'
import { message } from '../utils/default-ui-comopnents'

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
  message.visible = true
  message.value = value

  message.color = color ? color : Color4.Black()

  // background?

  message.fontSize = size ? size : 60

  let dummyEnty = new Entity()
  engine.addEntity(dummyEnty)

  dummyEnty.addComponent(
    new Delay(duration ? duration : 3000, () => {
      message.visible = false
    })
  )
}
