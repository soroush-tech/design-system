import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import designSystemPkg from 'packages/design-system/package.json'
import { renderWithTheme } from 'src/test/utils/wrapper'
import { ReleaseNotes } from './ReleaseNotes'
import { releaseNotesFor } from './utils/releaseNotesFor'

describe('releaseNotesFor', () => {
  it('lists design-system releases newest first, including the current version', () => {
    const notes = releaseNotesFor('design-system')
    expect(notes[0].version).toBe(designSystemPkg.version)
    const versions = notes.map((note) => note.version)
    expect(versions).toContain('1.0.0')
    expect(versions.indexOf('1.0.0')).toBeGreaterThan(versions.indexOf(designSystemPkg.version))
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
    expect(names[0]).toBe('v1.2.3')
    expect(names[names.length - 1]).toBe('v1.0.0')
  })
})
