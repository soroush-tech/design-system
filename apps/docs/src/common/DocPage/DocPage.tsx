import { Typography } from '@soroush.design/react/Typography'
import { DocsNav } from 'src/common/DocsNav/DocsNav'
import type { ImportLine } from '@soroush.design/docs-content'
import { ImportLines } from 'src/common/ImportLines/ImportLines'
import { Layout } from 'src/common/Layout'
import { Readme } from 'src/common/Readme/Readme'

export interface DocPageProps {
  /** Raw markdown source for the page body. */
  source: string
  /** Page heading - implies stripping the source's own H1/badge chrome. */
  title?: string
  /** The install and import of what the page documents, shown at its top. */
  importLine?: ImportLine
}

/** A docs page: the section sidebar plus a rendered in-repo markdown file. */
export function DocPage({ source, title, importLine }: Readonly<DocPageProps>) {
  return (
    <Layout sidebar={<DocsNav />} hasToc>
      {title && (
        <Typography variant="h1" gutterBottom>
          {title}
        </Typography>
      )}
      {importLine && <ImportLines line={importLine} />}
      <Readme source={source} stripChrome={Boolean(title)} />
    </Layout>
  )
}
