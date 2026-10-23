# Tabs

A row of tabs. By default it is a `tablist`: one tab in the page's tab order, the arrow keys of
its orientation moving between tabs, Enter or Space selecting. With `as="nav"` the same look
is a navigation of buttons or links, the current one marked `aria-current="page"`. The row can
carry content of its own before and after the tabs - an icon, a toolbar, a "+" button.

```tsx
import { Tab, Tabs } from '@soroush.tech/design-system/Tabs'

;<Tabs value={value} onChange={setValue} textColor="secondary" color="secondary" aria-label="Items">
  <Tab value="one" label="Item One" />
  <Tab value="two" label="Item Two" icon={<Icon name="folder" size="sm" />} />
  <Tab value="three" label="Item Three" disabled />
</Tabs>
```

`Tabs` holds its own value (`defaultValue`) or takes it (`value` / `onChange`). To show a panel for
each tab, put the tabs in a `TabContext` as a `TabList` - it links each tab to its `TabPanel`:

```tsx
import { Tab, TabContext, TabList, TabPanel } from '@soroush.tech/design-system/Tabs'

;<TabContext value={value}>
  <TabList onChange={setValue} aria-label="Items">
    <Tab label="Item One" value="1" />
    <Tab label="Item Two" value="2" />
  </TabList>
  <TabPanel value="1">...</TabPanel>
  <TabPanel value="2">...</TabPanel>
</TabContext>
```

The family: `Tabs`, `Tab`, `TabContext`, `TabList`, `TabPanel` and `TabScrollButton`.

## Tabs props

| Prop                  | Type                                                     | Default                                       | Description                                                                                                                                                                                                                                                                                                    |
| --------------------- | -------------------------------------------------------- | --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `children`            | `ReactNode`                                              | -                                             | `Tab`s.                                                                                                                                                                                                                                                                                                        |
| `value`               | `string \| number \| null`                               | -                                             | The selected tab's value - `null` for none. Controlled with `onChange`.                                                                                                                                                                                                                                        |
| `defaultValue`        | `string \| number \| null`                               | -                                             | The selected tab's value at first, when uncontrolled.                                                                                                                                                                                                                                                          |
| `onChange`            | `(value: string \| number) => void`                      | -                                             | Fired with a tab's value when it is chosen.                                                                                                                                                                                                                                                                    |
| `onTabClose`          | `(value: string \| number) => void`                      | -                                             | Fired with a closable tab's value when its close button, a middle click or Delete closes it. Removing it and picking the next selection are the app's.                                                                                                                                                         |
| `shouldAnnounceClose` | `boolean`                                                | `false`                                       | Names each closable tab's close button, and the one in the overflow menu, by its `closeLabel` for assistive technology - a button found and pressed by name, still out of the tab order. It is beside the tab, not inside it. Without it, the button is the pointer's alone and Delete closes the focused tab. |
| `as`                  | `'div' \| 'nav'`                                         | `'div'`                                       | `'nav'` makes it a navigation (`aria-current="page"`) rather than a `tablist`.                                                                                                                                                                                                                                 |
| `orientation`         | `'horizontal' \| 'vertical'`                             | `'horizontal'`                                | Vertical tabs stack, with Up and Down for the keys.                                                                                                                                                                                                                                                            |
| `variant`             | `keyof TabsVariants`                                     | `'underline'`                                 | `'underline'` - an indicator slides under the selected tab; `'boxed'` - the selected tab is outlined on a raised ground; `'enclosed'` - the selected tab is outlined on its top and sides, open onto the divider. Augmentable.                                                                                 |
| `color`               | `keyof Theme['palette']`                                 | `'primary'`                                   | The indicator's or outline's color.                                                                                                                                                                                                                                                                            |
| `textColor`           | `keyof Theme['text']`                                    | `'primary'`                                   | The labels' color.                                                                                                                                                                                                                                                                                             |
| `size`                | `keyof Theme['sizes']`                                   | `'md'`                                        | Density token.                                                                                                                                                                                                                                                                                                 |
| `fullWidth`           | `boolean`                                                | `false`                                       | The tabs share the row's width equally.                                                                                                                                                                                                                                                                        |
| `isCentered`          | `boolean`                                                | `false`                                       | The tabs sit in the middle of the row.                                                                                                                                                                                                                                                                         |
| `shouldSelectOnFocus` | `boolean`                                                | `false`                                       | Moving focus with the arrow keys selects as it goes.                                                                                                                                                                                                                                                           |
| `hasDivider`          | `boolean`                                                | `true`, `false` when boxed                    | A line along the row's foot (a column's end side), under its own content too. In the enclosed look it runs round the selected tab; without it there is no border - the selected tab stands out by `selectedBg`.                                                                                                |
| `bg`                  | `keyof Theme['background']`                              | -                                             | The tab strip's ground.                                                                                                                                                                                                                                                                                        |
| `selectedBg`          | `keyof Theme['background']`                              | `'paper'` boxed or enclosed without a divider | The selected tab's ground. Give its `TabPanel` the same `bg` and the two read as one.                                                                                                                                                                                                                          |
| `slots`               | `{ scrollButton?: ComponentType<TabScrollButtonProps> }` | -                                             | A scroll button of your own, in place of `TabScrollButton` - given the same props.                                                                                                                                                                                                                             |
| `startContent`        | `ReactNode`                                              | -                                             | Before the tabs, a space from them. Keeps its own tab stops; the arrow keys don't reach it.                                                                                                                                                                                                                    |
| `endContent`          | `ReactNode`                                              | -                                             | After the tabs, a space from them. Keeps its own tab stops; the arrow keys don't reach it.                                                                                                                                                                                                                     |
| `action`              | `Ref<TabsActions>`                                       | -                                             | `updateIndicator()` - re-measures the selected tab after a font loads or a label changes.                                                                                                                                                                                                                      |
| `aria-label`          | `string`                                                 | -                                             | Names the tablist (or the navigation).                                                                                                                                                                                                                                                                         |
| `aria-labelledby`     | `string`                                                 | -                                             | Names it after another element.                                                                                                                                                                                                                                                                                |

Plus the styled-system **space** props (`m`, `p`, ...) on the row.

### Scrolling tabs

```tsx
<Tabs overflowBehavior="scroll" scrollButtons="auto" aria-label="Components">
  {components.map((name) => (
    <Tab key={name} value={name} label={name} />
  ))}
</Tabs>
```

With `overflowBehavior="scroll"` the list scrolls along its orientation when its tabs don't fit.

| Prop                              | Type                            | Default  | Description                                                                                                                                        |
| --------------------------------- | ------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `overflowBehavior`                | `'scroll' \| 'menu' \| 'none'`  | `'none'` | What the row does when its tabs don't fit - scroll, or list the ones that don't in a menu (below).                                                 |
| `scrollButtons`                   | `'auto' \| 'always' \| 'never'` | `'auto'` | `auto` - shown while the tabs overflow, each only while tabs are out of view its way; `always` - both, the one at an end disabled; `never` - none. |
| `shouldShowScrollButtonsOnMobile` | `boolean`                       | `false`  | Show the buttons on narrow screens too, where swiping does the job.                                                                                |
| `hasVisibleScrollbar`             | `boolean`                       | `false`  | Show the list's scrollbar.                                                                                                                         |

- A button scrolls by the list's visible size - smoothly, unless the user prefers reduced motion.
- The buttons are `aria-hidden` and out of the tab order: the arrow keys already reach every tab.
- Selecting a tab, by key, click or `value`, scrolls it fully into view.
- Vertical tabs scroll up and down; right to left, the buttons and scrolling are mirrored.
- `action.updateOverflow()` re-reads the overflow, as `updateIndicator()` re-measures.

### Tabs that don't fit go to a menu

```tsx
<Tabs overflowBehavior="menu" overflowLabel="More tabs" aria-label="Files">
  {files.map((name) => (
    <Tab key={name} value={name} label={name} closeLabel={`Close ${name}`} />
  ))}
</Tabs>
```

With `overflowBehavior="menu"` the row draws the tabs that fit **whole** and lists the rest in a
`Menu` behind a button at the list's end. Nothing scrolls, and no tab is cut by the edge.

| Prop            | Type     | Default | Description                                                                    |
| --------------- | -------- | ------- | ------------------------------------------------------------------------------ |
| `overflowLabel` | `string` | -       | Names the button that opens the menu of the tabs that don't fit ("More tabs"). |

- **The rule:** the tab in the page's tab order - the selected one, or the first enabled one -
  counts first, then the others in order while the next still fits whole with the gap. The first
  that doesn't ends the row, and every one after it goes to the menu, even a later short one, so
  the row never reads out of order. The kept tab is drawn even when it alone is larger than the
  room, cut by the list.
- **The room** is the list's size along its orientation less its padding, so `startContent`,
  `endContent` and the button take theirs first. Each tab's size is remembered from when it was
  drawn, so one put in the menu comes back when the room grows; the row is measured after every
  render and whenever the list resizes. Vertical tabs fit down the column.
- **The menu** lines up with the list's end, mirrored right to left. Each hidden tab is a row -
  its label, or its icon - and choosing one selects it, which brings it into the row. A closable
  tab's row has its ✕ beside it (`MenuItem`'s `secondaryAction`) - the pointer's, hidden from
  assistive technology as a tab's is - and Delete on the row closes it too; both fire
  `onTabClose`.
- Prerendered, or wherever nothing is laid out (jsdom), every tab is drawn and the button isn't.
- `action.updateOverflow()` measures again.

## Tab, TabContext, TabList and TabPanel

- `Tab` - one tab: its label, icons, and close button.
- `TabContext` - holds the value for a `TabList` and its panels.
- `TabList` - the `Tabs` of a `TabContext`, each tab linked to its panel.
- `TabPanel` - the content a tab shows.

## Keyboard

| Key                                             | Does                                                                                          |
| ----------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Right / Left (horizontal), Down / Up (vertical) | The next / previous enabled tab, coming round at the ends. Left and Right swap right to left. |
| Home / End                                      | The first / last enabled tab                                                                  |
| Enter / Space                                   | Selects the focused tab                                                                       |
| Tab                                             | Leaves the tabs - into `endContent`, or the panel                                             |

A navigation (`as="nav"`) keeps every tab in the page's tab order instead, as links are.

## Notes

- Every tab keeps the same width selected or not - its border is there, transparent, until it
  is selected - so nothing in the row moves when the selection or the pointer does.
- The divider is drawn inside the row, so it adds no height. It runs under `startContent` and
  `endContent` too - the space between them and the tabs is theirs, so the line carries on
  through it. The enclosed look draws it piece by piece, the selected tab leaving its piece out,
  so the opening shows whatever is behind the row - a page, a `Paper`, a `Card`.
- `TabsVariants` is augmentable, as `ButtonVariants` is: register a look, then style it through
  `theme.components.Tabs.variants`.
- A tab points `aria-controls` at its panel only in a `TabList`, whose `TabContext` is where
  `TabPanel`s live - tabs that hold their own value have no panel to point at.
