import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AppointmentData, CatComplementaryData, DogComplementaryData, PetBaseData } from './book-appointment.types'

interface BookAppointmentState {
  // eslint-disable-next-line no-magic-numbers
  currentStep: 0 | 1 | 2
  setCurrentStep: (step: this['currentStep']) => void
  // Base data
  data: AppointmentData
  setBaseData: (baseData: PetBaseData) => void
  // Complementary data
  setCatComplementaryData: (data: CatComplementaryData) => void
  setDogComplementaryData: (data: DogComplementaryData) => void
  // Utilities
  resetForm: () => void
}

const initialData: AppointmentData = {
  baseData: {
    age: '',
    identifier: '',
    name: '',
    type: 'cat',
  },
  complementaryData: {
    indoorOutdoor: 'indoor',
    lastFleaTreatment: '',
    vaccinationStatus: '',
  },
}

export const useBookAppointmentStore = create<BookAppointmentState>()(
  persist(
    (set, get) => ({
      currentStep: 0,
      data: initialData,
      resetForm: () => {
        set({ currentStep: 0, data: initialData })
      },
      setBaseData: baseData => {
        set(state => ({
          data: {
            ...state.data,
            baseData,
            // Reset complementary data when pet type changes
            complementaryData:
              baseData.type === 'cat'
                ? {
                    indoorOutdoor: 'indoor',
                    lastFleaTreatment: '',
                    vaccinationStatus: '',
                  }
                : {
                    breed: '',
                    exerciseRoutine: '',
                    lastRabiesShot: '',
                    weight: '',
                  },
          },
        }))
      },
      setCatComplementaryData: catData => {
        set(state => ({
          data: {
            ...state.data,
            complementaryData: catData,
          },
        }))
      },
      setCurrentStep: step => {
        if (get().currentStep === step) return
        set({ currentStep: step })
      },
      setDogComplementaryData: dogData => {
        set(state => ({
          data: {
            ...state.data,
            complementaryData: dogData,
          },
        }))
      },
    }),
    {
      name: 'book-appointment-storage',
    },
  ),
)
