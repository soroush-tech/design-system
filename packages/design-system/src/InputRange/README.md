# InputRange

A slider: one value on a range, or two or more thumbs for a range of values. Each thumb is a
visually hidden native `<input type="range">`, so the keys (the arrows, Page, Home and End),
assistive technology and forms work as the platform's; the pointer drags a thumb, touch included.

Every name is yours - each thumb's (`getAriaLabel`, or a `FormLabel`), and the text of its value
(`getAriaValueText`) - so the slider carries no language of its own.

```tsx
import { InputRange } from '@soroush.tech/design-system/InputRange'

// One thumb
;<InputRange
  aria-label="Volume"
  value={volume}
  onChange={(_event, value) => setVolume(value as number)}
/>

// A range - one thumb for each value
;<InputRange
  value={[20, 70]}
  onChange={(_event, value) => setRange(value as number[])}
  getAriaLabel={(index) => (index === 0 ? 'Least price' : 'Greatest price')}
  valueLabel="auto"
/>
```

## Props

| Prop                                 | Type                                          | Default                          | Description                                                                                  |
| ------------------------------------ | --------------------------------------------- | -------------------------------- | -------------------------------------------------------------------------------------------- |
| `value`                              | `number \| number[]`                          | -                                | One thumb for a number, one per entry for an array. Controlled with `onChange`.              |
| `defaultValue`                       | `number \| number[]`                          | `min`                            | The value at first, when uncontrolled.                                                       |
| `onChange`                           | `(event, value, activeThumb: number) => void` | -                                | Fired as the value changes. `event.target` is `{ value, name }`, as a form library reads it. |
| `onChangeCommitted`                  | `(event, value) => void`                      | -                                | Fired when a change is done: on release, and after every key.                                |
| `min` / `max`                        | `number`                                      | `0` / `100`                      | The range.                                                                                   |
| `step`                               | `number \| null`                              | `1`                              | The step. `null` limits the value to `marks`.                                                |
| `shiftStep`                          | `number`                                      | `10`                             | PageUp, PageDown and Shift with an arrow.                                                    |
| `marks`                              | `boolean \| { value, label? }[]`              | `false`                          | `true` marks every step; or the marks, each with the label it shows under it.                |
| `orientation`                        | `'horizontal' \| 'vertical'`                  | `'horizontal'`                   | A vertical slider is `12rem` tall unless given a `height`.                                   |
| `track`                              | `'normal' \| false \| 'inverted'`             | `'normal'`                       | The line between the thumbs - `'inverted'` fills the rest, `false` draws none.               |
| `scale`                              | `(value: number) => number`                   | itself                           | The value as it is shown and announced - not what is stored.                                 |
| `valueLabel`                         | `'off' \| 'auto' \| 'on'`                     | `'off'`                          | When a thumb shows its value: never, while hovered or focused, or always.                    |
| `formatValueLabel`                   | `(value: number, index: number) => ReactNode` | the scaled value                 | What the label says.                                                                         |
| `getAriaLabel`                       | `(index: number) => string`                   | -                                | Names each thumb. A range needs one; a single thumb may take `aria-label`.                   |
| `getAriaValueText`                   | `(value: number, index: number) => string`    | -                                | The value's text for each thumb, where the number alone isn't clear.                         |
| `shouldSwapThumbs`                   | `boolean`                                     | `true`                           | A thumb passes its neighbour, taking its place. Without it, it stops at its neighbour.       |
| `size`                               | `keyof Theme['sizes']`                        | its `FormControl`'s, `'md'`      | The thumb's size (`theme.icon`) and the rail's thickness.                                    |
| `color`                              | `keyof Theme['palette']`                      | its `FormControl`'s, `'primary'` | The track's and the thumbs' color.                                                           |
| `disabled`                           | `boolean`                                     | its `FormControl`'s              | Dimmed; the inputs are off and the pointer does nothing.                                     |
| `error`                              | `boolean`                                     | its `FormControl`'s              | The track and thumbs take the error color, and the inputs are `aria-invalid`.                |
| `name`                               | `string`                                      | -                                | What a form submits each thumb's value as - one entry for each thumb.                        |
| `id`                                 | `string`                                      | its `FormControl`'s              | On the first thumb's input, which a `FormLabel` targets.                                     |
| `aria-label`, `aria-labelledby`, ... |                                               |                                  | On each thumb's input.                                                                       |

It takes the styled-system space props, `width`, `height`, `minWidth`, `maxWidth`, `minHeight`,
`maxHeight`, `className` and `data-testid` too.

## Keys

| Key                  | Does                                                                           |
| -------------------- | ------------------------------------------------------------------------------ |
| ArrowUp, ArrowRight  | Up by `step` (with Shift, by `shiftStep`). ArrowRight goes down right to left. |
| ArrowDown, ArrowLeft | Down by `step` (with Shift, by `shiftStep`). ArrowLeft goes up right to left.  |
| PageUp, PageDown     | Up and down by `shiftStep`.                                                    |
| Home, End            | To `min` and `max`.                                                            |

With `step={null}` the arrows and Page keys go to the next mark the way they point and stop at the
last; Home and End go to the first and last mark. Each key tells `onChangeCommitted`, even at an end.

## The pointer

A press sets the value under it - on the nearest thumb, the later one on a tie - and a drag follows
the pointer, held by pointer capture even past the slider's box; touch drags a thumb, not the page.
`onChange` is told only when the value changes, `onChangeCommitted` once on release. A release that
never came - another element took it - ends the drag on the next move.

In a range, a thumb dragged past its neighbour swaps places with it, the values staying sorted
(`shouldSwapThumbs={false}` stops it at its neighbour instead).

## In a `FormControl`

Its `FormLabel` targets the first thumb and names every thumb (`aria-labelledby`), its
`FormHelperText` describes them, and the field's `size`, `color`, `error` and `disabled` apply, an
own prop winning.

```tsx
<FormControl>
  <FormLabel>Volume</FormLabel>
  <InputRange defaultValue={30} />
  <FormHelperText>Loud or quiet.</FormHelperText>
</FormControl>
```

A slider always has a value, so it takes no `required`.

## Customization

`theme.components.InputRange` styles the `root`, the `rail`, the `track`, each `thumb`, the `mark`s
and their `markLabel`s, the `valueLabel` and each `input`. Its `defaultProps` set `size`, `color`,
`orientation`, `track`, `step`, `shiftStep`, `valueLabel` and `shouldSwapThumbs`.

## Accessibility

- Each thumb is a native range input - a `slider` with `aria-valuemin`, `aria-valuemax` and
  `aria-valuenow` (as `scale` shows them) and `aria-orientation`.
- Name every thumb: `aria-label` for one, `getAriaLabel` for a range, or a `FormLabel`. Give
  `getAriaValueText` where the number alone isn't clear ("30 minutes").
- The value label and mark labels are decoration, hidden from assistive technology.
- Right to left, the horizontal arrows and the pointer's direction are mirrored.
