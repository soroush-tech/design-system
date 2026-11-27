import { Grid } from '@soroush.tech/design-system/Grid'
import { Typography } from '@soroush.tech/design-system/Typography'
import { View } from '@soroush.tech/design-system/View'
import { componentCategories, kebabCase } from 'src/common/nav'
import { ComponentCard } from 'src/common/ComponentCard/ComponentCard'
import { DocsNav } from 'src/common/DocsNav/DocsNav'
import { Layout } from 'src/common/Layout'

export default function Page() {
  return (
    <Layout sidebar={<DocsNav />} hasToc>
      <Typography variant="h1" gutterBottom>
        Components
      </Typography>
      {componentCategories.map((category) => (
        <View key={category.label} mb={5}>
          <Typography variant="h4" as="h2" id={kebabCase(category.label)} gutterBottom>
            {category.label}
          </Typography>
          <Grid gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr' }} gridGap={3}>
            {category.items.map((item) => (
              <ComponentCard key={item.slug} item={item} />
            ))}
          </Grid>
        </View>
      ))}
    </Layout>
  )
}
