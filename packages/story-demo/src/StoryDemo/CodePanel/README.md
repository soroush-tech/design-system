# CodePanel

The read-only code panel: react-live's own editor, switched off - the live editor's very
markup and highlighting (the theme's `syntax` tokens), so a demo turning live doesn't change
its code's size. Only the editor is imported; react-live's evaluator stays in the lazily
loaded `LiveCode`. Shown inside `DemoFrame` until the live editor upgrades in, and for good
in a demo whose story the code can't reproduce. Internal to `StoryDemo` - not exported from
the package.

## Props

### `code`

The demo source to display.

### `language`

`'ts' | 'js'` - sets the highlighting language (`tsx`/`jsx`) so it matches the toggle.
