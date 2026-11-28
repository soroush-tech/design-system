import { screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { slotCases } from '../../utils/test/slotCases'
import { ToggleButton, type ToggleButtonProps } from './ToggleButton'

const root = () => screen.getByRole('button')

describe('ToggleButton overrides', () => {
  it.each(
    slotCases({
      render: (props: Partial<ToggleButtonProps>) => (
        <ToggleButton value="a" {...props}>
          A
        </ToggleButton>
      ),
      root,
      slots: { root },
    })
  )('$name', ({ run, expected }) => {
    expect(run()).toEqual(expected)
  })
})
