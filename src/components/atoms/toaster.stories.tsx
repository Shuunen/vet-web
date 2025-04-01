import type { Meta, StoryObj } from '@storybook/react'
import { toast } from 'sonner'
import { Button } from './button'
import { Toaster } from './toaster'

const meta = {
  component: Toaster,
  decorators: [
    Story => (
      <>
        <Toaster />
        <Story />
      </>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'atoms/Toaster',
} satisfies Meta<typeof Toaster>

export default meta

type Story = StoryObj<typeof meta>

export const Info: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Button onClick={() => toast.info('This is an info toast!')}>Show Info Toast</Button>
    </div>
  ),
}

export const Success: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Button onClick={() => toast.success('This is a success toast!')}>Show Success Toast</Button>
    </div>
  ),
}
