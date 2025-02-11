import * as L from 'leaflet'

declare module 'leaflet' {
  export interface MapOptions {
    fullscreenControl?: boolean
    fullscreenControlOptions?: FullscreenOptions
  }

  interface FullscreenOptions {
    position?: ControlPosition
    title?: string
    titleCancel?: string
    content?: string
    forceSeparateButton?: boolean
    forcePseudoFullscreen?: boolean
    fullscreenElement?: false | HTMLElement
  }
}
