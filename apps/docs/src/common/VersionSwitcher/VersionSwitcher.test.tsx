import { describe, it, expect, vi, afterEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithTheme } from 'src/test/utils/wrapper'
import { VersionSwitcher } from './VersionSwitcher'
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

describe('VersionSwitcher', () => {
  it('renders the section versions from the root manifest', async () => {
    stubManifest({ 'design-system': ['1.3.3', '1.3.2'] })
    renderWithTheme(<VersionSwitcher pkg="design-system" pathname="/design-system/" />)
    const select = await screen.findByRole('combobox', { name: 'Documentation version' })
    expect(select).toHaveValue('latest')
    expect(screen.getByRole('option', { name: 'v1.3.3' })).toBeInTheDocument()
  })

  it('navigates to the chosen snapshot', async () => {
    stubManifest({ 'design-system': ['1.3.3'] })
    const assign = vi.fn()
    vi.stubGlobal('location', { ...window.location, assign })
    const user = userEvent.setup()
    renderWithTheme(<VersionSwitcher pkg="design-system" pathname="/design-system/" />)
    const select = await screen.findByRole('combobox', { name: 'Documentation version' })
    await user.selectOptions(select, '1.3.3')
    expect(assign).toHaveBeenCalledWith('/design-system/1.3.3/')
  })

  it('navigates from a pinned snapshot back to latest', async () => {
    stubManifest({ 'design-system': ['1.3.3'] })
    const assign = vi.fn()
    vi.stubGlobal('location', { ...window.location, assign })
    const user = userEvent.setup()
    renderWithTheme(<VersionSwitcher pkg="design-system" pathname="/design-system/1.3.3/" />)
    const select = await screen.findByRole('combobox', { name: 'Documentation version' })
    expect(select).toHaveValue('1.3.3')
    await user.selectOptions(select, 'latest')
    expect(assign).toHaveBeenCalledWith('/design-system/')
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
    const { unmount } = renderWithTheme(<VersionSwitcher pkg="markdown" pathname="/markdown/" />)
    unmount()
    resolveFetch({ ok: true, json: () => Promise.resolve({ markdown: ['1.0.0'] }) })
    await waitFor(() => {
      expect(screen.queryByRole('combobox')).not.toBeInTheDocument()
    })
  })

  it('stays hidden without manifest entries or on a failed fetch', async () => {
    stubManifest({}, false)
    renderWithTheme(<VersionSwitcher pkg="markdown" pathname="/markdown/" />)
    await waitFor(() => {
      expect(screen.queryByRole('combobox')).not.toBeInTheDocument()
    })
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')))
    renderWithTheme(<VersionSwitcher pkg="markdown" pathname="/markdown/" />)
    await waitFor(() => {
      expect(screen.queryByRole('combobox')).not.toBeInTheDocument()
    })
  })
})
