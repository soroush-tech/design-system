import { Flex } from '@soroush.tech/design-system/Flex'
import { Typography } from '@soroush.tech/design-system/Typography'

export default function Page() {
  return (
    <Flex gap={2}>
      <Typography variant="h2">About</Typography>
      <Typography color="secondary">
        A second page: it is HTML with its styles from the build, and the app moves to it without a
        reload.
      </Typography>
    </Flex>
  )
}
