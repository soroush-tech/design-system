import type { ReactNode } from 'react'
import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ThemeProvider, createTheme, baseTheme } from '@soroush.tech/design-system/theme'
import { syntaxDark } from '@soroush.tech/markdown/CodeBlock'
import { CodePanel } from './CodePanel'

const theme = createTheme(baseTheme, { syntax: syntaxDark })
const renderWithTheme = (ui: ReactNode) => render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)

describe('CodePanel', () => {
  it('renders the code as a highlighted block with a copy affordance', () => {
    const { container, getByRole } = renderWithTheme(
      <CodePanel code={'const a: number = 1'} language="ts" />
    )
    expect(container.querySelector('pre')).toHaveTextContent('const a: number = 1')
    // Highlighting produces hljs token spans that CodeBlock re-tints from the theme.
    expect(container.querySelector('.hljs-keyword')).toBeInTheDocument()
    expect(getByRole('button', { name: 'Copy code' })).toBeInTheDocument()
  })

  it('fences as jsx when the language toggle is on js', () => {
    const { container } = renderWithTheme(<CodePanel code={'<i>hi</i>'} language="js" />)
    expect(container.querySelector('code')).toHaveClass('language-jsx')
  })
})
