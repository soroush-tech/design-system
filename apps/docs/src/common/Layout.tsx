import { type CSSProperties, type ReactNode } from 'react'
import { Drawer } from '@soroush.tech/design-system/Drawer'
import { Flex } from '@soroush.tech/design-system/Flex'
import { Typography } from '@soroush.tech/design-system/Typography'
import { View } from '@soroush.tech/design-system/View'
import { CONTENT_MAX_WIDTH, PANEL_RADIUS, TOC_ROOM, TOC_WIDTH } from 'src/common/layoutSizes'
import { NavRail } from 'src/common/NavRail/NavRail'
import { OnThisPage } from 'src/common/OnThisPage/OnThisPage'
import { VersionMenu } from 'src/common/VersionMenu/VersionMenu'
import { sectionFor } from 'src/common/nav'
import { usePageContext } from 'src/hooks/usePageContext'
import { Navbar } from 'src/common/Navbar/Navbar'
import { useSearch } from 'src/common/Search/SearchContext'
import { SearchProvider } from 'src/common/Search/SearchProvider'

export interface LayoutProps {
  children: ReactNode
  /** Section navigation. Renders as a column beside the rail on wide screens and in a drawer on mobile. */
  sidebar?: ReactNode
  /** Lists the page's sections in a column beside it, on wide screens. */
  hasToc?: boolean
  /** The head of the page, as wide as the room beside the sidebar - wider than the content below it. */
  head?: ReactNode
}

// The mobile navigation drawer's id - the navbar's menu button opens it through popovertarget,
// so it works on the prerendered pages with JavaScript off.
const NAV_DRAWER = 'docs-nav'

function LayoutFrame({ children, sidebar, hasToc, head }: Readonly<LayoutProps>) {
  const { open } = useSearch()
  const { urlPathname } = usePageContext()
  const current = urlPathname || '/'
  return (
    <Flex flexDirection="row" minHeight="100dvh" width="100%">
      {/* The rail is for wide screens; narrow ones get the top bar and its drawer. */}
      <View display={{ xs: 'none', lg: 'block' }}>
        <NavRail />
      </View>
      <Flex flexDirection="column" flex="1 1 auto" minWidth={0}>
        <View display={{ xs: 'block', lg: 'none' }}>
          <Navbar
            menuDrawer={sidebar ? NAV_DRAWER : undefined}
            onSearch={open}
            versionMenu={<VersionMenu pkg={sectionFor(current).pkg} pathname={current} />}
          />
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
            // A View, not a Flex: Flex's own `display: flex` would override the hidden base. The
            // aside is the column that sticks; the panel in it is the sidebar - a ground of its own,
            // with round corners, as M3's, and room around it.
            <View
              as="aside"
              display={{ xs: 'none', lg: 'block' }}
              width="19rem"
              minWidth="19rem"
              py={1.5}
              pr={1}
              position="sticky"
              top={0}
              height="100dvh"
              style={{ alignSelf: 'flex-start' }}
            >
              <View
                height="100%"
                overflowY="auto"
                bg="secondary"
                px={2}
                py={3}
                style={{ borderRadius: PANEL_RADIUS }}
              >
                {sidebar}
              </View>
            </View>
          )}
          <Flex
            as="main"
            flexDirection="column"
            flex="1 1 auto"
            minWidth={0}
            px={4}
            py={5}
            // What the head needs to know to line its tabs up with the content: the room beside it.
            style={{ '--toc-room': hasToc ? TOC_ROOM : '0px' } as CSSProperties}
          >
            {/* The head spans the room the sidebar leaves; the content reads in a column no wider than the grid. */}
            {head}
            {/* The contents sit beside the column, so they stay close to it however wide the window. */}
            <Flex
              flexDirection="row"
              alignItems="stretch"
              width="100%"
              maxWidth={hasToc ? `calc(${CONTENT_MAX_WIDTH} + ${TOC_ROOM})` : CONTENT_MAX_WIDTH}
              mx="auto"
            >
              <View minWidth={0} maxWidth={CONTENT_MAX_WIDTH} style={{ flex: '1 1 0' }}>
                {children}
              </View>
              {hasToc && (
                <View
                  as="aside"
                  aria-label="Contents"
                  display={{ xs: 'none', xl: 'block' }}
                  width={TOC_WIDTH}
                  minWidth={TOC_WIDTH}
                  ml={4}
                >
                  <View
                    position="sticky"
                    top="8.5rem"
                    maxHeight="calc(100dvh - 8.5rem)"
                    overflowY="auto"
                  >
                    <OnThisPage />
                  </View>
                </View>
              )}
            </Flex>
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
