import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import type { ReactNode } from 'react'
import type { PageContext as VikePageContext } from 'vike/types'
import { ThemeProvider } from '@soroush.tech/design-system/theme'
import { PageContext } from 'src/common/PageContext'
import { dark } from 'src/theme/themes'
import { DocsNav } from './DocsNav'

const renderNav = (urlPathname: string) => {
  const pageContext = { urlPathname } as VikePageContext
  const wrapper = ({ children }: { children: ReactNode }) => (
    <ThemeProvider theme={dark}>
      <PageContext.Provider value={pageContext}>{children}</PageContext.Provider>
    </ThemeProvider>
  )
  return render(<DocsNav />, { wrapper })
}

describe('DocsNav', () => {
  it('renders every design-system nav group', () => {
    renderNav('/design-system/')
    for (const label of ['Getting started', 'Component API', 'Customization', 'Inputs & forms']) {
      expect(screen.getByText(label)).toBeInTheDocument()
    }
  })

  it('renders the markdown section nav on markdown paths', () => {
    renderNav('/markdown/components/preview/')
    expect(screen.getByRole('navigation', { name: 'Markdown documentation' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Preview' })).toHaveAttribute('aria-current', 'page')
  })

  it('renders the styled-system section nav on styled-system paths', () => {
    renderNav('/styled-system/')
    expect(
      screen.getByRole('navigation', { name: 'Styled-system documentation' })
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Responsive styles' })).toBeInTheDocument()
  })

  it('marks the current page with aria-current', () => {
    renderNav('/design-system/components/button/')
    expect(screen.getByRole('link', { name: 'Button' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('link', { name: 'Overview' })).not.toHaveAttribute('aria-current')
  })

  it('normalizes a pathname without a trailing slash', () => {
    renderNav('/design-system/components/button')
    expect(screen.getByRole('link', { name: 'Button' })).toHaveAttribute('aria-current', 'page')
  })

  it('falls back to the root path when urlPathname is empty', () => {
    renderNav('')
    expect(screen.getByRole('link', { name: 'Overview' })).not.toHaveAttribute('aria-current')
  })
})
