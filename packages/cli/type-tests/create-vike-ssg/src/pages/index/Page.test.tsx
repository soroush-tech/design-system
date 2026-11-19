import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { Providers } from '../../theme/Providers'
import Page from './+Page'

/** The home page, inside the providers the app gives it. */
function renderPage() {
  render(
    <Providers>
      <Page />
    </Providers>
  )
}

describe('the home page', () => {
  // Vitest has no globals here, so Testing Library cannot clean up on its own.
  afterEach(cleanup)

  it('shows the app title', () => {
    renderPage()
    expect(screen.getByRole('heading', { name: 'My App' })).toBeTruthy()
  })
})
