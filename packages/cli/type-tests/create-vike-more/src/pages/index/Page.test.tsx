import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Providers } from '../../theme/Providers'
import Page from './+Page'

describe('the home page', () => {
  it('shows the app title', () => {
    render(
      <Providers>
        <Page />
      </Providers>
    )
    expect(screen.getByRole('heading', { name: 'My App' })).toBeTruthy()
  })
})
