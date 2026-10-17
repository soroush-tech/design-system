import type { ReactNode } from 'react'
import { render, type RenderOptions, type RenderResult } from '@testing-library/react'
import { ThemeProvider } from '@soroush.tech/design-system/theme'

// Render helper for component tests - wraps the UI in the design-system ThemeProvider.
export const renderWithTheme = (ui: ReactNode, options?: RenderOptions): RenderResult =>
  render(ui, { wrapper: ThemeProvider, ...options })
