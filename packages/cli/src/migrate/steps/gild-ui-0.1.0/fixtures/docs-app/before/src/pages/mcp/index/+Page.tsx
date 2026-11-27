import readme from 'packages/mcp/README.md?raw'
import { Typography } from '@soroush.tech/design-system/Typography'
import { DocsNav } from 'src/common/DocsNav/DocsNav'
import { Layout } from 'src/common/Layout'
import { Readme } from 'src/common/Readme/Readme'
import { githubReadmeLinks } from 'src/common/Readme/utils/githubReadmeLinks'

export default function Page() {
  return (
    <Layout sidebar={<DocsNav />} hasToc>
      <Typography variant="h1" gutterBottom>
        MCP server
      </Typography>
      <Readme source={githubReadmeLinks(readme, 'mcp')} stripChrome />
    </Layout>
  )
}
