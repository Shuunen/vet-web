import { zodResolver } from '@hookform/resolvers/zod'
import type { Meta, StoryObj } from '@storybook/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from './button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './form'
import { Textarea } from './textarea'

const minChars = 3

const contactFormSchema = z.object({
  message: z.string().min(minChars),
  other: z
    .object({
      primary: z.string(),
      secondary: z.string(),
    })
    .optional(),
  user: z.object({
    firstName: z.string().min(minChars),
    lastName: z.string().min(minChars),
  }),
})
type ContactForm = z.infer<typeof contactFormSchema>

const meta = {
  component: Form,
  parameters: {
    layout: 'centered',
  },
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const form = useForm<ContactForm>({
      defaultValues: {
        user: {
          firstName: '',
          lastName: '',
        },
      },
      resolver: zodResolver(contactFormSchema),
    })

    function onSubmit(values: ContactForm) {
      // eslint-disable-next-line no-console
      console.log(values)
    }

    return (
      <Form {...form}>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea data-testid={field.name} placeholder="Type your message here." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    )
  },
  tags: ['autodocs'],
  title: 'atoms/Form',
} satisfies Meta<typeof Form>

export default meta

type Story = StoryObj<typeof meta>

// @ts-expect-error type issue
export const Simple: Story = {}
