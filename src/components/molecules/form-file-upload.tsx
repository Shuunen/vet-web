'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/utils/styling.utils'
import { debounce } from 'es-toolkit'
import { CircleXIcon, FileCheckIcon, FileTextIcon, FileUpIcon, FileXIcon, RotateCcwIcon, TrashIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { ZodType } from 'zod/v4'
import { formatFileSize, maxPercent, uploadDurationFail, uploadDurationSuccess, uploadPercentFail } from './form-file-upload.utils'

type UploadState = 'idle' | 'uploading' | 'success' | 'error'

type Props = {
  className?: string
  onFileChange?: (file: File | undefined) => void
  onFileUploadComplete?: (file: File) => void
  onFileUploadError?: (error: string) => void
  onFileRemove?: () => void
  schema?: ZodType
  shouldFail?: boolean
  /**
   * The current value of the file field (file name or undefined).
   * If provided, the component will display the file as selected.
   */
  value?: string
}

// eslint-disable-next-line max-lines-per-function
export function FormFileUpload({ onFileChange, onFileRemove, onFileUploadComplete, onFileUploadError, schema, shouldFail = false, value }: Props) {
  const [selectedFile, setSelectedFile] = useState<File | undefined>()
  const [uploadState, setUploadState] = useState<UploadState>('idle')
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const uploadIntervalRef = useRef<NodeJS.Timeout | undefined>(undefined)

  const onFileUploadCompleteDebounced = onFileUploadComplete
    ? // oxlint-disable-next-line no-magic-numbers
      debounce(onFileUploadComplete, 10)
    : () =>
        void (
          // Sync with value prop (for controlled usage)
          useEffect(() => {
            if (value) {
              if (!selectedFile || selectedFile.name !== value) {
                setSelectedFile({ name: value } as File)
                setUploadState('success')
                setUploadProgress(maxPercent)
              }
            } else if (selectedFile) {
              setSelectedFile(undefined)
              setUploadState('idle')
              setUploadProgress(0)
            }
          }, [value])
        )

  // Cleanup on unmount
  useEffect(() => () => uploadIntervalRef.current && clearInterval(uploadIntervalRef.current), [])

  function resetUpload() {
    // eslint-disable-next-line no-unused-expressions
    uploadIntervalRef.current && clearInterval(uploadIntervalRef.current)
    setSelectedFile(undefined)
    setUploadState('idle')
    setUploadProgress(0)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  function removeFile() {
    resetUpload()
    onFileChange?.(undefined)
    onFileRemove?.()
  }

  function startUpload(file: File) {
    const { success, error } = schema?.safeParse(file) ?? { success: true }
    if (!success) {
      onFileUploadError?.(error.message)
      onFileChange?.(file)
      setUploadState('error')
      return
    }

    setUploadState('uploading')
    setUploadProgress(0)

    const uploadDuration = shouldFail ? uploadDurationFail : uploadDurationSuccess
    const interval = 50
    const increment = (maxPercent / uploadDuration) * interval

    uploadIntervalRef.current = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = Math.min(prev + increment, maxPercent)
        if (newProgress >= maxPercent) {
          clearInterval(uploadIntervalRef.current)
          setUploadState('success')
          onFileUploadCompleteDebounced(file)
          return maxPercent
        }
        if (shouldFail && newProgress >= uploadPercentFail) {
          clearInterval(uploadIntervalRef.current)
          setUploadState('error')
          onFileUploadError?.('Upload failed')
          return newProgress
        }
        return newProgress
      })
    }, interval)
  }

  function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    setSelectedFile(file)
    onFileChange?.(file)
    startUpload(file)
  }

  const retryUpload = () => selectedFile && startUpload(selectedFile)

  // Render idle state
  if (uploadState === 'idle' && !selectedFile) return <Input type="file" data-testid="file-upload" ref={fileInputRef} onChange={handleFileSelect} accept="*/*" placeholder="No file selected" />

  const sizeProgress = selectedFile?.size ? `(${formatFileSize(selectedFile.size * (uploadProgress / maxPercent), true)} / ${formatFileSize(selectedFile.size, true)})` : ''

  const buttons = {
    cancel: { action: removeFile, icon: CircleXIcon, label: 'Cancel' },
    remove: { action: removeFile, icon: TrashIcon, label: 'Remove' },
    retry: { action: retryUpload, icon: RotateCcwIcon, label: 'Retry' },
  }

  const states = {
    error: {
      buttons: uploadProgress === 0 ? [buttons.remove] : [buttons.retry, buttons.remove],
      icon: <FileXIcon className="size-5 text-destructive" />,
      message: `Uploading failed! ${sizeProgress}`,
    },
    success: {
      buttons: [buttons.remove],
      icon: <FileCheckIcon className="size-5 text-success" />,
      message: `Uploading succeeded! ${sizeProgress}`,
    },
    uploading: {
      buttons: [buttons.cancel],
      icon: <FileUpIcon className="size-5 text-muted-foreground" />,
      message: `Uploading... ${sizeProgress}`,
    },
  }

  const state = states[uploadState as keyof typeof states]

  return (
    <div className="rounded-md border border-input bg-background p-3">
      <div className="flex gap-3">
        <aside className="mt-0.5">{state?.icon || <FileTextIcon className="size-5 text-muted-foreground" />}</aside>
        <main className="flex grow flex-col gap-1">
          <div className="flex justify-between gap-3">
            <div className="flex flex-col gap-1">
              <div className="font-medium text-sm truncate max-w-80">{selectedFile?.name}</div>
              <div className="text-sm text-muted-foreground truncate max-w-80">{state?.message}</div>
            </div>

            <div className="flex ml-8">
              {state?.buttons.map(button => (
                <Button key={`button-${button.label}`} variant="ghost" size="sm" onClick={button.action} title={button.label}>
                  {button.label}
                  <button.icon className="size-4" />
                </Button>
              ))}
            </div>
          </div>

          {uploadState !== 'idle' && (
            <div className="flex items-center">
              <Progress value={uploadProgress} className={cn('h-1 flex-1', uploadState === 'success' && '[&>div]:bg-success', uploadState === 'error' && '[&>div]:bg-destructive')} />
              <span className={cn('text-sm font-medium min-w-[3rem] text-right', uploadState === 'success' && 'text-success', uploadState === 'error' && 'text-destructive')}>{Math.round(uploadProgress)}%</span>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
