import type { CodeVersionLabel } from './cvl.types'
import { cvlToSchema } from './cvl.utils'

export const ages = [
  { Code: 'MINUS-5', Version: '01', label: 'Moins de 5 ans' },
  { Code: 'FROM-5-TO-10', Version: '03', label: 'De 5 à 10 ans' },
  { Code: 'MORE-10', Version: '07', label: 'Plus de 10 ans' },
] as const satisfies CodeVersionLabel[]

export const ageSchema = cvlToSchema(ages)
