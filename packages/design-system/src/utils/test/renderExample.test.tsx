import { describe, it, expect } from 'vitest'
import { isValidElement } from 'react'
import { screen } from '@testing-library/react'
import { catalog } from '../../catalog'
import { renderWithTheme } from './renderWithTheme'
import { exampleArgs, renderExample } from './renderExample'

describe('renderExample', () => {
  it('renders text as itself, and a node as its component with its props and children', () => {
    expect(renderExample('Plain')).toBe('Plain')
    renderWithTheme(
      <>
        {renderExample({
          component: 'Button',
          props: { variant: 'outlined' },
          children: ['Save', { component: 'Icon', props: { name: 'check' }, children: [] }],
        })}
      </>
    )
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument()
  })

  it('throws for a component it does not know', () => {
    expect(() => renderExample({ component: 'Nope', props: {}, children: [] })).toThrow(
      'renderExample: no component named Nope'
    )
  })

  // Every placeable component's example and variants render - what a palette shows. Parts
  // such as TableControl need a parent's data or functions JSON can't hold.
  const placeable = Object.values(catalog.components).filter((entry) => entry.isPlaceable)
  const examples = placeable.flatMap((entry) => [
    [`${entry.name} example`, entry.example] as const,
    ...entry.variants.map((variant) => [`${entry.name} ${variant.name}`, variant.example] as const),
  ])
  it.each(examples)('renders the %s', (_label, example) => {
    expect(() => renderWithTheme(<>{renderExample(example)}</>)).not.toThrow()
  })
})

describe('exampleArgs', () => {
  it('gives the props, and no children for none', () => {
    expect(exampleArgs({ component: 'Card', props: { title: 'T' }, children: [] })).toEqual({
      title: 'T',
    })
  })

  it('gives one text child as text, so a story control edits it', () => {
    expect(exampleArgs({ component: 'Button', props: {}, children: ['Go'] })).toEqual({
      children: 'Go',
    })
  })

  it('renders other children as elements', () => {
    const { children } = exampleArgs({
      component: 'Select',
      props: {},
      children: [{ component: 'MenuItem', props: { value: 'a' }, children: ['A'] }],
    }) as { children: unknown[] }
    expect(isValidElement(children[0])).toBe(true)
  })
})
