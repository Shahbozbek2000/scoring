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
  const form = useFormContext()
  const location = useLocation()
  const ref = useRef<HTMLDivElement | null>(null)
  const [map, setMap] = useState<L.Map | null>(null)
  const [dates, setDates] = useState<any[]>([])
  const [centerLatLng, setCenterLatLng] = useState<L.LatLng | null>(null)
  const [geoLayer, setGeoLayer] = useState<L.LayerGroup | null>(null)
  const [currentOverlay, setCurrentOverlay] = useState<any>(null)
  const [ndviList, setNdviList] = useState<any[]>([])
  const [value, setValue] = useState(0)
  const { date } = form.watch()
  const query = new URLSearchParams(location.search)
  const apply_number = query.get('number')

  // Color scales
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

    if (value === 1 || value === 2) {
      const legend = L.control({ position: 'bottomright' })
      legend.onAdd = function () {
        const div = L.DomUtil.create('div', 'info legend')
        div.style.backgroundColor = 'white'
        div.style.padding = '10px'
        div.style.borderRadius = '5px'

        const colors = value === 2 ? waterNdwiColors : ndviColors
        const labels =
          value === 2
            ? [
                { color: colors.veryLow, label: 'Juda past suv indeksi' },
                { color: colors.low, label: 'Past suv indeksi' },
                { color: colors.modLow, label: 'O`rtacha past suv indeksi' },
                { color: colors.moderate, label: 'O`rta suv indeksi' },
                { color: colors.modHigh, label: 'O`rtacha yuqori suv indeksi' },
                { color: colors.high, label: 'Yuqori suv indeksi' },
                { color: colors.veryHigh, label: 'Juda yuqori suv indeksi' },
              ]
            : [
                { color: colors.veryLow, label: 'Juda past o`simlik qoplami' },
                { color: colors.low, label: 'Past o`simlik qoplami' },
                { color: colors.modLow, label: 'O`rtacha past o`simlik qoplami' },
                { color: colors.moderate, label: 'O`rtacha o`simlik qatlami' },
                { color: colors.modHigh, label: 'O`rtacha yuqori o`simlik qoplami' },
                { color: colors.high, label: 'Yuqori o`simlik qoplami' },
                { color: colors.veryHigh, label: 'Juda yuqori o`simlik qoplami' },
              ]

        div.innerHTML += `<strong>${value === 2 ? 'Suv indeksi' : 'Vegetatsiya indeksi'}</strong><br>`
        labels.forEach(({ color, label }) => {
          div.innerHTML += `<i style="background: ${color}; width: 12px; height: 12px; display: inline-block; margin-right: 5px;"></i> ${label}<br>`
        })

        return div
      }
      legend.addTo(map)
      return () => {
        map.removeControl(legend)
      }
    }
  }, [map, value])

  const displayTiffOnMap = async (tiffData: ArrayBuffer) => {
    if (!map || !geoLayer) return

    try {
      if (currentOverlay) {
        map.removeLayer(currentOverlay)
        setCurrentOverlay(null)
      }

      const georaster = await parseGeoraster(tiffData)

      const tiffBounds = L.latLngBounds(
        [georaster.ymin, georaster.xmin],
        [georaster.ymax, georaster.xmax],
      )

      const layer = new GeoRasterLayer({
        georaster,
        opacity: 0.7,
        resolution: 256,
        bounds: tiffBounds,
        debugLevel: 0,
      })

      layer.addTo(map)
      setCurrentOverlay(layer)

      map.fitBounds(tiffBounds, { padding: [50, 50], maxZoom: 16 })
    } catch (error) {
      console.error('Error displaying TIFF:', error)
    }
  }

  const clearTiffFromMap = () => {
    if (currentOverlay) {
      map.removeLayer(currentOverlay)
      setCurrentOverlay(null)
    }
  }

  // Fetch Dates Query
  const { isLoading } = useQuery({
    queryKey: ['ndvi-dates', value, apply_number],
    queryFn: async () => {
      const endpoint = value === 2 ? `ndwi/${apply_number}/dates` : `ndvi/${apply_number}/dates`
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

      if (map && geoLayer && pointerData) {
        // pointerData tekshirish qo'shildi
        geoLayer.clearLayers()
        pointerData.forEach((item: CreditAreaContour) => {
          const geometry: any = item.data?.features?.[0]?.geometry
          if (geometry) {
            // Geometriya mavjudligini tekshirish
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

            // GeoJSON chegaralari TIFF chegaralaridan keyin o'rnatilishi kerak
            if (currentOverlay) {
              // TIFF yuklangandan keyin
              map.fitBounds(currentOverlay.getBounds(), { padding: [50, 50], maxZoom: 16 })
            } else {
              // Agar TIFF yuklanmagan bo'lsa
              map.fitBounds(bounds, { maxZoom: 16 }) // GeoJSON chegaralariga moslash
            }
          }
        })
      }
    },
  })

  // Fetch TIFF Data Query
  useQuery({
    queryKey: ['get-ndvi-with-contour', apply_number, date, value],
    queryFn: async () => {
      const endpoint =
        value === 2 ? `ndwi/${apply_number}/${date}.tiff` : `ndvi/${apply_number}/${date}.tiff`
      return await request(endpoint, { responseType: 'blob' })
    },
    onSuccess: response => {
      if (response?.data) {
        if (value === 1 || value === 2) {
          void displayTiffOnMap(response.data)
        } else {
          clearTiffFromMap()
        }
      }
    },
    onError: error => {
      console.error('Ma`lumotlarni yuklashda xatolik:', error)
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
