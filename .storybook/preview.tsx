import type { Preview } from '@storybook/react-vite'
import { RouterProvider, createMemoryHistory, createRootRoute, createRouter } from '@tanstack/react-router'
import '../src/index.css'

const preview: Preview = {
  decorators: [
    Story => {
      return (
        <RouterProvider
          router={createRouter({
            history: createMemoryHistory(),
            routeTree: createRootRoute({
              component: Story,
            }),
          })}
        />
      )
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
