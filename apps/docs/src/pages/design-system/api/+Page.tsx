import { Link } from '@soroush.tech/design-system/Link'
import { Typography } from '@soroush.tech/design-system/Typography'
import { View } from '@soroush.tech/design-system/View'
import { componentCategories } from 'src/common/nav'
import { sectionPath } from 'src/common/sectionPath'
import { DocsNav } from 'src/common/DocsNav/DocsNav'
import { Layout } from 'src/common/Layout'

export default function Page() {
  return (
    <Layout sidebar={<DocsNav />}>
      <Typography variant="h1" gutterBottom>
        Component API
      </Typography>
      <Typography variant="body1" color="secondary" gutterBottom>
        Each component page documents its full prop surface: component-specific props with their
        token values and defaults, the styled-system prop groups, and forwarded HTML attributes.
      </Typography>
      {componentCategories.map((category) => (
        <View key={category.label} mb={4}>
          <Typography variant="h5" as="h2" gutterBottom>
            {category.label}
          </Typography>
          <View as="ul" m={0} p={0} style={{ listStyle: 'none' }}>
            {category.items.map((item) => (
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
