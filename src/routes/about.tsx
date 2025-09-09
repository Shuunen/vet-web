import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { UseSlot } from '@/components/dev/header-slot'
import { HeadsetIcon } from 'lucide-react'


function About() {

  return (
    <>
    <UseSlot name="toolbar" >
      <Button testId="call-us" variant="outline">
        Visit our website <HeadsetIcon />
      </Button>
    </UseSlot>
    <div className="flex flex-col gap-4">
      <div>Hello from About!</div>
      <Link to="/">
        <Button testId="go-home" variant="destructive">
          Go to home
        </Button>
      </Link>
    </div>
    </>
  )
}

export const Route = createFileRoute('/about')({
  component: About,
})
