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

/*
 to be done ^^ : 
 
 1. add zod validation
 2. do we need to check version too ? option.value.version === value.version
 3. array / add more options
 4. handle N/A
 5. hide search input if options.length < 10

*/

type PropsOption = {
  label: string
  value:
    | string
    | {
        code: string
        version: number
      }
}

type Props<TFieldValues extends FieldValues = FieldValues> = {
  field: ControllerRenderProps<TFieldValues>
  options: PropsOption[]
} & FieldBaseProps

function getSelection(options: Props['options'], value?: PropsOption['value']) {
  if (!value) return undefined
  if (typeof value === 'string') return options.find(option => option.value === value)
  if (typeof value === 'object' && 'code' in value)
    return options.find(option => {
      if (typeof option.value === 'object' && 'code' in option.value) return option.value.code === value.code // option.value.version === value.version
      return undefined
    })
  return undefined
}

export function Select<TFieldValues extends FieldValues>({ form, field, name, options, placeholder }: Props<TFieldValues>) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          {/* biome-ignore lint/a11y/useSemanticElements: he he nope */}
          <Button variant="outline" role="combobox" className={cn('w-[200px] justify-between', !field.value && 'text-muted-foreground')}>
            {getSelection(options, field.value)?.label ?? placeholder ?? 'Select'}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={`Search ${name}...`} className="h-9" />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {options.map(option => (
                <CommandItem
                  value={option.label}
                  key={typeof option.value === 'string' ? option.value : option.value.code}
                  onSelect={() => {
                    form.setValue(name, option.value)
                    console.log('selected:', option.value)
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
  )
}
