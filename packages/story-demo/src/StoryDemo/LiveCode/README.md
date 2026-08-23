# LiveCode

The always-live demo body: react-live evaluates the buffer on every keystroke and
renders it on the demo surface, with errors surfaced inline. A collapsed buffer is
completed into a module (hidden helpers included) via `utils/snippetToModule` before
evaluation; import lines are stripped by `utils/prepareLiveCode` - components resolve
from the fixed scope instead. Loaded lazily by `StoryDemo` after hydration. Internal -
not exported from the package.

## Props

### `code`

The visible editor buffer - the collapsed snippet or the full module.

### `language`

`'ts' | 'js'` - forwarded to react-live as `tsx`/`jsx`.

### `scope`

Identifiers available to the evaluated code.

### `helpersText`

Helper declarations hidden by the collapsed view, injected for evaluation.

### `onCodeChange`

Fired with the current buffer on every edit (via `TrackedEditor`).

### `toolbar`

The action row (and controls), rendered between the live preview and the editor.
