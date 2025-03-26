import { Button } from '@/components/ui/button'
import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="flex flex-col gap-4">
      <h3>Welcome Home!</h3>
      <p>This is a simple example of a TanStack project.</p>
      <div>
        <Link to="/about">
          <Button>Go to about</Button>
        </Link>
      </div>
    </div>
  )
}
