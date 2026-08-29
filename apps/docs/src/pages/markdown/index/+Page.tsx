import readme from 'packages/markdown/README.md?raw'
import { Typography } from '@soroush.tech/design-system/Typography'
import { DocsNav } from 'src/common/DocsNav/DocsNav'
import { Layout } from 'src/common/Layout'
import { Readme } from 'src/common/Readme/Readme'
import { ReleaseNotes } from 'src/common/ReleaseNotes/ReleaseNotes'

export default function Page() {
  return (
    <Layout sidebar={<DocsNav />}>
      <Typography variant="h1" gutterBottom>
        Markdown
      </Typography>
      <Readme source={readme} stripChrome />
      <ReleaseNotes pkg="markdown" />
    </Layout>
  )
}
