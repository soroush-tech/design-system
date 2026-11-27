/* eslint-disable react-refresh/only-export-components */
import type { ReactNode } from 'react'
import { render, type RenderOptions } from '@testing-library/react'
import { ThemeProvider } from '@soroush.tech/design-system/theme'
import { dark } from 'src/theme/themes'

// Tests render under the app's brand dark theme, mirroring the production default.
const BrandThemeProvider = ({ children }: { children: ReactNode }) => (
  <ThemeProvider theme={dark}>{children}</ThemeProvider>
)

// Raw component export - for renderHook({ wrapper })
export const wrapper = BrandThemeProvider

// Render helper - for component tests
export const renderWithTheme = (ui: ReactNode, options?: RenderOptions) =>
  render(ui, { wrapper: BrandThemeProvider, ...options })
