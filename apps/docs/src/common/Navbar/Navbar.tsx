import type { ReactNode } from 'react'
import { AppBar } from '@soroush.design/react/AppBar'
import { Button } from '@soroush.design/react/Button'
import { DrawerToggle } from '@soroush.design/react/Drawer'
import { Flex } from '@soroush.design/react/Flex'
import { Icon } from '@soroush.design/react/Icon'
import { Link } from '@soroush.design/react/Link'
import { Typography } from '@soroush.design/react/Typography'
import { View } from '@soroush.design/react/View'
import { Chip } from '@soroush.design/lab/Chip'
import { RailGlyph } from 'src/common/NavRail/RailGlyph'
import { PACKAGE_VERSIONS } from 'src/common/packageVersions'
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
          {versionMenu ?? <Chip>v{PACKAGE_VERSIONS.react}</Chip>}
        </Flex>
        <Flex flexDirection="row" alignItems="center" gap={3}>
          <View display={{ xs: 'none', lg: 'inline-flex' }}>
            <Flex flexDirection="row" gap={3}>
              <Link href="/react/" color="secondary">
                Design System
              </Link>
              <Link href="/react/markdown/" color="secondary">
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
