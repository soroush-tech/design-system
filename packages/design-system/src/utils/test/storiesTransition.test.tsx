import { describe, it, expect } from 'vitest'
import { fireEvent, screen } from '@testing-library/react'
import { renderWithTheme } from './renderWithTheme'
import { TransitionToggle, transitionArgTypes, transitionControls } from './storiesTransition'

describe('TransitionToggle', () => {
  it('hands its children whether it is shown, and a button turns it over', () => {
    renderWithTheme(
      <TransitionToggle>{(isShown) => <span>{isShown ? 'in' : 'out'}</span>}</TransitionToggle>
    )
    expect(screen.getByText('out')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Show' }))
    expect(screen.getByText('in')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Hide' }))
    expect(screen.getByText('out')).toBeInTheDocument()
  })
})

describe('the shared transition controls', () => {
  it('has an argType for every control but the easing, which each story gives its tokens', () => {
    const argTypes = Object.keys(transitionArgTypes)
    expect(transitionControls.filter((control) => !argTypes.includes(control))).toEqual(['easing'])
  })
})
