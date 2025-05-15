import { debounce } from 'es-toolkit'
import { useEffect } from 'react'

type Form<TValues> = {
  watch: (callback: (values: TValues) => void) => {
    unsubscribe: () => void
  }
}

/**
 * useFormPersist is a custom hook that subscribes to form value changes
 * and calls a callback function with the current form values.
 *
 * @param form - The form object from react-hook-form.
 * @param callback - A function that takes the form values
 */
export function useFormChangeDetector<TValues>(form: Form<TValues>, callback: (values: TValues) => void) {
  // eslint-disable-next-line no-magic-numbers
  const debouncedCallback = debounce(callback, 300)
  useEffect(() => {
    const subscription = form.watch((values: TValues) => {
      debouncedCallback(values)
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [form, debouncedCallback])
}
