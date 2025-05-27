/* eslint-disable no-console */
'use client'

import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { FormControl } from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import type { FieldBaseProps } from '@/utils/form.types'
import { cn } from '@/utils/styling.utils'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'
import type { ControllerRenderProps, FieldValues } from 'react-hook-form'

type PropsOption = { label: string; value: string }

/*
  | { label: string; value: string }
  | {
      label: string
      code: string
      version: string
    }
*/

type Props<TFieldValues extends FieldValues> = {
  field: ControllerRenderProps<TFieldValues>
  options: PropsOption[]
} & FieldBaseProps

export function Select<TFieldValues extends FieldValues>({ form, field, name, options }: Props<TFieldValues>) {
  const [selection, setSelection] = useState<string | undefined>(undefined)
  const [open, setOpen] = useState(false)

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <FormControl>
            {/* biome-ignore lint/a11y/useSemanticElements: he he nope */}
            <Button variant="outline" role="combobox" className={cn('w-[200px] justify-between', !field.value && 'text-muted-foreground')}>
              {field.value ? options.find(option => option.value === field.value)?.label : 'Select language'}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search framework..." className="h-9" />
            <CommandList>
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {options.map(option => (
                  <CommandItem
                    value={option.label}
                    key={option.value}
                    onSelect={() => {
                      form.setValue(name, option.value)
                      console.log('Selected:', option.value)
                      setSelection(option.value)
                      setOpen(false)
                    }}
                  >
                    {option.label}
                    <Check className={cn('ml-auto', option.value === field.value ? 'opacity-100' : 'opacity-0')} />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <pre>selection: {selection}</pre>
    </>
  )
}
