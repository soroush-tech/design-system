import { Typography } from '@soroush.design/react-components/Typography'
import { View } from '@soroush.design/react-components/View'
import { Layout } from 'src/common/Layout'

export default function Page() {
  return (
    <Layout>
      <View as="section" maxWidth="720px">
        <Typography variant="h1" gutterBottom>
          Page not found
        </Typography>
        <Typography variant="body1" color="secondary">
          The page you are looking for does not exist. It may live in a different version of the
          docs, or the address may have changed.
        </Typography>
      </View>
    </Layout>
  )
}
