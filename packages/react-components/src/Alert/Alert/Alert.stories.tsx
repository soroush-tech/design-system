import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../../Button'
import { Flex } from '../../Flex'
import { m } from '../../utils/test/storiesArgs'
import { exampleArgs } from '../../utils/test/renderExample'
import { AlertTitle } from '../AlertTitle'
import { alertCatalog, alertSeverityValues, alertVariantValues } from './Alert.catalog'
import { Alert } from './Alert'

const meta: Meta<typeof Alert> = {
  title: 'Theme/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { include: ['severity', 'variant', 'role', 'closeLabel', 'm'] },
  },
  args: exampleArgs(alertCatalog.example),
  argTypes: {
    severity: {
      control: { type: 'select' },
      options: alertSeverityValues,
      description: 'Picks the icon and the palette color.',
      table: { category: 'Visual', defaultValue: { summary: 'info' } },
    },
    variant: {
      control: { type: 'inline-radio' },
      options: alertVariantValues,
      description: 'Tinted, filled, or only outlined.',
      table: { category: 'Visual', defaultValue: { summary: 'standard' } },
    },
    role: {
      control: { type: 'inline-radio' },
      options: ['alert', 'status'],
      description: "`'alert'` is announced at once; `'status'`, politely.",
      table: { category: 'Behavior', defaultValue: { summary: 'alert' } },
    },
    closeLabel: {
      control: 'text',
      description: 'Names the close control - no built-in English.',
      table: { category: 'Content' },
    },
    m,
  },
}

export default meta
type Story = StoryObj<typeof Alert>

export const Default: Story = {
  render: (args) => <Alert {...args}>Your changes were saved.</Alert>,
}

export const WithTitle: Story = {
  render: (args) => (
    <Alert {...args} severity="success">
      <AlertTitle>Saved</AlertTitle>
      Your changes are live.
    </Alert>
  ),
}

export const Severities: Story = {
  parameters: { controls: { include: [] } },
  render: (args) => (
    <Flex gap={2}>
      {alertSeverityValues.map((severity) => (
        <Alert key={severity} {...args} severity={severity}>
          This is {severity}.
        </Alert>
      ))}
    </Flex>
  ),
}

export const Variants: Story = {
  parameters: { controls: { include: [] } },
  render: (args) => (
    <Flex gap={2}>
      {alertVariantValues.map((variant) => (
        <Alert key={variant} {...args} variant={variant} severity="warning">
          {variant}
        </Alert>
      ))}
    </Flex>
  ),
}

export const WithAnAction: Story = {
  parameters: { controls: { include: [] } },
  render: (args) => (
    <Alert
      {...args}
      severity="error"
      action={
        <Button size="sm" variant="outlined" color="error">
          Retry
        </Button>
      }
    >
      The upload failed.
    </Alert>
  ),
}

// Dismissed by its close control; it is the app that takes it away.
export const Closable: Story = {
  parameters: { controls: { include: [] } },
  render: (args) => {
    function Closable() {
      const [isOpen, setIsOpen] = useState(true)
      return isOpen ? (
        <Alert {...args} onClose={() => setIsOpen(false)} closeLabel="Dismiss">
          Close me.
        </Alert>
      ) : (
        <Button size="sm" variant="outlined" onClick={() => setIsOpen(true)}>
          Bring it back
        </Button>
      )
    }
    return <Closable />
  },
}

export const WithoutAnIcon: Story = {
  render: (args) => (
    <Alert {...args} icon={false}>
      No icon, only the message.
    </Alert>
  ),
}
