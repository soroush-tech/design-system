import { Typography } from '@soroush.tech/design-system/Typography'
import { View } from '@soroush.tech/design-system/View'
import { Preview } from '@soroush.tech/markdown/Preview'
import type { DocsPackage } from 'src/common/nav'
import { releaseNotesFor } from './utils/releaseNotesFor'

export interface ReleaseNotesProps {
  pkg: DocsPackage
}

/** The package's version history, rendered from its in-repo release-notes files. */
export function ReleaseNotes({ pkg }: Readonly<ReleaseNotesProps>) {
  return (
    <View as="section" mt={5}>
      <Typography variant="h3" as="h2" gutterBottom>
        Releases
      </Typography>
      {releaseNotesFor(pkg).map(({ version, body }) => (
        <View key={version} mb={4}>
          <Preview>{body}</Preview>
        </View>
      ))}
    </View>
  )
}
