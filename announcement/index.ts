import { Delay } from '../utils/timerComponents'
import { message, PlayOpenSound, SFHeavyFont } from '../utils/default-ui-comopnents'

/**
 * Displays text in the center of the UI for a specific time
 *
 * @param value string to display
 * @param duration time to keep the text visible (in seconds). Default: 3 seconds.
 * @silent if true, no sound is played when the announcement pops up
 * @param color text color, as a Color4. Default: black
 * @param size font size, default 60
 *
 */
export function displayAnnouncement(
  value: string,
  duration?: number,
  silent?: boolean,
  color?: Color4,
  size?: number
) {
  message.visible = true
  message.value = value

  message.color = color ? color : Color4.Yellow()

  message.fontSize = size ? size : 50
  message.font = SFHeavyFont

  message.outlineColor = Color4.Black()
  message.outlineWidth = 0.1

  //message.width = value.length * message.fontSize
  message.adaptWidth = false
  message.textWrapping = true
  message.width = 900

  if (!silent) {
    PlayOpenSound()
  }

  let dummyEnty = new Entity()
  engine.addEntity(dummyEnty)

  dummyEnty.addComponentOrReplace(
    new Delay(duration ? duration : 3, () => {
      message.visible = false
    })
  )
}
