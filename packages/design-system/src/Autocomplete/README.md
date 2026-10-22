# Autocomplete

A field whose text finds an option in a list: a `role="combobox"` input with a `role="listbox"` below it
(in a `Portal`, placed under the field and flipped for want of room), `aria-activedescendant` on the
highlighted option. It chooses one option, or several with `multiple` - each shown as a `Chip` - or, with
`shouldAllowFreeText`, takes what is typed as a value. In a `FormControl` its `FormLabel` names it, and its
size, color, error and disabled state apply. The words - clear, open, close, loading, nothing found - are
yours: no built-in English.

```tsx
import { Autocomplete } from '@soroush.tech/design-system/Autocomplete'

;<Autocomplete
  options={['Berlin', 'Lisbon', 'Oslo']}
  aria-label="City"
  noOptionsText="No city matches"
  onChange={(event, city) => setCity(city)}
/>
```

## Props

| Prop                                                              | Type                                                   | Default                  | Description                                                                            |
| ----------------------------------------------------------------- | ------------------------------------------------------ | ------------------------ | -------------------------------------------------------------------------------------- |
| `options`                                                         | `readonly T[]`                                         | -                        | What can be chosen - strings, or anything `getOptionLabel` can say.                    |
| `value` / `defaultValue`                                          | `T \| null`, or `T[]` with `multiple`                  | `null` / `[]`            | The choice. Controlled with `onChange`, or at first.                                   |
| `onChange`                                                        | `(event, value, reason) => void`                       | -                        | `reason`: `'selectOption'`, `'removeOption'`, `'createOption'` or `'clear'`.           |
| `inputValue` / `onInputChange`                                    | `string` / `(event, value, reason) => void`            | -                        | The text, controlled. `reason`: `'input'`, `'reset'` or `'clear'`.                     |
| `multiple`                                                        | `boolean`                                              | `false`                  | Chooses several: each shows as a `Chip`, and Backspace in the empty field removes one. |
| `shouldAllowFreeText`                                             | `boolean`                                              | `false`                  | Takes a typed text that is no option as the value - a string - on Enter or on leaving. |
| `getOptionLabel`                                                  | `(option) => string`                                   | the string, else `label` | What an option says, and what is typed to find it.                                     |
| `isOptionEqualToValue`                                            | `(option, value) => boolean`                           | `===`                    | Whether an option is the value.                                                        |
| `filterOptions`                                                   | `(options, { inputValue }) => T[]`                     | label holds the text     | The options that match what is typed.                                                  |
| `groupBy`                                                         | `(option) => string`                                   | -                        | The group of an option - options of one group are put next to one another.             |
| `renderOption`                                                    | `(option, { isSelected, isHighlighted }) => ReactNode` | the label                | What an option shows in its row.                                                       |
| `isLoading` / `loadingText`                                       | `boolean` / `string`                                   | `false` / -              | While there is nothing to list, the list says `loadingText`.                           |
| `noOptionsText`                                                   | `string`                                               | -                        | What the list says when nothing matches. Without it, the list stays closed.            |
| `clearLabel`                                                      | `string`                                               | -                        | Names the clear control. Without it, there is none.                                    |
| `openLabel` / `closeLabel`                                        | `string`                                               | -                        | Name the control that opens and closes the list.                                       |
| `getRemoveLabel`                                                  | `(label) => string`                                    | -                        | Names the control that removes a chip, by its label. Without it, a chip has none.      |
| `variant` / `size` / `color`                                      |                                                        | its `FormControl`'s      | The frame, as `TextInput`'s; `theme.sizes`; `theme.palette`.                           |
| `disabled` / `error` / `required` / `fullWidth`                   | `boolean`                                              | its `FormControl`'s      | Native state.                                                                          |
| `layer`                                                           | `keyof Theme['zOrder']`                                | `'modal'`                | Stacking layer of the list.                                                            |
| `placeholder`, `name`, `id`, `className`, `aria-*`, `data-testid` |                                                        |                          | On the field.                                                                          |

## Keyboard

- ArrowDown and ArrowUp open the list, then step through the options, round the ends.
- Home and End go to the first and the last option while the list is being walked - otherwise they move the caret.
- Enter chooses the highlighted option, or takes the text with `shouldAllowFreeText`.
- Escape closes the list. Leaving the field puts back the chosen option's label.

## Customization

`theme.components.Autocomplete` styles the `root`, `tags`, `input`, `clearIndicator`, `popupIndicator`,
`popup`, `listbox`, `group`, `groupLabel`, `groupItems`, `option` and `status`. Its `defaultProps` set
`variant`, `size`, `color`, `shouldAllowFreeText`, `layer` and the labels - so a theme gives every
`Autocomplete` its language.

## Server rendering

The list of options is drawn in a `Portal`, which renders nothing on the server: it is absent from server-rendered and prerendered HTML, and mounts on the client when it opens (on a click, hover, focus or key, or when the app sets it open). One that starts open, by its open prop, is still closed in the static HTML and opens on hydration. Its trigger renders on the server as usual.

## Accessibility

- The input is the WAI-ARIA combobox with a list: `aria-expanded`, `aria-controls`, `aria-autocomplete="list"`,
  and `aria-activedescendant` - the focus stays in the field.
- Options are `role="option"` with `aria-selected`; groups are `role="group"` named by their heading.
- The indicators are out of the tab order: the keys do what they do.
