import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AppointmentBaseData, AppointmentData, CatComplementaryData, DogComplementaryData } from './book-appointment.validation'

interface BookAppointmentState {
  // eslint-disable-next-line no-magic-numbers
  currentStep: 0 | 1 | 2
  setCurrentStep: (step: this['currentStep']) => void
  // Base data
  data: AppointmentData
  setBaseData: (baseData: AppointmentBaseData) => void
  // Complementary data
  setCatComplementaryData: (data: CatComplementaryData) => void
  setDogComplementaryData: (data: DogComplementaryData) => void
  // Utilities
  resetForm: () => void
}

const initialData = {
  baseData: {
    type: 'cat',
  } satisfies Partial<AppointmentData['baseData']>,
  complementaryData: {
    indoorOutdoor: 'indoor',
  } satisfies Partial<AppointmentData['complementaryData']>,
} as AppointmentData

export const useBookAppointmentStore = create<BookAppointmentState>()(
  persist(
    (set, get) => ({
      currentStep: 0,
      data: initialData,
      resetForm: () => {
        set({ currentStep: 0, data: initialData })
      },
      setBaseData: baseData => {
        set({
          data: {
            baseData,
            complementaryData: initialData.complementaryData,
          },
        })
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
