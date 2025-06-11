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

export const WithFileSelected: Story = {
  args: {
    value: 'dog-health-report.pdf',
  },
}

// oxlint-disable-next-line no-undef
const emptyFile = new File([], '')

const fileFormSchema = z.object({
  file: z.file().min(1),
})

type FileForm = z.infer<typeof fileFormSchema>

export const InForm: Story = {
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
                      value={field.value.name}
                      onFileUploadComplete={file => {
                        field.onChange(file)
                        form.trigger('file')
                      }}
                      onFileRemove={() => {
                        form.setValue('file', emptyFile)
                        form.trigger('file')
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
