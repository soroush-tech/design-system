import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import Home from './Home'

// Each island renders inside its own providers, so a test renders it as it is.
describe('the home page', () => {
  // Vitest has no globals here, so Testing Library cannot clean up on its own.
  afterEach(cleanup)

  it('shows the app title', () => {
    render(<Home />)
    expect(screen.getByRole('heading', { name: 'My App' })).toBeTruthy()
  })
})
