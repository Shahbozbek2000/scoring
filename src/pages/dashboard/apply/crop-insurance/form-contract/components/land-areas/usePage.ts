/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable new-cap */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
// @ts-nocheck
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import L, { type LatLngExpression } from 'leaflet'
import { useQuery } from '@tanstack/react-query'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import dayjs from 'dayjs'
import { DATE_FORMAT } from '@/constants/format' // Date formatting
import { useFormContext } from 'react-hook-form'
import type { CreditAreaContour } from '@/types/credit-area'
import { request } from '@/configs/requests'

// Initial map settings
const ZOOM = 10
const CENTER = [40.7, 72.2] as LatLngExpression

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
  const [value, setValue] = useState(0)
  const [dates, setDates] = useState<any[]>([])
  const [centerLatLng, setCenterLatLng] = useState<L.LatLng | null>(null)
  const [geoLayer, setGeoLayer] = useState<L.LayerGroup | null>(null)
  const [currentOverlay, setCurrentOverlay] = useState<L.ImageOverlay | null>(null)
  const { date } = form.watch()
  const query = new URLSearchParams(location.search)
  const apply_number = query.get('number')

  useEffect(() => {
    const mapInstance = new L.map(ref.current!, {
      zoom: ZOOM,
      center: CENTER,
      layers: [DEFAULT_LAYER],
    })
    setMap(mapInstance)

    mapInstance.addControl(new L.Control.Fullscreen({ position: 'topright' }))
    const layerGroup = new L.LayerGroup().addTo(mapInstance)
    setGeoLayer(layerGroup)

    return () => {
      mapInstance.remove()
    }
  }, [])

  const { data = [], isLoading } = useQuery({
    queryKey: [REACT_QUERY_KEYS.GET_NDVI_WITH_CONTOUR, apply_number],
    queryFn: async () => await request(`ndvi/insurance/${apply_number}`),
    select: res => {
      if (Array.isArray(res?.data)) {
        return res?.data
      } else {
        return []
      }
    },
    onSuccess: res => {
      if (Array.isArray(res)) {
        setDates(
          res?.map((ndvi: any) => ({
            label: `${dayjs(ndvi?.time).format(DATE_FORMAT)}`,
            value: `${dayjs(ndvi?.time).format(DATE_FORMAT)}`,
          })),
        )
        form.reset({
          date: res?.length > 0 ? dayjs(res?.[0]?.time).format(DATE_FORMAT) : '',
        })
      }

      pointerData.forEach((item: CreditAreaContour) => {
        const geometry = item.data?.features?.[0]?.geometry
        const geo = L.geoJSON(geometry, {
          onEachFeature: (feature, layer) => {
            if (feature?.type === 'Polygon' || feature?.type === 'MultiPolygon') {
              layer.setStyle({
                color: 'green',
                weight: 2,
                opacity: 0.7,
                fillColor: 'blue',
                fillOpacity: 0.1,
              })
              const bounds = layer.getBounds()
              const center = bounds.getCenter()
              setCenterLatLng(center)
            }
          },
        }).addTo(geoLayer!)

        const bounds = geo.getBounds()
        map?.flyToBounds(bounds, {
          maxZoom: 16,
        })
      })
    },
  })

  console.log(data, 'data')

  const { data: meteoData = [] } = useQuery({
    queryKey: [
      'get-meteo',
      value,
      centerLatLng,
      centerLatLng,
      centerLatLng?.lng,
      centerLatLng?.lat,
    ],
    queryFn: async () =>
      await request(
        `meteo/stations/closest?longitude=${centerLatLng?.lng}&latitude=${centerLatLng?.lat}`,
      ),
    select: response => response?.data,
    onSuccess: res => {
      if (res?.length > 0) {
        res?.forEach((station: any) => {
          const { coordinates } = station?.station?.location

          if (coordinates) {
            const [lng, lat] = coordinates
            const marker = L.marker([lat, lng]).addTo(map!)
            marker.bindPopup(`<b>${station?.station?.name}</b>`)
          }
        })
      }
    },
    enabled: value === 3,
  })
  console.log(value, 'value')

  useEffect(() => {
    if (value === 1) {
      const record = data?.find((ndvi: any) => dayjs(ndvi?.time).format(DATE_FORMAT) === date)
      if (record) {
        displayRecord(record, map?.getBounds())
      }
    } else {
      if (currentOverlay) {
        map?.removeLayer(currentOverlay)
        setCurrentOverlay(null) // Clear the overlay state
      }
    }
  }, [date, data, value])

  useEffect(() => {
    if (meteoData?.length > 0) {
      meteoData.forEach((station: any) => {
        const { coordinates } = station?.station?.location
        if (coordinates) {
          const [lng, lat] = coordinates
          const marker = L.marker([lat, lng]).addTo(map)
          marker.bindPopup(`<b>${station?.station?.name}</b>`)
        }
      })
    }
  }, [meteoData, map])

  const displayRecord = (record: any, bounds: L.LatLngBounds) => {
    console.log(record?.ndvi_image, 'record')
    if (!record?.ndvi_image) {
      console.error('NDVI image data not found in the record')
      return
    }

    const imageUrl = `data:image/png;base64,${record?.ndvi_image}`

    if (currentOverlay) {
      map?.removeLayer(currentOverlay)
    }
    console.log(imageUrl, 'imageurl')

    const imageBounds = [
      [bounds.getSouth(), bounds.getWest()],
      [bounds.getNorth(), bounds.getEast()],
    ]

    const overlay = L.imageOverlay(imageUrl, imageBounds, {
      opacity: 0.8, // Tasvirning shaffofligi
    }).addTo(map!)

    setCurrentOverlay(overlay)
  }

  return {
    ref,
    form,
    data: data || [],
    value,
    dates,
    setValue,
    isLoading,
    meteoData,
  }
}
