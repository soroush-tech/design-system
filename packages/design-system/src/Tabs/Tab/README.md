# Tab

One tab of a `Tabs` row: a label, an icon on any side of it, and - with a `closeLabel` - a close
button of its own.

```tsx
<Tabs aria-label="Views" defaultValue="canvas">
  <Tab value="canvas" label="Canvas" />
  <Tab
    value="system"
    label="Design system"
    icon={<Icon name="folder" size="sm" />}
    iconPosition="start"
  />
</Tabs>
```

The icon is yours, at the size you give it - the tab places it and sizes nothing. Every
label in a row sits on one line: a tab made taller by an icon above its label leaves the
others' labels at its foot, level with its own.

## Props

| Prop              | Type                                    | Default                          | Description                                                                         |
| ----------------- | --------------------------------------- | -------------------------------- | ----------------------------------------------------------------------------------- |
| `value`           | `string \| number`                      | its position                     | What the tab is chosen as.                                                          |
| `label`           | `ReactNode`                             | -                                | The tab's label.                                                                    |
| `icon`            | `ReactNode`                             | -                                | The tab's icon, at the size you give it.                                            |
| `iconPosition`    | `'start' \| 'end' \| 'top' \| 'bottom'` | `'top'`                          | Where `icon` sits around the label.                                                 |
| `color`           | `keyof Theme['palette']`                | its `Tabs`'                      | The tab's accent - its selected label, outline and indicator, and its hover tint.   |
| `textColor`       | `keyof Theme['text']`                   | its `Tabs`'                      | The label's color.                                                                  |
| `size`            | `keyof Theme['sizes']`                  | its `Tabs`'                      | Density - the label's padding and font size.                                        |
| `bg`              | `keyof Theme['background']`             | -                                | The tab's ground while unselected.                                                  |
| `selectedBg`      | `keyof Theme['background']`             | its `Tabs`' `selectedBg`         | The tab's ground while selected.                                                    |
| `borderRadius`    | `keyof Theme['radii']`                  | `'sm'` boxed or enclosed         | Its corner radius - in the enclosed look only the corners away from the divider.    |
| `isWrapped`       | `boolean`                               | `false`                          | The label may take two lines.                                                       |
| `disabled`        | `boolean`                               | `false`                          | The tab can't be chosen, and the arrow keys pass it.                                |
| `href`            | `string`                                | -                                | A link, for a navigation of pages.                                                  |
| `as`              | `ElementType`                           | `'button'`, or `'a'` with `href` | The element the tab is rendered as.                                                 |
| `onClick`         | `(event) => void`                       | -                                | Fired when the tab is pressed.                                                      |
| `title`           | `string`                                | -                                | Hover text.                                                                         |
| `closeLabel`      | `string`                                | -                                | Makes the tab closable: its close button's tooltip. Delete closes it from the keys. |
| `secondaryAction` | `ReactNode`                             | -                                | A control of the tab's own after its label - a kebab menu, a badge.                 |

Like a table cell, a tab takes its row's look and its own value wins: the tab's prop, then what
is set on its `Tabs`, then `theme.components.Tab.defaultProps`, then the row's own default. In the
`underline` look the row's indicator takes the selected tab's `color`.

## Closable tabs

```tsx
<Tabs value={view} onChange={setView} onTabClose={closeTab}>
  <Tab value="canvas" label="Canvas" />
  <Tab value="button" label="Button" closeLabel="Close Button" />
</Tabs>
```

A tab with a `closeLabel` has a ✕ after its label: a button of its own beside the tab, outside
the page's tab order. It shows on the selected tab and under the pointer, and keeps its room on
the others, so nothing shifts when the pointer crosses a tab. A middle click on the tab and
Delete on the focused tab close it too. A tab without a `closeLabel` never closes.

The ✕ is the pointer's: a `tablist` owns tabs alone, so it is hidden from assistive technology,
with `closeLabel` as its tooltip. The keys' way is Delete, which the tab announces
(`aria-keyshortcuts="Delete"`).

## A menu of the tab's own

```tsx
<Tab
  value="light"
  label="Light"
  secondaryAction={
    <Menu
      align="end"
      trigger={
        <Button size="sm" variant="text" aria-label="Light options">
          ⋮
        </Button>
      }
    >
      <MenuItem value="rename">Rename...</MenuItem>
      <MenuItem value="delete">Delete</MenuItem>
    </Menu>
  }
/>
```

The secondary action sits beside the tab, not inside it, and keeps its own keys: in an open menu
the arrow keys, Home and End move through its rows, not between the tabs.
