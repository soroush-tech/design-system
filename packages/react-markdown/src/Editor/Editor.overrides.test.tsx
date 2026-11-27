import { screen } from '@testing-library/react'
import { describeRootSlot } from '../utils/describeRootSlot'
import { Editor } from './Editor'

describeRootSlot(
  'Editor',
  (props) => <Editor {...props} />,
  () =>
    screen
      .getByRole('textbox', { name: 'Markdown source' })
      .closest('[class*="MarkdownEditor"]') as HTMLElement
)
