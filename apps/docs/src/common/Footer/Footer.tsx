import { styled, get } from '@soroush.tech/design-system'
import { Flex } from '@soroush.tech/design-system/Flex'
import { Grid } from '@soroush.tech/design-system/Grid'
import { Link } from '@soroush.tech/design-system/Link'
import { Typography } from '@soroush.tech/design-system/Typography'
import { View } from '@soroush.tech/design-system/View'
import { alpha } from '@soroush.tech/design-system/utils'
import logoUrl from 'src/assets/soroush.svg'
import { CONTENT_MAX_WIDTH, TOC_ROOM } from 'src/common/layoutSizes'
import { PACKAGES } from 'src/common/packages'
import { sectionPath } from 'src/common/sectionPath'

const SOROUSH = 'https://soroush.tech'

const CONNECTIVITY = [
  { href: 'https://github.com/soroush-tech', label: 'GitHub' },
  { href: 'https://www.npmjs.com/org/soroush.tech', label: 'npm' },
  { href: SOROUSH, label: 'soroush.tech' },
  { href: 'https://www.linkedin.com/in/masoud-soroush-4139b152', label: 'LinkedIn' },
]

// The logo is drawn dark: the theme says how to show it on its ground.
const Logo = styled('img')(({ theme }) => ({
  display: 'block',
  filter: theme.logoFilter,
  transition: 'filter 0.5s',
  '&:hover': { filter: 'none' },
}))

const Heading = styled('h2')(({ theme }) => ({
  margin: 0,
  marginBottom: theme.space[3],
  color: get(theme, 'palette.primary.main'),
  fontFamily: theme.fonts.mono,
  fontSize: `${theme.fontSizes[0]}px`,
  fontWeight: 400,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
}))

const FooterRoot = styled('footer')(({ theme }) => ({
  borderTop: `1px solid ${alpha(get(theme, 'border.default'), 0.4)}`,
}))

const isExternal = (href: string): boolean => href.startsWith('http')

function FooterLinks({
  label,
  links,
}: Readonly<{ label: string; links: Array<{ href: string; label: string }> }>) {
  return (
    <View as="nav" aria-label={label}>
      <Heading>{label}</Heading>
      <View as="ul" m={0} p={0} style={{ listStyle: 'none' }}>
        {links.map((link) => (
          <View as="li" key={link.href} py={0.75}>
            <Link
              href={link.href}
              color="secondary"
              underline="none"
              {...(isExternal(link.href) && { target: '_blank', rel: 'noopener noreferrer' })}
            >
              {link.label}
            </Link>
          </View>
        ))}
      </View>
    </View>
  )
}

/** Where the docs of every package are, the places the work lives, and who is behind it - as M3's, under the content. */
export function Footer() {
  // A package with docs of its own opens them; the others open their source.
  const docs = [
    { href: '/packages/', label: 'All packages' },
    ...PACKAGES.map((entry) => ({
      href: entry.docs ? sectionPath(entry.docs, '/') : entry.github,
      label: entry.name,
    })),
  ]
  return (
    <FooterRoot>
      <View
        width="100%"
        maxWidth={`calc(${CONTENT_MAX_WIDTH} + ${TOC_ROOM})`}
        mx="auto"
        px={4}
        py={6}
      >
        <Grid gridTemplateColumns={{ xs: '1fr', md: '2fr 1fr 1fr' }} gridGap={6}>
          <View>
            <Flex flexDirection="row" alignItems="center" gap={2} mb={3}>
              <Logo src={logoUrl} alt="" width={48} height={48} />
              <Typography as="span" fontSize={1} fontWeight="bold" letterSpacing="tighter">
                SOROUSH.TECH
              </Typography>
            </Flex>
            <Typography variant="caption" color="secondary" lineHeight="relaxed">
              A proprietary system designed for the orchestration of high-performance digital
              environments. Built for speed, scaled for eternity.
            </Typography>
          </View>
          <FooterLinks label="Documentation" links={docs} />
          <FooterLinks label="Connectivity" links={CONNECTIVITY} />
        </Grid>
        <Flex flexDirection="row" flexWrap="wrap" gap={2} mt={5}>
          <Typography variant="caption" color="secondary" fontFamily="mono">
            &copy; 2026 SOROUSH.TECH. ALL RIGHTS RESERVED.
          </Typography>
        </Flex>
      </View>
    </FooterRoot>
  )
}
