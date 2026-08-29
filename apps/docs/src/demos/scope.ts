import { css, keyframes } from '@emotion/css'
import * as theme from '@soroush.tech/design-system/theme'
import * as storiesOptions from '@soroush.tech/design-system/utils/test/storiesOptions'

// Every design-system component's exports, flattened into one namespace. Live-edited
// code cannot import at runtime, so react-live resolves identifiers from this scope.
const componentModules = import.meta.glob('packages/design-system/src/*/index.ts', {
  eager: true,
}) as Record<string, Record<string, unknown>>

/** The identifiers available to live-edited demo code. */
export const demoScope: Record<string, unknown> = { css, keyframes }
for (const module of Object.values(componentModules)) {
  Object.assign(demoScope, module)
}
Object.assign(demoScope, theme, storiesOptions)
