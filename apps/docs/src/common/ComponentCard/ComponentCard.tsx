import { Card } from '@soroush.tech/design-system/Card'
import { Flex } from '@soroush.tech/design-system/Flex'
import { Link } from '@soroush.tech/design-system/Link'
import { Typography } from '@soroush.tech/design-system/Typography'
import { View } from '@soroush.tech/design-system/View'
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
