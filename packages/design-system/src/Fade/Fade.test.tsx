import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { describeTransition } from '../utils/test/describeTransition'
import { renderWithTheme } from '../utils/test/renderWithTheme'
import { Fade } from './Fade'

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
