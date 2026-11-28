import { Card } from '@gild-ui/react/Card'
import { Flex } from '@gild-ui/react/Flex'
import { Link } from '@gild-ui/react/Link'
import { Typography } from '@gild-ui/react/Typography'
import { View } from '@gild-ui/react/View'
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
