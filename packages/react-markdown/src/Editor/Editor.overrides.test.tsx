import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { rootSlotCases } from '../utils/describeRootSlot'
import { Editor } from './Editor'

describe('Editor overrides', () => {
  it.each(
    rootSlotCases(
      (props) => <Editor {...props} />,
      () =>
        screen
          .getByRole('textbox', { name: 'Markdown source' })
          .closest('[class*="MarkdownEditor"]') as HTMLElement
    )
  )('$name', ({ run, expected }) => {
    expect(run()).toEqual(expected)
  })
})
