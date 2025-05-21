/* c8 ignore start */
import { Button } from '@/components/atoms/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/atoms/card'
import { cn } from '@/utils/styling.utils'
import { AlertTriangle, XIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const STORAGE_KEY = 'hideTestIdChecker'
const INTERVAL = 1000
const MIN_OCCURRENCES = 2
const INITIAL_INDEX = 0
const INDEX_INCREMENT = 1
const HIGHLIGHT_CLASSES = ['!outline', '!outline-2', '!outline-dashed', '!outline-blue-500', '!outline-offset-2', '!z-50', '!bg-blue-500/20', '!text-black'] as const

type TestIdInfo = {
  id: string
  isValid: boolean
  occurrences: number
}

const getAllTestIds = () =>
  Array.from(document.querySelectorAll('[data-testid]'))
    .map(el => el.getAttribute('data-testid'))
    .filter((id): id is string => Boolean(id))

const isValidTestId = (testId: string) => /^[a-zA-Z0-9-]+$/u.test(testId)

const highlightManager = {
  add(testid: string) {
    if (this.lastHighlighted === testid) return
    this.remove(this.lastHighlighted)
    const elements = document.querySelectorAll<HTMLElement>(`[data-testid="${testid}"]`)
    for (const el of elements) el.classList.add(...HIGHLIGHT_CLASSES)
    this.lastHighlighted = testid
  },
  lastHighlighted: undefined as string | undefined,
  remove(testid?: string) {
    if (!testid) return
    const elements = document.querySelectorAll<HTMLElement>(`[data-testid="${testid}"]`)
    for (const el of elements) el.classList.remove(...HIGHLIGHT_CLASSES)
    if (this.lastHighlighted === testid) this.lastHighlighted = undefined
  },
}

function useTestIds(visible: boolean) {
  const [testIds, setTestIds] = useState<string[]>([])
  const timer = useRef<NodeJS.Timeout | undefined>(undefined)
  useEffect(() => {
    if (!visible) return
    const update = () => {
      setTestIds(getAllTestIds())
    }
    update()
    timer.current = setInterval(update, INTERVAL)
    // eslint-disable-next-line consistent-return
    return () => {
      clearInterval(timer.current)
      highlightManager.remove(highlightManager.lastHighlighted)
    }
  }, [visible])
  return testIds.reduce<TestIdInfo[]>((acc, id) => {
    const existing = acc.find(item => item.id === id)
    if (existing) existing.occurrences += INDEX_INCREMENT
    else acc.push({ id, isValid: isValidTestId(id), occurrences: INDEX_INCREMENT })
    return acc
  }, [])
}

function TestIdListItem({ id, index, occurrences, isValid }: TestIdInfo & { index: number }) {
  return (
    <li
      className={cn('flex items-center border-b border-gray-100 cursor-pointer m-0 px-4 py-2 hover:bg-blue-50 transition-colors', isValid ? 'text-black' : 'text-red-500')}
      aria-label={`Highlight element with data-testid ${id}`}
      onMouseEnter={() => {
        highlightManager.add(id)
      }}
      onMouseLeave={() => {
        highlightManager.remove(id)
      }}
      title={isValid ? undefined : 'This data-testid contains un-expected chars'}
    >
      <span className="opacity-50 w-6">{index + INDEX_INCREMENT}.</span>
      {id}
      {occurrences >= MIN_OCCURRENCES && ` (${occurrences.toString()} occurrences)`}
      {!isValid && <AlertTriangle className="size-4 text-red-500 ml-2" />}
    </li>
  )
}

export function TestIdChecker() {
  const [visible, setVisible] = useState(() => !localStorage.getItem(STORAGE_KEY))
  const testIds = useTestIds(visible)
  if (!visible) return null
  return (
    <Card aria-label="data-testid checker" className="fixed gap-0 bottom-6 right-6 z-100 w-auto max-w-[340px] min-w-[260px] shadow-lg">
      <CardHeader className="flex justify-between items-center pl-4 pr-2 py-2">
        <CardTitle className="text-base">Data test id checker</CardTitle>
        <Button
          variant="ghost"
          onClick={() => {
            setVisible(false)
            localStorage.setItem(STORAGE_KEY, '1')
          }}
        >
          <XIcon className="size-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        {testIds.length === INITIAL_INDEX ? (
          <div className="text-gray-400 p-4 text-center">No data-testid found</div>
        ) : (
          <ul className="text-gray-300">
            {testIds.map((info, index) => (
              <TestIdListItem key={info.id} {...info} index={index} />
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
