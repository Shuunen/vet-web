import path from 'node:path'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config.ts'

const threshold = 90

// oxlint-disable-next-line no-anonymous-default-export, no-default-export
export default mergeConfig(
  viteConfig,
  defineConfig({
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
      projects: [
        // Regular unit tests project
        {
          resolve: {
            alias: {
              '@': path.resolve(__dirname, './src'),
            },
          },
          test: {
            environment: 'happy-dom',
            include: ['src/**/*.test.{ts,tsx}'],
            name: 'unit',
            pool: 'threads',
          },
        },
        // Storybook tests project
        {
          plugins: [
            storybookTest({
              // The location of your Storybook config, main.js|ts
              configDir: path.join(__dirname, '.storybook'),
              // This should match your package.json script to run Storybook
              // The --ci flag will skip prompts and not open a browser
              storybookScript: 'pnpm sb --ci',
            }),
          ],
          resolve: {
            alias: {
              '@': path.resolve(__dirname, './src'),
            },
          },
          test: {
            // Enable browser mode
            browser: {
              enabled: true,
              headless: true,
              instances: [{ browser: 'chromium' }],
              provider: 'playwright',
            },
            name: 'storybook',
            setupFiles: ['./.storybook/vitest.setup.ts'],
          },
        },
      ],
    },
  }),
)
