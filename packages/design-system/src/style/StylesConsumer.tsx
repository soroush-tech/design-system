import type { ReactNode } from 'react'
import { EngineThemeContext } from '../theme/engine'
import type { CSSObject, Theme } from '../theme/themes'
import type { StyleFactory } from './hooks/useStyle'

type StylesConsumerProps = {
  style: StyleFactory
  children: (styles: CSSObject) => ReactNode
}

export function StylesConsumer({ style, children }: Readonly<StylesConsumerProps>) {
  return (
    <EngineThemeContext.Consumer>
      {(theme) => children(style.getStyles(theme as Theme))}
    </EngineThemeContext.Consumer>
  )
}
