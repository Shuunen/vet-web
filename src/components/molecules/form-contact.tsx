'use client'

import { Button } from '@/components/atoms/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/atoms/form'
import { Textarea } from '@/components/atoms/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { FormUser } from './form-user'

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

export function FormContact() {
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
        <FormUser<ContactForm> name="user" />
        {/* Lines below will successfully cause a TypeScript error :
        <FormUser<ContactForm> name="other" /> 
        <FormUser<ContactForm> name="message" /> */}
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
        <Button disabled={!form.formState.isValid} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  )
}
