import { SourceCode } from '@/components/ui/source-code'
import { ages } from '@/utils/age.utils'
import { breeds } from '@/utils/breed.utils'
import type { CodeVersionLabel } from '@/utils/cvl.types'
import type { Option } from '@/utils/form.types'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useEffect, useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { FormSelect } from './form-select'

type PropsOption = Option | CodeVersionLabel

interface FormSelectStoryProps {
  options: PropsOption[]
  id: string
  name: string
  placeholder?: string
}

function FormSelectWrapper({ name, options, id, placeholder, ...rest }: FormSelectStoryProps) {
  const methods = useForm({ defaultValues: { [name]: '' } })
  const [formValues, setFormValues] = useState<Record<string, string | undefined>>(methods.getValues())

  useEffect(() => {
    const subscription = methods.watch(value => {
      setFormValues(value)
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [methods])

  return (
    <div className="space-y-4">
      <FormProvider {...methods}>
        <Controller name={name} control={methods.control} render={({ field }) => <FormSelect {...rest} id={id} name={name} options={options} placeholder={placeholder} field={field} form={methods} />} />
      </FormProvider>
      <SourceCode code={formValues} />
    </div>
  )
}

const meta = {
  component: FormSelectWrapper,
  parameters: {
    layout: 'centered',
  },
  render: args => <FormSelectWrapper {...args} />,
  tags: ['autodocs'],
  title: 'Molecules/FormSelect',
} satisfies Meta<typeof FormSelectWrapper>

export default meta
type Story = StoryObj<typeof meta>

export const StringValue: Story = {
  args: {
    id: 'breed',
    name: 'breed',
    options: breeds,
    placeholder: 'Select the breed',
  },
}

export const ObjectValue: Story = {
  args: {
    id: 'age',
    name: 'age',
    options: ages,
    placeholder: 'Select the age range',
  },
}
