import { Card } from '@gild-ui/react/Card'
import { Flex } from '@gild-ui/react/Flex'
import { Link } from '@gild-ui/react/Link'
import { Typography } from '@gild-ui/react/Typography'
import { View } from '@gild-ui/react/View'
import { sectionPath } from 'src/common/sectionPath'
import type { ComponentNavItem } from 'src/common/nav'
import { ComponentIllustration } from './ComponentIllustration'
import { StyleSheet } from '@gild-ui/react/StyleSheet'

const styles = StyleSheet.create({
  link: { textDecoration: 'none' },
  card: { overflow: 'hidden' },
})

/** One component of the components page: its drawing on a tile, its name under it, a link to its page. */
export function ComponentCard({ item }: Readonly<{ item: ComponentNavItem }>) {
  return (
    <Link
      href={sectionPath('design-system', `/components/${item.slug}/`)}
      style={styles.link}
    >
      <Card p={0} borderRadius="lg" style={styles.card}>
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
