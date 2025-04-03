import { Button } from '@/components/atoms/button'
import { bookingSteps } from '@/utils/book-appointment.const'
import { useBookAppointmentStore } from '@/utils/book-appointment.store'
import { baseDataSchema, catComplementaryDataSchema, dogComplementaryDataSchema } from '@/utils/book-appointment.validation'
import { cn } from '@/utils/styling.utils'
import { Link } from '@tanstack/react-router'
import { CatIcon, CheckCircleIcon, CircleIcon, DogIcon } from 'lucide-react'

export function Stepper() {
  const { currentStep, data } = useBookAppointmentStore()
  const { success: baseValid } = baseDataSchema.safeParse(data.baseData)
  const { success: complementaryValid } = data.baseData.type === 'cat' ? catComplementaryDataSchema.safeParse(data.complementaryData) : dogComplementaryDataSchema.safeParse(data.complementaryData)

  const steps = [
    {
      completed: baseValid,
      path: '/book-appointment/step-1',
    },
    {
      completed: complementaryValid && baseValid,
      disabled: !baseValid,
      path: data.baseData.type === 'cat' ? '/book-appointment/cat/step-2' : '/book-appointment/dog/step-2',
    },
    {
      completed: complementaryValid && baseValid,
      disabled: !baseValid || !complementaryValid,
      path: '/book-appointment/step-3',
    },
  ]

  return (
    <div className="flex flex-col gap-6 border-r border-gray-200 pr-12 mr-12">
      {steps.map((step, index) => (
        <Link to={step.path} key={step.path} disabled={step.disabled} preload="intent">
          <Button variant="link" size="sm" disabled={step.disabled} className={cn('flex-1 h-full justify-start pl-0 hover:bg-transparent', step.disabled && 'opacity-50 cursor-not-allowed')}>
            <div className="flex">
              {step.completed ? <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2" /> : <CircleIcon className="w-5 h-5 text-gray-400 mr-2" />}
              <span className={cn(currentStep === index ? 'font-medium' : 'font-normal')}>{bookingSteps[index].step}</span>
            </div>
          </Button>
        </Link>
      ))}
      <div className="mx-auto opacity-10 size-1/2">{data.baseData.type === 'cat' ? <CatIcon className="size-full text-orange-700" /> : <DogIcon className="size-full text-green-700" />}</div>
    </div>
  )
}
