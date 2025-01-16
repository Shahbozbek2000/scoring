export interface Station {
  id: number
  name: string
  location: {
    type: string
    coordinates: [number, number] // Longitude va Latitude
  }
  distance: number
}

export interface SoilData {
  depth1: number | null // Maʼlumot bo'lmasligi mumkin
  depth2: number | null
  depth3: number | null
  depth4: number | null
}

export interface LatestData {
  soilMoisture: SoilData
  soilTemperature: SoilData
  _id: string
  stationId: number
  stationName: string
  datetime: string // ISO formatdagi vaqt
  raw: {
    StationId: number
    StationName: string
    SoilMoisture1: number | null
    SoilMoisture2: number | null
    SoilMoisture3: number | null
    SoilMoisture4: number | null
    SoilTemp1: number | null
    SoilTemp2: number | null
    SoilTemp3: number | null
    SoilTemp4: number | null
    datetime: string
  }
  createdAt: string
  updatedAt: string
  __v: number
}

export interface StationData {
  station: Station
  latestData: LatestData
}
