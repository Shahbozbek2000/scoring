export interface CreditAreaContour {
  data: {
    features: Array<{
      geometry: {
        type: string // e.g., "Polygon"
        coordinates: number[][][] // 3D array for polygon coordinates
      }
      properties: {
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
      type: string // e.g., "Feature"
    }>
  }
  number: number
  geojson: string
  landId: string
}
