import NextLink from 'next/link'
import { Paper } from '@gild-ui/react/Paper'
import { Typography } from '@gild-ui/react/Typography'
import { View } from '@gild-ui/react/View'

export default function OtherPage() {
  return (
    <View as="main" p={4}>
      <Typography variant="h3" data-testid="other-title">
        Other page
      </Typography>
      <Paper p={3} data-testid="other-paper">
        <Typography color="primary">Another server component page.</Typography>
      </Paper>
      <NextLink href="/" data-testid="to-home">
        Home
      </NextLink>
    </View>
  )
}
