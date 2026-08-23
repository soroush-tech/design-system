# DemoToolbar

The action row between a demo and its always-editable code: the `Controls` toggle pill
on the left; the expand/collapse pill, the TS | JS segmented toggle, and the
CodeSandbox, copy, and reset icon buttons on the right. Internal to `StoryDemo` - not
exported from the package.

## Props

### `language` / `onLanguageChange`

`'ts' | 'js'` and the toggle callback (fired with the target language). Rendered as an
exclusive TS | JS `ToggleButtonGroup` - the active language shows pressed, and the
group's deselect click (`null`) is guarded by a `Language` type predicate.

### `copied` / `onCopy`

Copy state (swaps the icon to a check and the label to "Copied") and click handler.

### `onOpenSandbox`

"Edit in CodeSandbox" click handler.

### `onReset`

"Reset demo" click handler.

### `isExpanded` / `onToggleExpanded`

Expand/collapse pill state (drives `aria-expanded`) and click handler.

### `hasControls` / `isControlsOpen` / `onToggleControls`

Whether the story exposes controls (hides the pill otherwise), the panel's open state,
and its toggle.
