import { describe, expect, it } from 'vitest'
import { formatFileSize } from './form-file-upload.utils'

describe('formatFileSize', () => {
  describe('without unit parameter', () => {
    it('should return "0.0" for 0 bytes', () => {
      expect(formatFileSize(0)).toMatchInlineSnapshot(`"0.0"`)
    })

    it('should return "0.0" for 0 bytes with default addUnit parameter', () => {
      expect(formatFileSize(0, false)).toMatchInlineSnapshot(`"0.0"`)
    })

    it('should format bytes to megabytes with 1 decimal place', () => {
      // 1 MB = 1024 * 1024 = 1,048,576 bytes
      expect(formatFileSize(1048576)).toMatchInlineSnapshot(`"1.0"`)
    })

    it('should format 2.5 MB correctly', () => {
      // 2.5 MB = 2.5 * 1024 * 1024 = 2,621,440 bytes
      expect(formatFileSize(2621440)).toMatchInlineSnapshot(`"2.5"`)
    })

    it('should format small files to fractional MB', () => {
      // 500 KB = 500 * 1024 = 512,000 bytes ≈ 0.5 MB
      expect(formatFileSize(512000)).toMatchInlineSnapshot(`"0.5"`)
    })

    it('should format very small files to fractional MB', () => {
      // 1 KB = 1024 bytes ≈ 0.001 MB
      expect(formatFileSize(1024)).toMatchInlineSnapshot(`"0.0"`)
    })

    it('should format large files correctly', () => {
      // 10 MB = 10 * 1024 * 1024 = 10,485,760 bytes
      expect(formatFileSize(10485760)).toMatchInlineSnapshot(`"10.0"`)
    })

    it('should round to 1 decimal place', () => {
      // 1.567 MB ≈ 1,642,956 bytes
      expect(formatFileSize(1642956)).toMatchInlineSnapshot(`"1.6"`)
    })

    it('should handle fractional bytes correctly', () => {
      // 1.234 MB ≈ 1,294,336 bytes
      expect(formatFileSize(1294336)).toMatchInlineSnapshot(`"1.2"`)
    })
  })

  describe('with unit parameter', () => {
    it('should return "0.0 Mo" for 0 bytes when addUnit is true', () => {
      expect(formatFileSize(0, true)).toMatchInlineSnapshot(`"0.0 Mo"`)
    })

    it('should include "Mo" unit when addUnit is true', () => {
      // 1 MB = 1,048,576 bytes
      expect(formatFileSize(1048576, true)).toMatchInlineSnapshot(`"1.0 Mo"`)
    })

    it('should include "Mo" unit for fractional MB', () => {
      // 2.5 MB = 2,621,440 bytes
      expect(formatFileSize(2621440, true)).toMatchInlineSnapshot(`"2.5 Mo"`)
    })

    it('should include "Mo" unit for small files', () => {
      // 512 KB ≈ 0.5 MB
      expect(formatFileSize(512000, true)).toMatchInlineSnapshot(`"0.5 Mo"`)
    })

    it('should include "Mo" unit for large files', () => {
      // 100 MB = 104,857,600 bytes
      expect(formatFileSize(104857600, true)).toMatchInlineSnapshot(`"100.0 Mo"`)
    })
  })

  describe('edge cases', () => {
    it('should handle 1 byte', () => {
      expect(formatFileSize(1)).toMatchInlineSnapshot(`"0.0"`)
      expect(formatFileSize(1, true)).toMatchInlineSnapshot(`"0.0 Mo"`)
    })

    it('should handle exactly 1 KB', () => {
      expect(formatFileSize(1024)).toMatchInlineSnapshot(`"0.0"`)
      expect(formatFileSize(1024, true)).toMatchInlineSnapshot(`"0.0 Mo"`)
    })

    it('should handle exactly 1 MB', () => {
      expect(formatFileSize(1048576)).toMatchInlineSnapshot(`"1.0"`)
      expect(formatFileSize(1048576, true)).toMatchInlineSnapshot(`"1.0 Mo"`)
    })

    it('should handle very large files', () => {
      // 1 GB = 1024 MB = 1,073,741,824 bytes
      expect(formatFileSize(1073741824)).toMatchInlineSnapshot(`"1024.0"`)
      expect(formatFileSize(1073741824, true)).toMatchInlineSnapshot(`"1024.0 Mo"`)
    })

    it('should handle decimal precision correctly', () => {
      // Test various byte values to ensure proper rounding
      expect(formatFileSize(1048575)).toMatchInlineSnapshot(`"1.0"`) // Just under 1 MB
      expect(formatFileSize(1048577)).toMatchInlineSnapshot(`"1.0"`) // Just over 1 MB
      expect(formatFileSize(1572864)).toMatchInlineSnapshot(`"1.5"`) // Exactly 1.5 MB
    })
  })
})
