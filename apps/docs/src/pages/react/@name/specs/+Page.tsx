import { Link } from '@soroush.design/react/Link'
import { Typography } from '@soroush.design/react/Typography'
import { View } from '@soroush.design/react/View'
import { CodeBlock } from '@soroush.tech/markdown/CodeBlock'
import { componentByName, componentPagePath, importSubpathOf } from 'src/common/nav'
import { APP_PACKAGE } from 'src/common/packageVersions'
import { sectionPath } from 'src/common/sectionPath'
import { DocsNav } from 'src/common/DocsNav/DocsNav'
import { Layout } from 'src/common/Layout'
import { Readme } from 'src/common/Readme/Readme'
import { sections, splitReadme } from '@soroush.tech/docs-content'
import { componentOfRoute, componentPageParts } from 'src/common/componentPage'
import { ComponentHero } from 'src/common/ComponentHero/ComponentHero'
import { usePageContext } from 'src/hooks/usePageContext'

const REPO_SRC = `https://github.com/soroush-tech/design-system/tree/main/packages/${sections.react.dir}/src`

export default function Page() {
  const item = componentOfRoute(usePageContext().routeParams)
  const { name } = item
  const parts = componentPageParts(item.slug)
  // A family member has no tabs of its own, so its README stays whole; a component's accessibility
  // notes are on their own tab.
  const { intro, api } = splitReadme(item.family ? parts.source : parts.rest)
  const importSnippet = `import { ${name} } from '${APP_PACKAGE}/${importSubpathOf(item)}'`
  // A family member's demos are under its own heading on its family's page - a PascalCase
  // name's heading id is the name in lower case.
  const demosPath = item.family
    ? `${componentPagePath(componentByName.get(item.family)!)}#${name.toLowerCase()}`
    : componentPagePath(item)
  const demosName = item.family ?? name
  const sourceDir = item ? item.readmePath.replace(/\/README\.md$/, '') : ''
  return (
    <Layout
      sidebar={<DocsNav />}
      hasToc
      head={
        <ComponentHero
          item={item}
          lead={parts.lead}
          active={item.family ? undefined : 'specs'}
          hasAccessibility={parts.accessibility !== ''}
        />
      }
    >
      {/* A family member has no page of its own, so what it is and how it composes is here. */}
      {item.family && <Readme source={intro} stripChrome />}
      <View as="section" my={4}>
        <Typography variant="h4" as="h2" id="demos" gutterBottom>
          Demos
        </Typography>
        <Typography variant="body1">
          For usage examples, visit the component demo page:{' '}
          <Link href={sectionPath('react', demosPath)} color="primary">
            {demosName}
          </Link>
        </Typography>
      </View>
      <View as="section" my={4}>
        <Typography variant="h4" as="h2" id="import" gutterBottom>
          Import
        </Typography>
        <CodeBlock>
          <code>{importSnippet}</code>
        </CodeBlock>
      </View>
      <Readme source={api} />
      <View as="section" my={4}>
        <Typography variant="h4" as="h2" id="source-code" gutterBottom>
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
