import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { describeTransition } from '../utils/test/describeTransition'
import { renderWithTheme } from '../utils/test/renderWithTheme'
import { Grow } from './Grow'

describeTransition('Grow', Grow, {
  out: { opacity: '0', transform: 'scale(0.75)' },
  shown: { opacity: '1', transform: 'none' },
  properties: ['opacity', 'transform'],
})

describe('Grow', () => {
  it('is in at full size, and fully opaque', () => {
    renderWithTheme(
      <Grow isShown shouldAppear={false}>
        <div data-testid="child">Hello</div>
      </Grow>
    )
    expect(screen.getByTestId('child')).toHaveStyle({ opacity: '1', transform: 'none' })
  })
})
