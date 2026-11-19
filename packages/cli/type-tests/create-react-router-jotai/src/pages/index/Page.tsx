import { Button } from '@soroush.tech/design-system/Button'
import { Flex } from '@soroush.tech/design-system/Flex'
import { Typography } from '@soroush.tech/design-system/Typography'
import { Counter } from './Counter'

export default function Page() {
  return (
    <Flex gap={2} alignItems="flex-start">
      <Typography variant="h2">My App</Typography>
      <Typography color="secondary">
        A React Router app on the design system. Edit src/pages/index/Page.tsx, and make the themes
        your own in src/theme/themes.ts.
      </Typography>
      <Counter />
      <Flex flexDirection="row" gap={1}>
        <Button href="https://docs.soroush.tech">Components</Button>
        <Button href="https://reactrouter.com" variant="outlined">
          React Router
        </Button>
      </Flex>
    </Flex>
  )
}
