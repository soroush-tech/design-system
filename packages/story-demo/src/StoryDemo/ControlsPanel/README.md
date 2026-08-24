# ControlsPanel

The Storybook-style controls section: one `ArgControl` per include-listed arg, driving
both the rendered demo and the generated code. The toolbar owns the open/closed toggle -
this panel only renders its content. Internal to `StoryDemo` - not exported from the
package.

## Props

### `controls`

The `ControlModel[]` resolved by `utils/controlsFor`.

### `values`

Current arg values - composed story defaults merged with overrides.

### `onChange`

`(name, value)` - threaded through from each `ArgControl`.
