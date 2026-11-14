import { describe, it, expect, vi, afterEach } from 'vitest'
import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithTheme } from 'src/test/utils/wrapper'
import { PACKAGE_VERSIONS } from 'src/common/packageVersions'
import { VersionMenu } from './VersionMenu'
import { newestVersion } from './utils/newestVersion'
import { currentVersion, versionFromPath } from './utils/versionFromPath'

afterEach(() => {
  vi.unstubAllGlobals()
})

const stubManifest = (manifest: object, ok = true) => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok, json: () => Promise.resolve(manifest) }))
}

describe('versionFromPath', () => {
  it('detects a pinned snapshot path', () => {
    expect(versionFromPath('/design-system/1.3.3/components/button/', 'design-system')).toBe(
      '1.3.3'
    )
  })

  it('falls back to latest on live paths', () => {
    expect(versionFromPath('/design-system/components/button/', 'design-system')).toBe('latest')
    expect(versionFromPath('/', 'design-system')).toBe('latest')
  })
})

describe('currentVersion', () => {
  it('reads the version from the snapshot base, which Vike strips from the pathname', () => {
    expect(currentVersion('/components/button/', 'design-system', '/design-system/1.3.4/')).toBe(
      '1.3.4'
    )
  })

  it('falls back to the pathname when the base names no version', () => {
    expect(currentVersion('/design-system/1.3.3/api/', 'design-system', '/')).toBe('1.3.3')
    expect(currentVersion('/design-system/api/', 'design-system', '/')).toBe('latest')
  })
})

describe('newestVersion', () => {
  it('takes the highest version, by number and not by text', () => {
    expect(newestVersion(['1.3.3', '2.1.0', '2.0.0'])).toBe('2.1.0')
    expect(newestVersion(['1.10.0', '1.9.9'])).toBe('1.10.0')
    expect(newestVersion(['2.0.0', '2.0.0', '1.0.0'])).toBe('2.0.0')
  })

  it('has none for an empty list', () => {
    expect(newestVersion([])).toBeUndefined()
  })
})

const live = PACKAGE_VERSIONS['design-system']
const trigger = () => screen.getByRole('button', { name: /Documentation version/ })

describe('VersionMenu', () => {
  it('shows the version of the live docs on the live site', async () => {
    stubManifest({ 'design-system': ['1.3.3'] })
    renderWithTheme(<VersionMenu pkg="design-system" pathname="/design-system/" />)
    expect(trigger()).toHaveTextContent(`v${live}`)
    await waitFor(() =>
      expect(globalThis.fetch).toHaveBeenCalledWith('/versions.json', { cache: 'no-cache' })
    )
  })

  it('names the newest released version as the latest from a snapshot', async () => {
    stubManifest({ 'design-system': ['1.3.3', '2.1.0', '2.0.0'] })
    const user = userEvent.setup()
    renderWithTheme(<VersionMenu pkg="design-system" pathname="/design-system/1.3.3/" />)
    await user.click(trigger())
    expect(await screen.findByRole('menuitemradio', { name: 'Latest (v2.1.0)' })).toBeVisible()
  })

  it('says just Latest from a snapshot until a version is known', async () => {
    stubManifest({}, false)
    const user = userEvent.setup()
    renderWithTheme(<VersionMenu pkg="design-system" pathname="/design-system/1.3.3/" />)
    await user.click(trigger())
    expect(await screen.findByRole('menuitemradio', { name: 'Latest' })).toBeVisible()
  })

  it('shows the version of a snapshot on its path', () => {
    stubManifest({ 'design-system': ['1.3.3'] })
    renderWithTheme(<VersionMenu pkg="design-system" pathname="/design-system/1.3.3/" />)
    expect(trigger()).toHaveTextContent('v1.3.3')
  })

  it('lists the live docs and every released version from the root manifest', async () => {
    stubManifest({ 'design-system': ['1.3.3', '1.3.2'] })
    const user = userEvent.setup()
    renderWithTheme(<VersionMenu pkg="design-system" pathname="/design-system/" />)
    await user.click(trigger())
    const menu = await screen.findByRole('menu', { name: 'Documentation version' })
    await waitFor(() => expect(within(menu).getAllByRole('menuitemradio')).toHaveLength(3))
    const rows = within(menu).getAllByRole('menuitemradio')
    expect(rows[0]).toHaveTextContent(`Latest (v${live})`)
    expect(rows[0]).toHaveAttribute('aria-checked', 'true')
    expect(rows[1]).toHaveTextContent('v1.3.3')
    expect(rows[1]).toHaveAttribute('aria-checked', 'false')
    expect(rows[2]).toHaveTextContent('v1.3.2')
  })

  it('marks the version of a snapshot as the chosen one', async () => {
    stubManifest({ 'design-system': ['1.3.3'] })
    const user = userEvent.setup()
    renderWithTheme(<VersionMenu pkg="design-system" pathname="/design-system/1.3.3/" />)
    await user.click(trigger())
    const menu = await screen.findByRole('menu', { name: 'Documentation version' })
    await waitFor(() => expect(within(menu).getAllByRole('menuitemradio')).toHaveLength(2))
    expect(within(menu).getByRole('menuitemradio', { name: 'v1.3.3' })).toHaveAttribute(
      'aria-checked',
      'true'
    )
  })

  it('loads the snapshot that is chosen', async () => {
    stubManifest({ 'design-system': ['1.3.3'] })
    const assign = vi.fn()
    vi.stubGlobal('location', { ...window.location, assign })
    const user = userEvent.setup()
    renderWithTheme(<VersionMenu pkg="design-system" pathname="/design-system/" />)
    await user.click(trigger())
    await user.click(await screen.findByRole('menuitemradio', { name: 'v1.3.3' }))
    expect(assign).toHaveBeenCalledWith('/design-system/1.3.3/')
  })

  it('goes from a snapshot back to the live docs', async () => {
    stubManifest({ 'design-system': ['1.3.3'] })
    const assign = vi.fn()
    vi.stubGlobal('location', { ...window.location, assign })
    const user = userEvent.setup()
    renderWithTheme(<VersionMenu pkg="design-system" pathname="/design-system/1.3.3/" />)
    await user.click(trigger())
    await user.click(await screen.findByRole('menuitemradio', { name: /^Latest/ }))
    expect(assign).toHaveBeenCalledWith('/design-system/')
  })

  it.each(['mcp', 'ui-spec', 'cli'] as const)(
    'lists the released snapshots of the %s section and goes to one',
    async (pkg) => {
      stubManifest({ [pkg]: ['0.1.3'] })
      const assign = vi.fn()
      vi.stubGlobal('location', { ...window.location, assign })
      const user = userEvent.setup()
      renderWithTheme(<VersionMenu pkg={pkg} pathname={`/${pkg}/`} />)
      expect(trigger()).toHaveTextContent(`v${PACKAGE_VERSIONS[pkg]}`)
      await user.click(trigger())
      await user.click(await screen.findByRole('menuitemradio', { name: 'v0.1.3' }))
      expect(assign).toHaveBeenCalledWith(`/${pkg}/0.1.3/`)
    }
  )

  it('lists the live docs alone without manifest entries or on a failed fetch', async () => {
    stubManifest({}, false)
    const user = userEvent.setup()
    const { unmount } = renderWithTheme(<VersionMenu pkg="markdown" pathname="/markdown/" />)
    await user.click(trigger())
    expect(await screen.findAllByRole('menuitemradio')).toHaveLength(1)
    unmount()
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')))
    renderWithTheme(<VersionMenu pkg="markdown" pathname="/markdown/" />)
    await user.click(trigger())
    expect(await screen.findAllByRole('menuitemradio')).toHaveLength(1)
  })

  it('ignores a manifest that resolves after unmount', async () => {
    let resolveFetch!: (value: unknown) => void
    vi.stubGlobal(
      'fetch',
      vi.fn().mockReturnValue(
        new Promise((resolve) => {
          resolveFetch = resolve
        })
      )
    )
    const { unmount } = renderWithTheme(<VersionMenu pkg="markdown" pathname="/markdown/" />)
    unmount()
    resolveFetch({ ok: true, json: () => Promise.resolve({ markdown: ['1.0.0'] }) })
    await waitFor(() => {
      expect(
        screen.queryByRole('button', { name: /Documentation version/ })
      ).not.toBeInTheDocument()
    })
  })
})
