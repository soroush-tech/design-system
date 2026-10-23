import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { PageContext as VikePageContext } from 'vike/types'
import { ThemeProvider } from '@soroush.tech/design-system/theme'
import { PageContext } from 'src/common/PageContext'
import { dark } from 'src/theme/themes'
import { SearchProvider } from './SearchProvider'
import { useSearch } from './SearchContext'

function OpenButton() {
  const { open } = useSearch()
  return (
    <button type="button" onClick={open}>
      open search
    </button>
  )
}

const renderSearch = (urlPathname = '/design-system/') =>
  render(
    <ThemeProvider theme={dark}>
      <PageContext.Provider value={{ urlPathname } as VikePageContext}>
        <SearchProvider>
          <OpenButton />
        </SearchProvider>
      </PageContext.Provider>
    </ThemeProvider>
  )

const dialog = () => screen.queryByRole('dialog', { name: 'Search the documentation' })
const input = () => screen.getByRole('searchbox', { name: 'Search the documentation' })

describe('useSearch', () => {
  it('needs the provider', () => {
    expect(() => render(<OpenButton />)).toThrow('useSearch must be used within SearchProvider')
  })
})

describe('SearchProvider', () => {
  it('opens the dialog from a button that calls open, and closes it on Escape', async () => {
    const user = userEvent.setup()
    renderSearch()
    expect(dialog()).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'open search' }))
    expect(dialog()).toBeInTheDocument()
    await user.keyboard('{Escape}')
    expect(dialog()).not.toBeInTheDocument()
  })

  it('opens on Ctrl + K and on Cmd + K, and leaves other keys alone', async () => {
    const user = userEvent.setup()
    renderSearch()
    await user.keyboard('k')
    expect(dialog()).not.toBeInTheDocument()
    await user.keyboard('{Control>}k{/Control}')
    expect(dialog()).toBeInTheDocument()
    await user.keyboard('{Escape}')
    await user.keyboard('{Meta>}k{/Meta}')
    expect(dialog()).toBeInTheDocument()
  })

  it('lists the pages that match what is typed, with the group each is in', async () => {
    const user = userEvent.setup()
    renderSearch()
    await user.click(screen.getByRole('button', { name: 'open search' }))
    await user.type(input(), 'button specs')
    const link = screen
      .getAllByRole('link')
      .find((item) => item.getAttribute('href') === '/design-system/api/button/')
    expect(link).toHaveTextContent('Button specs')
    expect(link).toHaveTextContent('Specs')
  })

  it('says so when nothing matches', async () => {
    const user = userEvent.setup()
    renderSearch()
    await user.click(screen.getByRole('button', { name: 'open search' }))
    await user.type(input(), 'zzzzqq')
    expect(screen.getByText('Nothing matches "zzzzqq".')).toBeInTheDocument()
  })

  it('says nothing before a word is typed', async () => {
    const user = userEvent.setup()
    renderSearch()
    await user.click(screen.getByRole('button', { name: 'open search' }))
    expect(screen.queryByText(/Nothing matches/)).not.toBeInTheDocument()
    expect(screen.queryAllByRole('link')).toHaveLength(0)
  })

  it('walks the input and the results with the arrow keys', async () => {
    const user = userEvent.setup()
    renderSearch()
    await user.click(screen.getByRole('button', { name: 'open search' }))
    await user.type(input(), 'button')
    await user.keyboard('{ArrowDown}')
    const links = screen.getAllByRole('link')
    expect(links[0]).toHaveFocus()
    await user.keyboard('{ArrowDown}')
    expect(links[1]).toHaveFocus()
    await user.keyboard('{ArrowUp}{ArrowUp}')
    expect(input()).toHaveFocus()
    await user.keyboard('{ArrowUp}')
    expect(input()).toHaveFocus()
  })

  it('follows the first result on Enter, and closes', async () => {
    const user = userEvent.setup()
    renderSearch()
    await user.click(screen.getByRole('button', { name: 'open search' }))
    await user.type(input(), 'button{Enter}')
    expect(dialog()).not.toBeInTheDocument()
  })

  it('does nothing on Enter without a result, and ignores other keys in the input', async () => {
    const user = userEvent.setup()
    renderSearch()
    await user.click(screen.getByRole('button', { name: 'open search' }))
    await user.type(input(), 'zzzzqq{Enter}')
    expect(dialog()).toBeInTheDocument()
  })

  it('searches the section the page is in', async () => {
    const user = userEvent.setup()
    renderSearch('/markdown/')
    await user.click(screen.getByRole('button', { name: 'open search' }))
    await user.type(input(), 'preview')
    expect(screen.getByRole('link', { name: /Preview/ })).toHaveAttribute(
      'href',
      '/markdown/components/preview/'
    )
  })

  it('searches the root path as the design system', async () => {
    const user = userEvent.setup()
    renderSearch('')
    await user.click(screen.getByRole('button', { name: 'open search' }))
    await user.type(input(), 'installation')
    expect(screen.getByRole('link', { name: /Installation/ })).toBeInTheDocument()
  })
})
