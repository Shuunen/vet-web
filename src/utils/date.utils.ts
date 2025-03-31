export function isOlderThan(date: Date, days: number): boolean {
  const now = new Date()
  const timeDiff = now.getTime() - date.getTime()
  const dayDiff = timeDiff / (1000 * 3600 * 24)
  return dayDiff > days
}
