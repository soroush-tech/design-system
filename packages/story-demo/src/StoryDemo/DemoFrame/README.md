# DemoFrame

A demo's body - its preview, an error line, the toolbar and the code - laid out the same
whether read-only or live. `StoryDemo` fills it with the rendered story and `CodePanel`;
`LiveCode` with the live preview, its error and the live editor. One layout for both, so a
prerendered demo that turns live moves nothing on the page. Internal to `StoryDemo` - not
exported from the package.

## Props

### `preview`

The rendered demo, on its surface.

### `error`

An evaluation error, shown under the preview. The line keeps its place when empty.

### `toolbar`

The action row (and controls), between the preview and the code.

### `code`

The code editor, in its terminal box.
