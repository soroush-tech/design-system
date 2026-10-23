import { Button } from '@soroush.tech/design-system/Button'
import { Card } from '@soroush.tech/design-system/Card'
import { Flex } from '@soroush.tech/design-system/Flex'
import { Grid } from '@soroush.tech/design-system/Grid'
import { Link } from '@soroush.tech/design-system/Link'
import { Typography } from '@soroush.tech/design-system/Typography'
import { View } from '@soroush.tech/design-system/View'
import { ComponentIllustration } from 'src/common/ComponentCard/ComponentIllustration'
import { Layout } from 'src/common/Layout'
import { PACKAGE_VERSIONS } from 'src/common/packageVersions'
import { sectionPath } from 'src/common/sectionPath'

// What the library stands for, in four lines - each a card under the hero.
const FEATURES = [
  {
    title: 'Tokens first',
    text: 'Every color, space, radius and motion is a theme token. One theme object restyles the whole library, in light and in dark.',
  },
  {
    title: 'Accessible by default',
    text: "Keyboard use, focus, roles and labels are built in, and written down on each component's Accessibility tab.",
  },
  {
    title: 'Customize any part',
    text: 'Every component names its slots. Change one through the theme, or hand it a part of your own, without forking.',
  },
  {
    title: 'Made for tools and AI',
    text: 'A component catalog, an MCP server and an llms.txt describe the whole library, so tools and assistants place components correctly.',
  },
]

const PACKAGES = [
  {
    pkg: 'design-system',
    name: 'Design System',
    text: 'The components: layout, inputs, feedback, navigation and overlays, with a theme to match your brand.',
  },
  {
    pkg: 'markdown',
    name: 'Markdown',
    text: 'The companion library: render markdown, edit it live, highlight code and draw diagrams with the same tokens.',
  },
  {
    pkg: 'styled-system',
    name: 'Styled System',
    text: 'The style-prop engine under it all: responsive props, scales and variants for any component of yours.',
  },
] as const

// A few of the components, drawn - a first look at what the library has.
const SHOWCASE = ['Button', 'Tabs', 'Autocomplete', 'RangeInput'] as const

export default function Page() {
  return (
    <Layout>
      <View as="section" mb={6}>
        <Flex flexDirection="row" flexWrap="wrap" gap={5} alignItems="center">
          <Flex flexDirection="column" gap={3} flex="1 1 24rem" minWidth={0}>
            <Typography variant="caption" color="primary" fontWeight="bold">
              @soroush.tech
            </Typography>
            <Typography variant="h1" as="h1">
              A design system made of tokens, not guesses
            </Typography>
            <Typography variant="body1" color="secondary">
              Token-driven React components, a style-prop system and a markdown companion library -
              accessible by default, themeable down to a single slot, and documented with live demos
              for every published version.
            </Typography>
            <Flex flexDirection="row" flexWrap="wrap" gap={2}>
              <Button
                href={sectionPath('design-system', '/getting-started/installation/')}
                variant="contained"
              >
                Get started
              </Button>
              <Button href={sectionPath('design-system', '/components/')} variant="outlined">
                Browse components
              </Button>
            </Flex>
            <Typography as="code" variant="body2" fontFamily="mono">
              npm i @soroush.tech/design-system
            </Typography>
          </Flex>
          <Grid
            gridTemplateColumns="1fr 1fr"
            gridGap={2}
            style={{ flex: '1 1 22rem', maxWidth: '34rem' }}
          >
            {SHOWCASE.map((name) => (
              <Flex
                key={name}
                bg="secondary"
                alignItems="center"
                justifyContent="center"
                height="9rem"
                borderRadius="lg"
                p={1}
              >
                <ComponentIllustration name={name} />
              </Flex>
            ))}
          </Grid>
        </Flex>
      </View>

      <View as="section" mb={6} aria-labelledby="home-features">
        <Typography variant="h4" as="h2" id="home-features" gutterBottom>
          Why it holds together
        </Typography>
        <Grid gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gridGap={3}>
          {FEATURES.map((feature) => (
            <Card key={feature.title} p={3}>
              <Typography variant="h6" as="h3" gutterBottom>
                {feature.title}
              </Typography>
              <Typography variant="body2" color="secondary">
                {feature.text}
              </Typography>
            </Card>
          ))}
        </Grid>
      </View>

      <View as="section" mb={4} aria-labelledby="home-packages">
        <Typography variant="h4" as="h2" id="home-packages" gutterBottom>
          Three packages
        </Typography>
        <Grid gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr 1fr' }} gridGap={3}>
          {PACKAGES.map(({ pkg, name, text }) => (
            <Link
              key={pkg}
              href={sectionPath(pkg, '/')}
              style={{ textDecoration: 'none' }}
              aria-label={`${name} documentation`}
            >
              <Card p={3} style={{ height: '100%' }}>
                <Typography variant="h6" as="h3" gutterBottom>
                  {name}
                </Typography>
                <Typography variant="body2" color="secondary" gutterBottom>
                  {text}
                </Typography>
                <Typography variant="caption" color="primary">
                  v{PACKAGE_VERSIONS[pkg]}
                </Typography>
              </Card>
            </Link>
          ))}
        </Grid>
      </View>
    </Layout>
  )
}
