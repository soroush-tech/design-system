import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Providers } from './Providers'

describe('Providers', () => {
  it('renders its children under the theme providers and global styles', () => {
    render(
      <Providers>
        <div data-testid="child">content</div>
      </Providers>
    )
    expect(screen.getByTestId('child')).toHaveTextContent('content')
  })
})
