import { View } from '@gild-ui/react/View'
import { Preview } from '@gild-ui/react-markdown/Preview'
import type { DocsSection } from 'src/common/nav'
import { releaseNotesFor } from './utils/releaseNotesFor'
import { titleByVersion } from './utils/titleByVersion'

export interface ReleaseNotesProps {
  pkg: DocsSection
}

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
