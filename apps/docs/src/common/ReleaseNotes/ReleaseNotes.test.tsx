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
  it('renders the Releases heading and each version body', () => {
    renderWithTheme(<ReleaseNotes pkg="markdown" />)
    expect(screen.getByRole('heading', { name: 'Releases' })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /@soroush\.tech\/markdown@1\.0\.0/ })
    ).toBeInTheDocument()
  })
})
