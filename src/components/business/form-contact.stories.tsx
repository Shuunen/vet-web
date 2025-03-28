import type { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, within } from '@storybook/test'
import { FormContact } from './form-contact'

const meta = {
  title: 'business/FormContact',
  component: FormContact,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FormContact>

export default meta

type Story = StoryObj<typeof meta>

export const EmptyForm: Story = {}

export const FilledForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await userEvent.type(canvas.getByTestId('user.firstName'), 'Nicolas')

    await userEvent.type(canvas.getByTestId('user.lastName'), 'Lafon')

    await expect(canvas.getByRole('button')).toBeDisabled()
  },
}
