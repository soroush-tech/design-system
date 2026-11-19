// @if ssg
import { cleanup, render, screen } from '@testing-library/react'
// @else
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
// @endif
import { afterEach, describe, expect, it } from 'vitest'
// @if !ssg
import Counter from './Counter'
// @endif
// @if msw
import Greeting from './Greeting'
// @endif
import Home from './Home'

// Each island renders inside its own providers, so a test renders it as it is.
describe('the home page', () => {
  // Vitest has no globals here, so Testing Library cannot clean up on its own.
  afterEach(cleanup)

  it('shows the app title', () => {
    render(<Home />)
    expect(screen.getByRole('heading', { name: '__TITLE_STRING__' })).toBeTruthy()
  })
  // @if !ssg

  it('counts each press of its button', () => {
    render(<Counter />)
    fireEvent.click(screen.getByRole('button', { name: 'Count' }))
    expect(screen.getByText('Count: 1')).toBeTruthy()
  })
  // @endif
  // @if msw

  it('shows the greeting the mock API answers', async () => {
    render(<Greeting />)
    expect(await screen.findByText('Hello from the mock API')).toBeTruthy()
  })
  // @endif
})
