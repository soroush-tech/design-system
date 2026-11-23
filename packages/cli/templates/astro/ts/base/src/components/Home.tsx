import type { ReactNode } from 'react'
import { Button } from '@soroush.design/react/Button'
import { Flex } from '@soroush.design/react/Flex'
import { Typography } from '@soroush.design/react/Typography'
import { withIsland } from '../theme/Island'

// @if ssg
/** The home page. */
// @elif tanstack-query || swr || msw
/** The home page. Its children are the islands of its greeting and its counter. */
// @else
/** The home page. Its child is the island of its counter. */
// @endif
function Home({ children }: { readonly children?: ReactNode }) {
  return (
    <Flex gap={2} alignItems="flex-start" px={3} py={4}>
      <Typography variant="h2">__TITLE__</Typography>
      <Typography color="secondary">
        An Astro app on the design system. Edit src/components/Home.tsx, and make the themes your
        own in src/theme/themes.ts.
      </Typography>
      {children}
      <Flex flexDirection="row" gap={1}>
        <Button href="https://docs.soroush.design">Components</Button>
        <Button href="https://astro.build" variant="outlined">
          Astro
        </Button>
      </Flex>
    </Flex>
  )
}

export default withIsland(Home)
