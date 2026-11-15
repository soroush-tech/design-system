import { Button } from '@soroush.tech/design-system/Button'
import { Flex } from '@soroush.tech/design-system/Flex'
import { Typography } from '@soroush.tech/design-system/Typography'
import { Theme } from '../theme/Theme'
import { Counter } from './Counter'

export default function Home() {
  return (
    <Theme>
      <Flex gap={2} alignItems="flex-start" px={3} py={4}>
        <Typography variant="h2">My App</Typography>
        <Typography color="secondary">
          An Astro app on the design system. Edit src/components/Home.tsx, and make the themes your
          own in src/theme/themes.ts.
        </Typography>
        <Counter />
        <Flex flexDirection="row" gap={1}>
          <Button href="https://docs.soroush.tech">Components</Button>
          <Button href="https://astro.build" variant="outlined">
            Astro
          </Button>
        </Flex>
      </Flex>
    </Theme>
  )
}
