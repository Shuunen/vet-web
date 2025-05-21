import { Button } from '@/components/atoms/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/atoms/card'
import { cn } from '@/utils/styling.utils'
import { AlertTriangle, XIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const STORAGE_KEY = 'hideTestIdChecker'
const INTERVAL = 1000
const EMPTY = 0
const INITIAL_COUNT = 0
const FIRST_OCCURRENCE = 1
const INCREMENT = 1
const HIGHLIGHT_CLASSES = ['!outline', '!outline-2', '!outline-dashed', '!outline-blue-500', '!outline-offset-2', '!z-50', '!bg-blue-500/20', '!text-black'] as const

function getAllTestIds() {
  return Array.from(document.querySelectorAll('[data-testid]'))
    .map(el => el.getAttribute('data-testid'))
    .filter((id): id is string => Boolean(id))
}

let lastHighlighted: string | null = null

function removeHighlight(testid?: string | null) {
  if (!testid) return
  const els = document.querySelectorAll<HTMLElement>(`[data-testid="${testid}"]`)
  for (const el of els) el.classList.remove(...HIGHLIGHT_CLASSES)
  if (lastHighlighted === testid) lastHighlighted = null
}

function highlightElement(testid: string) {
  if (lastHighlighted === testid) return
  removeHighlight(lastHighlighted)
  const els = document.querySelectorAll<HTMLElement>(`[data-testid="${testid}"]`)
  for (const el of els) el.classList.add(...HIGHLIGHT_CLASSES)
  lastHighlighted = testid
}

function useTestIds(visible: boolean) {
  const [testIds, setTestIds] = useState<string[]>([])
  const timer = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!visible) return

    function update() {
      const current = getAllTestIds()
      setTestIds(current)
    }
    update()
    timer.current = setInterval(update, INTERVAL)
    // eslint-disable-next-line consistent-return
    return () => {
      if (timer.current) clearInterval(timer.current)
      removeHighlight(lastHighlighted)
    }
  }, [visible])

  return testIds
}

function isValidTestId(testId: string): boolean {
  return /^[a-zA-Z0-9-]+$/u.test(testId)
}

function TestIdListItem({
  id,
  index,
  totalOccurrences,
  isValid,
}: {
  id: string
  index: number
  totalOccurrences: number
  isValid: boolean
}) {
  return (
    <li
      key={id}
      className={cn('flex items-center border-b border-gray-100 cursor-pointer m-0 px-4 py-2 hover:bg-blue-50 transition-colors', isValid ? 'text-black' : 'text-red-500')}
      aria-label={`Highlight element with data-testid ${id}`}
      onMouseEnter={() => {
        highlightElement(id)
      }}
      onMouseLeave={() => {
        removeHighlight(id)
      }}
      onFocus={() => {
        highlightElement(id)
      }}
      onBlur={() => {
        removeHighlight(id)
      }}
      title={isValid ? undefined : 'This data-testid contains un-expected chars'}
    >
      <span className="opacity-50 w-6">{index + INCREMENT}.</span>
      {id}
      {totalOccurrences > FIRST_OCCURRENCE && ` (${totalOccurrences.toString()} occurrences)`}
      {!isValid && <AlertTriangle className="size-4 text-red-500 ml-2" />}
    </li>
  )
}

function TestIdList({ testIds }: { testIds: string[] }) {
  // Count occurrences of each test ID
  const idCounts = testIds.reduce<Record<string, number>>((acc, id) => {
    acc[id] = (acc[id] || INITIAL_COUNT) + INCREMENT
    return acc
  }, {})

  // Get unique test IDs
  const uniqueTestIds = Array.from(new Set(testIds))

  return (
    <ul className="text-gray-300">
      {uniqueTestIds.map((id, index) => (
        <TestIdListItem key={id} id={id} index={index} totalOccurrences={idCounts[id]} isValid={isValidTestId(id)} />
      ))}
    </ul>
  )
}

export function TestIdChecker() {
  const [visible, setVisible] = useState(() => !localStorage.getItem(STORAGE_KEY))
  const testIds = useTestIds(visible)
  return (
    visible && (
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
          <TestIdList testIds={testIds} />
          {testIds.length === EMPTY && <div className="text-gray-400 p-4 text-center">No data-testid found</div>}
        </CardContent>
      </Card>
    )
  )
}
