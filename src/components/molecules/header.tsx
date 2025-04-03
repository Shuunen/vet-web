/* c8 ignore start */
import { Link } from '@tanstack/react-router'
import { HeadsetIcon, PawPrint } from 'lucide-react'
import { Button } from '../atoms/button'

const routes = [
  /* eslint-disable sort-keys */
  { path: '/', label: 'Home' },
  { path: '/contact', label: 'Contact us' },
  { path: '/about', label: 'About' },
  /* eslint-enable sort-keys */
]

export function Header() {
  return (
    <div className="flex gap-4 justify-between items-center">
      <Link to="/" className="flex text-primary items-center gap-2">
        <PawPrint />
        <h1 className="font-bold">Vet Web</h1>
      </Link>
      <div className="flex gap-4">
        {routes.map(route => (
          <Link key={route.path} to={route.path} className="[&.active]:font-bold">
            {route.label}
          </Link>
        ))}
      </div>
      <Button variant="outline">
        Call us <HeadsetIcon />
      </Button>
    </div>
  )
}
