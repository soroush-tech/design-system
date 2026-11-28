import { describe, expect, it } from 'vitest'
import { screen } from '@testing-library/react'
import { Icon } from '../Icon'
import { renderWithTheme } from '../utils/test/renderWithTheme'
import { styled } from './styled'

// `text.inherit` is the keyword `inherit`. As a CSS variable it would take the value of the same
// variable on the parent - nothing - so a property other than `color` would fall back to its
// initial value. The engine writes the keyword itself.

const Parent = styled('div')({ color: 'rgb(255, 0, 0)', backgroundColor: 'rgb(0, 0, 255)' })
const Child = styled('div')(({ theme }) => ({
  color: theme.text.inherit,
  backgroundColor: theme.text.inherit,
}))

describe('theme.text.inherit in a browser', () => {
  it('is the parent value for color and for background-color', () => {
    renderWithTheme(
      <Parent>
        <Child data-testid="child" />
      </Parent>
    )
    const style = getComputedStyle(screen.getByTestId('child'))
    expect(style.color).toBe('rgb(255, 0, 0)')
    expect(style.backgroundColor).toBe('rgb(0, 0, 255)')
  })

  it('gives an icon the colour of its parent', () => {
    renderWithTheme(
      <Parent>
        <Icon name="Close" color="inherit" data-testid="icon" />
      </Parent>
    )
    expect(getComputedStyle(screen.getByTestId('icon')).color).toBe('rgb(255, 0, 0)')
  })
})
