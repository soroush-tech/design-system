import { Typography } from '@soroush.tech/design-system/Typography'
import { DocsNav } from 'src/common/DocsNav/DocsNav'
import { Layout } from 'src/common/Layout'
import { ReleaseNotes } from 'src/common/ReleaseNotes/ReleaseNotes'

export default function Page() {
  return (
    <Layout sidebar={<DocsNav />} hasToc>
      <Typography variant="h1" gutterBottom>
        Releases
      </Typography>
      <ReleaseNotes pkg="markdown" />
    </Layout>
  )
}
