const bytesInKb = 1024
const bytesInMb = bytesInKb * bytesInKb

export const uploadDurationFail = 3000 // ms

export const uploadPercentFail = 61 // %

export const uploadDurationSuccess = 5000 // ms

export const maxPercent = 100

export function formatFileSize(bytes: number, addUnit = false) {
  if (bytes === 0) return `0.0${addUnit ? ' Mo' : ''}`
  const mb = bytes / bytesInMb
  return `${mb.toFixed(1)}${addUnit ? ' Mo' : ''}`
}
