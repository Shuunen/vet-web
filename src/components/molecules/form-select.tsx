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
import { type PropsOption, handleSelect, isOptionSelected } from './form-select.utils'

const EMPTY_SELECTION = 0
const MIN_OPTIONS_FOR_SEARCH = 10

type Props<TFieldValues extends FieldValues = FieldValues> = {
  field: ControllerRenderProps<TFieldValues>
  options: PropsOption[]
  multiple?: boolean
} & FieldBaseProps

export function FormSelect<TFieldValues extends FieldValues>({ form, field, name, options, placeholder, multiple }: Props<TFieldValues>) {
  const [open, setOpen] = useState(false)
  const selectedOptions = options.filter(option => isOptionSelected(option, field.value))
  const displayValue = selectedOptions.length > EMPTY_SELECTION ? selectedOptions.map(opt => opt.label).join(', ') : (placeholder ?? 'Select')

  function onSelect(option: PropsOption) {
    const shouldClose = handleSelect({ fieldValue: field.value, form, multiple, name, option })
    if (shouldClose) setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          {/* biome-ignore lint/a11y/useSemanticElements: he he nope */}
          <Button variant="outline" role="combobox" className={cn('min-w-48 max-w-96 justify-between', !field.value && 'text-muted-foreground')}>
            <span className="truncate">{displayValue}</span>
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          {options.length >= MIN_OPTIONS_FOR_SEARCH && <CommandInput placeholder={`Search ${name}...`} className="h-9" />}
          <CommandList>
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandGroup>
              {options.map(option => (
                <CommandItem
                  value={option.label}
                  key={'value' in option ? option.value : option.Code}
                  data-testid={`${name}-${'value' in option ? option.value : option.Code}`}
                  onSelect={() => {
                    onSelect(option)
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
