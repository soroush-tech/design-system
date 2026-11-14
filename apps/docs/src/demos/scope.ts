import * as React from 'react'
import { css, keyframes } from '@emotion/css'
import * as theme from '@soroush.tech/design-system/theme'
import * as storiesOptions from '@soroush.tech/design-system/utils/test/storiesOptions'
// The stories' shared toggle helpers (`ColorSwatchRows`) render inside their demos.
import * as storiesToggle from '@soroush.tech/design-system/utils/test/storiesToggle'
// ...and the transitions' `TransitionToggle`. The package does not export it, so it is read
// from its source, as the stories modules are.
import * as storiesTransition from 'packages/design-system/src/utils/test/storiesTransition'

// Every design-system component's exports, flattened into one namespace. Live-edited
// code cannot import at runtime, so react-live resolves identifiers from this scope.
const componentModules = import.meta.glob('packages/design-system/src/*/index.ts', {
  eager: true,
}) as Record<string, Record<string, unknown>>

// Every component's catalog: the stories read their option values from it (`chipVariantValues`,
// `snackbarVerticalValues`), so a demo that lists them needs them in scope too.
const catalogModules = import.meta.glob('packages/design-system/src/**/*.catalog.ts', {
  eager: true,
}) as Record<string, Record<string, unknown>>

// React's named exports - a story's `useState` and `Children`. Its `default` stays out: every
// scope key becomes a parameter of the evaluated code, and `default` is a reserved word.
const { default: _react, ...reactExports } = React as typeof React & { default?: unknown }

/** The identifiers available to live-edited demo code; a component wins a name React shares. */
export const demoScope: Record<string, unknown> = { ...reactExports, React, css, keyframes }
for (const module of [...Object.values(catalogModules), ...Object.values(componentModules)]) {
  Object.assign(demoScope, module)
}
Object.assign(demoScope, theme, storiesOptions, storiesToggle, storiesTransition)
