import * as React from 'react'
import { css, keyframes } from '@emotion/css'
import * as theme from '@soroush.tech/design-system/theme'
import * as storiesOptions from '@soroush.tech/design-system/utils/test/storiesOptions'
// The stories' shared toggle helpers (`ColorSwatchRows`) render inside their demos.
import * as storiesToggle from '@soroush.tech/design-system/utils/test/storiesToggle'

// Every design-system component's exports, flattened into one namespace. Live-edited
// code cannot import at runtime, so react-live resolves identifiers from this scope.
const componentModules = import.meta.glob('packages/design-system/src/*/index.ts', {
  eager: true,
}) as Record<string, Record<string, unknown>>

// React's named exports - a story's `useState` and `Children`. Its `default` stays out: every
// scope key becomes a parameter of the evaluated code, and `default` is a reserved word.
const { default: _react, ...reactExports } = React as typeof React & { default?: unknown }

/** The identifiers available to live-edited demo code; a component wins a name React shares. */
export const demoScope: Record<string, unknown> = { ...reactExports, React, css, keyframes }
for (const module of Object.values(componentModules)) {
  Object.assign(demoScope, module)
}
Object.assign(demoScope, theme, storiesOptions, storiesToggle)
