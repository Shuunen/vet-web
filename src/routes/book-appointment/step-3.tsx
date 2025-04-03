import { Button } from '@/components/atoms/button'
import { useBookAppointmentStore } from '@/utils/book-appointment.store'
import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowLeftIcon, Calendar1Icon } from 'lucide-react'

// eslint-disable-next-line max-lines-per-function
function SummaryPage() {
  const { data, setCurrentStep } = useBookAppointmentStore()
  // eslint-disable-next-line no-magic-numbers
  setCurrentStep(2)

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="text-gray-600">Pet Identifier:</div>
        <div>{data.baseData.identifier}</div>

        <div className="text-gray-600">Name:</div>
        <div>{data.baseData.name}</div>

        <div className="text-gray-600">Age:</div>
        <div>{data.baseData.age}</div>

        <div className="text-gray-600">Type:</div>
        <div className="capitalize">{data.baseData.type}</div>

        {'indoorOutdoor' in data.complementaryData ? (
          <>
            <div className="text-gray-600">Environment:</div>
            <div className="capitalize">{data.complementaryData.indoorOutdoor}</div>

            <div className="text-gray-600">Last Flea Treatment:</div>
            <div>{data.complementaryData.lastFleaTreatment}</div>

            <div className="text-gray-600">Vaccination Status:</div>
            <div>{data.complementaryData.vaccinationStatus}</div>
          </>
        ) : (
          <>
            <div className="text-gray-600">Breed:</div>
            <div>{data.complementaryData.breed}</div>

            <div className="text-gray-600">Weight:</div>
            <div>{data.complementaryData.weight} kg</div>

            <div className="text-gray-600">Exercise Routine:</div>
            <div>{data.complementaryData.exerciseRoutine}</div>
          </>
        )}
      </div>

      <div className="flex gap-18 mt-4">
        <Link to={`/book-appointment/${data.baseData.type}/step-2`}>
          <Button type="button" variant="link">
            <ArrowLeftIcon /> Back
          </Button>
        </Link>
        <Button>
          Book that appointment <Calendar1Icon />
        </Button>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/book-appointment/step-3')({
  component: SummaryPage,
})
