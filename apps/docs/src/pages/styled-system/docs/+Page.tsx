import { DocsNav } from 'src/common/DocsNav/DocsNav'
import { Layout } from 'src/common/Layout'
import { Readme } from 'src/common/Readme/Readme'
import { usePageContext } from 'src/hooks/usePageContext'
import { docBySlug, docSlugFromParam } from './docSources'

const WILDCARD = '*'

export default function Page() {
  const { routeParams } = usePageContext()
  const slug = docSlugFromParam(routeParams[WILDCARD] ?? '')
  const doc = docBySlug.get(slug)
  return (
    <Layout sidebar={<DocsNav />}>
      <Readme source={doc?.source ?? ''} />
    </Layout>
  )
}
