import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { describeTransition } from '../utils/test/describeTransition'
import { renderWithTheme } from '../utils/test/renderWithTheme'
import { Fade } from './Fade'
import { Paper } from '../Paper'
import { overrides } from '../utils/test/overrides'

describeTransition('Fade', Fade, {
  out: { opacity: '0' },
  shown: { opacity: '1' },
  properties: ['opacity'],
})

describe('Fade', () => {
  it('fades by opacity alone, and never moves or scales its child', () => {
    renderWithTheme(
      <Fade isShown shouldAppear={false}>
        <div data-testid="child">Hello</div>
      </Fade>
    )
    expect(screen.getByTestId('child').style.transform).toBe('')
  })
})

describe('Fade around a child that takes entries', () => {
  it('keeps the entries of its style, with its own opacity after', () => {
    renderWithTheme(
      <Fade isShown shouldAppear={false}>
        <Paper data-testid="child" style={[false, overrides.first]}>
          Hello
        </Paper>
      </Fade>
    )
    expect(screen.getByTestId('child')).toHaveStyle({ color: 'rgb(1, 2, 3)', opacity: '1' })
  })
})
