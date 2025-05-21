import type { Meta, StoryObj } from '@storybook/react'
import { TestIdChecker } from './test-id-checker'

type DemoProps = {
  withTestIds?: boolean
  hasDuplicates?: boolean
  description?: string
}

const DemoPage = ({ withTestIds = true, hasDuplicates = false, description }: DemoProps) => {
  const getTestId = (id: string) => (withTestIds ? { 'data-testid': id } : {})

  return (
    <div className="px-4 py-28 space-y-4">
      {description && (
        <div className="mb-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 rounded">
          <p>{description}</p>
        </div>
      )}
      {withTestIds ? (
        <>
          <div {...getTestId('header-section')}>
            <h1 className="text-2xl font-bold mb-4" {...getTestId(hasDuplicates ? 'duplicate-id' : 'header-title')}>
              Welcome to Our App
            </h1>
            <p {...getTestId(hasDuplicates ? 'duplicate-id' : 'header-description')}>This is a sample page to demonstrate the TestIdChecker component.</p>
          </div>

          <div {...getTestId('content-section')}>
            <button type="button" {...getTestId('primary-button')} className="px-4 py-2 bg-blue-500 text-white rounded">
              Click Me
            </button>
            <input type="text" {...getTestId('search-input')} className="ml-4 px-4 py-2 border rounded" placeholder="Search..." />
          </div>

          <div {...getTestId('footer-section')}>
            <span {...getTestId('copyright-text')}>© 2024 Sample App</span>
          </div>
        </>
      ) : (
        <div>
          <h1 className="text-2xl font-bold">Welcome to Our App</h1>
          <p className="mt-4">This page doesn't use any data-testid attributes.</p>
        </div>
      )}

      <TestIdChecker />
    </div>
  )
}

const meta = {
  component: DemoPage,
  title: 'Dev/TestIdChecker',
} satisfies Meta<typeof DemoPage>

export default meta
type Story = StoryObj<typeof meta>

export const UniqueTestIds: Story = {
  args: {
    description: 'Shows the TestIdChecker component with unique data-testid attributes. The panel will display a list of all elements with their unique test IDs.',
    hasDuplicates: false,
    withTestIds: true,
  },
}

export const DuplicateTestIds: Story = {
  args: {
    description: 'Demonstrates how the TestIdChecker component handles duplicate data-testid attributes. The panel will highlight the duplicate test IDs.',
    hasDuplicates: true,
    withTestIds: true,
  },
}

export const NoTestIds: Story = {
  args: {
    description: 'Shows the TestIdChecker component in a context where no elements have data-testid attributes. The panel will display "No data-testid found" message.',
    hasDuplicates: false,
    withTestIds: false,
  },
}

export const InvalidTestIds: Story = {
  args: {
    description: 'Demonstrates how the TestIdChecker component handles invalid data-testid attributes. Test IDs containing characters other than letters, numbers, and dashes will be highlighted in red with a warning icon.',
    hasDuplicates: false,
    withTestIds: true,
  },
  render: () => (
    <div className="px-4 py-28 space-y-4">
      <div className="mb-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 rounded">
        <p>This example shows how the TestIdChecker component handles invalid test IDs. Test IDs containing characters other than letters, numbers, and dashes will be highlighted in red with a warning icon.</p>
      </div>

      <div data-testid="valid-section">
        <h1 className="text-2xl font-bold mb-4" data-testid="valid-title">
          Welcome to Our App
        </h1>
        <p data-testid="valid-description">This is a sample page with some invalid test IDs.</p>
      </div>

      <div>
        <button type="button" data-testid="button@click" className="px-4 py-2 bg-blue-500 text-white rounded">
          Invalid Button
        </button>
        <input type="text" data-testid="search.input" className="ml-4 px-4 py-2 border rounded" placeholder="Search..." />
        <span data-testid="text with spaces" className="ml-4">
          Invalid Text
        </span>
        <div data-testid="special#chars" className="mt-4 p-2 bg-gray-100 rounded">
          Invalid Container
        </div>
      </div>

      <TestIdChecker />
    </div>
  ),
}
