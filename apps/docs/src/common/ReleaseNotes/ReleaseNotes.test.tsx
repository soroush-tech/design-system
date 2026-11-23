import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { PACKAGE_VERSIONS } from 'src/common/packageVersions'
import { renderWithTheme } from 'src/test/utils/wrapper'
import { ReleaseNotes } from './ReleaseNotes'
import { releaseNotesFor } from './utils/releaseNotesFor'

describe('releaseNotesFor', () => {
  it('lists design-system releases newest first, including the current version', () => {
    const notes = releaseNotesFor('design-system')
    expect(notes[0].version).toBe(PACKAGE_VERSIONS['design-system'])
    const versions = notes.map((note) => note.version)
    expect(versions).toContain('1.0.0')
    expect(versions.indexOf('1.0.0')).toBeGreaterThan(
      versions.indexOf(PACKAGE_VERSIONS['design-system'])
    )
  })

  it('fails, naming the section and its folder, when a section has no notes', () => {
    const moved = { 'packages/elsewhere/release-notes/1.0.0.md': '## notes' }
    expect(() => releaseNotesFor('markdown', moved)).toThrow(
      /"markdown" section: nothing in packages\/markdown\/release-notes\//
    )
    expect(() => releaseNotesFor('markdown', {})).toThrow(/No release notes/)
  })

  it('finds the notes in the folder the description names', () => {
    const files = {
      '/packages/markdown/release-notes/1.0.0.md': 'one',
      '/packages/markdown/release-notes/1.1.0.md': 'two',
      '/packages/cli/release-notes/9.0.0.md': 'other',
    }
    expect(releaseNotesFor('markdown', files)).toEqual([
      { version: '1.1.0', body: 'two' },
      { version: '1.0.0', body: 'one' },
    ])
  })

  it('scopes to the requested package', () => {
    for (const note of releaseNotesFor('markdown')) {
      expect(note.body).toContain('@soroush.tech/markdown@')
    }
  })
})

describe('ReleaseNotes', () => {
  it('renders each version body, headed by the version alone', () => {
    renderWithTheme(<ReleaseNotes pkg="markdown" />)
    expect(screen.getByRole('heading', { name: 'v1.0.0' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: /@soroush\.tech\/markdown@/ })).toBeNull()
  })

  it('trims the package name of a release of the MCP server, under its own scope', () => {
    renderWithTheme(<ReleaseNotes pkg="mcp" />)
    expect(screen.getByRole('heading', { name: 'v0.1.1' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: /@soroush\.design\/mcp@/ })).toBeNull()
  })

  it('lists the versions newest first', () => {
    renderWithTheme(<ReleaseNotes pkg="markdown" />)
    const names = screen.getAllByRole('heading', { level: 2 }).map((heading) => heading.textContent)
    expect(names[0]).toBe(`v${PACKAGE_VERSIONS.markdown}`)
    expect(names[names.length - 1]).toBe('v1.0.0')
  })
})
