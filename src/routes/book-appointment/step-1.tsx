import { FormSelect } from '@/components/molecules/form-select'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useBookAppointmentStore } from '@/routes/book-appointment/-steps.store'
import { type AppointmentBaseData, baseDataSchema } from '@/routes/book-appointment/-steps.utils'
import { ages } from '@/utils/age.utils'
import { breeds } from '@/utils/breed.utils'
import { useFormChangeDetector } from '@/utils/form.utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { ArrowRightIcon } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

// eslint-disable-next-line max-lines-per-function
function BaseDataForm() {
  const navigate = useNavigate()
  const { data, setBaseData, setCurrentStep } = useBookAppointmentStore()

  useEffect(() => {
    setCurrentStep(0)
  }, [setCurrentStep])

  const form = useForm<AppointmentBaseData>({
    defaultValues: data.baseData,
    resolver: zodResolver(baseDataSchema),
  })

  const onSubmit = async (values: AppointmentBaseData) => {
    await navigate({ to: `/book-appointment/${values.breed}/step-2` })
  }

  useFormChangeDetector(form, setBaseData)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="identifier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pet identifier</FormLabel>
              <FormControl>
                <Input placeholder="Enter pet ID or microchip number" {...field} data-testid="identifier" />
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
                <Input placeholder="Enter pet name" {...field} data-testid="name" />
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
                <FormSelect form={form} name="age" id="age" field={field} options={ages} placeholder="Select the age range" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="breed"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Breed</FormLabel>
              <FormSelect form={form} name="breed" id="breed" field={field} options={breeds} placeholder="Select a breed" />
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-center mt-6">
          <Button testId="goto" type="submit" data-testid="next">
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
