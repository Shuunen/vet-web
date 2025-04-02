/* eslint-disable no-magic-numbers */
import { z } from 'zod'

export const baseDataSchema = z.object({
  age: z.string().min(1, 'Pet age is required'),
  identifier: z.string().min(1, 'Pet identifier is required'),
  name: z.string().min(1, 'Pet name is required'),
  type: z.enum(['cat', 'dog']),
})

export const catComplementaryDataSchema = z.object({
  indoorOutdoor: z.enum(['indoor', 'outdoor', 'both']),
  lastFleaTreatment: z.string().min(1, 'Last flea treatment date is required'),
  vaccinationStatus: z.string().min(1, 'Vaccination status is required'),
})

export const dogComplementaryDataSchema = z.object({
  breed: z.string().min(1, 'Breed is required'),
  exerciseRoutine: z.string().min(1, 'Exercise routine is required'),
  lastRabiesShot: z.string().min(1, 'Last rabies shot date is required'),
  weight: z.string().min(1, 'Weight is required'),
})
