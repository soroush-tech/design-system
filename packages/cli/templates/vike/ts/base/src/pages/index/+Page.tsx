import { Button } from '@gild-ui/react/Button'
import { Flex } from '@gild-ui/react/Flex'
import { Typography } from '@gild-ui/react/Typography'
// @if !ssg
import { Counter } from './Counter'
// @endif
// @if tanstack-query || swr || msw
import { Greeting } from './Greeting'
// @endif

export default function Page() {
  return (
    <Flex gap={2} alignItems="flex-start">
      <Typography variant="h2">__TITLE__</Typography>
      <Typography color="secondary">
        A Vike app on Gild UI. Edit src/pages/index/+Page.tsx, and make the themes your own in
        src/theme/themes.ts.
      </Typography>
      {/* @if tanstack-query || swr || msw */}
      <Greeting />
      {/* @endif */}
      {/* @if !ssg */}
      <Counter />
      {/* @endif */}
      <Flex flexDirection="row" gap={1}>
        <Button href="https://gild-ui.soroush.design">Components</Button>
        <Button href="https://vike.dev" variant="outlined">
          Vike
        </Button>
      </Flex>
    </Flex>
  )
}
