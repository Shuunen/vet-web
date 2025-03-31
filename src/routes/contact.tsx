import { Button } from '@/components/atoms/button'
import { Card, CardContent } from '@/components/atoms/card'
import { FormContact } from '@/components/molecules/form-contact'
import { Link, createFileRoute } from '@tanstack/react-router'
import { FileInputIcon } from 'lucide-react'

function Contact() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        If you want to contact us please fill the form <FileInputIcon className="inline" /> below :
      </div>
      <Card>
        <CardContent>
          <FormContact />
        </CardContent>
      </Card>
      <Link to="/">
        <Button variant="destructive">Go to home</Button>
      </Link>
    </div>
  )
}

export const Route = createFileRoute('/contact')({
  component: Contact,
})
