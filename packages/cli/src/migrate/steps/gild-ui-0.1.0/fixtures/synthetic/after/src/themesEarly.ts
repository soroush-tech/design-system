import { baseTheme, createTheme } from '@gild-ui/core/theme'

const components = { Button: { defaultProps: { size: 'sm' as const } } }

export const light = createTheme(baseTheme, { name: 'light', components })
const dark = createTheme(light, { name: 'dark', components })

export const themes = { light, dark }
