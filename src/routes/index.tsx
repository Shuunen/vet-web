import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Link, createFileRoute } from '@tanstack/react-router'
import { Calendar, Clock, PawPrint } from 'lucide-react'

function Index() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col items-center justify-center mb-12">
        <h1 className="text-4xl font-bold text-center text-primary">Medical Interface for Lovable Furballs</h1>
        <p className="mt-4 text-xl text-gray-600 text-center max-w-2xl">Providing the best care for your furry friends with our dedicated veterinary services</p>
      </div>

      <div className="flex justify-center">
        <Card>
          <CardHeader>
            <CardTitle>
              <Calendar className="mr-2 h-6 w-6" />
              Book an Appointment
            </CardTitle>
            <CardDescription>Schedule a visit with our veterinary specialists</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start">
                <Clock className="h-5 w-5 text-primary mr-3 mt-0.5" />
                <div>
                  <h3 className="font-medium">Quick and Easy Scheduling</h3>
                  <p className="text-gray-600">Book appointments in just a few clicks</p>
                </div>
              </div>
              <div className="flex items-start">
                <PawPrint className="h-5 w-5 text-primary mr-3 mt-0.5" />
                <div>
                  <h3 className="font-medium">Specialized Care</h3>
                  <p className="text-gray-600">Our veterinarians are experts in pet healthcare</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center pb-6 pt-2">
            <Link to="/book-appointment/step-1">
              <Button variant="default">Book Now</Button>
            </Link>
          </CardFooter>
        </Card>
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
