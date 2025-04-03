import { Button } from '@/components/atoms/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/atoms/form'
import { Input } from '@/components/atoms/input'
import { RadioGroup, RadioGroupItem } from '@/components/atoms/radio-group'
import { useBookAppointmentStore } from '@/utils/book-appointment.store'
import { type AppointmentBaseData, baseDataSchema } from '@/utils/book-appointment.validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { ArrowRightIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'

// eslint-disable-next-line max-lines-per-function
function BaseDataForm() {
  const navigate = useNavigate()
  const { data, setBaseData, setCurrentStep } = useBookAppointmentStore()
  // eslint-disable-next-line no-magic-numbers
  setCurrentStep(0)

  const form = useForm<AppointmentBaseData>({
    defaultValues: data.baseData,
    resolver: zodResolver(baseDataSchema),
  })

  const onSubmit = async (values: AppointmentBaseData) => {
    setBaseData(values)
    await navigate({ to: `/book-appointment/${values.type}/step-2` })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="identifier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pet identifier</FormLabel>
              <FormControl>
                <Input placeholder="Enter pet ID or microchip number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter pet name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input placeholder="Enter pet age" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Type</FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-row space-y-1 space-x-4">
                  <FormItem className="flex items-center">
                    <FormControl>
                      <RadioGroupItem value="cat" />
                    </FormControl>
                    <FormLabel className="font-normal">cat</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center">
                    <FormControl>
                      <RadioGroupItem value="dog" />
                    </FormControl>
                    <FormLabel className="font-normal">dog</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-center mt-6">
          <Button type="submit">
            Go to complementary data <ArrowRightIcon />
          </Button>
        </div>
      </form>
    </Form>
  )
}

export const Route = createFileRoute('/book-appointment/step-1')({
  component: BaseDataForm,
})
