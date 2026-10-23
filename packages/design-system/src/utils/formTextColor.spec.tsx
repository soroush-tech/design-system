import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithTheme } from './test/renderWithTheme'
import { baseTheme } from '../theme/themes'
import { Checkbox } from '../Checkbox'
import { Form } from '../Form'
import { FormControl } from '../FormControl'
import { Radio } from '../Radio'
import { Switch } from '../Switch'
import { TransferList } from '../TransferList'

// The label text of a choice takes the field's text color; its mark keeps the control's color.

const choices = [
  ['Checkbox', <Checkbox key="c">Check</Checkbox>, 'Check'],
  ['Radio', <Radio key="r">Pick</Radio>, 'Pick'],
  ['Switch', <Switch key="s">Toggle</Switch>, 'Toggle'],
] as const

describe.each(choices)('%s label', (_name, choice, text) => {
  it('takes the text color of its Form', () => {
    renderWithTheme(
      <Form color="error" textColor="info">
        {choice}
      </Form>
    )
    expect(screen.getByText(text)).toHaveStyle({ color: baseTheme.text.info })
    // The mark is still the control's color.
    expect(screen.getByText(text).parentElement).toHaveStyle({
      color: baseTheme.palette.error.main,
    })
  })

  it('takes the text color of its FormControl', () => {
    renderWithTheme(<FormControl textColor="warning">{choice}</FormControl>)
    expect(screen.getByText(text)).toHaveStyle({ color: baseTheme.text.warning })
  })

  it('is the control color without a text color', () => {
    renderWithTheme(<Form color="error">{choice}</Form>)
    expect(screen.getByText(text)).not.toHaveStyle({ color: baseTheme.text.info })
  })
})

describe('textColor of a choice', () => {
  it('is its own prop, winning over its field', () => {
    renderWithTheme(
      <Form textColor="info">
        <Checkbox textColor="error">One</Checkbox>
        <Radio textColor="success">Two</Radio>
        <Switch textColor="warning">Three</Switch>
      </Form>
    )
    expect(screen.getByText('One')).toHaveStyle({ color: baseTheme.text.error })
    expect(screen.getByText('Two')).toHaveStyle({ color: baseTheme.text.success })
    expect(screen.getByText('Three')).toHaveStyle({ color: baseTheme.text.warning })
  })
})

describe('TransferList text color', () => {
  it('reaches the titles of its lists', () => {
    renderWithTheme(
      <Form textColor="info">
        <TransferList
          items={[{ value: 'a', label: 'Apple' }]}
          leftLabel="Choices"
          rightLabel="Chosen"
          moveRightLabel="Right"
          moveLeftLabel="Left"
        />
      </Form>
    )
    expect(screen.getByText('Choices')).toHaveStyle({ color: baseTheme.text.info })
    expect(screen.getByText('Apple')).toHaveStyle({ color: baseTheme.text.info })
  })

  it('is its own prop, winning over its field', () => {
    renderWithTheme(
      <Form textColor="info">
        <TransferList
          textColor="error"
          items={[]}
          leftLabel="Choices"
          rightLabel="Chosen"
          moveRightLabel="Right"
          moveLeftLabel="Left"
        />
      </Form>
    )
    expect(screen.getByText('Choices')).toHaveStyle({ color: baseTheme.text.error })
  })
})
