import { defineConfig } from 'vitest/config'
import path from 'node:path'

const threshold = 70

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'happy-dom',
    coverage: {
      reporter: ['text', 'lcov', 'html'],
      exclude: ['src/routeTree.gen.ts', 'src/routes/*', 'src/main.tsx', 'dist', '.storybook/main.ts', './*.config.[jt]s', '**/*.d.ts', './*.workspace.ts'],
      thresholds: {
        branches: threshold,
        functions: threshold,
        lines: threshold,
        statements: threshold,
      },
    },
  },
})
