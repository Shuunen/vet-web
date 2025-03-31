const secondsInHour = 3600
const hoursInDay = 24
const msInSecond = 1000

export function isOlderThan(date: Date, days: number): boolean {
  const now = new Date()
  const timeDiff = now.getTime() - date.getTime()
  const dayDiff = timeDiff / (msInSecond * secondsInHour * hoursInDay)
  return dayDiff > days
}
