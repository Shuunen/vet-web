import { Header } from '@/components/molecules/header'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: () => (
    <div className="flex flex-col gap-4">
      <Header />
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  ),
})
