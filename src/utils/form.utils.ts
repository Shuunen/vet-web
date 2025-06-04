import { debounce } from 'es-toolkit'
import { useEffect } from 'react'
import type { FieldError, FieldErrors, FieldValues, UseFormReturn } from 'react-hook-form'
import { type ZodError, type ZodObject, z } from 'zod/v4'
import type { Option } from './form.types'

/**
 * Utility to convert ZodError to Hook Form-compatible FieldErrors
 * @author https://github.com/react-hook-form/react-hook-form/issues/12816
 * @param zodError - The ZodError instance to convert
 * @returns A FieldErrors object compatible with react-hook-form
 */
function zodToHookFormErrors(zodError: ZodError): FieldErrors {
  const errors: FieldErrors = {}
  for (const issue of zodError.issues) {
    const path = issue.path.join('.') || 'root'
    errors[path] = { message: issue.message, type: issue.code } as FieldError
  }
  return errors
}

/**
 * Custom resolver for useForm()
 * @author https://github.com/react-hook-form/react-hook-form/issues/12816
 * @param schema - A ZodObject schema to validate form values against
 * @returns A function that validates form values against a Zod schema
 */
export function customResolver(schema: ZodObject) {
  return async (values: FieldValues): Promise<{ values: FieldValues; errors: FieldErrors }> => {
    try {
      const result = await schema.safeParseAsync(values)
      if (result.success) return { errors: {}, values: result.data as FieldValues }
      return { errors: zodToHookFormErrors(result.error), values: {} }
    } catch (error) {
      const message = `An unknown error occurred during validation : ${String(error)}`
      return { errors: { root: { message, type: 'unknown' } as FieldError }, values: {} }
    }
  }
}

/**
 * useFormPersist is a custom hook that subscribes to form value changes
 * and calls a callback function with the current form values.
 *
 * @param form - The form object from react-hook-form.
 * @param callback - A function that takes the form values
 */
export function useFormChangeDetector<TValues extends FieldValues>(form: UseFormReturn<TValues>, callback: (values: TValues) => void) {
  // eslint-disable-next-line no-magic-numbers
  const debouncedCallback = debounce(callback, 300)
  useEffect(() => {
    // eslint-disable-next-line max-nested-callbacks
    const subscription = form.watch(values => {
      debouncedCallback(structuredClone(values as TValues))
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [form, debouncedCallback])
}

export function optionToSchema<Type extends Option>(list: Type[]) {
  return z.enum<Type['value'][]>(list.map(option => option.value))
}
