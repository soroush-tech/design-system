import readme from 'packages/cli/README.md?raw'
import { Typography } from '@soroush.tech/design-system/Typography'
import { DocsNav } from 'src/common/DocsNav/DocsNav'
import { Layout } from 'src/common/Layout'
import { Readme } from 'src/common/Readme/Readme'
import { githubReadmeLinks } from 'src/common/Readme/utils/githubReadmeLinks'

export default function Page() {
  return (
    <Layout sidebar={<DocsNav />} hasToc>
      <Typography variant="h1" gutterBottom>
        Command line
      </Typography>
      <Readme source={githubReadmeLinks(readme, 'cli')} stripChrome />
    </Layout>
  )
}
