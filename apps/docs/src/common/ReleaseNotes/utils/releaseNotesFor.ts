import { sections } from '@soroush.tech/docs-content'
import type { DocsSection } from 'src/common/nav'
import { compareSemver } from 'src/common/Readme/utils/compareSemver'

// Every package's release notes. Filename is the version - the same contract
// cd-packages.yml publishes from.
const files = import.meta.glob('packages/*/release-notes/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

/**
 * A section's release notes, newest first. A section is a package that has been released, so
 * none found means the folder moved or was renamed without its description: that fails the
 * build rather than rendering an empty page.
 */
export const releaseNotesFor = (
  pkg: DocsSection,
  source: Record<string, string> = files
): Array<{ version: string; body: string }> => {
  const { dir } = sections[pkg]
  const notes = Object.entries(source)
    .filter(([path]) => path.includes(`/${dir}/release-notes/`))
    .map(([path, body]) => ({ version: path.split('/').pop()!.replace(/\.md$/, ''), body }))
    .sort((a, b) => compareSemver(b.version, a.version))
  if (notes.length === 0) {
    throw new Error(
      `No release notes for the "${pkg}" section: nothing in packages/${dir}/release-notes/. ` +
        `Check the "dir" of "${pkg}" in packages/docs-content/src/sections.json.`
    )
  }
  return notes
}
