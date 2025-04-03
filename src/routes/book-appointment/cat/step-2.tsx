import { Button } from '@/components/atoms/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/atoms/form'
import { Input } from '@/components/atoms/input'
import { RadioGroup, RadioGroupItem } from '@/components/atoms/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/atoms/select'
import { useBookAppointmentStore } from '@/utils/book-appointment.store'
import { type CatComplementaryData, catComplementaryDataSchema, vaccinationStatuses } from '@/utils/book-appointment.validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import { ArrowLeftIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'

// eslint-disable-next-line max-lines-per-function
function CatComplementaryDataForm() {
  const navigate = useNavigate()
  const { data, setCatComplementaryData, setCurrentStep } = useBookAppointmentStore()
  // eslint-disable-next-line no-magic-numbers
  setCurrentStep(1)

  const complementaryData = data.complementaryData as CatComplementaryData

  const form = useForm<CatComplementaryData>({
    defaultValues: complementaryData,
    resolver: zodResolver(catComplementaryDataSchema),
  })

  const onSubmit = (values: CatComplementaryData) => {
    setCatComplementaryData(values)
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    navigate({ to: '/book-appointment/step-3' })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="indoorOutdoor"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Environment</FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="indoor" />
                    </FormControl>
                    <FormLabel className="font-normal">Indoor Only</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="outdoor" />
                    </FormControl>
                    <FormLabel className="font-normal">Outdoor Only</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="both" />
                    </FormControl>
                    <FormLabel className="font-normal">Both Indoor and Outdoor</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastFleaTreatment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Flea Treatment Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="vaccinationStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vaccination Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select vaccination status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {vaccinationStatuses.map(status => (
                    <SelectItem key={status} value={status}>
                      {status.replace(/-/gu, ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-24 mt-4">
          <Link to="/book-appointment/step-1">
            <Button type="button" variant="link">
              <ArrowLeftIcon /> Back
            </Button>
          </Link>
          <Button type="submit">Go to summary</Button>
        </div>
      </form>
    </Form>
  )
}

export const Route = createFileRoute('/book-appointment/cat/step-2')({
  component: CatComplementaryDataForm,
})
