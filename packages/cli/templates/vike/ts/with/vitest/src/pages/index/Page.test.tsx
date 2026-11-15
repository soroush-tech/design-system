import { cleanup, fireEvent, render, screen } from '@testing-library/react'
// @if tanstack-query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// @endif
// @if redux-toolkit
import { Provider as StoreProvider } from 'react-redux'
// @endif
import { afterEach, describe, expect, it } from 'vitest'
// @if redux-toolkit
import { store } from '../../state/store'
// @endif
import { Providers } from '../../theme/Providers'
import Page from './+Page'

/** The home page, inside the providers the app gives it. */
function renderPage() {
  render(
    <Providers>
      {/* @if tanstack-query && redux-toolkit */}
      <QueryClientProvider client={new QueryClient()}>
        <StoreProvider store={store}>
          <Page />
        </StoreProvider>
      </QueryClientProvider>
      {/* @elif tanstack-query */}
      <QueryClientProvider client={new QueryClient()}>
        <Page />
      </QueryClientProvider>
      {/* @elif redux-toolkit */}
      <StoreProvider store={store}>
        <Page />
      </StoreProvider>
      {/* @else */}
      <Page />
      {/* @endif */}
    </Providers>
  )
}

describe('the home page', () => {
  // Vitest has no globals here, so Testing Library cannot clean up on its own.
  afterEach(cleanup)

  it('shows the app title', () => {
    renderPage()
    expect(screen.getByRole('heading', { name: '__TITLE_STRING__' })).toBeTruthy()
  })

  it('counts each press of its button', () => {
    renderPage()
    fireEvent.click(screen.getByRole('button', { name: 'Count' }))
    expect(screen.getByText('Count: 1')).toBeTruthy()
  })
})
