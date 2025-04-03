import { defineConfig } from 'vitest/config'

const threshold = 30

export default defineConfig({
  test: {
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
