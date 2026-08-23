# CodePanel

The read-only code panel: the demo source rendered as a fenced block through the
markdown `Preview`, which highlights it with the theme's syntax tokens and provides the
hover copy button via `CodeBlock`. Shown until the live editor upgrades in. Internal to
`StoryDemo` - not exported from the package.

## Props

### `code`

The demo source to display.

### `language`

`'ts' | 'js'` - sets the fence language (`tsx`/`jsx`) so highlighting matches the toggle.
