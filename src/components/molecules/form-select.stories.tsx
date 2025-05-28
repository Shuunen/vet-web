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
    options: [
      { label: 'Moins de 5 ans', value: { code: 'MINUS-5', version: 1 } },
      { label: 'De 5 à 10 ans', value: { code: 'FROM-5-TO-10', version: 1.1 } },
      { label: 'Plus de 10 ans', value: { code: 'MORE-10', version: 2 } },
    ],
    placeholder: 'Select the age range',
  },
}
