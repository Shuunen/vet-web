import type { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form'

export type FieldBaseProps<TFieldValues extends FieldValues = FieldValues> = {
  /** the label above the field */
  label?: string
  form: UseFormReturn<TFieldValues>
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
