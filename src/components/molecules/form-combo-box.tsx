import { zodResolver } from '@hookform/resolvers/zod'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/utils/styling.utils'
import { Textarea } from '../ui/textarea.tsx'

const languages = [
  { label: 'English', value: 'en' },
  { label: 'French', value: 'fr' },
  { label: 'German', value: 'de' },
  { label: 'Spanish', value: 'es' },
  { label: 'Portuguese', value: 'pt' },
  { label: 'Russian', value: 'ru' },
  { label: 'Japanese', value: 'ja' },
  { label: 'Korean', value: 'ko' },
  { label: 'Chinese', value: 'zh' },
] as const

const FormSchema = z.object({
  language: z.string({
    // eslint-disable-next-line camelcase
    required_error: 'Please select a language.',
  }),
  // eslint-disable-next-line no-magic-numbers
  message: z.string().min(3, {
    message: 'Message must be at least 3 characters long.',
  }),
})

// eslint-disable-next-line max-lines-per-function
export function ComboboxForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  /* c8 ignore start */
  // eslint-disable-next-line consistent-function-scoping
  function onSubmit(data: z.infer<typeof FormSchema>) {
    // eslint-disable-next-line no-console
    console.log('onSubmit', data)
  }

  const onChange = () => {
    // eslint-disable-next-line no-console
    console.log('onChange', form.getValues())
  }
  /* c8 ignore end */

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} onChange={onChange} className="space-y-6">
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea data-testid={field.name} placeholder="Type your message here." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Language</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    {/* biome-ignore lint/a11y/useSemanticElements: it's ok */}
                    <Button testId="combo-box" variant="outline" role="combobox" className={cn('w-[200px] justify-between', !field.value && 'text-muted-foreground')} data-testid="language-combobox">
                      {field.value ? languages.find(language => language.value === field.value)?.label : 'Select language'}
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
                        {languages.map(language => (
                          <CommandItem
                            value={language.label}
                            key={language.value}
                            onSelect={() => {
                              /* c8 ignore next 2 */
                              form.setValue('language', language.value)
                            }}
                            data-testid={`language-option-${language.value}`}
                          >
                            {language.label}
                            <Check className={cn('ml-auto', language.value === field.value ? 'opacity-100' : 'opacity-0')} />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>This is the language that will be used in the dashboard.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button testId="submit" type="submit" data-testid="submit">
          Submit
        </Button>
      </form>
    </Form>
  )
}
