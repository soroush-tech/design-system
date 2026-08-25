import { Link } from '@soroush.tech/design-system/Link'
import { Typography } from '@soroush.tech/design-system/Typography'
import { View } from '@soroush.tech/design-system/View'
import { Layout } from 'src/common/Layout'

export default function Page() {
  return (
    <Layout>
      <View as="section" maxWidth="720px">
        <Typography variant="h1" gutterBottom>
          Build with the @soroush.tech design system
        </Typography>
        <Typography variant="body1" color="secondary" gutterBottom>
          Token-driven React components, a style-prop system, and a markdown companion library.
          Documentation, live demos, and versioned references for every published package.
        </Typography>
        <Typography as="code" variant="body2" fontFamily="mono" gutterBottom>
          npm i @soroush.tech/design-system
        </Typography>
        <Typography variant="body1">
          <Link href="/design-system/" color="primary">
            Browse the design-system docs
          </Link>
        </Typography>
      </View>
    </Layout>
  )
}
