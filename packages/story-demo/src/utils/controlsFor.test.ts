import { describe, it, expect } from 'vitest'
import { controlsFor, type ControlsAnnotations } from './controlsFor'

const meta: ControlsAnnotations = {
  parameters: { controls: { include: ['size', 'disabled', 'children', 'gap', 'speed', 'bg'] } },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md'],
      description: 'Density token.',
      table: { defaultValue: { summary: 'md' } },
    },
    disabled: { control: 'boolean', description: 'Disables it.' },
    children: { control: 'text' },
    gap: { control: { type: 'number', min: 0 } },
    speed: { control: { type: 'range', min: 0, max: 10, step: 2 } },
    bg: { control: { type: 'color' } },
  },
}

describe('controlsFor', () => {
  it('maps the include list through the merged argTypes in order', () => {
    expect(controlsFor(meta, {})).toEqual([
      {
        kind: 'select',
        name: 'size',
        description: 'Density token.',
        defaultValue: 'md',
        options: ['sm', 'md'],
      },
      {
        kind: 'boolean',
        name: 'disabled',
        description: 'Disables it.',
        min: undefined,
        max: undefined,
        step: undefined,
      },
      {
        kind: 'text',
        name: 'children',
        description: undefined,
        min: undefined,
        max: undefined,
        step: undefined,
      },
      {
        kind: 'number',
        name: 'gap',
        description: undefined,
        min: 0,
        max: undefined,
        step: undefined,
      },
      { kind: 'range', name: 'speed', description: undefined, min: 0, max: 10, step: 2 },
    ])
  })

  it('prefers the story include list and argTypes over meta', () => {
    const story: ControlsAnnotations = {
      parameters: { controls: { include: ['tone', 'size'] } },
      argTypes: { tone: { control: { type: 'inline-radio' }, options: ['calm', 'loud'] } },
    }
    expect(controlsFor(meta, story).map((model) => model.name)).toEqual(['tone', 'size'])
    expect(controlsFor(meta, story)[0].kind).toBe('inline-radio')
  })

  it('returns no controls without an include list', () => {
    expect(controlsFor({}, {})).toEqual([])
  })

  it('skips names without argTypes, without control type, or without options', () => {
    const annotations: ControlsAnnotations = {
      parameters: { controls: { include: ['missing', 'bare', 'optionless'] } },
      argTypes: {
        bare: { control: {} },
        optionless: { control: { type: 'select' } },
      },
    }
    expect(controlsFor(annotations, {})).toEqual([])
  })
})
