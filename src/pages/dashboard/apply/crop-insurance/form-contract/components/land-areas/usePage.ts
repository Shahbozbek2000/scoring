// @ts-nocheck
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import L, { type LatLngExpression } from 'leaflet'
import GeoRasterLayer from 'georaster-layer-for-leaflet'
import parseGeoraster from 'georaster'
import 'leaflet/dist/leaflet.css'
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css'
import 'leaflet-fullscreen'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useFormContext } from 'react-hook-form'
import type { CreditAreaContour } from '@/types/credit-area'
import { request } from '@/configs/requests'
import 'proj4'

import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

// Constants
const ZOOM = 10
const CENTER: LatLngExpression = [40.7, 72.2]

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

L.Marker.prototype.options.icon = DefaultIcon

const DEFAULT_LAYER = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
  maxZoom: 20,
  subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
})

interface ICreditAreaContour {
  pointerData: CreditAreaContour[]
}

export const usePage = ({ pointerData }: ICreditAreaContour) => {
  // Hooks and Refs
  const form = useFormContext()
  const location = useLocation()
  const ref = useRef<HTMLDivElement | null>(null)

  // State Management
  const [map, setMap] = useState<L.Map | null>(null)
  const [dates, setDates] = useState<any[]>([])
  const [centerLatLng, setCenterLatLng] = useState<L.LatLng | null>(null)
  const [geoLayer, setGeoLayer] = useState<L.LayerGroup | null>(null)
  const [currentOverlay, setCurrentOverlay] = useState<any>(null)
  const [ndviList, setNdviList] = useState<any[]>([])
  const [value, setValue] = useState(0)

  // Form and URL values
  const { date } = form.watch()
  const query = new URLSearchParams(location.search)
  const apply_number = query.get('number')

  // Color configurations
  const ndviColors = {
    veryLow: '#d73027',
    low: '#f46d43',
    modLow: '#fdae61',
    moderate: '#fee08b',
    modHigh: '#d9ef8b',
    high: '#a6d96a',
    veryHigh: '#1a9850',
  }

  const waterNdwiColors = {
    veryLow: '#4a148c',
    low: '#5c6bc0',
    modLow: '#7986cb',
    moderate: '#9fa8da',
    modHigh: '#c5cae9',
    high: '#e8eaf6',
    veryHigh: '#f5f5ff',
  }

  // Initialize Map
  useEffect(() => {
    if (!ref.current || map) return

    const mapInstance = L.map(ref.current, {
      zoom: ZOOM,
      center: CENTER,
      layers: [DEFAULT_LAYER],
      fullscreenControl: true,
      fullscreenControlOptions: {
        position: 'topright',
        title: 'To`liq ekran rejimi',
        titleCancel: 'To`liq ekran rejimidan chiqish',
      },
    })

    setMap(mapInstance)

    const layerGroup = new L.LayerGroup().addTo(mapInstance)
    setGeoLayer(layerGroup)

    return () => {
      mapInstance.remove()
    }
  }, [])

  // Legend Control
  useEffect(() => {
    if (!map) return

    const legend = L.control({ position: 'bottomright' })

    legend.onAdd = function () {
      const div = L.DomUtil.create('div', 'info legend')

      if (value === 2) {
        const waterLabels = [
          { color: waterNdwiColors.veryLow, label: 'Juda past suv indeksi' },
          { color: waterNdwiColors.low, label: 'Past suv indeksi' },
          { color: waterNdwiColors.modLow, label: 'O`rtacha past suv indeksi' },
          { color: waterNdwiColors.moderate, label: 'O`rta suv indeksi' },
          { color: waterNdwiColors.modHigh, label: 'O`rtacha yuqori suv indeksi' },
          { color: waterNdwiColors.high, label: 'Yuqori suv indeksi' },
          { color: waterNdwiColors.veryHigh, label: 'Juda yuqori suv indeksi' },
        ]

        div.innerHTML += '<strong>Suv indeksi</strong><br>'
        waterLabels.forEach(({ color, label }) => {
          div.innerHTML += `<i style="background: ${color}; width: 12px; height: 12px; display: inline-block; margin-right: 5px;"></i> ${label}<br>`
        })
      } else {
        const ndviLabels = [
          { color: ndviColors.veryLow, label: 'Juda past o`simlik qoplami' },
          { color: ndviColors.low, label: 'Past o`simlik qoplami' },
          { color: ndviColors.modLow, label: 'O`rtacha past o`simlik qoplami' },
          { color: ndviColors.moderate, label: 'O`rtacha o`simlik qatlami' },
          { color: ndviColors.modHigh, label: 'O`rtacha yuqori o`simlik qoplami' },
          { color: ndviColors.high, label: 'Yuqori o`simlik qoplami' },
          { color: ndviColors.veryHigh, label: 'Juda yuqori o`simlik qoplami' },
        ]

        div.innerHTML += '<strong>Vegetatsiya indeksi</strong><br>'
        ndviLabels.forEach(({ color, label }) => {
          div.innerHTML += `<i style="background: ${color}; width: 12px; height: 12px; display: inline-block; margin-right: 5px;"></i> ${label}<br>`
        })
      }

      return div
    }

    legend.addTo(map)

    return () => {
      map.removeControl(legend)
    }
  }, [map, value])

  // TIFF Display Function
  const displayTiffOnMap = async () => {
    if (!map || !geoLayer) return

    try {
      // Remove existing overlay
      if (currentOverlay) {
        map.removeLayer(currentOverlay)
        setCurrentOverlay(null)
      }

      // Fetch and parse TIFF
      const arrayBuffer = await fetch(
        'https://agro.semurgins.uz/api/ndvi/GwmFeWoRrU8zQbG6/2024-05-05.tiff',
      ).then(async res => await res.arrayBuffer())
      const georaster = await parseGeoraster(arrayBuffer)

      // Get GeoJSON bounds
      let geojsonBounds: L.LatLngBounds | null = null
      geoLayer.eachLayer(layer => {
        if (layer instanceof L.GeoJSON) {
          const bounds = layer.getBounds()
          if (!geojsonBounds) {
            geojsonBounds = bounds
          } else {
            geojsonBounds.extend(bounds)
          }
        }
      })

      if (!geojsonBounds) {
        throw new Error('GeoJSON bounds not found')
      }

      // Create color function based on index type
      const getColor = (value: number) => {
        const colors = indexValue === 2 ? COLORS.ndwi : COLORS.ndvi

        if (indexValue === 2) {
          if (value < -0.8) return colors.veryLow
          if (value < -0.6) return colors.low
          if (value < -0.4) return colors.modLow
          if (value < -0.2) return colors.moderate
          if (value < 0) return colors.modHigh
          if (value < 0.2) return colors.high
          return colors.veryHigh
        } else {
          if (value < 0) return colors.veryLow
          if (value < 0.2) return colors.low
          if (value < 0.4) return colors.modLow
          if (value < 0.6) return colors.moderate
          if (value < 0.8) return colors.modHigh
          if (value < 1.0) return colors.high
          return colors.veryHigh
        }
      }

      // Create and add layer
      const layer = new GeoRasterLayer({
        georaster,
        opacity: 0.7,
        resolution: 256,
        pixelValuesToColorFn: values => getColor(values[0]),
        bounds: geojsonBounds,
        debugLevel: 0,
      })

      layer.addTo(map)
      setCurrentOverlay(layer)

      // Fit map to bounds
      map.fitBounds(geojsonBounds, {
        padding: [50, 50],
        maxZoom: 16,
      })
    } catch (error) {
      console.error('Error displaying TIFF:', error)
      throw error
    }
  }

  // Fetch Dates Query
  const { isLoading } = useQuery({
    queryKey: ['ndvi-dates', value, apply_number],
    queryFn: async () => {
      const endpoint = value === 2 ? `ndwi/insurance/${apply_number}` : `ndvi/${apply_number}/dates`
      return await request(endpoint)
    },
    select: res => res?.data?.dates,
    onSuccess: res => {
      setNdviList(res)
      setDates(
        res?.map((ndvi: any) => ({
          label: dayjs(ndvi?.date).format('YYYY-MM-DD'),
          value: dayjs(ndvi?.date).format('YYYY-MM-DD'),
          download_url: ndvi?.download_url,
        })),
      )

      if (res?.length > 0) {
        form.reset({
          date: dayjs(res[0]?.date).format('YYYY-MM-DD'),
        })
      }

      // Add GeoJSON layers
      if (map && geoLayer) {
        pointerData?.forEach((item: CreditAreaContour) => {
          const geometry: any = item.data?.features?.[0]?.geometry
          const geo = L.geoJSON(geometry, {
            style: {
              color: 'green',
              weight: 2,
              opacity: 0.7,
              fillOpacity: 0.1,
            },
          }).addTo(geoLayer)

          const bounds = geo.getBounds()
          const center = bounds.getCenter()
          setCenterLatLng(center)
          map.flyToBounds(bounds, { maxZoom: 16 })
        })
      }
    },
  })

  // Fetch TIFF Data Query
  useQuery({
    queryKey: ['get-ndvi-with-contour', apply_number, date, value],
    queryFn: async () => {
      const endpoint =
        value === 2 ? `ndwi/insurance/${apply_number}` : `ndvi/${apply_number}/${date}.tiff`
      return await request(endpoint)
    },
    onSuccess: response => {
      console.log(response.data, 'response')
      if (response?.data && map) {
        void displayTiffOnMap()
      }
    },
  })

  // Meteo Data Query
  const { data: meteoData = [] } = useQuery({
    queryKey: ['get-meteo', value, centerLatLng?.lng, centerLatLng?.lat],
    queryFn: async () =>
      await request(
        `meteo/stations/closest?longitude=${centerLatLng?.lng}&latitude=${centerLatLng?.lat}`,
      ),
    select: response => response?.data,
    onSuccess: res => {
      if (res?.length > 0 && map) {
        res.forEach((station: any) => {
          const coordinates = station?.station?.location?.coordinates
          if (coordinates) {
            const [lng, lat] = coordinates
            const marker = L.marker([lat, lng]).addTo(map)
            marker.bindPopup(`<b>${station?.station?.name}</b>`)
          }
        })
      }
    },
    enabled: value === 4 && !!centerLatLng?.lat && !!centerLatLng?.lng,
  })

  return {
    ref,
    form,
    data: ndviList,
    value,
    dates,
    setValue,
    isLoading,
    meteoData,
  }
}
