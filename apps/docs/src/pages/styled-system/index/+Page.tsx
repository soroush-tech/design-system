import { Typography } from '@soroush.design/react/Typography'
import { DocsNav } from 'src/common/DocsNav/DocsNav'
import { Layout } from 'src/common/Layout'
import { Readme } from 'src/common/Readme/Readme'

const SOURCE = `The style-prop engine under the design system: responsive props, theme scales and
variants for any component of yours. It lives in its own repository, with its own docs and releases.

\`\`\`sh
npm i @soroush.tech/styled-system
\`\`\`

- [Source on GitHub](https://github.com/soroush-tech/styled-system)
- [Documentation](https://github.com/soroush-tech/styled-system/tree/main/docs)
`

export default function Page() {
  return (
    <Layout sidebar={<DocsNav />}>
      <Typography variant="h1" gutterBottom>
        Styled System
      </Typography>
      <Readme source={SOURCE} />
    </Layout>
  )
}
