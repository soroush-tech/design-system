import type { ComponentType } from 'react'
import { EngineThemeContext } from '../engine'
import type { Theme } from '../themes'

export function withTheme<P extends object>(WrappedComponent: ComponentType<P & { theme: Theme }>) {
  return function WithTheme(props: P) {
    return (
      <EngineThemeContext.Consumer>
        {(theme) => <WrappedComponent {...props} theme={theme as Theme} />}
      </EngineThemeContext.Consumer>
    )
  }
}
