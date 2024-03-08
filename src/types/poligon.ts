export interface KMLExtraData {
  mObjectId: number
  mObjectName: string
  fromDate: string
  toDate: string
  fromPoint: number
  toPoint: number
  kmlPointCount: number
  kmlDistance: string
  events: {
    kmlExtraDataEventList: string[]
  }
  distance: number
}

export interface KMLStyle {
  id: string
  kmlLineStyle: {
    color: string
    width: number
  }
}

export interface KMLPlacemark {
  name: null | string
  styleUrl: string
  kmlTrack: {
    kmlWhenList: number[]
    kmlCoordList: Array<[number, number]>
    kmlAngelsList: number[]
    kmlSpeedList: number[]
  }
}

export interface ParkingPin {
  timestamp: number
  lat: number
  lon: number
  trackDate: string
  trackTime: string
  dateReceived: string
  timeReceived: string
  parkingTime: string
  address: null | string
  sdParkingPopup: string
}

export interface KMLData {
  kmlExtraDataList: {
    kmlExtraDataList: KMLExtraData[]
  }
  kmlStyleList: KMLStyle[]
  kmlFolder: {
    kmlPlacemarkList: KMLPlacemark[]
  }
  parkingPins: ParkingPin[]
}
