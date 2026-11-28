import type { ReactNode } from 'react'
import { Button } from '@gild-ui/react/Button'
import { Flex } from '@gild-ui/react/Flex'
import { Typography } from '@gild-ui/react/Typography'
import { withIsland } from '../theme/Island'

/** The home page. Its children are the islands of its greeting and its counter. */
function Home({ children }: { readonly children?: ReactNode }) {
  return (
    <Flex gap={2} alignItems="flex-start" px={3} py={4}>
      <Typography variant="h2">My App</Typography>
      <Typography color="secondary">
        An Astro app on Gild UI. Edit src/components/Home.tsx, and make the themes your own in
        src/theme/themes.ts.
      </Typography>
      {children}
      <Flex flexDirection="row" gap={1}>
        <Button href="https://gild-ui.soroush.design">Components</Button>
        <Button href="https://astro.build" variant="outlined">
          Astro
        </Button>
      </Flex>
    </Flex>
  )
}

export default withIsland(Home)
