# ArgControl

One arg's interactive control, picked Storybook-style from its argTypes entry. Internal
to `StoryDemo` - not exported from the package.

## Props

### `control`

The `ControlModel` (from `utils/controlsFor`): `boolean` renders a `Switch`, `select` a
`NativeSelect`, `inline-radio` a `ToggleButton` row, `range` a native slider, and
`text`/`number` a `TextInput`. Unset selects and inputs show the model's `defaultValue`
(the argType's `table.defaultValue.summary`).

### `value`

The arg's current value.

### `disabled`

Greys the control.

### `onChange`

`(name, value)` - fired with the arg name and its typed next value (numbers parsed,
empty number inputs clear to `undefined`).
