import { Link } from '@soroush.tech/design-system/Link'
import { Typography } from '@soroush.tech/design-system/Typography'
import { View } from '@soroush.tech/design-system/View'
import { CodeBlock } from '@soroush.tech/markdown/CodeBlock'
import { componentBySlug, importSubpathOf, kebabCase } from 'src/common/nav'
import { sectionPath } from 'src/common/sectionPath'
import { DocsNav } from 'src/common/DocsNav/DocsNav'
import { Layout } from 'src/common/Layout'
import { Readme } from 'src/common/Readme/Readme'
import { splitReadme } from '@soroush.tech/docs-content'
import { componentPageParts } from 'src/common/componentPage'
import { ComponentHero } from 'src/common/ComponentHero/ComponentHero'
import { usePageContext } from 'src/hooks/usePageContext'

const REPO_SRC =
  'https://github.com/soroush-tech/design-system/tree/main/packages/design-system/src'

export default function Page() {
  const { routeParams } = usePageContext()
  const slug = routeParams.name
  const item = componentBySlug.get(slug)
  const name = item?.name ?? 'Component'
  const parts = componentPageParts(slug)
  // A family member has no tabs of its own, so its README stays whole; a component's accessibility
  // notes are on their own tab.
  const { intro, api } = splitReadme(item?.family ? parts.source : parts.rest)
  const importSnippet = `import { ${name} } from '@soroush.tech/design-system/${item ? importSubpathOf(item) : name}'`
  // A family member's demos are under its own heading on its family's page - a PascalCase
  // name's heading id is the name in lower case.
  const demosPath = item?.family
    ? `/components/${kebabCase(item.family)}/#${item.name.toLowerCase()}`
    : `/components/${slug}/`
  const demosName = item?.family ?? name
  const sourceDir = item ? item.readmePath.replace(/\/README\.md$/, '') : ''
  return (
    <Layout sidebar={<DocsNav />} hasToc>
      {item && (
        <ComponentHero
          item={item}
          lead={parts.lead}
          active={item.family ? undefined : 'specs'}
          hasAccessibility={parts.accessibility !== ''}
        />
      )}
      {/* A family member has no page of its own, so what it is and how it composes is here. */}
      {item?.family && <Readme source={intro} stripChrome />}
      <View as="section" my={4}>
        <Typography variant="h4" as="h2" gutterBottom>
          Demos
        </Typography>
        <Typography variant="body1">
          For usage examples, visit the component demo page:{' '}
          <Link href={sectionPath('design-system', demosPath)} color="primary">
            {demosName}
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
