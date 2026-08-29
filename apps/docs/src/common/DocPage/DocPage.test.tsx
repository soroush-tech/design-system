import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import type { ReactNode } from 'react'
import type { PageContext as VikePageContext } from 'vike/types'
import { PageContext } from 'src/common/PageContext'
import { ThemeModeProvider } from 'src/theme/ThemeModeProvider'
import { DocPage } from './DocPage'

const renderDocPage = (props: Parameters<typeof DocPage>[0]) => {
  const pageContext = { urlPathname: '/design-system/' } as VikePageContext
  const wrapper = ({ children }: { children: ReactNode }) => (
    <ThemeModeProvider>
      <PageContext.Provider value={pageContext}>{children}</PageContext.Provider>
    </ThemeModeProvider>
  )
  return render(<DocPage {...props} />, { wrapper })
}

describe('DocPage', () => {
  it('renders the sidebar nav and the markdown body', () => {
    renderDocPage({ source: '# Doc Title\n\nBody copy.' })
    expect(
      screen.getByRole('navigation', { name: 'Design system documentation' })
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Doc Title' })).toBeInTheDocument()
    expect(screen.getByText('Body copy.')).toBeInTheDocument()
  })

  it('renders its own title and strips the source chrome when title is given', () => {
    renderDocPage({ source: '# Source Chrome\n\nBody.', title: 'Page Title' })
    expect(screen.getByRole('heading', { name: 'Page Title' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Source Chrome' })).not.toBeInTheDocument()
  })
})
