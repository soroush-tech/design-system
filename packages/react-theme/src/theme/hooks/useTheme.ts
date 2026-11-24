import { useEngineTheme } from '../engine'
import type { AppTheme } from '../themes'

/**
 * The active theme, typed as the theme the app registered, or this package's `Theme` - the engine is an
 * internal implementation detail, never part of the public type surface.
 */
export const useTheme = (): AppTheme => useEngineTheme() as unknown as AppTheme
