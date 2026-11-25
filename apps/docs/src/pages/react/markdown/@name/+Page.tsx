import { DocsNav } from 'src/common/DocsNav/DocsNav'
import { ImportLines } from 'src/common/ImportLines/ImportLines'
import { Layout } from 'src/common/Layout'
import { Readme } from 'src/common/Readme/Readme'
import { componentImportLine } from 'src/common/nav'
import { componentOfRoute } from 'src/common/componentPage'
import { readmeForSlug } from 'src/mdx/readmeSources'
import { usePageContext } from 'src/hooks/usePageContext'

export default function Page() {
  const item = componentOfRoute(usePageContext().routeParams)
  return (
    <Layout sidebar={<DocsNav />} hasToc>
      <ImportLines line={componentImportLine(item)} />
      <Readme source={readmeForSlug(item.slug)} />
    </Layout>
  )
}
