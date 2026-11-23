# Rating

A row of icons the user sets as a rating - or, read-only, a display of one. A group of visually
hidden native radio inputs, so the keys (Tab to the rating, the arrows to change it), assistive
technology and forms work as the platform's. Hovering previews the value under the pointer, and
pressing the chosen item clears it.

Every label is yours - an item's name (`getLabelText`) and the "no rating" radio (`emptyLabelText`) -
so the rating carries no language of its own.

```tsx
import { Rating } from '@soroush.tech/design-system/Rating'

;<Rating
  aria-label="Quality"
  value={rating}
  onChange={(event, value) => setRating(value)}
  getLabelText={(value) => `${value} of 5`}
/>
```

## Props

| Prop                    | Type                                     | Default                          | Description                                                                                   |
| ----------------------- | ---------------------------------------- | -------------------------------- | --------------------------------------------------------------------------------------------- |
| `value`                 | `number \| null`                         | -                                | The rating - `null` for none. Controlled with `onChange`.                                     |
| `defaultValue`          | `number \| null`                         | `null`                           | The rating at first, when uncontrolled.                                                       |
| `onChange`              | `(event, value: number \| null) => void` | -                                | Fired when the rating changes - `null` when it is cleared.                                    |
| `onChangeActive`        | `(event, value: number) => void`         | -                                | Fired as the hovered value changes - `-1` when the pointer leaves.                            |
| `max`                   | `number`                                 | `5`                              | How many items.                                                                               |
| `precision`             | `number`                                 | `1`                              | The least step - `0.5` for halves. The rating is rounded to it.                               |
| `highlightSelectedOnly` | `boolean`                                | `false`                          | Only the chosen item is filled, not every one up to it.                                       |
| `icon`                  | `ReactNode`                              | the `star` icon                  | The filled item.                                                                              |
| `emptyIcon`             | `ReactNode`                              | the `star_border` icon           | The empty item.                                                                               |
| `getLabelText`          | `(value: number) => string`              | its number                       | The accessible name of an item, and of a read-only rating.                                    |
| `emptyLabelText`        | `string`                                 | -                                | Names the "no rating" radio, which clears the rating from the keys. None is drawn without it. |
| `readOnly`              | `boolean`                                | `false`                          | A display: `role="img"`, named by `getLabelText`, not focusable, taking no pointer.           |
| `size`                  | `keyof Theme['sizes']`                   | its `FormControl`'s, `'md'`      | The icons' size - `theme.icon`.                                                               |
| `color`                 | `keyof Theme['palette']`                 | its `FormControl`'s, `'warning'` | The filled items' color.                                                                      |
| `disabled`              | `boolean`                                | its `FormControl`'s              | Draws the radios off: nothing is submitted, the pointer does nothing.                         |
| `required`              | `boolean`                                | its `FormControl`'s              | Marks the radios required, and the group `aria-required`.                                     |
| `error`                 | `boolean`                                | its `FormControl`'s              | The empty items take the error color, and the group is `aria-invalid`.                        |
| `name`                  | `string`                                 | generated                        | The radios' name - what a form submits the rating as.                                         |
| `id`                    | `string`                                 | its `FormControl`'s              | On the group.                                                                                 |
| `aria-label`            | `string`                                 | -                                | Names the group - or its `FormLabel` does, in a `FormControl`.                                |

It takes the styled-system space props, `className` and `data-testid` too.

## Precision

With `precision` below 1 each item holds the steps in it - halves at `0.5` - and the pointer picks
the nearest one. A rating is rounded to its precision: `2.3` at `0.5` is `2.5`.

## Keys and the pointer

Tab focuses the current rating (or the first item when there is none); the arrow keys move between
items, as native radios do. While the pointer is over the rating it sets the value, and a key and a
press at once is the press. Pressing the chosen item again clears it - `onChange(event, null)` -
but a key doesn't: give `emptyLabelText` for the keys' way to no rating.

## In a `FormControl`

Its `FormLabel` names the group (`aria-labelledby` - a `for` would turn a click on the label into a
press on an item), its `FormHelperText` describes it, and the field's `size`, `color`, `error`,
`disabled` and `required` apply, an own prop winning:

```tsx
<FormControl error>
  <FormLabel>Quality</FormLabel>
  <Rating emptyLabelText="No rating" />
  <FormHelperText>Choose how it was.</FormHelperText>
</FormControl>
```

## Customization

`theme.components.Rating` styles the `root`, each `item` (the label of an icon), the `icon`, the
`decimal` holding a fractional item's steps, the visually hidden `input` and `text`, and the
`emptyLabel`. Its `defaultProps` set `max`, `precision`, `highlightSelectedOnly`, `size` and `color`.

## Accessibility

- A group of native radios: Tab focuses the current rating, the arrows change it. Name the group with
  `aria-label`, or a `FormLabel`.
- Each radio's name is its `getLabelText` - give a function in the app's language; the default is the number.
- Filled and empty items differ in shape (a solid and an outlined star) as well as color. If color is
  the only difference in your icons, show the value as text too (WCAG 1.4.1).
- A read-only rating is one image, `role="img"`, named by its rating.
