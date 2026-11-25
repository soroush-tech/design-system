# FabMenuItem

One action of a `FabMenu`: an extended `Fab` of the menu's size - a pill with an icon and a label. Pressing
it runs `onClick` and closes the menu, and the focus goes back to the trigger.

```tsx
<FabMenuItem icon={<Icon name="add" color="inherit" />} onClick={newDocument}>
  New document
</FabMenuItem>
```

## Props

| Prop       | Type                     | Default       | Description                                                      |
| ---------- | ------------------------ | ------------- | ---------------------------------------------------------------- |
| `children` | `ReactNode`              | -             | What the action says, and its name.                              |
| `icon`     | `ReactNode`              | -             | An icon before the label.                                        |
| `onClick`  | `(event) => void`        | -             | Fired when it is pressed - the menu closes after it.             |
| `color`    | `keyof Theme['palette']` | `'secondary'` | Resolves to `theme.palette`.                                     |
| `disabled` | `boolean`                | `false`       | Off: skipped by the arrow keys.                                  |
| ...        |                          |               | Any `Fab` prop but its shape (`variant`, `size`, `isCollapsed`). |

It must be in a `FabMenu`, and takes its size from it.
