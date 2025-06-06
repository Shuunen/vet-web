'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/utils/styling.utils'
import { CircleXIcon, FileCheckIcon, FileText, FileUpIcon, FileXIcon, RotateCcw, TrashIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { formatFileSize, maxPercent, uploadDurationFail, uploadDurationSuccess, uploadPercentFail } from './form-file-upload.utils'

type UploadState = 'idle' | 'uploading' | 'success' | 'error'

type Props = {
  className?: string
  onFileChange?: (file: File | undefined) => void
  onUploadComplete?: (file: File) => void
  onUploadError?: (error: string) => void
}

// eslint-disable-next-line max-lines-per-function
export function FormFileUpload({ onFileChange, onUploadComplete, onUploadError }: Props) {
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined)
  const [uploadState, setUploadState] = useState<UploadState>('idle')
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const uploadIntervalRef = useRef<NodeJS.Timeout | undefined>(undefined)

  function resetUpload() {
    setSelectedFile(undefined)
    setUploadState('idle')
    setUploadProgress(0)
    onFileChange?.(undefined)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  function clearUploadInterval() {
    if (!uploadIntervalRef.current) return
    clearInterval(uploadIntervalRef.current)
    uploadIntervalRef.current = undefined
  }

  function startUpload(file: File) {
    setUploadState('uploading')
    setUploadProgress(0)

    const shouldFail = file.name.toLowerCase().includes('error')
    const uploadDuration = shouldFail ? uploadDurationFail : uploadDurationSuccess
    const interval = 50
    const increment = (maxPercent / uploadDuration) * interval

    uploadIntervalRef.current = setInterval(() => {
      setUploadProgress(currentProgress => {
        if (currentProgress >= maxPercent) {
          clearUploadInterval()
          setUploadState('success')
          onUploadComplete?.(file)
          return maxPercent
        }

        if (shouldFail && currentProgress >= uploadPercentFail) {
          clearUploadInterval()
          setUploadState('error')
          onUploadError?.('Upload failed')
          return currentProgress
        }

        return Math.min(currentProgress + increment, maxPercent)
      })
    }, interval)
  }

  function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      onFileChange?.(file)
      startUpload(file)
    }
  }

  function handleCancel() {
    clearUploadInterval()
    resetUpload()
  }

  function handleRetry() {
    if (selectedFile) startUpload(selectedFile)
  }

  useEffect(() => {
    return () => {
      if (uploadIntervalRef.current) clearInterval(uploadIntervalRef.current)
    }
  }, [])

  const sizeProgress = `(${formatFileSize((selectedFile?.size ?? 0) * (uploadProgress / maxPercent), true)} / ${formatFileSize(selectedFile?.size ?? 0, true)})`

  const states = {
    error: {
      button: { action: handleRetry, icon: RotateCcw, label: 'Retry' },
      icon: <FileXIcon className="size-5 text-destructive" />,
      message: `Uploading failed! ${sizeProgress}`,
    },
    success: {
      button: { action: resetUpload, icon: TrashIcon, label: 'Remove' },
      icon: <FileCheckIcon className="size-5 text-success" />,
      message: `Uploading succeeded! ${sizeProgress}`,
    },
    uploading: {
      button: { action: handleCancel, icon: CircleXIcon, label: 'Cancel' },
      icon: <FileUpIcon className="size-5 text-muted-foreground" />,
      message: `Uploading... ${sizeProgress}`,
    },
  }

  if (uploadState === 'idle' && !selectedFile)
    return (
      <div className={cn('relative')}>
        <Input type="file" ref={fileInputRef} onChange={handleFileSelect} accept="*/*" placeholder="No file selected" />
      </div>
    )

  const state = states[uploadState as keyof typeof states]
  const showProgress = uploadState !== 'idle'

  return (
    <div className="rounded-md border border-input bg-background p-3">
      <div className="flex justify-between gap-3">
        <aside className="mt-0.5">{state?.icon || <FileText className="size-5 text-muted-foreground" />}</aside>

        <main className="flex flex-col gap-1">
          <div className="flex gap-3">
            <div className="flex flex-col gap-1">
              <div className="font-medium text-sm">{selectedFile?.name}</div>
              <div className="text-sm text-muted-foreground">{state?.message}</div>
            </div>

            {state?.button && (
              <Button className="ml-8" variant="ghost" size="sm" onClick={state.button.action} title={state.button.label}>
                {state.button.label}
                <state.button.icon className="size-4" />
              </Button>
            )}
          </div>

          {showProgress && (
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
