import { Card } from '@soroush.design/react-components/Card'
import { Flex } from '@soroush.design/react-components/Flex'
import { Link } from '@soroush.design/react-components/Link'
import { Typography } from '@soroush.design/react-components/Typography'
import { View } from '@soroush.design/react-components/View'
import { sectionPath } from 'src/common/sectionPath'
import type { ComponentNavItem } from 'src/common/nav'
import { ComponentIllustration } from './ComponentIllustration'

/** One component of the components page: its drawing on a tile, its name under it, a link to its page. */
export function ComponentCard({ item }: Readonly<{ item: ComponentNavItem }>) {
  return (
    <Link
      href={sectionPath('design-system', `/components/${item.slug}/`)}
      style={{ textDecoration: 'none' }}
    >
      <Card p={0} borderRadius="lg" style={{ overflow: 'hidden' }}>
        <Flex bg="secondary" alignItems="center" justifyContent="center" height="184px" p={1}>
          <ComponentIllustration name={item.name} />
        </Flex>
        <View p={2}>
          <Typography variant="subtitle1" color="initial">
            {item.name}
          </Typography>
        </View>
      </Card>
    </Link>
  )
}
