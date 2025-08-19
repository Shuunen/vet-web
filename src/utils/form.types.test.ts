import type { UseFormReturn } from 'react-hook-form'
import { describe, expectTypeOf, it } from 'vitest'
import type { FieldBaseProps, Option } from './form.types.ts'

describe('form.types', () => {
  it('should define Option type correctly', () => {
    expectTypeOf<Option>().toEqualTypeOf<{
      label: string
      value: string
    }>()
  })

  it('should allow creating valid Option objects', () => {
    const option: Option = {
      label: 'Test Label',
      value: 'test-value',
    }
    expectTypeOf(option).toMatchTypeOf<Option>()
  })

  it('should define FieldBaseProps type correctly', () => {
    type TestFieldValues = { name: string }

    expectTypeOf<FieldBaseProps<TestFieldValues>>().toMatchTypeOf<{
      label?: string
      // biome-ignore lint/suspicious/noExplicitAny: we need that
      form: UseFormReturn<any> // eslint-disable-line @typescript-eslint/no-explicit-any
      name: keyof TestFieldValues
      isRequired: boolean
      testId: string
      placeholder?: string
      disableNA?: boolean
    }>()
  })

  it('should allow creating valid FieldBaseProps objects', () => {
    // biome-ignore lint/suspicious/noExplicitAny: we need that
    const mockForm = {} as UseFormReturn<any> // eslint-disable-line @typescript-eslint/no-explicit-any

    const fieldProps: FieldBaseProps<{ name: string }> = {
      form: mockForm,
      name: 'name',
      isRequired: true,
      testId: 'test-field',
      label: 'Test Label',
      placeholder: 'Enter text',
      disableNA: false,
    }
    expectTypeOf(fieldProps).toMatchTypeOf<FieldBaseProps<{ name: string }>>()
  })
})
