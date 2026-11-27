import { describe, it } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithTheme } from '../utils/test/renderWithTheme'
import { describeRootSlot } from '../utils/test/describeRootSlot'
import { mark } from '../utils/test/slotMark'
import { expectMark } from '../utils/test/expectMark'
import { NumberInput } from './NumberInput'

describeRootSlot(
  'NumberInput',
  (props) => <NumberInput data-testid="root" {...props} />,
  () => screen.getByTestId('root')
)

describe('NumberInput slots', () => {
  it('puts each slot of a stacked field on its element', () => {
    renderWithTheme(
      <NumberInput
        startContent="$"
        endContent="px"
        slotProps={{
          root: mark('root'),
          input: mark('input'),
          content: mark('content'),
          spinButtons: mark('spinButtons'),
          increment: mark('increment'),
          decrement: mark('decrement'),
        }}
      />
    )
    for (const slot of ['root', 'input', 'content', 'spinButtons', 'increment', 'decrement']) {
      expectMark(slot)
    }
  })

  it('puts the button slots on buttons either side of the field', () => {
    renderWithTheme(
      <NumberInput
        spinButtons="sides"
        slotProps={{ increment: mark('increment'), decrement: mark('decrement') }}
      />
    )
    expectMark('increment')
    expectMark('decrement')
  })
})
