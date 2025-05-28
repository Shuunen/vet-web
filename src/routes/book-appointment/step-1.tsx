import { FormSelect } from '@/components/molecules/form-select'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useBookAppointmentStore } from '@/routes/book-appointment/-steps.store'
import { type AppointmentBaseData, baseDataSchema } from '@/routes/book-appointment/-steps.utils'
import { useFormChangeDetector } from '@/utils/form.utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { ArrowRightIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { nbSpacesIndent } from 'shuutils'

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

        <pre>{JSON.stringify(form.getValues(), undefined, nbSpacesIndent)}</pre>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormSelect
                form={form}
                name="name"
                id="name"
                field={field}
                options={[
                  { label: 'Joe', value: 'J1' },
                  { label: 'Nathan', value: 'N2' },
                ]}
                placeholder="Select a name"
              />
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
                <FormSelect
                  form={form}
                  name="age"
                  id="age"
                  field={field}
                  options={[
                    { label: 'Moins de 5 ans', value: { code: 'MINUS-5', version: 1 } },
                    { label: 'De 5 à 10 ans', value: { code: 'FROM-5-TO-10', version: 1.1 } },
                    { label: 'Plus de 10 ans', value: { code: 'MORE-10', version: 2 } },
                  ]}
                  placeholder="Select the age range"
                />
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
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-row space-y-1 space-x-4" data-testid="type">
                  <FormItem className="flex items-center">
                    <FormControl>
                      <RadioGroupItem value="cat" data-testid="type-cat" />
                    </FormControl>
                    <FormLabel className="font-normal">cat</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center">
                    <FormControl>
                      <RadioGroupItem value="dog" data-testid="type-dog" />
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
          <Button type="submit" data-testid="next">
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
