import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from './command'
import { useState } from 'react'

const meta = {
  component: CommandDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'atoms/Command',
} satisfies Meta<typeof CommandDialog>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(true)
    return (
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              Profile <CommandShortcut>⇧⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              Settings <CommandShortcut>⌘,</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Actions">
            <CommandItem>Logout</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    )
  },
}
