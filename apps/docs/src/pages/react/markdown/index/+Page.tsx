import readme from 'packages/react-markdown/README.md?raw'
import { Typography } from '@gild-ui/react/Typography'
import { DocsNav } from 'src/common/DocsNav/DocsNav'
import { Layout } from 'src/common/Layout'
import { Readme } from 'src/common/Readme/Readme'

export default function Page() {
  return (
    <Layout sidebar={<DocsNav />} hasToc>
      <Typography variant="h1" gutterBottom>
        Markdown
      </Typography>
      <Readme source={readme} stripChrome />
    </Layout>
  )
}
