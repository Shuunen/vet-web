import { createFileRoute, Link } from '@tanstack/react-router'
import { FileInputIcon, HeadsetIcon } from 'lucide-react'
import { FormContact } from '@/components/molecules/form-contact'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { UseSlot } from '@/components/dev/header-slot'

function Contact() {
  return (
  <>
    <UseSlot name="toolbar" >
      <Button testId="call-us" variant="outline">
        Call us <HeadsetIcon />
      </Button>
    </UseSlot>
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>
            <FileInputIcon className="mr-2 h-6 w-6" />
            Contact Us
          </CardTitle>
          <CardDescription>We are here to assist you!</CardDescription>
        </CardHeader>
        <CardContent>
          <FormContact />
        </CardContent>
        <CardFooter>
          <Link to="/" className="mb-6">
            <Button testId="go-home" variant="destructive">
              Go to home
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  </>
  )
}

export const Route = createFileRoute('/contact')({
  component: Contact,
})
