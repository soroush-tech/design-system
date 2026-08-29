import { createElement } from 'react'
import { MDXProvider } from '@mdx-js/react'
import { Link } from '@soroush.tech/design-system/Link'
import { Typography } from '@soroush.tech/design-system/Typography'
import { componentBySlug } from 'src/common/nav'
import { sectionPath } from 'src/common/sectionPath'
import { DocsNav } from 'src/common/DocsNav/DocsNav'
import { Layout } from 'src/common/Layout'
import { MdxStoryDemo } from 'src/mdx/MdxStoryDemo'
import { MdxStoryDemos } from 'src/mdx/MdxStoryDemos'
import { usePageContext } from 'src/hooks/usePageContext'
import { mdxForSlug } from './mdxPages'

// StoryDemo is provided here rather than in the global element map: only this route
// renders demos, and the registry it pulls (stories modules + the portable-stories
// runtime) must stay out of the every-page chunk. The nested provider merges with the
// app-wide one, and the page prerenders with the demos in place.
const routeMdxComponents = { StoryDemo: MdxStoryDemo, StoryDemos: MdxStoryDemos }

export default function Page() {
  const { routeParams } = usePageContext()
  const slug = routeParams.name
  const item = componentBySlug.get(slug)
  return (
    <Layout sidebar={<DocsNav />}>
      <MDXProvider components={routeMdxComponents}>{createElement(mdxForSlug(slug))}</MDXProvider>
      <Typography variant="body1" mt={4}>
        <Link href={sectionPath('design-system', `/api/${slug}/`)} color="primary">
          {item?.name ?? 'Component'} API reference
        </Link>
      </Typography>
    </Layout>
  )
}
