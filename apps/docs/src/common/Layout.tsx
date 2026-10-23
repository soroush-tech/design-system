import { type ReactNode } from 'react'
import { Drawer } from '@soroush.tech/design-system/Drawer'
import { Flex } from '@soroush.tech/design-system/Flex'
import { Typography } from '@soroush.tech/design-system/Typography'
import { View } from '@soroush.tech/design-system/View'
import { NavRail } from 'src/common/NavRail/NavRail'
import { Navbar } from 'src/common/Navbar/Navbar'
import { useSearch } from 'src/common/Search/SearchContext'
import { SearchProvider } from 'src/common/Search/SearchProvider'

export interface LayoutProps {
  children: ReactNode
  /** Section navigation. Renders as a column beside the rail on wide screens and in a drawer on mobile. */
  sidebar?: ReactNode
}

// The mobile navigation drawer's id - the navbar's menu button opens it through popovertarget,
// so it works on the prerendered pages with JavaScript off.
const NAV_DRAWER = 'docs-nav'

function LayoutFrame({ children, sidebar }: Readonly<LayoutProps>) {
  const { open } = useSearch()
  return (
    <Flex flexDirection="row" minHeight="100dvh" width="100%">
      {/* The rail is for wide screens; narrow ones get the top bar and its drawer. */}
      <View display={{ xs: 'none', lg: 'block' }}>
        <NavRail />
      </View>
      <Flex flexDirection="column" flex="1 1 auto" minWidth={0}>
        <View display={{ xs: 'block', lg: 'none' }}>
          <Navbar menuDrawer={sidebar ? NAV_DRAWER : undefined} onSearch={open} />
        </View>
        {sidebar && (
          <Drawer id={NAV_DRAWER} anchor="left">
            <View p={4} width="18rem">
              {sidebar}
            </View>
          </Drawer>
        )}
        <Flex flexDirection="row" flex="1 1 auto" width="100%">
          {sidebar && (
            // A View, not a Flex: Flex's own `display: flex` would override the hidden base.
            <View
              as="aside"
              display={{ xs: 'none', lg: 'block' }}
              width="18.5rem"
              minWidth="18.5rem"
              px={2}
              py={3}
              position="sticky"
              top={0}
              maxHeight="100dvh"
              overflowY="auto"
              style={{ alignSelf: 'flex-start' }}
            >
              {sidebar}
            </View>
          )}
          <Flex as="main" flexDirection="column" flex="1 1 auto" minWidth={0} px={4} py={5}>
            {/* The content reads in a column no wider than 1200px, centred in the room the sidebar leaves. */}
            <View width="100%" maxWidth="1200px" mx="auto">
              {children}
            </View>
          </Flex>
        </Flex>
        <Flex as="footer" justifyContent="center" px={4} py={3}>
          <Typography variant="body2" color="secondary">
            @soroush.tech design system
          </Typography>
        </Flex>
      </Flex>
    </Flex>
  )
}

export function Layout(props: Readonly<LayoutProps>) {
  return (
    <SearchProvider>
      <LayoutFrame {...props} />
    </SearchProvider>
  )
}
