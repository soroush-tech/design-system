# TransferList

Two lists, and the buttons that move the checked items from one to the other. Each list is a list of
rows whose checkbox is the row - one tab stop, the label toggles it - so keys, assistive technology
and the platform's checkboxes work as they always do.

Every name is yours - the lists' titles and the four buttons' - so it carries no language of its own.

```tsx
import { TransferList } from '@soroush.tech/design-system/TransferList'

;<TransferList
  items={[
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'date', label: 'Date', disabled: true },
  ]}
  value={chosen}
  onChange={setChosen}
  leftLabel="Choices"
  rightLabel="Chosen"
  moveRightLabel="Move the checked items right"
  moveLeftLabel="Move the checked items left"
/>
```

## Props

| Prop                                                                       | Type                                              | Default                         | Description                                                                             |
| -------------------------------------------------------------------------- | ------------------------------------------------- | ------------------------------- | --------------------------------------------------------------------------------------- |
| `items`                                                                    | `{ value: string \| number, label, disabled? }[]` | -                               | Every item, on either side. Each `value` is unique.                                     |
| `value`                                                                    | `(string \| number)[]`                            | -                               | The values on the right. Controlled with `onChange`.                                    |
| `defaultValue`                                                             | `(string \| number)[]`                            | `[]`                            | The values on the right at first, when uncontrolled.                                    |
| `onChange`                                                                 | `(value: (string \| number)[]) => void`           | -                               | Fired as items move, with the values now on the right.                                  |
| `leftLabel` / `rightLabel`                                                 | `string`                                          | -                               | The lists' titles, which name them.                                                     |
| `moveAllRightLabel`, `moveRightLabel`, `moveLeftLabel`, `moveAllLeftLabel` | `string`                                          | -                               | Name the four buttons.                                                                  |
| `shouldShowMoveAll`                                                        | `boolean`                                         | `false`                         | Adds the buttons that move every enabled item at once.                                  |
| `hasSelectAll`                                                             | `boolean`                                         | `false`                         | A checkbox in each list's header - all, some or none checked - and the count beside it. |
| `getCountLabel`                                                            | `(checked: number, total: number) => string`      | `` `${checked}/${total}` ``     | What the count says.                                                                    |
| `size`                                                                     | `keyof Theme['sizes']`                            | its `FormControl`'s, `'md'`     | The checkboxes' and buttons' size.                                                      |
| `color`                                                                    | `keyof Theme['palette']`                          | its `FormControl`'s             | The checkboxes' and buttons' color.                                                     |
| `textColor`                                                                | `keyof Theme['text']`                             | its `FormControl`'s or `Form`'s | The text color of the titles, the count and the items.                                  |
| `disabled`                                                                 | `boolean`                                         | its `FormControl`'s             | Dimmed; every checkbox and button is off.                                               |
| `error`                                                                    | `boolean`                                         | its `FormControl`'s             | The lists take the error color.                                                         |
| `id`                                                                       | `string`                                          | its `FormControl`'s             | On the group.                                                                           |
| `aria-label`, `aria-labelledby`, `aria-describedby`                        |                                                   |                                 | On the group. An own one wins over its `FormControl`'s.                                 |

It takes the styled-system space props, `className` and `data-testid` too.

## Moving

- **Move right** and **move left** take the checked items of their list, and are off while none is
  checked.
- **Move all** (`shouldShowMoveAll`) takes every enabled item of its list, and is off when there are
  none.
- A moved item is unchecked. The items keep their own order on each side - the order of `items` -
  and `onChange` is told the new values on the right.
- A disabled item stays where it is: it can't be checked, and move-all leaves it.

With `hasSelectAll`, each list's header has a checkbox - checked when every enabled item of the list
is, indeterminate when some are - that checks or unchecks them all, and the count of the checked
items out of the list's.

## In a `FormControl`

Its `FormLabel` names the group (`aria-labelledby`), its `FormHelperText` describes it, and the
field's `size`, `color`, `error` and `disabled` apply, an own prop winning.

```tsx
<FormControl>
  <FormLabel>Fruit</FormLabel>
  <TransferList items={items} leftLabel="Choices" rightLabel="Chosen" />
  <FormHelperText>Choose any.</FormHelperText>
</FormControl>
```

## Customization

`theme.components.TransferList` styles the `root`, each `list` with its `header`, `title` and
`count`, the `items` (the scrolling list of rows), each `item`, the `controls` and their `icon`.
Its `defaultProps` set `size`, `color`, `shouldShowMoveAll`, `hasSelectAll` and the four buttons'
labels.

## Accessibility

- The group is a `role="group"`. Each list is a `role="list"` named by its title, each row a
  `role="listitem"` whose checkbox is named by its label (`aria-labelledby`).
- Name every button: `moveRightLabel`, `moveLeftLabel` and, with `shouldShowMoveAll`, the two
  move-all labels - an icon alone says nothing.
- The header checkbox is named by its list's title.
- Right to left, the lists swap sides and the chevrons turn around.

## Not included

A public `List`, drag and drop, and a touch layout - the buttons are the way to move items.
