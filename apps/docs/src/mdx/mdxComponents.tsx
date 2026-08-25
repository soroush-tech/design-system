import type { MDXComponents } from 'mdx/types'
import { Checkbox } from '@soroush.tech/design-system/Checkbox'
import { Image } from '@soroush.tech/design-system/Image'
import { Link } from '@soroush.tech/design-system/Link'
import { Quote } from '@soroush.tech/design-system/Quote'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@soroush.tech/design-system/Table'
import { Typography } from '@soroush.tech/design-system/Typography'
import { View } from '@soroush.tech/design-system/View'
import { CodeBlock } from '@soroush.tech/markdown/CodeBlock'
import { MdxReadme } from './MdxReadme'

/**
 * Element map for MDX content - mirrors the markdown package's Preview map, so `.mdx`
 * pages and runtime-rendered `.md` files produce the same design-system output.
 * `Readme` (here) and `StoryDemo` (on the components route) are injected so content
 * files never import anything themselves.
 */
export const mdxComponents: MDXComponents = {
  h1: (props) => <Typography mt={2} variant="h1" color="primary" gutterBottom {...props} />,
  h2: (props) => <Typography mt={2} variant="h2" color="primary" gutterBottom {...props} />,
  h3: (props) => <Typography mt={2} variant="h3" color="primary" gutterBottom {...props} />,
  h4: (props) => <Typography mt={2} variant="h4" gutterBottom {...props} />,
  h5: (props) => <Typography mt={2} variant="h5" gutterBottom {...props} />,
  h6: (props) => <Typography mt={2} variant="h6" gutterBottom {...props} />,
  p: (props) => (
    <Typography variant="body1" color="secondary" mb={2} lineHeight="relaxed" {...props} />
  ),
  a: ({ href, children }) => (
    <Link href={href} underline="hover">
      {children}
    </Link>
  ),
  strong: (props) => <Typography as="strong" variant="inherit" fontWeight="extraBold" {...props} />,
  em: (props) => <Typography as="em" variant="inherit" fontStyle="italic" {...props} />,
  ul: (props) => <View as="ul" pl={3} mb={2} {...props} />,
  ol: (props) => <View as="ol" pl={3} mb={2} {...props} />,
  li: ({ className, ...props }) => (
    <Typography
      as="li"
      color="secondary"
      lineHeight="base"
      variant="body1"
      gutterBottom
      // GFM task-list items carry their own checkbox, so drop the list marker.
      style={className?.includes('task-list-item') ? { listStyleType: 'none' } : undefined}
      className={className}
      {...props}
    />
  ),
  input: ({ checked }) => (
    <Checkbox
      checked={Boolean(checked)}
      disabled
      color="primary"
      size="sm"
      aria-label="Task item"
      mr={1}
    />
  ),
  blockquote: (props) => <Quote as="blockquote" pl={3} py={1} my={2} {...props} />,
  code: ({ className, children }) => (
    <Typography
      as="code"
      className={className}
      color="initial"
      variant="inherit"
      fontFamily="mono"
      display={className?.includes('language-') ? 'block' : 'inline'}
      bg={className?.includes('language-') ? 'transparent' : 'paper'}
      px={className?.includes('language-') ? 0 : 1}
      borderRadius="sm"
    >
      {children}
    </Typography>
  ),
  pre: (props) => <CodeBlock {...props} />,
  table: (props) => (
    <TableContainer my={2}>
      <Table {...props} />
    </TableContainer>
  ),
  thead: (props) => <TableHead {...props} />,
  tbody: (props) => <TableBody {...props} />,
  tr: (props) => <TableRow {...props} />,
  th: (props) => <TableCell as="th" {...props} />,
  td: (props) => <TableCell {...props} />,
  img: ({ src, alt }) => <Image src={src} alt={alt} maxWidth="100%" />,
  // `StoryDemo` is provided by the components route's nested MDXProvider - the demo
  // registry it pulls must stay out of this every-page element map.
  Readme: MdxReadme,
}
