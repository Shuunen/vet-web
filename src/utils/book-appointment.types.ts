export interface PetBaseData {
  identifier: string
  name: string
  age: string
  type: 'cat' | 'dog'
}

export interface CatComplementaryData {
  indoorOutdoor: 'indoor' | 'outdoor' | 'both'
  lastFleaTreatment: string
  vaccinationStatus: string
}

export interface DogComplementaryData {
  breed: string
  weight: string
  lastRabiesShot: string
  exerciseRoutine: string
}

export type ComplementaryData = CatComplementaryData | DogComplementaryData

export type AppointmentData = {
  baseData: PetBaseData
  complementaryData: ComplementaryData
  appointmentDate?: string
  appointmentTime?: string
  ownerName?: string
  ownerPhone?: string
  ownerEmail?: string
  reason?: string
}
