import { Button } from '@soroush.design/react/Button'
import { Flex } from '@soroush.design/react/Flex'
import { Typography } from '@soroush.design/react/Typography'
import { Counter } from './Counter'
import { Greeting } from './Greeting'

export default function Page() {
  return (
    <Flex gap={2} alignItems="flex-start">
      <Typography variant="h2">My App</Typography>
      <Typography color="secondary">
        A Vike app on the design system. Edit src/pages/index/+Page.tsx, and make the themes your
        own in src/theme/themes.ts.
      </Typography>
      <Greeting />
      <Counter />
      <Flex flexDirection="row" gap={1}>
        <Button href="https://docs.soroush.design">Components</Button>
        <Button href="https://vike.dev" variant="outlined">
          Vike
        </Button>
      </Flex>
    </Flex>
  )
}
