import { DocsNav } from 'src/common/DocsNav/DocsNav'
import { Layout } from 'src/common/Layout'
import { Readme } from 'src/common/Readme/Readme'
import { readmeForSlug } from 'src/mdx/readmeSources'
import { usePageContext } from 'src/hooks/usePageContext'

export default function Page() {
  const { routeParams } = usePageContext()
  return (
    <Layout sidebar={<DocsNav />}>
      <Readme source={readmeForSlug(routeParams.name)} />
    </Layout>
  )
}
