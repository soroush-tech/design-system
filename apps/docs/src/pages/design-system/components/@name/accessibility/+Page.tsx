import { componentBySlug } from 'src/common/nav'
import { componentPageParts } from 'src/common/componentPage'
import { ComponentHero } from 'src/common/ComponentHero/ComponentHero'
import { DocsNav } from 'src/common/DocsNav/DocsNav'
import { Layout } from 'src/common/Layout'
import { Readme } from 'src/common/Readme/Readme'
import { usePageContext } from 'src/hooks/usePageContext'

export default function Page() {
  const { routeParams } = usePageContext()
  const slug = routeParams.name
  const item = componentBySlug.get(slug)
  if (!item) throw new Error(`No component for slug "${slug}"`)
  const { lead, accessibility } = componentPageParts(slug)
  return (
    <Layout
      sidebar={<DocsNav />}
      hasToc
      head={<ComponentHero item={item} lead={lead} active="accessibility" hasAccessibility />}
    >
      <Readme source={accessibility} />
    </Layout>
  )
}
