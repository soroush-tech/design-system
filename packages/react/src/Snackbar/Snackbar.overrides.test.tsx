import { screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { slotCases } from '../utils/test/slotCases'
import { Snackbar, type SnackbarProps } from './Snackbar'

const content = () => screen.getByRole('status', { hidden: true })

describe('Snackbar overrides', () => {
  it.each(
    slotCases({
      render: (props: SnackbarProps) => (
        <Snackbar
          defaultOpen
          message="Saved"
          action={<button type="button">Undo</button>}
          {...props}
        />
      ),
      root: () => content().parentElement,
      slots: {
        root: () => content().parentElement,
        content,
        message: () => screen.getByText('Saved'),
        action: () => screen.getByText('Undo').parentElement,
      },
    })
  )('$name', ({ run, expected }) => {
    expect(run()).toEqual(expected)
  })
})
