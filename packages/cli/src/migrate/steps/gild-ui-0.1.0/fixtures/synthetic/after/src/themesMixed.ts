import { baseTheme, createTheme, defineThemes } from '@gild-ui/core/theme'
import { components } from './components'

const lightTheme = createTheme(baseTheme, { name: 'light' })
const darkTheme = createTheme(baseTheme, { name: 'dark' })

export const themes = defineThemes({ light: lightTheme, main: darkTheme }, components)

export const { light } = themes

const { main: dark } = themes

export const moreThemes = { light, dark, other: light }
