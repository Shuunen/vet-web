import { documentFileSchema } from '@/components/molecules/form-file-upload.utils'
import type { BookAppointmentState } from '@/routes/book-appointment/-steps.store'
import { ageSchema } from '@/utils/age.utils'
import { breedSchema } from '@/utils/breed.utils'
import { err, ok } from 'resultx'
import { z } from 'zod/v4'

export const baseDataSchema = z.object({
  age: ageSchema,
  breed: breedSchema,
  identifier: z.string().regex(/^FR\d{4}$/u, 'Identifier must be FR and 4 digits'),
  name: z.string().min(1, 'Pet name is required'),
})

export type AppointmentBaseData = z.infer<typeof baseDataSchema>

export const vaccinationStatuses = ['up-to-date', 'need-update', 'not-vaccinated'] as const

export const catComplementaryDataSchema = z.object({
  file: documentFileSchema,
  indoorOutdoor: z.enum(['indoor', 'outdoor', 'both']),
  lastFleaTreatment: z.string().min(1, 'Last flea treatment date is required'),
  vaccinationStatus: z.enum(vaccinationStatuses),
})

export type CatComplementaryData = z.infer<typeof catComplementaryDataSchema>

export const dogComplementaryDataSchema = z.object({
  color: z.string().min(1, 'Color is required'),
  exerciseRoutine: z.string().min(1, 'Exercise routine is required'),
  file: documentFileSchema,
  weight: z.coerce.number().min(1, 'Weight is required'),
})

export type DogComplementaryData = z.infer<typeof dogComplementaryDataSchema>

export const bookAppointmentSchema = z.object({
  baseData: baseDataSchema,
  complementaryData: z.union([catComplementaryDataSchema, dogComplementaryDataSchema]),
})

export type AppointmentData = z.infer<typeof bookAppointmentSchema>

export function hasAccess(toStep: BookAppointmentState['currentStep'], toVariant: AppointmentData['baseData']['breed'], data: AppointmentData) {
  const variant = data.baseData.breed
  const { success: isBaseValid } = baseDataSchema.safeParse(data.baseData)
  const { success: isComplementaryValid } = variant === 'cat' ? catComplementaryDataSchema.safeParse(data.complementaryData) : dogComplementaryDataSchema.safeParse(data.complementaryData)
  if (toStep === 0) return ok('Access to step 0 granted')
  if (variant !== toVariant) return err('Variant does not match')
  if (toStep === 1 && isBaseValid) return ok('Access to step 1 granted')
  // eslint-disable-next-line no-magic-numbers
  if (toStep === 2 && isBaseValid && isComplementaryValid) return ok('Access to step 2 granted')
  return err('Step does not exist')
}
