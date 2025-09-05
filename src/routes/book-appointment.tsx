import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { SourceCode } from '@/components/ui/source-code'
import { Stepper } from '@/routes/book-appointment/-stepper'
import { bookingSteps } from '@/routes/book-appointment/-steps.const'
import { useBookAppointmentStore } from '@/routes/book-appointment/-steps.store'
import { useActionBar } from '@/hooks/useActionBar'
import { Button } from '@/components/ui/button'
import { CheckIcon } from 'lucide-react'

function RouteComponent() {
  const { currentStep, data } = useBookAppointmentStore()

  useActionBar(<Button testId="call-us" variant="outline">
        Confirm appointment <CheckIcon />
      </Button>);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold text-primary my-4 text-center" data-testid="title">
        Book an appointment with Dr. Nicolas Johnrom
      </h1>
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
