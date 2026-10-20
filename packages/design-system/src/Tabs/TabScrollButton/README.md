# TabScrollButton

The button that scrolls a row of tabs. A `Tabs` with `overflowBehavior="scroll"` shows one at each
end while its tabs overflow; it is out of the tab order and hidden from assistive technology,
since the arrow keys already reach every tab.

```tsx
import {
  Tab,
  Tabs,
  TabScrollButton,
  type TabScrollButtonProps,
} from '@soroush.tech/design-system/Tabs'

// A button of your own, in place of the default one.
function Arrow(props: TabScrollButtonProps) {
  return <TabScrollButton {...props}>{props.direction === 'start' ? '‹' : '›'}</TabScrollButton>
}

;<Tabs overflowBehavior="scroll" slots={{ scrollButton: Arrow }} aria-label="Components">
  {names.map((name) => (
    <Tab key={name} value={name} label={name} />
  ))}
</Tabs>
```

## Props

| Prop          | Type                         | Default                          | Description                                                      |
| ------------- | ---------------------------- | -------------------------------- | ---------------------------------------------------------------- |
| `direction`   | `'start' \| 'end'`           | -                                | Which way it scrolls the row. **Required.**                      |
| `orientation` | `'horizontal' \| 'vertical'` | its `Tabs`', else `'horizontal'` | The row's orientation - a chevron left/right, or up/down.        |
| `disabled`    | `boolean`                    | `false`                          | Nowhere further to scroll this way - kept, but off.              |
| `isHidden`    | `boolean`                    | `false`                          | Nowhere further to scroll this way - hidden, keeping its room.   |
| `color`       | `keyof theme.palette`        | the selected tab's               | Its stretch of an enclosed row's divider.                        |
| `textColor`   | `keyof theme.text`           | its `Tabs`', else `'primary'`    | The chevron's color.                                             |
| `onClick`     | `(event) => void`            | -                                | Fired when pressed. In a `Tabs`, it scrolls by the visible size. |
| `children`    | `ReactNode`                  | a chevron                        | What it shows.                                                   |

A replacement given through `slots.scrollButton` receives these same props from the `Tabs`.

Its styles are `theme.components.Tabs.styleOverrides.scrollButton`. Inside a `Tabs` it takes the
row's look - its stretch of the divider in the enclosed look - and hides on narrow screens unless
the `Tabs` has `shouldShowScrollButtonsOnMobile`. As a tab's, its own value wins: its `color`,
then `theme.components.TabScrollButton.defaultProps`, then the row's line - the selected tab's
color; its `textColor`, then the row's, then the theme's `defaultProps`, then the row's default.
