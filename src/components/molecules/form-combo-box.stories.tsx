import type { Meta, StoryObj } from '@storybook/react'
import { ComboboxForm } from './form-combo-box'

const meta = {
  component: ComboboxForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'molecules/ComboboxForm',
} satisfies Meta<typeof ComboboxForm>

export default meta

type Story = StoryObj<typeof meta>

export const Simple: Story = {}
