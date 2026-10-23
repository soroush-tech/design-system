import type { ReactNode } from 'react'
import { AppBar } from '@soroush.tech/design-system/AppBar'
import { Button } from '@soroush.tech/design-system/Button'
import { DrawerToggle } from '@soroush.tech/design-system/Drawer'
import { Flex } from '@soroush.tech/design-system/Flex'
import { Icon } from '@soroush.tech/design-system/Icon'
import { Link } from '@soroush.tech/design-system/Link'
import { Typography } from '@soroush.tech/design-system/Typography'
import { View } from '@soroush.tech/design-system/View'
import { Chip } from '@soroush.tech/lab/Chip'
import { RailGlyph } from 'src/common/NavRail/RailGlyph'
import designSystemPkg from 'packages/design-system/package.json'
import { useThemeMode } from 'src/theme/useThemeMode'

export interface NavbarProps {
  /** The version menu, in place of the plain version chip. */
  versionMenu?: ReactNode
  /** Opens the search; no search button without it. */
  onSearch?: () => void
  /** The id of the mobile navigation drawer the menu button opens; no menu button without it. */
  menuDrawer?: string
}

export function Navbar({ menuDrawer, onSearch, versionMenu }: Readonly<NavbarProps> = {}) {
  const { isDark, toggleTheme } = useThemeMode()
  return (
    <AppBar color="appBar" size="sm" position="sticky" top={0} zIndex={10}>
      <Flex
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        maxWidth="1440px"
        mx="auto"
      >
        <Flex flexDirection="row" alignItems="center" gap={3}>
          {menuDrawer && (
            <View display={{ xs: 'inline-flex', lg: 'none' }}>
              <DrawerToggle
                drawer={menuDrawer}
                variant="text"
                size="sm"
                aria-label="Open navigation"
              >
                <Icon name="menu" />
              </DrawerToggle>
            </View>
          )}
          <Link href="/" color="primary" style={{ textDecoration: 'none' }}>
            <Typography variant="h6" color="primary">
              SOROUSH.DESIGN
            </Typography>
          </Link>
          {versionMenu ?? <Chip>v{designSystemPkg.version}</Chip>}
        </Flex>
        <Flex flexDirection="row" alignItems="center" gap={3}>
          <View display={{ xs: 'none', lg: 'inline-flex' }}>
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
          {onSearch && (
            <Button variant="text" size="sm" onClick={onSearch} aria-label="Search">
              <RailGlyph name="search" size={20} />
            </Button>
          )}
          <Button variant="text" size="sm" onClick={toggleTheme} aria-label="Toggle color scheme">
            {isDark ? 'Light' : 'Dark'}
          </Button>
        </Flex>
      </Flex>
    </AppBar>
  )
}
