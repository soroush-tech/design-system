# NumberInput

A field for a number. A text input - so what is typed is the user's until it is settled - that
reads and writes the number in its locale, clamps it to a range, and steps by the arrow keys,
Home/End, the mouse wheel and buttons that repeat while held. It is a `role="spinbutton"`, so the
number and its range are announced, and a hidden input carries the raw number to a form.

Every label is yours - the buttons' (`incrementLabel`, `decrementLabel`) - so the field carries no
language of its own.

```tsx
import { NumberInput } from '@soroush.tech/design-system/NumberInput'

;<NumberInput
  aria-label="Quantity"
  value={quantity}
  onChange={setQuantity}
  min={1}
  max={99}
  incrementLabel="Increase"
  decrementLabel="Decrease"
/>
```

## Props

| Prop                                        | Type                                               | Default                             | Description                                                                                                                                                                                    |
| ------------------------------------------- | -------------------------------------------------- | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `value`                                     | `number \| null`                                   | -                                   | The number - `null` for none. Controlled with `onChange`.                                                                                                                                      |
| `defaultValue`                              | `number \| null`                                   | `null`                              | The number at first, when uncontrolled.                                                                                                                                                        |
| `onChange`                                  | `(value: number \| null) => void`                  | -                                   | Fired as the number changes - as it is typed, stepped or cleared.                                                                                                                              |
| `onChangeCommitted`                         | `(value: number \| null) => void`                  | -                                   | Fired when the number is settled: on blur, Enter, a step or Home/End.                                                                                                                          |
| `min` / `max`                               | `number`                                           | -                                   | The range. What is typed or stepped is clamped to it when settled.                                                                                                                             |
| `step` / `smallStep` / `largeStep`          | `number`                                           | `1` / `0.1` / `10`                  | What the arrow keys and buttons step by; with Alt held; with Shift held.                                                                                                                       |
| `format`                                    | `Intl.NumberFormatOptions`                         | every digit, ungrouped              | How the number is shown - `{ style: 'percent' }`, `{ minimumFractionDigits: 2 }`...                                                                                                            |
| `locale`                                    | `string`                                           | the document's                      | How the number is written and read.                                                                                                                                                            |
| `shouldSnapOnStep`                          | `boolean`                                          | `false`                             | A step lands on the grid of `step`, counted from `min` (or 0).                                                                                                                                 |
| `shouldScrubOnWheel`                        | `boolean`                                          | `false`                             | The wheel steps the number while the field is focused.                                                                                                                                         |
| `spinButtons`                               | `'stacked' \| 'sides' \| 'none'`                   | `'stacked'`                         | The step buttons: an up and a down at the end, a minus and a plus either side, or none.                                                                                                        |
| `incrementLabel` / `decrementLabel`         | `string`                                           | -                                   | Name the buttons - no built-in text.                                                                                                                                                           |
| `startContent` / `endContent`               | `ReactNode`                                        | -                                   | Content inside the frame - an icon before the number; a unit such as `px`, `%` or a button after it, before the step buttons. Each has the room at the frame's edge the input has on its side. |
| `variant`                                   | `'default' \| 'outlined' \| 'underline' \| 'text'` | `theme.defaults.inputVariant`       | The frame, as on `TextInput`.                                                                                                                                                                  |
| `size`                                      | `keyof Theme['sizes']`                             | its `FormControl`'s, `'md'`         | Padding and font size.                                                                                                                                                                         |
| `color`                                     | `keyof Theme['palette']`                           | its `FormControl`'s, `'primary'`    | The focus border and button hover.                                                                                                                                                             |
| `textColor`                                 | `keyof Theme['text']`                              | its `FormControl`'s, `color`'s main | The number's color.                                                                                                                                                                            |
| `error` / `disabled` / `required`           | `boolean`                                          | its `FormControl`'s                 | The error border and `aria-invalid`; off; marked required.                                                                                                                                     |
| `readOnly`                                  | `boolean`                                          | `false`                             | Takes no change: the keys, the wheel and the buttons do nothing.                                                                                                                               |
| `fullWidth`                                 | `boolean`                                          | its `FormControl`'s                 | Fills its container.                                                                                                                                                                           |
| `name`                                      | `string`                                           | -                                   | What a form submits the raw number as.                                                                                                                                                         |
| `id`                                        | `string`                                           | its `FormControl`'s                 | On the field, which a `FormLabel` targets.                                                                                                                                                     |
| `placeholder`, `autoFocus`, `aria-label`... |                                                    |                                     | On the field.                                                                                                                                                                                  |

It takes the styled-system space props, `width`, `minWidth`, `maxWidth`, `className` and
`data-testid` too.

## Typing and settling

What is typed is the user's: `12.` stays as typed while it is told as `12`, and text that is not
yet a number - a lone minus - waits to be finished. The number is settled on blur or Enter: it is
written again in its format, clamped to `min`/`max`, and `onChangeCommitted` is told. Text that
never became a number settles back to the last one; empty text settles to `null`.

A locale's digits and decimal mark are read as well as written - `1,5` in `de-DE`, `١٢٫٥` in
`ar-EG` - and a percent format reads `50%` as `0.5`.

## Keys, the wheel and the buttons

| Key                 | Does                                                                |
| ------------------- | ------------------------------------------------------------------- |
| ArrowUp / ArrowDown | Step by `step`; with Alt by `smallStep`; with Shift by `largeStep`. |
| Home / End          | Go to `min` / `max` - when there is one.                            |
| Enter               | Settle what is typed.                                               |

Steps add without float noise (`0.1 + 0.2` is `0.3`), start from `0` when there is no number, and
stop at the range. The buttons step on a press and repeat while held, after a pause; they are out
of the tab order, since the keys already step, and are off at the range's ends.

## In a `FormControl`

Its `FormLabel` targets the field, its `FormHelperText` describes it, and the field's `size`,
`color`, `error`, `disabled` and `required` apply, an own prop winning.

```tsx
<FormControl>
  <FormLabel>Quantity</FormLabel>
  <NumberInput min={1} max={99} incrementLabel="Increase" decrementLabel="Decrease" />
  <FormHelperText>Between 1 and 99.</FormHelperText>
</FormControl>
```

## A number written with its unit

What is typed is read for its digits, in the field's locale, so `12px`, `12 px` and `1.5rem` are 12, 12 and 1.5 -
a pasted CSS length is a number. Put the unit where it is shown in `endContent`.

## Customization

`theme.components.NumberInput` styles the `root`, the `input`, the `content` before and after it, the `spinButtons` pair and each
`increment` / `decrement` button. Its `defaultProps` set `variant`, `size`, `color`, `spinButtons`,
the three steps, `shouldSnapOnStep`, `shouldScrubOnWheel` - and the two button labels, which give
every field the app's language.

## Accessibility

- A `role="spinbutton"` text input with `aria-valuenow`, `aria-valuemin` and `aria-valuemax`: the
  number and its range are announced; name it with a `FormLabel` or `aria-label`.
- The step buttons are `aria-label`led (give them text in the app's language) and out of the tab
  order; the keys do the same.
- `error` sets `aria-invalid`; helper text is read as the field's description.
