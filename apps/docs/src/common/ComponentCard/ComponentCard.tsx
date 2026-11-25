import { Card } from '@soroush.design/react/Card'
import { Flex } from '@soroush.design/react/Flex'
import { Link } from '@soroush.design/react/Link'
import { Typography } from '@soroush.design/react/Typography'
import { View } from '@soroush.design/react/View'
import { sectionPath } from 'src/common/sectionPath'
import { componentPagePath, type ComponentNavItem } from 'src/common/nav'
import { ComponentIllustration } from './ComponentIllustration'

/** One component of the components page: its drawing on a tile, its name under it, a link to its page. */
export function ComponentCard({ item }: Readonly<{ item: ComponentNavItem }>) {
  return (
    <Link href={sectionPath(item.pkg, componentPagePath(item))} underline="none">
      <Card p={0} borderRadius="lg" overflow="hidden">
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
