import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { ThemeProvider } from '@gild-ui/react'
import { createTheme, baseTheme } from '@gild-ui/core/theme'
import { describeRootSlot, overrides, colorsOf } from '../utils/describeRootSlot'
import { CodeBlock } from './CodeBlock'
import { syntaxDark } from './CodeBlock.data'

const theme = createTheme(baseTheme, { syntax: syntaxDark })
const wrap = (ui: React.ReactNode) => <ThemeProvider theme={theme}>{ui}</ThemeProvider>

describeRootSlot(
  'CodeBlock',
  (props) => wrap(<CodeBlock {...props}>code</CodeBlock>),
  () => document.querySelector('pre')!.parentElement as HTMLElement
)

describe('CodeBlock surface slot', () => {
  it('puts the style, class name and attributes of the surface slot on the pre', () => {
    render(
      wrap(
        <CodeBlock
          slotProps={{
            surface: {
              className: 'slot',
              style: overrides.first,
              'data-mark': 'a',
              'aria-description': 'b',
            },
          }}
        >
          code
        </CodeBlock>
      )
    )
    const surface = document.querySelector('pre')!
    expect(surface).toHaveClass('slot')
    expect(surface).toHaveAttribute('data-mark', 'a')
    expect(surface).toHaveAttribute('aria-description', 'b')
    expect(colorsOf(surface).includes('rgb(1, 2, 3)')).toBe(true)
  })
})
