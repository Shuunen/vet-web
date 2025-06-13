import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogOverlay,
  DialogPortal,
} from './dialog'
import { Button } from './button'
import { useState } from 'react'

const meta = {
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'atoms/Dialog',
} satisfies Meta<typeof Dialog>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(true)
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button testId='open-dialog'>Open Dialog</Button>
        </DialogTrigger>
        <DialogPortal>
          <DialogOverlay />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dialog Title</DialogTitle>
              <DialogDescription>This is a dialog description.</DialogDescription>
            </DialogHeader>
            <div>Dialog body content goes here.</div>
            <DialogFooter>
              <DialogClose asChild>
                <Button testId='close' variant="secondary">Close</Button>
              </DialogClose>
              <Button testId='save'>Save</Button>
            </DialogFooter>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    )
  },
}
