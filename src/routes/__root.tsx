import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

const routes = [
  { path: '/', label: 'Home' },
  { path: '/contact', label: 'Contact us' },
  { path: '/about', label: 'About' },
]

export const Route = createRootRoute({
  component: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        {routes.map(route => (
          <Link key={route.path} to={route.path} className="[&.active]:font-bold">
            {route.label}
          </Link>
        ))}
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  ),
})
