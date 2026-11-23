import { Flex } from '@soroush.design/react-components/Flex'
import { Typography } from '@soroush.design/react-components/Typography'
import { withIsland } from '../theme/Island'

function About() {
  return (
    <Flex gap={2} px={3} py={4}>
      <Typography variant="h2">About</Typography>
      <Typography color="secondary">
        {/* @if ssr */}
        A second page: the server renders it, with its styles, and the app moves to it without a
        reload.
        {/* @else */}
        A second page: it is HTML with its styles from the build, and a link loads it as a new page.
        {/* @endif */}
      </Typography>
    </Flex>
  )
}

export default withIsland(About)
