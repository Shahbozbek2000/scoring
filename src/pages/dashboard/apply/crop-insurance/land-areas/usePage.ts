/* eslint-disable new-cap */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
// @ts-nocheck
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import L, { type LatLngExpression } from 'leaflet'
import { useQuery } from '@tanstack/react-query'
import { getNdviWithContour } from '@/apis/ndvi' // API call
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys' // Query keys
import { useGeoJsonStore } from '@/store/geojson' // GeoJSON store
import dayjs from 'dayjs'
import { DATE_FORMAT } from '@/constants/format' // Date formatting
import { useForm } from 'react-hook-form'

// Initial map settings
const ZOOM = 10
const CENTER = [40.7, 72.2] as LatLngExpression

const DEFAULT_LAYER = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
  maxZoom: 20,
  subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
})

export const usePage = () => {
  const form = useForm()
  const params = useParams()
  const ref = useRef<HTMLDivElement | null>(null)
  const { geojson } = useGeoJsonStore()
  const [map, setMap] = useState<L.Map | null>(null)
  const [value, setValue] = useState(0)
  const [dates, setDates] = useState<any[]>([])
  const [geoLayer, setGeoLayer] = useState<L.LayerGroup | null>(null)
  const [currentOverlay, setCurrentOverlay] = useState<L.ImageOverlay | null>(null)

  useEffect(() => {
    const mapInstance = new L.map(ref.current!, {
      zoom: ZOOM,
      center: CENTER,
      layers: [DEFAULT_LAYER],
    })
    setMap(mapInstance)

    const layerGroup = new L.LayerGroup().addTo(mapInstance)
    setGeoLayer(layerGroup)

    return () => {
      mapInstance.remove()
    }
  }, [])

  const { data, isLoading } = useQuery({
    queryKey: [REACT_QUERY_KEYS.GET_NDVI_WITH_CONTOUR, params?.id],
    queryFn: async () => await getNdviWithContour(params?.id),
    onSuccess: res => {
      setDates(
        res?.data?.map((ndvi: any) => ({
          label: `${dayjs(ndvi?.time).format(DATE_FORMAT)}`,
          value: `${dayjs(ndvi?.time).format(DATE_FORMAT)}`,
        })),
      )

      const geometry = geojson?.data?.features?.[0]?.geometry
      const geo = L.geoJSON(geometry, {
        onEachFeature: (feature, layer) => {
          // Drawing polygon
          if (feature?.type === 'Polygon' || feature?.type === 'MultiPolygon') {
            layer.setStyle({
              color: 'blue',
              weight: 2,
              opacity: 0.7,
              fillColor: 'blue',
              fillOpacity: 0.1,
            })
          }
        },
      }).addTo(geoLayer!)

      // Get GeoJSON bounds and adjust the map view
      const bounds = geo.getBounds()
      map?.flyToBounds(bounds, {
        maxZoom: 16,
      })
      if (res?.data?.length > 0) {
        displayRecord(res?.data?.[0], bounds)
      }
    },
  })

  const createNDVIImage = (
    bufferData: number[],
    geojsonLayer: L.LayerGroup,
    bounds: L.LatLngBounds,
  ) => {
    const size = Math.ceil(Math.sqrt(bufferData.length))
    const width = size
    const height = size

    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')!
    const imageData = ctx.createImageData(width, height)

    let min = Infinity
    let max = -Infinity
    bufferData.forEach(value => {
      min = Math.min(min, value)
      max = Math.max(max, value)
    })

    // Fill image data
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = y * width + x
        if (i >= bufferData.length) continue

        const lng = bounds.getWest() + (x / width) * (bounds.getEast() - bounds.getWest())
        const lat =
          bounds.getSouth() + ((height - y) / height) * (bounds.getNorth() - bounds.getSouth())

        // Check if point is inside the polygon
        const geometry = geojson?.data?.features?.[0]?.geometry
        const isInside = isPointInPolygon([lat, lng], geometry)

        const value = bufferData[i]
        const normalizedValue = (value - min) / (max - min)

        const pixelIndex = i * 4
        if (isInside) {
          imageData.data[pixelIndex] = Math.floor(255 * (1 - normalizedValue)) // R
          imageData.data[pixelIndex + 1] = Math.floor(255 * normalizedValue) // G
          imageData.data[pixelIndex + 2] = 0 // B
          imageData.data[pixelIndex + 3] = 255 // A
        } else {
          imageData.data[pixelIndex + 3] = 0
        }
      }
    }

    ctx.putImageData(imageData, 0, 0)
    return canvas.toDataURL()
  }

  const isPointInPolygon = (point: [number, number], geometry: any) => {
    const x = point[1] // longitude
    const y = point[0] // latitude
    let inside = false
    const coordinates = geometry?.coordinates[0] // Birinchi koordinatalar to'plami (Polygon uchun)

    // Poligonning chegaralari bo'yicha tekshirish
    for (let i = 0, j = coordinates.length - 1; i < coordinates.length; j = i++) {
      const xi = coordinates[i][0]
      const yi = coordinates[i][1]
      const xj = coordinates[j][0]
      const yj = coordinates[j][1]
      const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi
      if (intersect) inside = !inside
    }

    return inside
  }

  const displayRecord = (record: any, bounds: L.LatLngBounds) => {
    console.log(record, 'record')
    if (currentOverlay) {
      map?.removeLayer(currentOverlay)
    }

    const imageUrl = createNDVIImage(record?.ndvi_image?.data, geoLayer!, bounds)
    console.log(imageUrl, 'imageUrl')
    const imageBounds = [
      [bounds.getSouth(), bounds.getWest()],
      [bounds.getNorth(), bounds.getEast()],
    ]

    const overlay = L.imageOverlay(imageUrl, imageBounds, {
      opacity: 0.8,
    }).addTo(map!)

    setCurrentOverlay(overlay)
  }

  return {
    ref,
    form,
    data: data?.data,
    value,
    dates,
    setValue,
    isLoading,
  }
}
