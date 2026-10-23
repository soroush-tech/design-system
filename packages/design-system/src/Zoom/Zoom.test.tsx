import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { describeTransition } from '../utils/test/describeTransition'
import { renderWithTheme } from '../utils/test/renderWithTheme'
import { Zoom } from './Zoom'

describeTransition('Zoom', Zoom, {
  out: { transform: 'scale(0)' },
  shown: { transform: 'none' },
  properties: ['transform'],
})

describe('Zoom', () => {
  it('scales alone, and never fades its child', () => {
    renderWithTheme(
      <Zoom isShown shouldAppear={false}>
        <div data-testid="child">Hello</div>
      </Zoom>
    )
    expect(screen.getByTestId('child').style.opacity).toBe('')
  })
})
