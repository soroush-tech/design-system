import { Button } from '@soroush.tech/design-system/Button'
import { Flex } from '@soroush.tech/design-system/Flex'
import { Link } from '@soroush.tech/design-system/Link'
import { Typography } from '@soroush.tech/design-system/Typography'
import { View } from '@soroush.tech/design-system/View'
import { useDispatch, useSelector } from 'react-redux'
import { schemeChanged } from '../state/store'
import { Providers } from '../theme/Providers'
/**
 * The frame every page renders in. The app's providers live here, in the app itself, so the
 * scheme, held in src/state/store.ts, can switch the theme.
 */
export default function Layout({ children }) {
  const scheme = useSelector((state) => state.scheme)
  const dispatch = useDispatch()
  const setScheme = (next) => dispatch(schemeChanged(next))
  const otherScheme = scheme === 'light' ? 'dark' : 'light'
  return (
    <Providers scheme={scheme}>
      <Flex
        as="header"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        gap={2}
        px={3}
        py={2}
        bg="paper"
      >
        <Typography variant="h6" as="span">
          My App
        </Typography>
        <Flex as="nav" flexDirection="row" alignItems="center" gap={2}>
          <Link href="/" underline="hover">
            Home
          </Link>
          <Link href="/about" underline="hover">
            About
          </Link>
          <Link href="/items" underline="hover">
            Items
          </Link>
          <Link href="/form" underline="hover">
            Form
          </Link>
          <Button size="sm" variant="outlined" onClick={() => setScheme(otherScheme)}>
            {otherScheme}
          </Button>
        </Flex>
      </Flex>
      <View as="main" px={3} py={4}>
        {children}
      </View>
    </Providers>
  )
}
