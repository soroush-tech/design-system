import { Card } from '@soroush.tech/design-system/Card'
import { Grid } from '@soroush.tech/design-system/Grid'
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
        Components
      </Typography>
      {componentCategories.map((category) => (
        <View key={category.label} mb={5}>
          <Typography variant="h4" as="h2" gutterBottom>
            {category.label}
          </Typography>
          <Grid gridTemplateColumns={['1fr', '1fr 1fr', '1fr 1fr 1fr']} gridGap={3}>
            {category.items.map((item) => (
              <Link
                key={item.slug}
                href={sectionPath('design-system', `/components/${item.slug}/`)}
                style={{ textDecoration: 'none' }}
              >
                <Card p={3}>
                  <Typography variant="h6" color="primary">
                    {item.name}
                  </Typography>
                </Card>
              </Link>
            ))}
          </Grid>
        </View>
      ))}
    </Layout>
  )
}
