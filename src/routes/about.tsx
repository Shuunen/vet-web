import { Button } from '@/components/ui/button'
import { Link, createFileRoute } from '@tanstack/react-router'

function About() {
  return (
    <div className="flex flex-col gap-4">
      <div>Hello from About!</div>
      <Link to="/">
        <Button variant="destructive">Go to home</Button>
      </Link>
    </div>
  )
}

export const Route = createFileRoute('/about')({
  component: About,
})
