import { ages } from '@/utils/age.utils'
import type { Meta, StoryObj } from '@storybook/react'
import type { ControllerRenderProps, UseFormReturn } from 'react-hook-form'
import { FormSelect } from './form-select'

const meta = {
  component: FormSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Molecules/FormSelect',
} satisfies Meta<typeof FormSelect>

export default meta
type Story = StoryObj<typeof meta>

export const StringValue: Story = {
  args: {
    field: {} as ControllerRenderProps,
    form: {} as UseFormReturn,
    id: 'select',
    name: 'select',
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
      { label: 'Option 3', value: '3' },
    ],
    placeholder: 'Select an option',
  },
}

export const ObjectValue: Story = {
  args: {
    field: {} as ControllerRenderProps,
    form: {} as UseFormReturn,
    id: 'age',
    name: 'age',
    options: ages,
    placeholder: 'Select the age range',
  },
}
