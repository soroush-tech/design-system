import { View } from '@soroush.tech/design-system/View'
import { Preview } from '@soroush.tech/markdown/Preview'
import type { DocsSection } from 'src/common/nav'
import { releaseNotesFor } from './utils/releaseNotesFor'

export interface ReleaseNotesProps {
  pkg: DocsSection
}

// A release's heading names the package and its version, as the file is the version's own:
// `@soroush.tech/design-system@2.0.0` - under any scope. The page is the package's, so the
// version alone is shown.
const titleByVersion = (body: string): string =>
  body.replace(/^## @[\w.-]+\/[\w-]+@(\S+)/, '## v$1')

/** The package's version history, rendered from its in-repo release-notes files. */
export function ReleaseNotes({ pkg }: Readonly<ReleaseNotesProps>) {
  return (
    <View as="section">
      {releaseNotesFor(pkg).map(({ version, body }) => (
        <View key={version} mb={4}>
          <Preview>{titleByVersion(body)}</Preview>
        </View>
      ))}
    </View>
  )
}
