import { createFileRoute } from '@tanstack/react-router'
import { BookAppointmentCard } from '@/components/molecules/book-appointment-card'
import { useActionBar } from '@/hooks/useActionBar';
import { Button } from '@/components/ui/button';
import { HeadsetIcon } from 'lucide-react';

function Index() {
  
  useActionBar(<Button testId="call-us" variant="outline">
        Call us <HeadsetIcon />
      </Button>);
      
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col items-center justify-center mb-12">
        <h1 className="text-4xl font-bold text-center text-primary">Medical Interface for Lovable Furballs</h1>
        <p className="mt-4 text-xl text-gray-600 text-center max-w-2xl">Providing the best care for your furry friends with our dedicated veterinary services</p>
      </div>

      <div className="flex justify-center">
        <BookAppointmentCard />
      </div>

      <div className="mt-16 text-center text-gray-500">
        <p>Need assistance? Contact our clinic at (555) 123-4567</p>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: Index,
})
