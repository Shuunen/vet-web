import { zodResolver } from '@hookform/resolvers/zod'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod/v4'
import { Button } from '../ui/button'
import { Form } from '../ui/form'
import { SourceCode } from '../ui/source-code'
import { FormFileUpload } from './form-file-upload'
import { documentAccept, documentFileSchema } from './form-file-upload.utils'

const meta = {
  component: FormFileUploadStoryWrapper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'molecules/FormFileUpload',
} satisfies Meta<typeof FormFileUploadStoryWrapper>

export default meta
type Story = StoryObj<typeof meta>

const fileFormSchema = z.object({
  file: documentFileSchema,
})

type FileForm = z.infer<typeof fileFormSchema>

// Wrapper to avoid code duplication in stories
function FormFileUploadStoryWrapper({ defaultValues, shouldFail = false }: { defaultValues?: Partial<FileForm>; shouldFail?: boolean } = {}) {
  const form = useForm<FileForm>({
    defaultValues,
    resolver: zodResolver(fileFormSchema),
  })
  const value = form.watch('file')
  const [formSubmitted, setFormSubmitted] = useState(false)
  const onSubmit = form.handleSubmit(() => {
    setFormSubmitted(true)
  })
  return (
    <div className="flex flex-col gap-6">
      <Form {...form}>
        <form className="space-y-4" onSubmit={onSubmit}>
          <FormFileUpload accept={documentAccept} name={'file'} id={'file'} form={form} schema={documentFileSchema} shouldFail={shouldFail} />
          <Button testId="submit" type="submit">
            Submit
          </Button>
        </form>
      </Form>
      <SourceCode code={{ accept: documentAccept, fileNameSelected: value?.name, formValid: form.formState.isValid, formSubmitted }} />
    </div>
  )
}

export const Default: Story = {
  render: () => <FormFileUploadStoryWrapper />,
}

export const WithExistingFile: Story = {
  render: () => {
    // oxlint-disable-next-line no-undef
    const existingFile = new File(['test'], 'test.txt', { type: 'text/plain' })
    return <FormFileUploadStoryWrapper defaultValues={{ file: existingFile }} />
  },
}

export const SimulateServerError: Story = {
  render: () => <FormFileUploadStoryWrapper shouldFail={true} />,
}

export const BadlyFormattedFile: Story = {
  render: () => {
    // @ts-expect-error Simulating a badly formatted file
    return <FormFileUploadStoryWrapper defaultValues={{ file: {} }} />
  }
}