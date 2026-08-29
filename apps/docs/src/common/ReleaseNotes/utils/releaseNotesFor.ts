import type { DocsPackage } from 'src/common/nav'
import { compareSemver } from 'src/common/Readme/utils/compareSemver'

// Every package's release notes. Filename is the version - the same contract
// cd-packages.yml publishes from.
const files = import.meta.glob('packages/*/release-notes/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

/** A package's release notes, newest first. */
export const releaseNotesFor = (pkg: DocsPackage): Array<{ version: string; body: string }> =>
  Object.entries(files)
    .filter(([path]) => path.includes(`/${pkg}/release-notes/`))
    .map(([path, body]) => ({ version: path.split('/').pop()!.replace(/\.md$/, ''), body }))
    .sort((a, b) => compareSemver(b.version, a.version))
