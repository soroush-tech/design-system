/* eslint-disable react-refresh/only-export-components -- shared story scaffolding, not an HMR'd component module */
import { useState, type ReactNode } from 'react'
import { Button } from '../../Button'
import { Flex } from '../../Flex'

/** A button that shows and hides what `children` draws, so a transition can be tried by hand. */
export function TransitionToggle({
  children,
}: Readonly<{ children: (isShown: boolean) => ReactNode }>) {
  const [isShown, setIsShown] = useState(false)
  return (
    <Flex gap={2} alignItems="flex-start">
      <Button size="sm" variant="outlined" onClick={() => setIsShown((current) => !current)}>
        {isShown ? 'Hide' : 'Show'}
      </Button>
      {children(isShown)}
    </Flex>
  )
}

/** The argTypes every transition around one child shares. */
export const transitionArgTypes = {
  isShown: {
    control: 'boolean',
    description: 'Whether the child is shown.',
    table: { category: 'State', defaultValue: { summary: 'false' } },
  },
  shouldAppear: {
    control: 'boolean',
    description: 'Moves on the first render too, when shown.',
    table: { category: 'Behavior', defaultValue: { summary: 'true' } },
  },
  shouldMountOnEnter: {
    control: 'boolean',
    description: 'Keeps the child out of the tree until it is first shown.',
    table: { category: 'Behavior', defaultValue: { summary: 'false' } },
  },
  shouldUnmountOnExit: {
    control: 'boolean',
    description: 'Takes the child out of the tree once it is out.',
    table: { category: 'Behavior', defaultValue: { summary: 'false' } },
  },
  timeout: {
    control: 'number',
    description: 'How long it takes, in milliseconds. Empty takes the theme standard.',
    table: {
      category: 'Behavior',
      defaultValue: { summary: 'theme.transitions.duration.standard' },
    },
  },
} as const

export const transitionControls = [
  'isShown',
  'shouldAppear',
  'shouldMountOnEnter',
  'shouldUnmountOnExit',
  'timeout',
  'easing',
] as const
