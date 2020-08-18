# UI-library

A collection of tools for common UI requirements for Decentraland scenes.

## Announcement

Displays text in the center of the UI for a specific time

Parameters:

- `value`: string to display
- `duration`: time to keep the text visible (in seconds). Default: 3 seconds.
- `silent`: if true, no sound is played when the announcement pops up
- `color`: text color, as a Color4. Default: black
- `size`: font size, default 60

```ts
ui.displayAnnouncement('Hello world', 3)
```

```ts
ui.displayAnnouncement('Ouch!', 5, true, Color4.Red(), 50)
```

## Counter

- @param value starting value
- @param xOffset position on X, to enable fitting several counters
- @param yOffset position on Y, to enable fitting several counters
- @param color text color
- @param size text size

```ts
let ammo = new ui.UICounter(30, 0, 60, Color4.Yellow())
```

```ts
Input.instance.subscribe('BUTTON_DOWN', ActionButton.POINTER, false, e => {
  if (ammo.read() <= 0) return
  ammo.decrease()
})
```

## Bar

- @param value starting value
- @param xOffset position on X, to enable fitting several counters
- @param yOffset position on Y, to enable fitting several counters
- @param fillColor color of the bar
- @param style margin style of the bar, from the BarStyles enum
- @param scale multiplier for the size of the bar. 1 = 128 x 32

```ts
let health = new ui.UIBar(1, -30, 130, Color4.Red(), BarStyles.ROUNDSILVER)
```

```ts
health.decrease(0.1)
if (health.read() <= 0) {
  // die
}
```

## Corner Icons

Displays an icon of on the bottom-left corner. There are three variations

- SmallIcon is by default 32x32 pixels
- MediumIcon is by default 64x64 pixels
- LargeIcon is by default 128x128 pixels

* @param image path to image file
* @param xOffset position on X, to enable fitting several counters
* @param yOffset position on Y, to enable fitting several counters
* @param width image width
* @param height image height
* @param section cut out a section of the imge, as an object specifying sourceLeft, sourceTop, sourceWidth and sourceHeight

```ts
let ammoIcon = new ui.SmallIcon('images/ammo32.png', -70, 70)
let healthIcon = new ui.MediumIcon('images/heart64.png', -170, 120)
```

## Loading icons

Displays a loading icon on the center of the screen

- @param duration seconds to display the image onscreen. 0 keeps it on till you hide it
- @param xOffset position on X, to enable fitting several counters
- @param yOffset position on Y, to enable fitting several counters
- @param scale multiplier for the size of the bar. 1 = 48 x 64

```ts
loading = new ui.LoadingIcon(3)
```

If you don't set the duration, or leave it at 0, you can keep it on till you do `.hide()`

## Full screen image

Displays an image of 512x512 on the center of the screen for limited time

- @param image path to image file
- @param duration seconds to display the image onscreen. 0 keeps it on till you hide it
- @param xOffset position on X, to enable fitting several counters
- @param yOffset position on Y, to enable fitting several counters
- @param width image width
- @param height image height
- @param section cut out a section of the imge, as an object specifying sourceLeft, sourceTop, sourceWidth and sourceHeight
- @param startHidden if true, image starts invisible to load in the background till it runs its show() function.

```ts
let dead = new ui.CenterImage(
  'images/Burn.png',
  3,
  0,
  0,
  1024,
  1024,
  {
    sourceHeight: 1024,
    sourceWidth: 1024,
    sourceLeft: 0,
    sourceTop: 0
  },
  true
)
dead.show()
```

## Prompt screens

### Ok Prompt

Displays a prompt window with a custom string and an OK button

- @param instructions: Notification string
- @param onAccept: Function that gets executed if player clicks button
- @param acceptLabel: String to go in the accept button
- @param useDarkTheme: Switch to the dark theme

```ts
let prompt = new ui.OkPrompt(
  'This is an Ok Prompt',
  () => {
    log(`accepted`)
  },
  'Ok'
)
```

> Note: If the player closes the window with the close icon, the related function isn't called.

### Option Prompt

Displays a prompt window with two buttons that perform separate actions

- @param title: Header on dialog
- @param instructions: Smaller print instructions
- @param onAccept: Function that gets executed if player clicks accept
- @param onReject: Function that gets executed if player clicks reject
- @param acceptLabel: String to go in the accept button
- @param rejectLabel: String to go in the reject button
- @param useDarkTheme: Switch to the dark theme

```ts
let prompt = new ui.OptionPrompt(
  'Pick your own adventure!',
  'What will you choose?',
  () => {
    log(`picked option A`)
  },
  () => {
    log(`picked option B`)
  },
  'Option A',
  'Option B'
)
```

> Note: If the player closes the window with the close icon, the related function isn't called.

### Fill in Prompt

Displays a prompt window with a field that can be filled in and a submit button. The value filled into the text box can be used as a parameter in the submit function.

- @param title: Notification string
- @param onAccept: Function that gets executed if player clicks button
- @param acceptLabel: String to go in the accept button
- @param placeholder: Text to display as placeholder in the fill in box
- @param useDarkTheme: Switch to the dark theme

```ts
let prompt = new ui.FillInPrompt(
  'Text goes here',
  (e: string) => {
    log(e)
  },
  'Submit!',
  'What are you thinking?'
)
```

> Note: If the player closes the window with the close icon, the related function isn't called.

### Custom Prompt

## NPC Dialog Window
