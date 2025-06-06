const bytesInKb = 1024
const bytesInMb = bytesInKb * bytesInKb
const decimalPrecisionLimit = 10

export const uploadDurationFail = 1000 // ms

export const uploadPercentFail = 61 // %

export const uploadDurationSuccess = 2000 // ms

export const maxPercent = 100

export function formatFileSize(bytes: number, addUnit = false): string {
  const formatValue = (value: number, unit: string) => {
    const rounded = Math.round(value * decimalPrecisionLimit) / decimalPrecisionLimit
    const formatted = rounded % 1 === 0 ? rounded.toString() : rounded.toFixed(1)
    return `${formatted}${addUnit ? ` ${unit}` : ''}`
  }
  if (bytes < bytesInKb) return formatValue(bytes, 'B')
  if (bytes < bytesInMb) return formatValue(bytes / bytesInKb, 'KB')
  return formatValue(bytes / bytesInMb, 'MB')
}
