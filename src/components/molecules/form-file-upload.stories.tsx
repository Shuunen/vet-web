import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { FormFileUpload } from './form-file-upload'

const meta = {
  component: FormFileUpload,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'molecules/FormFileUpload',
  args: {
    onFileChange: fn(),
    onFileUploadComplete: fn(),
    onFileUploadError: fn(),
    onFileRemove: fn(),
  },
} satisfies Meta<typeof FormFileUpload>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const WithFileSelected: Story = {
  args: {
    value: 'dog-health-report.pdf',
  },
}
