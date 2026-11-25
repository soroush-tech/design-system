// Internal-only engine bindings - the single seam for swapping the CSS-in-JS
// engine. Not part of the public API (no package.json export maps to this
// file): consumers use `styled`, `css`, `keyframes` from the package root,
// `ThemeProvider`/`useTheme`/theme hooks from the `./theme` subpath, or
// `Global`/`CacheProvider` from the `./engine` subpath - all typed against
// this package's own `Theme`.
//
// Only what the engine's server components build also has is here, so a server component can reach
// this module: the client-only names are in `engine.client.ts`.
import { Global as EngineGlobal } from '@umber-style/react'
import type { Interpolation } from '@umber-style/react'
import type { ComponentType, RefAttributes } from 'react'
import type { Theme } from './themes'
import { configureEngine } from '../style/engine'

// An app may reach the provider or the global styles without a styled component.
configureEngine()

export {
  useTheme as useEngineTheme,
  ThemeProvider as EngineThemeProvider,
} from '@umber-style/react'

/** `Global`, retyped against this package's own `Theme` (see `styled.ts`'s `StyledTags`). */
export const Global = EngineGlobal as ComponentType<
  { styles: Interpolation<Theme> } & RefAttributes<unknown>
>
