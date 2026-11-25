import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ThemeProvider } from '@soroush.design/react'
import { baseTheme } from '@soroush.design/core/theme'
import { DemoFrame } from './DemoFrame'

describe('DemoFrame', () => {
  it('lays out the preview, the error, the toolbar and the code, in that order', () => {
    render(
      <ThemeProvider theme={baseTheme}>
        <DemoFrame
          preview={<span>the preview</span>}
          error="the error"
          toolbar={<span>the toolbar</span>}
          code={<pre>the code</pre>}
        />
      </ThemeProvider>
    )
    const order = ['the preview', 'the error', 'the toolbar', 'the code'].map((text) =>
      screen.getByText(text)
    )
    for (let index = 1; index < order.length; index++) {
      expect(order[index - 1].compareDocumentPosition(order[index])).toBe(
        Node.DOCUMENT_POSITION_FOLLOWING
      )
    }
  })
})
