import { spaceIndent } from '@/utils/styling.const'
import { cn } from '@/utils/styling.utils'

export function SourceCode({ className, code }: { className: string; code: string | object }) {
  const json = typeof code === 'string' ? code : JSON.stringify(code, null, spaceIndent)
  return (
    <pre className={cn('bg-stone-100 p-6 border-stone-300 border rounded-lg', className)}>
      <code>{json}</code>
    </pre>
  )
}
