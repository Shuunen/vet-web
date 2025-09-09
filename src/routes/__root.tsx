import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { TestIdChecker } from '@/components/dev/test-id-checker'
import { Header } from '@/components/molecules/header'
import { Toaster } from '@/components/ui/toaster'
import { SlotsProvider } from '@/components/dev/header-slot'

export const Route = createRootRoute({
  component: () => (
    <SlotsProvider>
    <div className="flex flex-col gap-4 h-full">
      <Header />
      <div className="border-stone-600 border-t mt-4 mb-2 w-1/3 mx-auto h-1" />
      <Outlet />
      {import.meta.env.DEV && <TestIdChecker />}
      <TanStackRouterDevtools />
      <Toaster />
    </div>
    </SlotsProvider>
  ),
})
