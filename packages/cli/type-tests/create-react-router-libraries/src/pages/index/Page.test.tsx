import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { afterEach, describe, expect, it } from 'vitest'
import { Providers } from '../../theme/Providers'
import Page from './Page'

/** The home page, inside the providers the app gives it. */
function renderPage() {
  render(
    <Providers>
      <QueryClientProvider client={new QueryClient()}>
        <Page />
      </QueryClientProvider>
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

  it('counts each press of its button', () => {
    renderPage()
    fireEvent.click(screen.getByRole('button', { name: 'Count' }))
    expect(screen.getByText('Count: 1')).toBeTruthy()
  })

  it('shows the greeting the mock API answers', async () => {
    renderPage()
    expect(await screen.findByText('Hello from the mock API')).toBeTruthy()
  })
})
