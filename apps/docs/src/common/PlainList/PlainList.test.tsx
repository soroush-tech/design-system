import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@gild-ui/react'
import { dark } from 'src/theme/themes'
import { PlainList } from './PlainList'

describe('PlainList', () => {
  it('is a list with no bullets, and the margin and padding it is given', () => {
    render(
      <ThemeProvider theme={dark}>
        <PlainList as="ul" m={0} p={0}>
          <li>one</li>
        </PlainList>
      </ThemeProvider>
    )
    expect(screen.getByRole('list')).toHaveStyle({
      listStyle: 'none',
      margin: '0px',
      padding: '0px',
    })
  })
})
