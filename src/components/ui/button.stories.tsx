import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Button } from './button'

const meta = {
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'ghost', 'link'],
    },
  },
  args: { onClick: fn() },
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'atoms/Button',
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Primary',
    testId: 'primary-button',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
    testId: 'secondary-button',
  },
}

export const AsChild: Story = {
  args: {
    asChild: true,
    children: <span>the child</span>,
    testId: 'as-child-button',
  },
}
