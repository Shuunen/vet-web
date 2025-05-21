import { Button } from '@/components/atoms/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/atoms/card'
import { X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const STORAGE_KEY = 'hideTestIdChecker'
const INTERVAL = 1000
const EMPTY = 0

function getAllTestIds() {
  return Array.from(document.querySelectorAll('[data-testid]'))
    .map(el => el.getAttribute('data-testid'))
    .filter((id): id is string => Boolean(id))
}

let lastHighlighted: string | null = null
function removeHighlight(testid?: string | null) {
  if (!testid) return
  const els = document.querySelectorAll<HTMLElement>(`[data-testid="${testid}"]`)
  for (const el of els) {
    el.style.outline = ''
    el.style.outlineOffset = ''
    el.style.zIndex = ''
  }
  if (lastHighlighted === testid) lastHighlighted = null
}

function highlightElement(testid: string) {
  if (lastHighlighted === testid) return
  removeHighlight(lastHighlighted)
  const els = document.querySelectorAll<HTMLElement>(`[data-testid="${testid}"]`)
  for (const el of els) {
    el.style.outline = '2px solid #22c55e'
    el.style.outlineOffset = '2px'
    el.style.zIndex = '9998'
  }
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

function TestIdList({ testIds }: { testIds: string[] }) {
  return (
    <ul className="list-decimal list-inside text-gray-300">
      {testIds.map(id => {
        const itemClassName = 'border-b border-gray-100 cursor-pointer m-0 px-4 py-2'
        return (
          <li
            key={id}
            className={itemClassName}
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
          >
            <span className="text-black">{id}</span>
          </li>
        )
      })}
    </ul>
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
          <X className="size-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <TestIdList testIds={testIds} />
        {testIds.length === EMPTY && <div className="text-gray-400 p-4 text-center">No data-testid found</div>}
      </CardContent>
    </Card>
  )
}
