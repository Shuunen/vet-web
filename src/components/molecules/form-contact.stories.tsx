import type { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, within } from '@storybook/test'
import { FormContact } from './form-contact'

const meta = {
  component: FormContact,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'molecules/FormContact',
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

    await userEvent.type(canvas.getByTestId('message'), 'Hello world!')

    await expect(canvas.getByRole('button')).toBeEnabled()

    await userEvent.click(canvas.getByRole('button'))
  },
}
