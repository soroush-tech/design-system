import { screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { slotCases } from '../../utils/test/slotCases'
import { ToggleButton } from '../ToggleButton'
import { ToggleButtonGroup, type ToggleButtonGroupProps } from './ToggleButtonGroup'

const root = () => screen.getByRole('group')

describe('ToggleButtonGroup overrides', () => {
  it.each(
    slotCases({
      render: (props: ToggleButtonGroupProps) => (
        <ToggleButtonGroup {...props}>
          <ToggleButton value="a">A</ToggleButton>
        </ToggleButtonGroup>
      ),
      root,
      slots: { root },
    })
  )('$name', ({ run, expected }) => {
    expect(run()).toEqual(expected)
  })
})
