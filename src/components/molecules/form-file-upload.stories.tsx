import { logger } from '@/utils/logger.utils'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useForm } from 'react-hook-form'
import { fn } from 'storybook/test'
import { z } from 'zod/v4'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { SourceCode } from '../ui/source-code'
import { FormFileUpload } from './form-file-upload'

const meta = {
  component: FormFileUpload,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'molecules/FormFileUpload',
  args: {
    onFileChange: fn(),
    onFileUploadComplete: fn(),
    onFileUploadError: fn(),
    onFileRemove: fn(),
  },
} satisfies Meta<typeof FormFileUpload>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

/**
 * This story simulates a file upload that already has a file selected.
 */
export const WithFileSelected: Story = {
  args: {
    value: 'dog-health-report.pdf',
  },
}

/**
 * This story simulates a file upload that will fail on server side.
 */
export const WillFail: Story = {
  args: {
    shouldFail: true,
  },
}

// oxlint-disable-next-line no-undef
const emptyFile = new File([], '')

const fileSchema = z.file().check(ctx => {
  if (ctx.value.name === '') {
    ctx.issues.push({
      code: 'custom',
      message: 'File is required',
      continue: false,
      input: ctx.value,
    })
    return
  }
  const ext = ctx.value.name.split('.').pop()
  if (ext === undefined) {
    ctx.issues.push({
      code: 'custom',
      message: 'File has no extension',
      continue: false,
      input: ctx.value,
    })
    return
  }
  const allowed = ['pdf', 'doc', 'docx', 'txt']
  if (!allowed.includes(ext))
    ctx.issues.push({
      code: 'custom',
      message: `File extension not allowed, accepted : ${allowed.join(', ')}`,
      continue: false,
      input: ctx.value,
    })
})

const fileFormSchema = z.object({
  file: fileSchema,
})

type FileForm = z.infer<typeof fileFormSchema>

/**
 * This story demonstrates how to use the FormFileUpload component within a form.
 */
export const InForm: Story = {
  // oxlint-disable-next-line require-returns
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const form = useForm<FileForm>({
      defaultValues: { file: emptyFile },
      resolver: zodResolver(fileFormSchema),
    })
    const value = form.watch('file')
    return (
      <div className="flex flex-col gap-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(() => {
              logger.showSuccess('Submitted :', value.name)
            })}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload a file</FormLabel>
                  <FormControl>
                    <FormFileUpload
                      schema={fileSchema}
                      value={field.value.name}
                      onFileUploadComplete={file => {
                        logger.info('File upload complete:', file.name)
                        field.onChange(file)
                        form.trigger('file')
                      }}
                      onFileChange={file => {
                        logger.info('File changed:', file?.name)
                        field.onChange(file)
                        form.trigger('file')
                      }}
                      onFileRemove={() => {
                        logger.info('File removed')
                        form.setValue('file', emptyFile)
                        form.trigger('file')
                      }}
                      onFileUploadError={error => {
                        logger.error('File upload error:', error)
                        form.setError('file', { type: 'manual', message: error })
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
        <SourceCode code={{ file: value.name }} />
      </div>
    )
  },
}
