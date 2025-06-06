import { FormFileUpload } from '@/components/molecules/form-file-upload'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useBookAppointmentStore } from '@/routes/book-appointment/-steps.store'
import { type DogComplementaryData, dogComplementaryDataSchema, hasAccess } from '@/routes/book-appointment/-steps.utils'
import { customResolver, useFormChangeDetector } from '@/utils/form.utils'
import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import { ArrowLeftIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'

// eslint-disable-next-line max-lines-per-function, max-statements
function DogComplementaryDataForm() {
  const navigate = useNavigate()
  const { data, setDogComplementaryData, setCurrentStep } = useBookAppointmentStore()
  const step = 1

  const check = hasAccess(step, 'dog', data)
  if (!check.ok) navigate({ to: '/book-appointment/step-1' })
  setCurrentStep(step)

  const complementaryData = data.complementaryData as DogComplementaryData

  const form = useForm<DogComplementaryData>({
    defaultValues: complementaryData,
    resolver: customResolver(dogComplementaryDataSchema),
  })

  const onSubmit = () => {
    navigate({ to: '/book-appointment/step-3' })
  }

  useFormChangeDetector(form, setDogComplementaryData)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <FormControl>
                <Input placeholder="Enter dog color" {...field} data-testid="color" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Weight (kg)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter dog weight" {...field} data-testid="weight" />
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
              <FormLabel>Upload your dog health report</FormLabel>
              <FormControl>
                <FormFileUpload onFileChange={file => field.onChange(file?.name)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="exerciseRoutine"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Exercise Routine</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe your dog's exercise routine" {...field} data-testid="exerciseRoutine" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between space-x-4 pt-4">
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

export const Route = createFileRoute('/book-appointment/dog/step-2')({
  component: DogComplementaryDataForm,
})
