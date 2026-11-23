import { Flex } from '@soroush.design/react-components/Flex'
import { Typography } from '@soroush.design/react-components/Typography'

export default function Page() {
  return (
    <Flex gap={2}>
      <Typography variant="h2">About</Typography>
      <Typography color="secondary">
        A second page: it is HTML with its styles from the build, and a link loads it as a new page.
      </Typography>
    </Flex>
  )
}
