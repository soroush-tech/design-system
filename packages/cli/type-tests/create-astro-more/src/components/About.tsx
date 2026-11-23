import { Flex } from '@soroush.design/react/Flex'
import { Typography } from '@soroush.design/react/Typography'
import { withIsland } from '../theme/Island'

function About() {
  return (
    <Flex gap={2} px={3} py={4}>
      <Typography variant="h2">About</Typography>
      <Typography color="secondary">
        A second page: the server renders it, with its styles, and the app moves to it without a
        reload.
      </Typography>
    </Flex>
  )
}

export default withIsland(About)
