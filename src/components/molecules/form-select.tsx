/* eslint-disable no-console */
'use client'

import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { FormControl } from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import type { CodeVersion, CodeVersionLabel } from '@/utils/cvl.types'
import type { FieldBaseProps, Option } from '@/utils/form.types'
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
 6. handle multiple selection

*/

type PropsOption = Option | CodeVersionLabel

type Props<TFieldValues extends FieldValues = FieldValues> = {
  field: ControllerRenderProps<TFieldValues>
  options: PropsOption[]
} & FieldBaseProps

function isOptionSelected(option: PropsOption, value?: Option['value'] | CodeVersion) {
  if (!value) return false
  if (typeof value === 'string') return 'value' in option && option.value === value
  return 'Code' in option && option.Code === value.Code && option.Version === value.Version
}

export function FormSelect<TFieldValues extends FieldValues>({ form, field, name, options, placeholder }: Props<TFieldValues>) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          {/* biome-ignore lint/a11y/useSemanticElements: he he nope */}
          <Button variant="outline" role="combobox" className={cn('w-[200px] justify-between', !field.value && 'text-muted-foreground')}>
            {options.find(option => isOptionSelected(option, field.value))?.label ?? placeholder ?? 'Select'}
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
                  key={'value' in option ? option.value : option.Code}
                  onSelect={() => {
                    const value = 'value' in option ? option.value : ({ Code: option.Code, Version: option.Version } satisfies CodeVersion)
                    form.setValue(name, value)
                    console.log('selected :', value)
                    setOpen(false)
                  }}
                >
                  {option.label}
                  <Check className={cn('ml-auto', isOptionSelected(option, field.value) ? 'opacity-100' : 'opacity-0')} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
