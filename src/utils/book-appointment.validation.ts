/* eslint-disable no-magic-numbers */
import { z } from 'zod'

export const baseDataSchema = z.object({
  age: z.coerce.number().min(1, 'Pet age is required').max(99, 'Pet age must be less than 99'),
  identifier: z.string().regex(/^FR\d{4}$/u, 'Identifier must be FR and 4 digits'),
  name: z.string().min(1, 'Pet name is required'),
  type: z.enum(['cat', 'dog']),
})

export type AppointmentBaseData = z.infer<typeof baseDataSchema>

export const vaccinationStatuses = ['up-to-date', 'need-update', 'not-vaccinated'] as const

export const catComplementaryDataSchema = z.object({
  indoorOutdoor: z.enum(['indoor', 'outdoor', 'both']),
  lastFleaTreatment: z.string().min(1, 'Last flea treatment date is required'),
  vaccinationStatus: z.enum(vaccinationStatuses),
})

export type CatComplementaryData = z.infer<typeof catComplementaryDataSchema>

export const dogComplementaryDataSchema = z.object({
  breed: z.string().min(1, 'Breed is required'),
  exerciseRoutine: z.string().min(1, 'Exercise routine is required'),
  weight: z.coerce.number().min(1, 'Weight is required'),
})

export type DogComplementaryData = z.infer<typeof dogComplementaryDataSchema>

export const bookAppointmentSchema = z.object({
  baseData: baseDataSchema,
  complementaryData: z.union([catComplementaryDataSchema, dogComplementaryDataSchema]),
})

export type AppointmentData = z.infer<typeof bookAppointmentSchema>
