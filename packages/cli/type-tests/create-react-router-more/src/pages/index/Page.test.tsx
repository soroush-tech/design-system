import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { Provider as StoreProvider } from 'react-redux'
import { afterEach, describe, expect, it } from 'vitest'
import { store } from '../../state/store'
import { Providers } from '../../theme/Providers'
import Page from './Page'

/** The home page, inside the providers the app gives it. */
function renderPage() {
  render(
    <Providers>
      <StoreProvider store={store}>
        <Page />
      </StoreProvider>
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
})
