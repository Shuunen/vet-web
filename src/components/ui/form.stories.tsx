import { zodResolver } from '@hookform/resolvers/zod'
import type { Meta, StoryObj } from '@storybook/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from './button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './form'
import { Textarea } from './textarea'

const contactFormSchema = z.object({
  user: z.object({
    firstName: z.string().min(3),
    lastName: z.string().min(3),
  }),
  other: z
    .object({
      primary: z.string(),
      secondary: z.string(),
    })
    .optional(),
  message: z.string().min(10),
})

type ContactForm = z.infer<typeof contactFormSchema>

const meta = {
  title: 'ui/Form',
  component: Form,
  parameters: {
    layout: 'centered',
  },
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const form = useForm<ContactForm>({
      resolver: zodResolver(contactFormSchema),
      defaultValues: {
        user: {
          firstName: '',
          lastName: '',
        },
      },
    })

    function onSubmit(values: ContactForm) {
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
} satisfies Meta<typeof Form>

export default meta

type Story = StoryObj<typeof meta>

// @ts-expect-error type issue
export const Simple: Story = {}
