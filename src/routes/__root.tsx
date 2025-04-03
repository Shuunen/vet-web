import { Toaster } from '@/components/atoms/toaster'
import { Header } from '@/components/molecules/header'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: () => (
    <div className="flex flex-col gap-4 h-full">
      <Header />
      <div className="border-stone-600 border-t mt-4 mb-2 w-1/3 mx-auto h-1" />
      <Outlet />
      <TanStackRouterDevtools />
      <Toaster />
    </div>
  ),
})
