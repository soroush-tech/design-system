import readme from 'packages/styled-system/README.md?raw'
import { Typography } from '@soroush.tech/design-system/Typography'
import { DocsNav } from 'src/common/DocsNav/DocsNav'
import { Layout } from 'src/common/Layout'
import { Readme } from 'src/common/Readme/Readme'

export default function Page() {
  return (
    <Layout sidebar={<DocsNav />} hasToc>
      <Typography variant="h1" gutterBottom>
        Styled System
      </Typography>
      <Readme source={readme} stripChrome />
    </Layout>
  )
}
