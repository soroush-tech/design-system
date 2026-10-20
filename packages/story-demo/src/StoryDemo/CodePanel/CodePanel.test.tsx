import type { ReactNode } from 'react'
import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ThemeProvider, createTheme, baseTheme } from '@soroush.tech/design-system/theme'
import { syntaxDark } from '@soroush.tech/markdown/CodeBlock'
import { CodePanel } from './CodePanel'

const theme = createTheme(baseTheme, { syntax: syntaxDark })
const renderWithTheme = (ui: ReactNode) => render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)

describe('CodePanel', () => {
  it("renders the code highlighted in the live editor's own markup, not editable", () => {
    const { container } = renderWithTheme(<CodePanel code={'const a: number = 1'} language="ts" />)
    const pre = container.querySelector('pre.prism-code')!
    expect(pre).toHaveTextContent('const a: number = 1')
    expect(pre.querySelector('.token.keyword')).toHaveTextContent('const')
    expect(pre).not.toHaveAttribute('contenteditable', 'true')
    // Wrapped and tabbed as the editable editor is, so the two are one size.
    expect(pre).toHaveStyle({ whiteSpace: 'pre-wrap', tabSize: '2' })
  })

  it('highlights as jsx when the language toggle is on js', () => {
    const { container } = renderWithTheme(<CodePanel code={'<i>hi</i>'} language="js" />)
    expect(container.querySelector('pre')).toHaveClass('language-jsx')
  })
})
