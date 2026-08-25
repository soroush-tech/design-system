import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithTheme } from 'src/test/utils/wrapper'
import { mdxComponents as c } from './mdxComponents'

const H1 = c.h1!
const H2 = c.h2!
const H3 = c.h3!
const H4 = c.h4!
const H5 = c.h5!
const H6 = c.h6!
const P = c.p!
const A = c.a!
const Strong = c.strong!
const Em = c.em!
const Ul = c.ul!
const Ol = c.ol!
const Li = c.li!
const Input = c.input!
const Blockquote = c.blockquote!
const Code = c.code!
const Pre = c.pre!
const TableEl = c.table!
const Thead = c.thead!
const Tbody = c.tbody!
const Tr = c.tr!
const Th = c.th!
const Td = c.td!
const Img = c.img!

describe('mdxComponents', () => {
  it('renders headings and prose through design-system Typography', () => {
    renderWithTheme(
      <>
        <H1>one</H1>
        <H2>two</H2>
        <H3>three</H3>
        <H4>four</H4>
        <H5>five</H5>
        <H6>six</H6>
        <P>
          prose <Strong>bold</Strong> <Em>italic</Em>
        </P>
      </>
    )
    for (const name of ['one', 'two', 'three', 'four', 'five', 'six']) {
      expect(screen.getByRole('heading', { name })).toBeInTheDocument()
    }
    expect(screen.getByText('bold').tagName).toBe('STRONG')
    expect(screen.getByText('italic').tagName).toBe('EM')
  })

  it('renders links, lists, task items, and quotes', () => {
    renderWithTheme(
      <>
        <A href="/design-system/">docs</A>
        <Ul>
          <Li>plain item</Li>
          <Li className="task-list-item">
            <Input checked /> done task
          </Li>
        </Ul>
        <Ol>
          <Li>ordered</Li>
        </Ol>
        <Blockquote>quoted</Blockquote>
      </>
    )
    expect(screen.getByRole('link', { name: 'docs' })).toHaveAttribute('href', '/design-system/')
    expect(screen.getByText('plain item').tagName).toBe('LI')
    expect(screen.getByText(/done task/)).toHaveStyle({ listStyleType: 'none' })
    expect(screen.getByRole('checkbox', { name: 'Task item' })).toBeDisabled()
    expect(screen.getByText('quoted')).toBeInTheDocument()
  })

  it('renders inline code and fenced blocks differently', () => {
    renderWithTheme(
      <>
        <Code>inline</Code>
        <Pre>
          <Code className="language-tsx">{'<Button />'}</Code>
        </Pre>
      </>
    )
    expect(screen.getByText('inline')).toHaveStyle({ display: 'inline' })
    expect(screen.getByText('<Button />')).toHaveStyle({ display: 'block' })
  })

  it('renders tables through the Table family and images through Image', () => {
    renderWithTheme(
      <>
        <TableEl>
          <Thead>
            <Tr>
              <Th>Head</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Cell</Td>
            </Tr>
          </Tbody>
        </TableEl>
        <Img src="/x.png" alt="picture" />
      </>
    )
    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Head' })).toBeInTheDocument()
    expect(screen.getByRole('cell', { name: 'Cell' })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'picture' })).toBeInTheDocument()
  })

  it('exposes Readme, leaving StoryDemo to the components route provider', () => {
    expect(c.Readme).toBeDefined()
    // The demo registry must stay out of this every-page map - the components route
    // injects StoryDemo through a nested MDXProvider instead.
    expect(c.StoryDemo).toBeUndefined()
  })
})
