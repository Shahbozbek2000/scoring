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
      console.log(res, 'response-ndvi')
      setDates(
        res?.data?.map((ndvi: any) => ({
          label: `${dayjs(ndvi?.time).format(DATE_FORMAT)}`,
          value: `${dayjs(ndvi?.time).format(DATE_FORMAT)}`,
        })),
      )
      const properties = geojson?.data?.features?.[0]?.properties
      form.reset({
        company_name: properties?.farmer_name,
        area: properties?.area,
        pin: properties?.farmer_tax_number,
        cadastr_number: properties?.cad_number,
        contour_number: properties?.contour_number,
        ball_bonitet: properties?.ball_bonitet,
        date: res?.data?.length > 0 ? dayjs(res?.data?.[0]?.time).format(DATE_FORMAT) : '',
      })

      const geometry = geojson?.data?.features?.[0]?.geometry
      const geo = L.geoJSON(geometry, {
        onEachFeature: (feature, layer) => {
          // Drawing polygon
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

      // Get GeoJSON bounds and adjust the map view
      const bounds = geo.getBounds()
      map?.flyToBounds(bounds, {
        maxZoom: 16,
      })
    },
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

  const displayRecord = (record: any, bounds: L.LatLngBounds) => {
    if (!record?.ndvi_image) {
      console.error('NDVI image data not found in the record')
      return
    }

    // Base64 tasvirni URL formatiga o'zgartirish
    const imageUrl = `data:image/png;base64,${record?.ndvi_image}`

    // Agar avvalgi overlay mavjud bo'lsa, uni xaritadan olib tashlash
    if (currentOverlay) {
      map?.removeLayer(currentOverlay)
    }

    // Tasvirni xaritaga qo'shish uchun ImageOverlay yaratish
    const imageBounds = [
      [bounds.getSouth(), bounds.getWest()],
      [bounds.getNorth(), bounds.getEast()],
    ]

    const overlay = L.imageOverlay(imageUrl, imageBounds, {
      opacity: 0.8, // Tasvir shaffofligini sozlash
    }).addTo(map!)

    // Yangi overlayni saqlash
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
