import { Button } from '@gild-ui/react/Button'
import { Flex } from '@gild-ui/react/Flex'
import { Typography } from '@gild-ui/react/Typography'
import { Counter } from './Counter'
import { Greeting } from './Greeting'

export default function Page() {
  return (
    <Flex gap={2} alignItems="flex-start">
      <Typography variant="h2">My App</Typography>
      <Typography color="secondary">
        A React Router app on Gild UI. Edit src/pages/index/Page.tsx, and make the themes your own
        in src/theme/themes.ts.
      </Typography>
      <Greeting />
      <Counter />
      <Flex flexDirection="row" gap={1}>
        <Button href="https://gild-ui.soroush.design">Components</Button>
        <Button href="https://reactrouter.com" variant="outlined">
          React Router
        </Button>
      </Flex>
    </Flex>
  )
}
