import type { Meta, StoryObj } from '@storybook/react-vite'
import { BookAppointmentCard } from './book-appointment-card.tsx'

const meta = {
  component: BookAppointmentCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Molecules/BookAppointmentCard',
} satisfies Meta<typeof BookAppointmentCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
