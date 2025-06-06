import { describe, expect, it } from 'vitest'
import { formatFileSize } from './form-file-upload.utils'

describe('formatFileSize', () => {
  describe('without unit parameter', () => {
    it('should return "0" for 0 bytes', () => {
      expect(formatFileSize(0)).toMatchInlineSnapshot(`"0"`)
    })

    it('should return "0" for 0 bytes with default addUnit parameter', () => {
      expect(formatFileSize(0, false)).toMatchInlineSnapshot(`"0"`)
    })

    it('should format bytes correctly', () => {
      expect(formatFileSize(1)).toMatchInlineSnapshot(`"1"`)
      expect(formatFileSize(512)).toMatchInlineSnapshot(`"512"`)
      expect(formatFileSize(1023)).toMatchInlineSnapshot(`"1023"`)
    })

    it('should format KB correctly', () => {
      expect(formatFileSize(1024)).toMatchInlineSnapshot(`"1"`) // 1 KB (no decimal needed)
      expect(formatFileSize(2048)).toMatchInlineSnapshot(`"2"`) // 2 KB (no decimal needed)
      expect(formatFileSize(1536)).toMatchInlineSnapshot(`"1.5"`) // 1.5 KB (decimal needed)
      expect(formatFileSize(512000)).toMatchInlineSnapshot(`"500"`) // 500 KB (no decimal needed)
      expect(formatFileSize(1843)).toMatchInlineSnapshot(`"1.8"`) // ~1.8 KB (decimal needed)
    })

    it('should format MB correctly', () => {
      expect(formatFileSize(1048576)).toMatchInlineSnapshot(`"1"`) // 1 MB (no decimal needed)
      expect(formatFileSize(2621440)).toMatchInlineSnapshot(`"2.5"`) // 2.5 MB (decimal needed)
      expect(formatFileSize(10485760)).toMatchInlineSnapshot(`"10"`) // 10 MB (no decimal needed)
      expect(formatFileSize(1887437)).toMatchInlineSnapshot(`"1.8"`) // ~1.8 MB (decimal needed)
    })

    it('should show decimals only when needed', () => {
      expect(formatFileSize(1048576)).toMatchInlineSnapshot(`"1"`) // Exactly 1 MB - no decimal
      expect(formatFileSize(1153434)).toMatchInlineSnapshot(`"1.1"`) // ~1.1 MB - decimal needed
      expect(formatFileSize(2097152)).toMatchInlineSnapshot(`"2"`) // Exactly 2 MB - no decimal
      expect(formatFileSize(2621440)).toMatchInlineSnapshot(`"2.5"`) // Exactly 2.5 MB - decimal needed
      expect(formatFileSize(1642956)).toMatchInlineSnapshot(`"1.6"`) // ~1.567 MB rounded to 1.6
      expect(formatFileSize(1294336)).toMatchInlineSnapshot(`"1.2"`) // ~1.234 MB rounded to 1.2
      expect(formatFileSize(1938817)).toMatchInlineSnapshot(`"1.8"`) // ~1.849 MB rounded to 1.8
    })
  })

  describe('with unit parameter', () => {
    it('should return "0 B" for 0 bytes when addUnit is true', () => {
      expect(formatFileSize(0, true)).toMatchInlineSnapshot(`"0 B"`)
    })

    it('should include "B" unit for bytes', () => {
      expect(formatFileSize(1, true)).toMatchInlineSnapshot(`"1 B"`)
      expect(formatFileSize(512, true)).toMatchInlineSnapshot(`"512 B"`)
      expect(formatFileSize(1023, true)).toMatchInlineSnapshot(`"1023 B"`)
    })

    it('should include "KB" unit for kilobytes', () => {
      expect(formatFileSize(1024, true)).toMatchInlineSnapshot(`"1 KB"`)
      expect(formatFileSize(2048, true)).toMatchInlineSnapshot(`"2 KB"`)
      expect(formatFileSize(1536, true)).toMatchInlineSnapshot(`"1.5 KB"`) // 1.5 KB with decimal
      expect(formatFileSize(512000, true)).toMatchInlineSnapshot(`"500 KB"`)
    })

    it('should include "MB" unit for megabytes', () => {
      expect(formatFileSize(1048576, true)).toMatchInlineSnapshot(`"1 MB"`)
      expect(formatFileSize(2621440, true)).toMatchInlineSnapshot(`"2.5 MB"`) // 2.5 MB with decimal
      expect(formatFileSize(104857600, true)).toMatchInlineSnapshot(`"100 MB"`)
    })
  })

  describe('edge cases', () => {
    it('should handle boundary values correctly', () => {
      // Just under 1 KB
      expect(formatFileSize(1023)).toMatchInlineSnapshot(`"1023"`)
      expect(formatFileSize(1023, true)).toMatchInlineSnapshot(`"1023 B"`)

      // Exactly 1 KB
      expect(formatFileSize(1024)).toMatchInlineSnapshot(`"1"`)
      expect(formatFileSize(1024, true)).toMatchInlineSnapshot(`"1 KB"`)

      // Just under 1 MB
      expect(formatFileSize(1048575)).toMatchInlineSnapshot(`"1024"`)
      expect(formatFileSize(1048575, true)).toMatchInlineSnapshot(`"1024 KB"`)

      // Exactly 1 MB
      expect(formatFileSize(1048576)).toMatchInlineSnapshot(`"1"`)
      expect(formatFileSize(1048576, true)).toMatchInlineSnapshot(`"1 MB"`)
    })

    it('should handle very large files', () => {
      // 1 GB = 1024 MB
      expect(formatFileSize(1073741824)).toMatchInlineSnapshot(`"1024"`)
      expect(formatFileSize(1073741824, true)).toMatchInlineSnapshot(`"1024 MB"`)
    })

    it('should handle decimal formatting correctly', () => {
      expect(formatFileSize(1048575)).toMatchInlineSnapshot(`"1024"`) // Just under 1 MB (in KB, no decimal)
      expect(formatFileSize(1048577)).toMatchInlineSnapshot(`"1"`) // Just over 1 MB (in MB, no decimal)
      expect(formatFileSize(1572864)).toMatchInlineSnapshot(`"1.5"`) // Exactly 1.5 MB (decimal needed)
      expect(formatFileSize(1887437)).toMatchInlineSnapshot(`"1.8"`) // ~1.8 MB (decimal needed)
      expect(formatFileSize(2097152)).toMatchInlineSnapshot(`"2"`) // Exactly 2 MB (no decimal)
    })
  })
})
