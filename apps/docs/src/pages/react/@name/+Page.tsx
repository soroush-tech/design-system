import { createElement } from 'react'
import { MDXProvider } from '@mdx-js/react'
import { entryGuides, entryImportLines } from 'src/common/nav'
import { componentOfRoute, componentPageParts } from 'src/common/componentPage'
import { DocPage } from 'src/common/DocPage/DocPage'
import { ComponentHero } from 'src/common/ComponentHero/ComponentHero'
import { DocsNav } from 'src/common/DocsNav/DocsNav'
import { Layout } from 'src/common/Layout'
import { MdxStoryDemo } from 'src/mdx/MdxStoryDemo'
import { MdxStoryDemos } from 'src/mdx/MdxStoryDemos'
import { usePageContext } from 'src/hooks/usePageContext'
import { entryDoc } from './entryDocs'
import { mdxForSlug } from './mdxPages'

// StoryDemo is provided here rather than in the global element map: only this route
// renders demos, and the registry it pulls (stories modules + the portable-stories
// runtime) must stay out of the every-page chunk. The nested provider merges with the
// app-wide one, and the page prerenders with the demos in place. The page's own `# Name`
// heading is the hero's, so the MDX one is dropped.
const routeMdxComponents = {
  StoryDemo: MdxStoryDemo,
  StoryDemos: MdxStoryDemos,
  h1: () => null,
}

// `/react/<Name>/` is a component's page; a lowercase name is an entry point that is not a component.
export default function Page() {
  const { routeParams } = usePageContext()
  if (routeParams.name in entryGuides) {
    return (
      <DocPage
        source={entryDoc(routeParams.name)}
        importLine={entryImportLines[routeParams.name]}
      />
    )
  }
  const item = componentOfRoute(routeParams)
  const { slug } = item
  const { lead, accessibility } = componentPageParts(slug)
  return (
    <Layout
      sidebar={<DocsNav />}
      hasToc
      head={
        <ComponentHero
          item={item}
          lead={lead}
          active="overview"
          hasAccessibility={accessibility !== ''}
        />
      }
    >
      <MDXProvider components={routeMdxComponents}>{createElement(mdxForSlug(slug))}</MDXProvider>
    </Layout>
  )
}
