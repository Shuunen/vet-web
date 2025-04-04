/* eslint-disable @typescript-eslint/no-floating-promises */
import { Button } from '@/components/atoms/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/atoms/form'
import { Input } from '@/components/atoms/input'
import { Textarea } from '@/components/atoms/textarea'
import { useBookAppointmentStore } from '@/routes/book-appointment/-steps.store'
import { type DogComplementaryData, dogComplementaryDataSchema, hasAccess } from '@/routes/book-appointment/-steps.utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import { ArrowLeftIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'

// eslint-disable-next-line max-lines-per-function
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
    resolver: zodResolver(dogComplementaryDataSchema),
  })

  const onSubmit = (values: DogComplementaryData) => {
    setDogComplementaryData(values)
    navigate({ to: '/book-appointment/step-3' })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="breed"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Breed</FormLabel>
              <FormControl>
                <Input placeholder="Enter dog breed" {...field} />
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
                <Input type="number" placeholder="Enter dog weight" {...field} />
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
                <Textarea placeholder="Describe your dog's exercise routine" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between space-x-4 pt-4">
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

export const Route = createFileRoute('/book-appointment/dog/step-2')({
  component: DogComplementaryDataForm,
})
