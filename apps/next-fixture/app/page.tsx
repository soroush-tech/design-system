import { Card } from '@soroush.design/react/Card'
import { CircularProgress } from '@soroush.design/react/CircularProgress'
import { Flex } from '@soroush.design/react/Flex'
import { Paper } from '@soroush.design/react/Paper'
import { Skeleton } from '@soroush.design/react/Skeleton'
import { Tab, Tabs } from '@soroush.design/react/Tabs'
import { Typography } from '@soroush.design/react/Typography'
import { View } from '@soroush.design/react/View'
import { Button } from '@soroush.design/react/Button'
import { switchScheme } from './actions'
import { Counter } from './Counter'

// A server component page: the static components render here with the theme the app registered,
// and the interactive ones (`Button`, `Tabs`, `Counter`) are client components it renders.
export default function Page() {
  return (
    <View as="main" p={4}>
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
        <form action={switchScheme}>
          <Button type="submit" variant="outlined" data-testid="switch">
            Switch theme
          </Button>
        </form>
      </Flex>
    </View>
  )
}
