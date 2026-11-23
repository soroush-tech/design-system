import { Typography } from '@soroush.design/react/Typography'
import { DocsNav } from 'src/common/DocsNav/DocsNav'
import { Layout } from 'src/common/Layout'
import { ReleaseNotes } from 'src/common/ReleaseNotes/ReleaseNotes'

export default function Page() {
  return (
    <Layout sidebar={<DocsNav />} hasToc>
      <Typography variant="h1" gutterBottom>
        Releases
      </Typography>
      <ReleaseNotes pkg="styled-system" />
    </Layout>
  )
}
