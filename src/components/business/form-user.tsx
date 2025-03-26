'use client'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useFormContext } from 'react-hook-form'

export function FormUser({ name }: { name: string }) {
  const { control } = useFormContext()

  return (
    <div className="grid grid-cols-2 gap-4">
      <FormField
        control={control}
        name={`${name}.firstName`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>First name(s)</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`${name}.lastName`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Last name</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
