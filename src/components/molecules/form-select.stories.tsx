import { ages } from '@/utils/age.utils'
import { breeds } from '@/utils/breed.utils'
import type { Meta, StoryObj } from '@storybook/react-vite'
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
    options: breeds,
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
