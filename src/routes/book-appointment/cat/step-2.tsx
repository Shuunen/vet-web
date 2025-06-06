import { FormFileUpload } from '@/components/molecules/form-file-upload'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useBookAppointmentStore } from '@/routes/book-appointment/-steps.store'
import { customResolver, useFormChangeDetector } from '@/utils/form.utils'
import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import { ArrowLeftIcon } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { type CatComplementaryData, catComplementaryDataSchema, hasAccess, vaccinationStatuses } from '../-steps.utils'

// eslint-disable-next-line max-lines-per-function, max-statements
function CatComplementaryDataForm() {
  const navigate = useNavigate()
  const { data, setCatComplementaryData, setCurrentStep } = useBookAppointmentStore()

  useEffect(() => {
    const step = 1
    const check = hasAccess(step, 'cat', data)
    if (!check.ok) navigate({ to: '/book-appointment/step-1' })
    setCurrentStep(step)
  }, [data, navigate, setCurrentStep])

  const complementaryData = data.complementaryData as CatComplementaryData

  const form = useForm<CatComplementaryData>({
    defaultValues: complementaryData,
    resolver: customResolver(catComplementaryDataSchema),
  })

  const onSubmit = () => {
    navigate({ to: '/book-appointment/step-3' })
  }

  useFormChangeDetector(form, setCatComplementaryData)

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
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1" data-testid="indoorOutdoor">
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="indoor" data-testid="indoorOutdoor-indoor" />
                    </FormControl>
                    <FormLabel className="font-normal">Indoor Only</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="outdoor" data-testid="indoorOutdoor-outdoor" />
                    </FormControl>
                    <FormLabel className="font-normal">Outdoor Only</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="both" data-testid="indoorOutdoor-both" />
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
                <Input type="date" {...field} data-testid="lastFleaTreatment" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload your cat health report</FormLabel>
              <FormControl>
                <FormFileUpload
                  value={field.value}
                  onFileUploadComplete={file => {
                    field.onChange(file.name)
                    form.trigger('file') // trigger validation
                  }}
                  onFileRemove={() => {
                    form.setValue('file', '')
                    form.trigger('file') // trigger validation
                  }}
                />
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
              <Select onValueChange={field.onChange} defaultValue={field.value} data-testid="vaccinationStatus">
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select vaccination status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {vaccinationStatuses.map(status => (
                    <SelectItem key={status} value={status} data-testid={`vaccinationStatus-${status}`}>
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
            <Button type="button" variant="link" data-testid="back">
              <ArrowLeftIcon /> Back
            </Button>
          </Link>
          <Button type="submit" data-testid="next">
            Go to summary
          </Button>
        </div>
      </form>
    </Form>
  )
}

export const Route = createFileRoute('/book-appointment/cat/step-2')({
  component: CatComplementaryDataForm,
})
