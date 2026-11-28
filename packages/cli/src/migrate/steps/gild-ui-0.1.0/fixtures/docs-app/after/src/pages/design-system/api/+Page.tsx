import { Link } from '@gild-ui/react/Link'
import { Typography } from '@gild-ui/react/Typography'
import { View } from '@gild-ui/react/View'
import { componentCategories, kebabCase, membersOf } from 'src/common/nav'
import { sectionPath } from 'src/common/sectionPath'
import { DocsNav } from 'src/common/DocsNav/DocsNav'
import { Layout } from 'src/common/Layout'
import { StyleSheet } from '@gild-ui/react/StyleSheet'

const styles = StyleSheet.create({
  view: { listStyle: 'none' },
})

export default function Page() {
  return (
    <Layout sidebar={<DocsNav />} hasToc>
      <Typography variant="h1" gutterBottom>
        Component API
      </Typography>
      <Typography variant="body1" color="secondary" gutterBottom>
        Each component page documents its full prop surface: component-specific props with their
        token values and defaults, the styled-system prop groups, and forwarded HTML attributes.
      </Typography>
      {componentCategories.map((category) => (
        <View key={category.label} mb={4}>
          <Typography variant="h5" as="h2" id={kebabCase(category.label)} gutterBottom>
            {category.label}
          </Typography>
          <View as="ul" m={0} p={0} style={styles.view}>
            {category.items
              .flatMap((item) => [item, ...membersOf(item)])
              .map((item) => (
                <View as="li" key={item.slug} py={0.5}>
                  <Link href={sectionPath('design-system', `/api/${item.slug}/`)} color="secondary">
                    {item.name} API
                  </Link>
                </View>
              ))}
          </View>
        </View>
      ))}
    </Layout>
  )
}
