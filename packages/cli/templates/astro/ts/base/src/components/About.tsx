import { Flex } from '@soroush.tech/design-system/Flex'
import { Typography } from '@soroush.tech/design-system/Typography'
import { Theme } from '../theme/Theme'

export default function About() {
  return (
    <Theme>
      <Flex gap={2} px={3} py={4}>
        <Typography variant="h2">About</Typography>
        <Typography color="secondary">
          {/* @if ssr */}
          A second page: the server renders it, with its styles, and the app moves to it without a
          reload.
          {/* @elif ssg */}
          A second page: it is HTML with its styles from the build, and a link loads it as a new
          page.
          {/* @else */}
          A second page: it is HTML with its styles from the build, and the app moves to it without
          a reload.
          {/* @endif */}
        </Typography>
      </Flex>
    </Theme>
  )
}
