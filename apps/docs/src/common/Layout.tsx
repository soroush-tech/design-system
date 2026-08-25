import { useState, type ReactNode } from 'react'
import { Drawer } from '@soroush.tech/design-system/Drawer'
import { Flex } from '@soroush.tech/design-system/Flex'
import { Typography } from '@soroush.tech/design-system/Typography'
import { View } from '@soroush.tech/design-system/View'
import { Navbar } from 'src/common/Navbar/Navbar'

export interface LayoutProps {
  children: ReactNode
  /** Section navigation. Renders as a left column on wide screens and in a drawer on mobile. */
  sidebar?: ReactNode
}

export function Layout({ children, sidebar }: Readonly<LayoutProps>) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  return (
    <Flex flexDirection="column" minHeight="100dvh">
      <Navbar onMenuClick={sidebar ? () => setIsDrawerOpen(true) : undefined} />
      {sidebar && (
        <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} anchor="left">
          <View p={4} width="16rem">
            {sidebar}
          </View>
        </Drawer>
      )}
      <Flex flexDirection="row" flex="1 1 auto" width="100%">
        {sidebar && (
          <Flex
            as="aside"
            flexDirection="column"
            display={['none', 'none', 'block']}
            width="16rem"
            flex="0 0 auto"
            px={4}
            py={5}
            borderRight="1px solid"
            borderColor="light"
          >
            {sidebar}
          </Flex>
        )}
        <Flex as="main" flexDirection="column" flex="1 1 auto" minWidth={0} px={4} py={5}>
          {children}
        </Flex>
      </Flex>
      <Flex as="footer" justifyContent="center" px={4} py={3}>
        <Typography variant="body2" color="secondary">
          @soroush.tech design system
        </Typography>
      </Flex>
    </Flex>
  )
}
