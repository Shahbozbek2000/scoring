/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable new-cap */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
// @ts-nocheck
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import L, { type LatLngExpression } from 'leaflet'
import { useQuery } from '@tanstack/react-query'
import { getNdviWithContour } from '@/apis/ndvi'
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
  const params = useParams()
  const ref = useRef<HTMLDivElement | null>(null)
  const [map, setMap] = useState<L.Map | null>(null)
  const [value, setValue] = useState(0)
  const [dates, setDates] = useState<any[]>([])
  const [geoLayer, setGeoLayer] = useState<L.LayerGroup | null>(null)
  const [currentOverlay, setCurrentOverlay] = useState<L.ImageOverlay | null>(null)
  const { date } = form.watch()

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
      form.reset({
        date: res?.data?.length > 0 ? dayjs(res?.data?.[0]?.time).format(DATE_FORMAT) : '',
      })

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

  const { data: meteoData = [] } = useQuery({
    queryKey: ['get-meteo', value],
    queryFn: async () =>
      await request(`meteo/stations/closest?longitude=${CENTER?.[1]}&latitude=${CENTER?.[0]}`),
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

  useEffect(() => {
    if (value === 1) {
      const record = data?.data?.find((ndvi: any) => dayjs(ndvi?.time).format(DATE_FORMAT) === date)
      if (record) {
        displayRecord(record, map?.getBounds())
      }
    } else {
      if (currentOverlay) {
        map?.removeLayer(currentOverlay)
        setCurrentOverlay(null) // Clear the overlay state
      }
    }
  }, [date, data?.data, value])

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

      const latLngs = meteoData
        .map((station: any) => {
          const { coordinates } = station?.station?.location
          return coordinates ? [coordinates[1], coordinates[0]] : null
        })
        .filter(Boolean)

      if (latLngs.length > 0) {
        map?.flyToBounds(latLngs, {
          maxZoom: 16,
        })
      }
    }
  }, [meteoData, map])

  const displayRecord = (record: any, bounds: L.LatLngBounds) => {
    if (!record?.ndvi_image) {
      console.error('NDVI image data not found in the record')
      return
    }

    const imageUrl = `data:image/png;base64,${record?.ndvi_image}`

    if (currentOverlay) {
      map?.removeLayer(currentOverlay)
    }

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
    meteoData,
  }
}
