import { alpha, styled } from '@gild-ui/react'
import { get } from '@soroush.tech/styled-system'
import { Flex } from '@gild-ui/react/Flex'
import { Grid } from '@gild-ui/react/Grid'
import { Link } from '@gild-ui/react/Link'
import { Typography } from '@gild-ui/react/Typography'
import { View } from '@gild-ui/react/View'
import { PlainList } from 'src/common/PlainList/PlainList'
import logoUrl from 'src/assets/soroush.svg'
import { CONTENT_MAX_WIDTH, TOC_ROOM } from 'src/common/layoutSizes'
import { PACKAGES } from 'src/common/packages'
import { sectionPath } from 'src/common/sectionPath'

const SOROUSH = 'https://soroush.tech'

const CONNECTIVITY = [
  { href: 'https://github.com/soroush-tech', label: 'GitHub' },
  { href: 'https://www.npmjs.com/org/soroush.tech', label: 'npm' },
  { href: SOROUSH, label: 'soroush.tech' },
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
  fontFamily: 'inherit',
  fontSize: theme.fontSizes[0],
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
      <PlainList as="ul" m={0} p={0}>
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
      </PlainList>
    </View>
  )
}

/** Where the docs of every package are, the places the work lives, and who is behind it - as M3's, under the content. */
export function Footer() {
  const docs = [
    { href: '/packages/', label: 'All packages' },
    ...PACKAGES.map((entry) => ({
      href: sectionPath(entry.docs, '/'),
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
        <Grid gridTemplateColumns={{ xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' }} gridGap={6}>
          <View>
            <Flex flexDirection="row" alignItems="center" gap={2} mb={3}>
              <Logo src={logoUrl} alt="" width={48} height={48} />
              <Typography as="span" fontSize={1} fontWeight="bold" letterSpacing="tighter">
                SOROUSH.TECH
              </Typography>
            </Flex>
            <Typography variant="caption" color="secondary" lineHeight="relaxed" maxWidth="22rem">
              A proprietary system designed for the orchestration of high-performance digital
              environments. Built for speed, scaled for eternity.
            </Typography>
          </View>
          <FooterLinks label="Documentation" links={docs} />
          <FooterLinks label="Connectivity" links={CONNECTIVITY} />
        </Grid>
        <Flex flexDirection="row" flexWrap="wrap" gap={2} mt={5}>
          <Typography variant="caption" color="secondary">
            &copy; 2026 SOROUSH.TECH. ALL RIGHTS RESERVED.
          </Typography>
        </Flex>
      </View>
    </FooterRoot>
  )
}
