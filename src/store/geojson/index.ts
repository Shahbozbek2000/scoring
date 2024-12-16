import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// Geometry type
interface Geometry {
  type: string
  coordinates: number[][][][]
}

// Properties type
interface FeatureProperties {
  name: string
  id: number
  area: number
  cad_number: string
  contour_number: number
  plant_id: number
  farmer_name: string
  ball_bonitet: number
  farmer_tax_number: string
}

// Feature type
interface Feature {
  geometry: Geometry
  properties: FeatureProperties
  type: string
}

// Data type
interface Data {
  features: Feature[]
}

// Root type
interface LandData {
  data: Data
  number: number
  geojson: string
  landId: string
}

interface IGeoJsonStore {
  geojson: null | LandData
  setGeoJson: (payload: null | LandData) => void
}

export const useGeoJsonStore = create<IGeoJsonStore>()(
  persist(
    set => ({
      geojson: null,
      setGeoJson: payload => {
        set(() => ({ geojson: payload }))
      },
    }),
    {
      name: 'geojson-storage', // LocalStorage yoki AsyncStorage uchun kalit nomi
      storage: createJSONStorage(() => localStorage), // Mahalliy xotira uchun saqlash
    },
  ),
)
