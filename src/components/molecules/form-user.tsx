'use client'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { type Path, useFormContext } from 'react-hook-form'

type UserForm = {
  firstName: string
  lastName: string
}

type KeysWithUserForm<T> = { [K in keyof T]: T[K] extends UserForm ? K : never }[keyof T]

export function FormUser<Form extends object>({ name }: { name: KeysWithUserForm<Form> }) {
  const { control } = useFormContext<Form>()

  return (
    <div className="grid grid-cols-2 gap-4">
      <FormField
        control={control}
        name={`${String(name)}.firstName` as Path<Form>}
        render={({ field }) => (
          <FormItem>
            <FormLabel>First name(s)</FormLabel>
            <FormControl>
              <Input {...field} data-testid={field.name} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`${String(name)}.lastName` as Path<Form>}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Last name</FormLabel>
            <FormControl>
              <Input {...field} data-testid={field.name} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
