'use client'

import { Button } from '@/components/atoms/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/atoms/form'
import { Textarea } from '@/components/atoms/textarea'
import { useFormStore } from '@/utils/contact.store'
import { msInSecond } from '@/utils/date.const'
import { zodResolver } from '@hookform/resolvers/zod'
import { debounce } from 'es-toolkit'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
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

// eslint-disable-next-line max-lines-per-function
export function FormContact() {
  const { firstName, lastName, message, setFormData, resetForm } = useFormStore()

  const form = useForm<ContactForm>({
    defaultValues: {
      message,
      user: {
        firstName,
        lastName,
      },
    },
    resolver: zodResolver(contactFormSchema),
  })

  function saveFormDataSync() {
    const values = form.getValues()
    setFormData({
      firstName: values.user.firstName,
      lastName: values.user.lastName,
      message: values.message,
    })
    toast.info('Form data saved')
  }

  const saveFormData = debounce(saveFormDataSync, msInSecond)

  function clearFormData() {
    resetForm()
    form.reset()
    toast.info('Form data cleared')
  }

  function onSubmit(values: ContactForm) {
    // eslint-disable-next-line no-console
    console.log(values)
    toast.success('Form submitted')
  }

  return (
    <Form {...form}>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={form.handleSubmit(onSubmit)} onChange={saveFormData} className="space-y-4">
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
        <div className="flex gap-4">
          <Button disabled={!form.formState.isValid} data-testid="submit" type="submit">
            Submit
          </Button>
          <Button type="button" onClick={clearFormData} data-testid="reset">
            Reset
          </Button>
        </div>
      </form>
    </Form>
  )
}
