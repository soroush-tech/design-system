# TabPanel

The content a tab shows: a `role="tabpanel"` named by its tab, which in turn `aria-controls` it.
It is shown only while its tab is selected, and sits in a
[`TabContext`](../TabContext/README.md) beside its `TabList` - which is what links
the two, wherever they are in the tree.

Client component: its entry carries `'use client'`, so a server component can import and render it.

```tsx
import { Tab, TabContext, TabList, TabPanel } from '@gild-ui/react/Tabs'

;<TabContext defaultValue="layers">
  <TabList aria-label="Left panel">
    <Tab value="layers" label="Layers" />
    <Tab value="assets" label="Assets" />
  </TabList>
  <TabPanel value="layers">...</TabPanel>
  <TabPanel value="assets" shouldKeepMounted>
    ...
  </TabPanel>
</TabContext>
```

## Props

| Prop                | Type                        | Default | Description                                               |
| ------------------- | --------------------------- | ------- | --------------------------------------------------------- |
| `value`             | `string \| number`          | -       | The value of the tab this panel belongs to. **Required.** |
| `children`          | `ReactNode`                 | -       | The panel's content.                                      |
| `shouldKeepMounted` | `boolean`                   | `false` | Keep the content mounted while the panel is hidden.       |
| `bg`                | `keyof Theme['background']` | -       | The panel's ground - match its tab's `selectedBg`.        |
| `borderRadius`      | `keyof Theme['radii']`      | -       | The panel's corner radius.                                |
| `className`         | `string`                    | -       | Class on the panel.                                       |

Plus the styled-system **space** props (`m`, `p`, ...).

## Notes

- The panel takes focus (`tabIndex={0}`), so Tab moves from the tabs into it even when its
  content has nothing focusable.
- Outside a `TabContext` it throws - there is no tab to link it to.

## Overrides

`style` takes an entry of `StyleSheet.create`, or a list of them with `false`, `null` and `undefined`, and puts it on the root after the component's own styles. `slotProps` takes, for each slot (`root`), a `style` of the same kind, a `className`, and `data-*` and `aria-*` attributes. On the root, `style` and `className` come after `slotProps.root`, so they win.
