import { type ReactElement, useEffect } from 'react'
import type { ControllerRenderProps, FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { Checkbox } from '@/components/ui/checkbox'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'

type OptionalSectionProps<TFieldValues extends FieldValues = FieldValues> = {
  form: UseFormReturn<TFieldValues>
  checkboxName: Path<TFieldValues>
  checkboxLabel: string
  checkboxTestId?: string
  conditionalFieldName: Path<TFieldValues>
  children: (field: ControllerRenderProps<TFieldValues>) => ReactElement
}

export function OptionalSection<TFieldValues extends FieldValues = FieldValues>({ form, checkboxName, checkboxLabel, checkboxTestId, conditionalFieldName, children }: OptionalSectionProps<TFieldValues>) {
  // Watch the checkbox value
  const isChecked = form.watch(checkboxName)

  // Clear the conditional field when checkbox is unchecked
  useEffect(() => {
    if (!isChecked) form.setValue(conditionalFieldName, '' as unknown as TFieldValues[Path<TFieldValues>])
  }, [isChecked, form, conditionalFieldName])

  return (
    <>
      <FormField
        control={form.control}
        name={checkboxName}
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox checked={field.value} onCheckedChange={field.onChange} data-testid={checkboxTestId} />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>{checkboxLabel}</FormLabel>
            </div>
          </FormItem>
        )}
      />

      {isChecked && <FormField control={form.control} name={conditionalFieldName} render={fieldProps => children(fieldProps.field)} />}
    </>
  )
}
