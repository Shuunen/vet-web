import { defineConfig } from 'vitest/config'
import path from 'node:path'

const threshold = 90

// oxlint-disable-next-line no-anonymous-default-export, no-default-export
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    coverage: {
      exclude: ['src/routeTree.gen.ts', 'src/routes/*', 'src/main.tsx', 'dist', '.storybook/main.ts', './*.config.[jt]s', '**/*.d.ts', './*.workspace.ts'],
      reporter: ['text', 'lcov', 'html'],
      thresholds: {
        branches: threshold,
        functions: threshold,
        lines: threshold,
        statements: threshold,
      },
    },
    environment: 'happy-dom',
  },
})
