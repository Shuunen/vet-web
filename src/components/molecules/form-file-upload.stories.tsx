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
    onUploadComplete: fn(),
    onUploadError: fn(),
  },
} satisfies Meta<typeof FormFileUpload>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
