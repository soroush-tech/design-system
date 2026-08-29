import { Link } from '@soroush.tech/design-system/Link'
import { Typography } from '@soroush.tech/design-system/Typography'
import { View } from '@soroush.tech/design-system/View'
import { sectionFor } from 'src/common/nav'
import { VersionSwitcher } from 'src/common/VersionSwitcher/VersionSwitcher'
import { usePageContext } from 'src/hooks/usePageContext'

const normalize = (path: string): string => (path.endsWith('/') ? path : `${path}/`)

/** The current section's grouped sidebar navigation, with its version switcher on top. */
export function DocsNav() {
  const { urlPathname } = usePageContext()
  const current = normalize(urlPathname || '/')
  const section = sectionFor(current)
  return (
    <View as="nav" aria-label={section.label}>
      <View mb={3}>
        <VersionSwitcher pkg={section.pkg} pathname={current} />
      </View>
      {section.groups.map((group) => (
        <View key={group.label} mb={3}>
          <Typography variant="caption" color="secondary" fontWeight="bold">
            {group.label}
          </Typography>
          <View as="ul" m={0} p={0} style={{ listStyle: 'none' }}>
            {group.items.map((item) => {
              const isActive = current === item.href
              return (
                <View as="li" key={item.href} py={0.5}>
                  <Link
                    href={item.href}
                    color={isActive ? 'primary' : 'secondary'}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                </View>
              )
            })}
          </View>
        </View>
      ))}
    </View>
  )
}
