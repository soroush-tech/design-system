import readme from 'packages/styled-system/README.md?raw'
import { Typography } from '@soroush.tech/design-system/Typography'
import { DocsNav } from 'src/common/DocsNav/DocsNav'
import { Layout } from 'src/common/Layout'
import { Readme } from 'src/common/Readme/Readme'
import { ReleaseNotes } from 'src/common/ReleaseNotes/ReleaseNotes'

export default function Page() {
  return (
    <Layout sidebar={<DocsNav />}>
      <Typography variant="h1" gutterBottom>
        Styled System
      </Typography>
      <Readme source={readme} stripChrome />
      <ReleaseNotes pkg="styled-system" />
    </Layout>
  )
}
