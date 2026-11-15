import { Flex } from '@soroush.tech/design-system/Flex'
import { Typography } from '@soroush.tech/design-system/Typography'
import { Theme } from '../theme/Theme'

export default function About() {
  return (
    <Theme>
      <Flex gap={2} px={3} py={4}>
        <Typography variant="h2">About</Typography>
        <Typography color="secondary">
          A second page: it is HTML with its styles from the build, and a link loads it as a new
          page.
        </Typography>
      </Flex>
    </Theme>
  )
}
