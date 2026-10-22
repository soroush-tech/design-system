import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Alert } from '../Alert'
import { Button } from '../Button'
import { Flex } from '../Flex'
import { Slide } from '../Slide'
import type { TransitionProps } from '../utils/useTransition'
import { exampleArgs } from '../utils/test/renderExample'
import {
  snackbarCatalog,
  snackbarHorizontalValues,
  snackbarVerticalValues,
} from './Snackbar.catalog'
import { Snackbar, type SnackbarProps } from './Snackbar'

const meta: Meta<typeof Snackbar> = {
  title: 'Theme/Snackbar',
  component: Snackbar,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { include: ['message', 'autoHideDuration', 'resumeHideDuration', 'layer'] },
  },
  args: exampleArgs(snackbarCatalog.example),
  argTypes: {
    message: {
      control: 'text',
      description: 'The message.',
      table: { category: 'Content' },
    },
    autoHideDuration: {
      control: 'number',
      description: 'How long it stays, in milliseconds. Empty: until it is closed.',
      table: { category: 'Behavior' },
    },
    resumeHideDuration: {
      control: 'number',
      description: 'How long it stays once the pointer or focus has left it.',
      table: { category: 'Behavior', defaultValue: { summary: 'half of autoHideDuration' } },
    },
    layer: {
      control: { type: 'select' },
      options: ['appBar', 'drawer', 'modal', 'snackbar', 'tooltip'],
      description: 'Stacking layer from `theme.zOrder`.',
      table: { category: 'Layout', defaultValue: { summary: 'snackbar' } },
    },
  },
}

export default meta
type Story = StoryObj<typeof Snackbar>

// Opened by a button; the owner takes it away - and ignores a click away, which would close it
// the moment the button that opened it is pressed again.
function Demo(args: Readonly<SnackbarProps>) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Button variant="outlined" onClick={() => setIsOpen(true)}>
        Show a snackbar
      </Button>
      <Snackbar
        {...args}
        isOpen={isOpen}
        onClose={(_event, reason) => reason !== 'clickaway' && setIsOpen(false)}
      />
    </>
  )
}

export const Default: Story = {
  args: { isOpen: undefined, message: 'Saved', autoHideDuration: 4000 },
  render: (args) => <Demo {...args} />,
}

export const WithAnAction: Story = {
  args: { isOpen: undefined, message: 'Message archived', autoHideDuration: 6000 },
  render: (args) => (
    <Demo
      {...args}
      action={
        <Button variant="text" size="sm">
          Undo
        </Button>
      }
    />
  ),
}

export const StaysUntilClosed: Story = {
  args: { isOpen: undefined, message: 'Connection lost.', autoHideDuration: undefined },
  render: (args) => (
    <Demo
      {...args}
      action={
        <Button variant="text" size="sm">
          Retry
        </Button>
      }
    />
  ),
}

export const Corners: Story = {
  parameters: { controls: { include: [] } },
  render: (args) => (
    <Flex flexDirection="row" gap={1}>
      {snackbarVerticalValues.flatMap((vertical) =>
        snackbarHorizontalValues.map((horizontal) => (
          <Demo
            key={`${vertical}-${horizontal}`}
            {...args}
            isOpen={undefined}
            autoHideDuration={3000}
            message={`${vertical} ${horizontal}`}
            anchorOrigin={{
              vertical: vertical as 'top' | 'bottom',
              horizontal: horizontal as 'start' | 'center' | 'end',
            }}
          />
        ))
      )}
    </Flex>
  ),
}

export const WithAnAlert: Story = {
  args: { isOpen: undefined, autoHideDuration: 5000 },
  render: (args) => (
    <Demo {...args} message={undefined}>
      <Alert severity="success">Your changes were saved.</Alert>
    </Demo>
  ),
}

// A transition is a component: it is made once, not on every render.
function SlideUp(props: TransitionProps) {
  return <Slide {...props} direction="up" />
}

export const SlidingIn: Story = {
  args: { isOpen: undefined, message: 'Sliding in', autoHideDuration: 4000 },
  render: (args) => <Demo {...args} transition={SlideUp} />,
}
