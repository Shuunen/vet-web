import { Button } from '@/components/ui/button'
import { Link, createFileRoute } from '@tanstack/react-router'
import { FileInputIcon } from 'lucide-react'

export const Route = createFileRoute('/contact')({
  component: Contact,
})

function Contact() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        If you want to contact us please fill the form <FileInputIcon className="inline" /> below :
      </div>
      <Link to="/">
        <Button variant="destructive">Go to home</Button>
      </Link>
    </div>
  )
}
