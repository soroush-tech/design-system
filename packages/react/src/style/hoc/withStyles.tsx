'use client'

import type { ComponentType } from 'react'
import type { Theme } from '../../theme/themes'
import type { StyleFactory, StyleInput } from '../StyleFactory'
import type { StyleOverride } from '../overrides'
import { StyleSheet, useStyle } from '../styled'

// `styles` is typed as `StyleOverride`, the public type of what `style` takes.
// UmberStyle is asked for its own `withStyles` and `withTheme`: this will re-export them then,
// converting the 2.2.0 forms (a `{ getStyles }` or an object) as it does now.
export function withStyles<P extends object>(style: StyleInput) {
  let useRoot: () => StyleOverride
  if (typeof (style as StyleFactory).getStyles === 'function') {
    const sheet = StyleSheet.create((theme) => ({
      root: (style as StyleFactory).getStyles(theme as Theme),
    }))
    useRoot = () => useStyle(sheet).root
  } else {
    const sheet = StyleSheet.create({ root: style as Exclude<StyleInput, StyleFactory> })
    useRoot = () => useStyle(sheet).root
  }
  return (WrappedComponent: ComponentType<P & { styles: StyleOverride }>) =>
    function WithStyles(props: P) {
      return <WrappedComponent {...props} styles={useRoot()} />
    }
}
