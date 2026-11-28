import * as React from 'react'
import * as theme from '@gild-ui/core/theme'
import * as styling from '@gild-ui/react'
import * as storiesOptions from '@gild-ui/react/utils/test/storiesOptions'
// The stories' shared toggle helpers (`ColorSwatchRows`) render inside their demos.
import * as storiesToggle from '@gild-ui/react/utils/test/storiesToggle'
// ...and the transitions' `TransitionToggle`. The package does not export it, so it is read
// from its source, as the stories modules are.
import * as storiesTransition from 'packages/react/src/utils/test/storiesTransition'
import { requireMatches } from './requireMatches'

// Every design-system component's exports, flattened into one namespace. Live-edited
// code cannot import at runtime, so react-live resolves identifiers from this scope.
const componentModules = requireMatches(
  'packages/react/src/*/index.ts',
  import.meta.glob('packages/react/src/*/index.ts', {
    eager: true,
  }) as Record<string, Record<string, unknown>>
)

// Every component's catalog entry, in `@gild-ui/core`: the stories read their option values
// from it (`chipVariantValues`, `snackbarVerticalValues`), so a demo that lists them needs them in
// scope too.
const catalogModules = requireMatches(
  'packages/core/src/catalog/entries/[A-Z]*.ts',
  import.meta.glob('packages/core/src/catalog/entries/[A-Z]*.ts', {
    eager: true,
  }) as Record<string, Record<string, unknown>>
)

// React's named exports - a story's `useState` and `Children`. Its `default` stays out: every
// scope key becomes a parameter of the evaluated code, and `default` is a reserved word.
const { default: _react, ...reactExports } = React as typeof React & { default?: unknown }

/** The identifiers available to live-edited demo code; a component wins a name React shares. */
export const demoScope: Record<string, unknown> = { ...reactExports, React }
for (const module of [...Object.values(catalogModules), ...Object.values(componentModules)]) {
  Object.assign(demoScope, module)
}
Object.assign(demoScope, theme, styling, storiesOptions, storiesToggle, storiesTransition)
