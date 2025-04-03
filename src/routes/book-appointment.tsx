import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/atoms/card'
import { SourceCode } from '@/components/atoms/source-code'
import { Stepper } from '@/components/molecules/book-appointment-stepper'
import { bookingSteps } from '@/utils/book-appointment.const'
import { useBookAppointmentStore } from '@/utils/book-appointment.store'
import { Outlet, createFileRoute } from '@tanstack/react-router'

function RouteComponent() {
  const { currentStep, data } = useBookAppointmentStore()

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold text-primary my-4 text-center">Book an appointment with Dr. Nicolas Johnrom</h1>
      <div className="flex mt-4">
        <Stepper />
        <Card className="w-full">
          <CardHeader>
            <CardTitle>{bookingSteps[currentStep].title}</CardTitle>
            <CardDescription>{bookingSteps[currentStep].description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Outlet />
          </CardContent>
          <CardFooter />
        </Card>
      </div>
      <SourceCode className="mt-4" code={data} />
    </div>
  )
}

export const Route = createFileRoute('/book-appointment')({
  component: RouteComponent,
})
