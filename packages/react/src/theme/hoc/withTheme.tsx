'use client'

import type { ComponentType } from 'react'
import { EngineThemeContext } from '../engine.client'
import type { AppTheme } from '../themes'

/** Hands a component the active theme as its `theme` prop, typed as the registered theme. */
export function withTheme<P extends { theme: AppTheme }>(WrappedComponent: ComponentType<P>) {
  return function WithTheme(props: Omit<P, 'theme'>) {
    return (
      <EngineThemeContext.Consumer>
        {(theme) => <WrappedComponent {...(props as P)} theme={theme as AppTheme} />}
      </EngineThemeContext.Consumer>
    )
  }
}
