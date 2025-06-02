import type { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form'

export type FieldBaseProps<TFieldValues extends FieldValues = FieldValues> = {
  /** the label above the field */
  label?: string
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  form: UseFormReturn<any> // eslint-disable-line @typescript-eslint/no-explicit-any
  /** the name of the field */
  name: FieldPath<TFieldValues>
  /** will show a red star if the label is defined */
  isRequired?: boolean
  /** used for data-testid */
  id: string
  placeholder?: string
  /** disable the N/A checkbox */
  disableNA?: boolean
}

/** The type of an option in a select or radio field */
export type Option = {
  /** the label of the option */
  label: string
  /** the value of the option */
  value: string
}
