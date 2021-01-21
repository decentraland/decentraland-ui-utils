import { UIDelay } from '../utils/timerComponents'
import { message, SFHeavyFont } from '../utils/default-ui-components'

/**
 * Displays text in the center of the UI for a specific time
 *
 * @param {string} value string to display
 * @param {duration} duration time to keep the text visible (in seconds). Default: 3 seconds.
 * @param {Color4} [color=Color.Yellow()] text color, as a Color4. Default: black
 * @param {number} [size=60] font size, default 60
 * @param {boolean} bordersOff if true, text won't have a black margin around it
 *
 */
export function displayAnnouncement(
  value: string,
  duration?: number,
  color?: Color4,
  size?: number,
  bordersOff?: boolean
) {
  message.visible = true
  message.value = value

  message.color = color ? color : Color4.Yellow()

  message.fontSize = size ? size : 50
  message.font = SFHeavyFont

  message.outlineColor = Color4.Black()

  message.outlineWidth = bordersOff ? 0 : 0.1

  //message.width = value.length * message.fontSize
  message.adaptWidth = false
  message.textWrapping = true
  message.width = 900

  let dummyEnty = new Entity()
  engine.addEntity(dummyEnty)

  if (duration != -1) {
    dummyEnty.addComponentOrReplace(
      new UIDelay(duration ? duration : 3, () => {
        message.visible = false
      })
    )
  }
}

/**
 * Hides any announcement text that might be visible
 */
export function hideAnnouncements() {
  message.visible = false
}
