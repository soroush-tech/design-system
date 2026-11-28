import NextLink from 'next/link'
import { Card } from '@gild-ui/react/Card'
import { CircularProgress } from '@gild-ui/react/CircularProgress'
import { Flex } from '@gild-ui/react/Flex'
import { Paper } from '@gild-ui/react/Paper'
import { Skeleton } from '@gild-ui/react/Skeleton'
import { Tab, Tabs } from '@gild-ui/react/Tabs'
import { Typography } from '@gild-ui/react/Typography'
import { View } from '@gild-ui/react/View'
import { Button } from '@gild-ui/react/Button'
import { switchScheme } from './actions'
import { Counter } from './Counter'
import { Later } from './Later'

// A server component page: the static components render here with the theme the app registered,
// and the interactive ones (`Button`, `Tabs`, `Counter`) are client components it renders.
export default function Page() {
  return (
    <View as="main" p={4}>
      <NextLink href="/other" data-testid="to-other">
        Other
      </NextLink>
      <Typography variant="h3" data-testid="title">
        Server components
      </Typography>
      <Paper p={3} mb={3} data-testid="paper">
        <Typography color="primary" data-testid="text">
          Typography, Paper, Card and Skeleton render on the server.
        </Typography>
      </Paper>
      <Card variant="interactive" title="Card" caption="A look from the theme" data-testid="card">
        Its look is a variant of the app's theme.
      </Card>
      <Flex gap={2} my={3} alignItems="center">
        <Skeleton width={96} data-testid="skeleton" />
        <CircularProgress color="brand" data-testid="progress" />
      </Flex>

      <Tabs defaultValue="one" aria-label="Sections" data-testid="tabs">
        <Tab value="one" label="One" />
        <Tab value="two" label="Two" />
      </Tabs>
      <Flex gap={2} mt={3}>
        <Counter />
        <Later />
        <form action={switchScheme}>
          <Button type="submit" variant="outlined" data-testid="switch">
            Switch theme
          </Button>
        </form>
      </Flex>
    </View>
  )
}
