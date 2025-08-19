import { zodResolver } from '@hookform/resolvers/zod'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useForm } from 'react-hook-form'
import { z } from 'zod/v4'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { OptionalSection } from './optional-section.tsx'

const formSchema = z
  .object({
    knowsParent: z.boolean().optional(),
    parentIdentifier: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.knowsParent && (!data.parentIdentifier || data.parentIdentifier.trim() === ''))
      ctx.addIssue({
        expected: 'string',
        code: 'invalid_type',
        message: 'Parent identifier is required when you know the parent',
        path: ['parentIdentifier'],
      })
  })

type FormData = z.infer<typeof formSchema>

const onSubmit = (values: FormData) => {
  // eslint-disable-next-line no-console
  console.log('Form values:', values)
}

function OptionalSectionDemo({ defaultChecked = false }: { defaultChecked?: boolean }) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      knowsParent: defaultChecked,
      parentIdentifier: '',
    },
  })

  return (
    <div className="max-w-md mx-auto p-6 space-y-4">
      <h2 className="text-lg font-semibold">Optional Section Demo</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <OptionalSection form={form} checkboxName="knowsParent" checkboxLabel="I know the parent animal" checkboxTestId="knows-parent" conditionalFieldName="parentIdentifier">
            {field => (
              <FormItem>
                <FormLabel>Parent identifier</FormLabel>
                <FormControl>
                  <Input placeholder="Enter parent ID" {...field} value={(field.value as string) || ''} data-testid="parent-identifier" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          </OptionalSection>

          <Button testId="submit" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}

const meta = {
  title: 'Molecules/OptionalSection',
  component: OptionalSectionDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof OptionalSectionDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    defaultChecked: false,
  },
}

export const CheckedByDefault: Story = {
  args: {
    defaultChecked: true,
  },
}
