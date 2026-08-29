import { AppBar } from '@soroush.tech/design-system/AppBar'
import { Button } from '@soroush.tech/design-system/Button'
import { Flex } from '@soroush.tech/design-system/Flex'
import { Icon } from '@soroush.tech/design-system/Icon'
import { Link } from '@soroush.tech/design-system/Link'
import { Typography } from '@soroush.tech/design-system/Typography'
import { View } from '@soroush.tech/design-system/View'
import { Chip } from '@soroush.tech/lab/Chip'
import designSystemPkg from 'packages/design-system/package.json'
import { useThemeMode } from 'src/theme/useThemeMode'

export interface NavbarProps {
  /** Opens the mobile navigation drawer; the menu button only renders when provided. */
  onMenuClick?: () => void
}

export function Navbar({ onMenuClick }: Readonly<NavbarProps> = {}) {
  const { isDark, toggleTheme } = useThemeMode()
  return (
    <AppBar color="appBar" size="sm" position="sticky" top={0} zIndex={10}>
      <Flex alignItems="center" justifyContent="space-between" maxWidth="1440px" mx="auto">
        <Flex alignItems="center" gap={3}>
          {onMenuClick && (
            <View display={['inline-flex', 'inline-flex', 'none']}>
              <Button variant="text" size="sm" aria-label="Open navigation" onClick={onMenuClick}>
                <Icon name="menu" />
              </Button>
            </View>
          )}
          <Link href="/" color="primary" style={{ textDecoration: 'none' }}>
            <Typography variant="h6" color="primary">
              SOROUSH.DESIGN
            </Typography>
          </Link>
          <Chip>v{designSystemPkg.version}</Chip>
        </Flex>
        <Flex alignItems="center" gap={3}>
          <View display={['none', 'none', 'inline-flex']}>
            <Flex flexDirection="row" gap={3}>
              <Link href="/design-system/" color="secondary">
                Design System
              </Link>
              <Link href="/markdown/" color="secondary">
                Markdown
              </Link>
              <Link href="/styled-system/" color="secondary">
                Styled System
              </Link>
            </Flex>
          </View>
          <Button variant="text" size="sm" onClick={toggleTheme} aria-label="Toggle color scheme">
            {isDark ? 'Light' : 'Dark'}
          </Button>
        </Flex>
      </Flex>
    </AppBar>
  )
}
