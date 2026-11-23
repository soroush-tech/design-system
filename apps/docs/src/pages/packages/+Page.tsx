import { Card } from '@soroush.design/react/Card'
import { Flex } from '@soroush.design/react/Flex'
import { Grid } from '@soroush.design/react/Grid'
import { Link } from '@soroush.design/react/Link'
import { Typography } from '@soroush.design/react/Typography'
import { DocsNav } from 'src/common/DocsNav/DocsNav'
import { Layout } from 'src/common/Layout'
import { PACKAGES } from 'src/common/packages'
import { sectionPath } from 'src/common/sectionPath'

export default function Page() {
  return (
    <Layout sidebar={<DocsNav />} hasToc>
      <Typography variant="h1" gutterBottom>
        Packages
      </Typography>
      <Typography variant="body1" color="secondary" gutterBottom>
        What @soroush.tech publishes: the design system and its two companions have docs here; the
        MCP server and the UI spec are on npm and GitHub.
      </Typography>
      <Grid gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gridGap={3} mt={3}>
        {PACKAGES.map((entry) => (
          <Card key={entry.id} p={3} borderRadius="lg">
            <Flex flexDirection="row" alignItems="baseline" justifyContent="space-between" gap={2}>
              <Typography variant="h5" as="h2" id={entry.id}>
                {entry.name}
              </Typography>
              <Typography variant="caption" color="secondary">
                v{entry.version}
              </Typography>
            </Flex>
            <Typography variant="body2" color="secondary" gutterBottom>
              {entry.description}
            </Typography>
            <Flex flexDirection="row" flexWrap="wrap" gap={2}>
              <Link href={sectionPath(entry.docs, '/')} color="primary">
                Docs
              </Link>
              <Link href={entry.npm} color="primary" target="_blank" rel="noopener noreferrer">
                npm
              </Link>
              <Link href={entry.github} color="primary" target="_blank" rel="noopener noreferrer">
                Source
              </Link>
            </Flex>
          </Card>
        ))}
      </Grid>
    </Layout>
  )
}
