'use client'

import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { FormControl } from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import type { CodeVersion, CodeVersionLabel } from '@/utils/cvl.types'
import type { FieldBaseProps, Option } from '@/utils/form.types'
import { logger } from '@/utils/logger.utils'
import { cn } from '@/utils/styling.utils'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'
import type { ControllerRenderProps, FieldValues } from 'react-hook-form'

const EMPTY_SELECTION = 0
const MIN_OPTIONS_FOR_SEARCH = 10

type PropsOption = Option | CodeVersionLabel

type Props<TFieldValues extends FieldValues = FieldValues> = {
  field: ControllerRenderProps<TFieldValues>
  options: PropsOption[]
  multiple?: boolean
} & FieldBaseProps

function isCodeVersion(value: unknown): value is CodeVersion {
  return typeof value === 'object' && value !== null && 'Code' in value && 'Version' in value
}

function isStringValue(value: unknown): value is string {
  return typeof value === 'string'
}

function isEqual(valueA: unknown, valueB: unknown): boolean {
  if (isStringValue(valueA) && isStringValue(valueB)) return valueA === valueB
  if (isCodeVersion(valueA) && isCodeVersion(valueB)) return valueA.Code === valueB.Code && valueA.Version === valueB.Version
  return false
}

function getOptionValue(option: PropsOption): string | CodeVersion {
  return 'value' in option ? option.value : { Code: option.Code, Version: option.Version }
}

function isOptionSelected(option: PropsOption, value?: Option['value'] | CodeVersion | (Option['value'] | CodeVersion)[]) {
  if (!value) return false
  const optionValue = getOptionValue(option)
  if (Array.isArray(value)) return value.some(val => isEqual(val, optionValue))
  return isEqual(value, optionValue)
}

// eslint-disable-next-line max-lines-per-function
export function FormSelect<TFieldValues extends FieldValues>({ form, field, name, options, placeholder, multiple }: Props<TFieldValues>) {
  const [open, setOpen] = useState(false)
  const selectedOptions = options.filter(option => isOptionSelected(option, field.value))
  const displayValue = selectedOptions.length > EMPTY_SELECTION ? selectedOptions.map(opt => opt.label).join(', ') : (placeholder ?? 'Select')

  function handleSelect(option: PropsOption) {
    const newValue = getOptionValue(option)
    if (multiple) {
      const currentValue = Array.isArray(field.value) ? field.value : []
      const valueExists = currentValue.some(value => isEqual(value, newValue))
      const updatedValue = valueExists ? currentValue.filter(value => !isEqual(value, newValue)) : [...currentValue, newValue]
      form.setValue(name, updatedValue)
      logger.info(`Toggled ${name}:`, updatedValue)
    } else {
      form.setValue(name, newValue)
      logger.info(`Selected ${name}:`, newValue)
      setOpen(false)
    }
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
                    handleSelect(option)
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
