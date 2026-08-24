import type { ReactNode } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ThemeProvider, createTheme, baseTheme } from '@soroush.tech/design-system/theme'
import { syntaxDark } from '@soroush.tech/markdown/CodeBlock'
import { LiveCode } from './LiveCode'

const theme = createTheme(baseTheme, { syntax: syntaxDark })
const renderWithTheme = (ui: ReactNode) => render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)

function Sample({ children }: Readonly<{ children?: ReactNode }>) {
  return <button type="button">{children}</button>
}

describe('LiveCode', () => {
  it('evaluates a collapsed snippet with hidden helpers, toolbar and editor around it', async () => {
    renderWithTheme(
      <LiveCode
        code={'<Sample>{label}</Sample>'}
        language="ts"
        scope={{ Sample }}
        helpersText={"const label = 'live result'"}
        onCodeChange={vi.fn()}
        toolbar={<span>the toolbar</span>}
      />
    )
    expect(await screen.findByRole('button', { name: 'live result' })).toBeInTheDocument()
    expect(screen.getByText('the toolbar')).toBeInTheDocument()
    // The editor shows only the visible buffer - helpers stay hidden.
    const editor = document.querySelector('.prism-code')!
    expect(editor.textContent).toContain('<Sample>{label}</Sample>')
    expect(editor.textContent).not.toContain('const label')
  })

  it('evaluates a full module buffer as-is', async () => {
    const code = [
      "import { Sample } from '@soroush.tech/design-system/Sample'",
      '',
      'export default function Demo() {',
      '  return <Sample>full module</Sample>',
      '}',
      '',
    ].join('\n')
    renderWithTheme(
      <LiveCode
        code={code}
        language="ts"
        scope={{ Sample }}
        helpersText=""
        onCodeChange={vi.fn()}
      />
    )
    expect(await screen.findByRole('button', { name: 'full module' })).toBeInTheDocument()
  })

  it('surfaces evaluation errors inline', async () => {
    renderWithTheme(
      <LiveCode
        code={'<Missing />'}
        language="js"
        scope={{}}
        helpersText=""
        onCodeChange={vi.fn()}
      />
    )
    expect(await screen.findByText(/Missing is not defined/)).toBeInTheDocument()
  })
})
