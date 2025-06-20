import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

function About() {
  return (
    <div className="flex flex-col gap-4">
      <div>Hello from About!</div>
      <Link to="/">
        <Button testId="go-home" variant="destructive">
          Go to home
        </Button>
      </Link>
    </div>
  )
}

export const Route = createFileRoute('/about')({
  component: About,
})
