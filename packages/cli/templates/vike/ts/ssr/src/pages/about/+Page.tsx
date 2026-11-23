import { Flex } from '@soroush.design/react/Flex'
import { Typography } from '@soroush.design/react/Typography'

export default function Page() {
  return (
    <Flex gap={2}>
      <Typography variant="h2">About</Typography>
      <Typography color="secondary">
        A second page: the server renders it, with its styles, and the app moves to it without a
        reload.
      </Typography>
    </Flex>
  )
}
