/* eslint-disable @typescript-eslint/no-floating-promises */
import { Button } from '@/components/atoms/button'
import { useBookAppointmentStore } from '@/routes/book-appointment/-steps.store'
import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import { ArrowLeftIcon, Calendar1Icon } from 'lucide-react'
import { toast } from 'sonner'
import { hasAccess } from './-steps.utils'

function SummaryPage() {
  const navigate = useNavigate()
  const { data, setCurrentStep } = useBookAppointmentStore()
  const step = 2
  const variant = data.baseData.type

  const check = hasAccess(step, variant, data)
  if (!check.ok) navigate({ to: `/book-appointment/${variant}/step-2` })
  setCurrentStep(step)

  async function onBook() {
    toast.success('Appointment booked successfully!')
    await navigate({ params: { status: 'success', type: 'appointment' }, to: '/status/$status/$type' })
  }

  return (
    <div className="flex flex-col gap-2">
      <h3 className="col-span-2 font-bold text-xl">Base data</h3>
      {Object.entries(data.baseData).map(([key, value]) => (
        <div className="grid grid-cols-2" key={key}>
          <div className="text-gray-500">{key}</div>
          <div>{value}</div>
        </div>
      ))}

      <h3 className="col-span-2 font-bold text-xl">Complementary data</h3>
      {Object.entries(data.complementaryData).map(([key, value]) => (
        <div className="grid grid-cols-2" key={key}>
          <div className="text-gray-500">{key}</div>
          <div>{value}</div>
        </div>
      ))}

      <div className="flex gap-18 mt-6">
        <Link to={`/book-appointment/${data.baseData.type}/step-2`}>
          <Button type="button" variant="link">
            <ArrowLeftIcon /> Back
          </Button>
        </Link>
        <Button type="button" onClick={onBook}>
          Book that appointment <Calendar1Icon />
        </Button>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/book-appointment/step-3')({
  component: SummaryPage,
})
