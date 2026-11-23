import { DocsNav } from 'src/common/DocsNav/DocsNav'
import { Layout } from 'src/common/Layout'
import { Readme } from 'src/common/Readme/Readme'
import { componentOfRoute } from 'src/common/componentPage'
import { readmeForSlug } from 'src/mdx/readmeSources'
import { usePageContext } from 'src/hooks/usePageContext'

export default function Page() {
  const { slug } = componentOfRoute(usePageContext().routeParams)
  return (
    <Layout sidebar={<DocsNav />} hasToc>
      <Readme source={readmeForSlug(slug)} />
    </Layout>
  )
}
