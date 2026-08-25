import { Link } from '@soroush.tech/design-system/Link'
import { Typography } from '@soroush.tech/design-system/Typography'
import { View } from '@soroush.tech/design-system/View'
import { CodeBlock } from '@soroush.tech/markdown/CodeBlock'
import { componentBySlug } from 'src/common/nav'
import { sectionPath } from 'src/common/sectionPath'
import { DocsNav } from 'src/common/DocsNav/DocsNav'
import { Layout } from 'src/common/Layout'
import { Readme } from 'src/common/Readme/Readme'
import { splitReadme } from '@soroush.tech/docs-content'
import { usePageContext } from 'src/hooks/usePageContext'
import { readmeForSlug } from 'src/mdx/readmeSources'

const REPO_SRC =
  'https://github.com/soroush-tech/design-system/tree/main/packages/design-system/src'

export default function Page() {
  const { routeParams } = usePageContext()
  const slug = routeParams.name
  const item = componentBySlug.get(slug)
  const name = item?.name ?? 'Component'
  const { api } = splitReadme(readmeForSlug(slug))
  const importSnippet = `import { ${name} } from '@soroush.tech/design-system/${name}'`
  const sourceDir = item ? item.readmePath.replace(/\/README\.md$/, '') : ''
  return (
    <Layout sidebar={<DocsNav />}>
      <Typography variant="h1" gutterBottom>
        {name} API
      </Typography>
      <Typography variant="body1" color="secondary" gutterBottom>
        API reference for the {name} component: its props with their token values and defaults, the
        styled-system prop groups, and forwarded HTML attributes.
      </Typography>
      <View as="section" my={4}>
        <Typography variant="h4" as="h2" gutterBottom>
          Demos
        </Typography>
        <Typography variant="body1">
          For usage examples, visit the component demo page:{' '}
          <Link href={sectionPath('design-system', `/components/${slug}/`)} color="primary">
            {name}
          </Link>
        </Typography>
      </View>
      <View as="section" my={4}>
        <Typography variant="h4" as="h2" gutterBottom>
          Import
        </Typography>
        <CodeBlock>
          <code>{importSnippet}</code>
        </CodeBlock>
      </View>
      <Readme source={api} />
      <View as="section" my={4}>
        <Typography variant="h4" as="h2" gutterBottom>
          Source code
        </Typography>
        <Typography variant="body1">
          If this page does not answer your question, have a look at{' '}
          <Link href={`${REPO_SRC}/${sourceDir}`} color="primary">
            the implementation of the component
          </Link>{' '}
          for more detail.
        </Typography>
      </View>
    </Layout>
  )
}
