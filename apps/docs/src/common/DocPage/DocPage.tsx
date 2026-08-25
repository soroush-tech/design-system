import { Typography } from '@soroush.tech/design-system/Typography'
import { DocsNav } from 'src/common/DocsNav/DocsNav'
import { Layout } from 'src/common/Layout'
import { Readme } from 'src/common/Readme/Readme'

export interface DocPageProps {
  /** Raw markdown source for the page body. */
  source: string
  /** Page heading - implies stripping the source's own H1/badge chrome. */
  title?: string
}

/** A docs page: the section sidebar plus a rendered in-repo markdown file. */
export function DocPage({ source, title }: Readonly<DocPageProps>) {
  return (
    <Layout sidebar={<DocsNav />}>
      {title && (
        <Typography variant="h1" gutterBottom>
          {title}
        </Typography>
      )}
      <Readme source={source} stripChrome={Boolean(title)} />
    </Layout>
  )
}
