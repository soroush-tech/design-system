// Without a component library, `ThemeComponents` is empty until the app registers its own, and
// `brand` is not a color until it is added to the palette.
import { baseTheme, createTheme, styled, useDefaultProps } from '@soroush.design/react-theme'

// An empty `components` types nothing, so it accepts any entry: the typing arrives with a library.
export const untyped = createTheme(baseTheme, { components: { Anything: { defaultProps: {} } } })
// @ts-expect-error -- the palette has no `brand`
export const Box = styled('div')(({ theme }) => ({ color: theme.palette.brand.main }))
// @ts-expect-error -- no component is registered, so no name is a key of `ThemeComponents`
export const useNone = () => useDefaultProps('Button')
