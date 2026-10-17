import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import designSystemPkg from 'packages/design-system/package.json'
import { ThemeModeProvider } from 'src/theme/ThemeModeProvider'
import { Navbar } from './Navbar'

const renderNavbar = (props?: Parameters<typeof Navbar>[0]) =>
  render(
    <ThemeModeProvider>
      <Navbar {...props} />
    </ThemeModeProvider>
  )

describe('Navbar', () => {
  it('shows the wordmark and the current design-system version', () => {
    renderNavbar()
    expect(screen.getByRole('link', { name: 'SOROUSH.DESIGN' })).toHaveAttribute('href', '/')
    expect(screen.getByText(`v${designSystemPkg.version}`)).toBeInTheDocument()
  })

  it('toggles the color scheme', async () => {
    const user = userEvent.setup()
    renderNavbar()
    const toggle = screen.getByRole('button', { name: 'Toggle color scheme' })
    expect(toggle).toHaveTextContent('Light')
    await user.click(toggle)
    expect(toggle).toHaveTextContent('Dark')
  })

  it('renders a menu button that opens the named drawer', () => {
    renderNavbar({ menuDrawer: 'docs-nav' })
    expect(screen.getByRole('button', { name: 'Open navigation' })).toHaveAttribute(
      'popovertarget',
      'docs-nav'
    )
  })

  it('omits the menu button without a drawer', () => {
    renderNavbar()
    expect(screen.queryByRole('button', { name: 'Open navigation' })).not.toBeInTheDocument()
  })
})
