'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { FormUser } from './form-user'

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
  message: z.string(),
})

type ContactForm = z.infer<typeof contactFormSchema>

export function FormContact() {
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormUser<ContactForm> name="user" />
        {/* lines below will successfully cause a TypeScript error :
        <FormUser<ContactForm> name="other" /> 
        <FormUser<ContactForm> name="message" /> */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea placeholder="Type your message here." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
