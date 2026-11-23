import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { PACKAGE_VERSIONS } from 'src/common/packageVersions'
import { renderWithTheme } from 'src/test/utils/wrapper'
import { ReleaseNotes } from './ReleaseNotes'
import { releaseNotesFor } from './utils/releaseNotesFor'

describe('releaseNotesFor', () => {
  it('lists the design-system notes: the first release of the package under its name', () => {
    const notes = releaseNotesFor('react')
    expect(notes.map((note) => note.version)).toEqual(['0.1.0'])
    expect(notes[0].version).toBe(PACKAGE_VERSIONS.react)
    expect(notes[0].body.startsWith('## @soroush.design/react-components@0.1.0')).toBe(true)
  })

  it('fails, naming the section and its folder, when a section has no notes', () => {
    const moved = { 'packages/elsewhere/release-notes/1.0.0.md': '## notes' }
    expect(() => releaseNotesFor('markdown', moved)).toThrow(
      /"markdown" section: nothing in packages\/react-markdown\/release-notes\//
    )
    expect(() => releaseNotesFor('markdown', {})).toThrow(/No release notes/)
  })

  it('finds the notes in the folder the description names', () => {
    const files = {
      '/packages/react-markdown/release-notes/1.0.0.md': 'one',
      '/packages/react-markdown/release-notes/1.1.0.md': 'two',
      '/packages/cli/release-notes/9.0.0.md': 'other',
    }
    expect(releaseNotesFor('markdown', files)).toEqual([
      { version: '1.1.0', body: 'two' },
      { version: '1.0.0', body: 'one' },
    ])
  })

  it('scopes to the requested package', () => {
    for (const note of releaseNotesFor('markdown')) {
      expect(note.body).toContain('@soroush.design/react-markdown@')
    }
  })
})

describe('ReleaseNotes', () => {
  it('renders each version body, headed by the version alone', () => {
    renderWithTheme(<ReleaseNotes pkg="ui-spec" />)
    expect(screen.getByRole('heading', { name: 'v0.1.0' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: /@soroush\.tech\/ui-spec@/ })).toBeNull()
  })

  it('trims the package name of the component library, under the soroush.design scope', () => {
    renderWithTheme(<ReleaseNotes pkg="react" />)
    expect(screen.getByRole('heading', { name: 'v0.1.0' })).toBeInTheDocument()
    expect(
      screen.queryByRole('heading', { name: /@soroush\.design\/react-components@/ })
    ).toBeNull()
  })

  it('trims the package name of a release of the MCP server, under its own scope', () => {
    renderWithTheme(<ReleaseNotes pkg="mcp" />)
    expect(screen.getByRole('heading', { name: 'v0.1.1' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: /@soroush\.design\/mcp@/ })).toBeNull()
  })

  it('lists the versions newest first', () => {
    renderWithTheme(<ReleaseNotes pkg="ui-spec" />)
    const names = screen.getAllByRole('heading', { level: 2 }).map((heading) => heading.textContent)
    expect(names[0]).toBe(`v${PACKAGE_VERSIONS['ui-spec']}`)
    expect(names[names.length - 1]).toBe('v0.1.0')
  })
})
