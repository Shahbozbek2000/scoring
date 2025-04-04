/* eslint-disable new-cap */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
// @ts-nocheck
import { request } from '@/configs/requests'
import { useQuery } from '@tanstack/react-query'
import L, { type LatLngExpression } from 'leaflet'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import 'leaflet-fullscreen'
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css'

const ZOOM = 10
const CENTER = [40.7, 72.2] as LatLngExpression

const DEFAULT_LAYER = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
  maxZoom: 20,
  subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
})

export const usePage = () => {
  const form = useForm()
  const ref = useRef<HTMLDivElement | null>(null)
  const [map, setMap] = useState<L.Map | null>(null)
  const [geoLayer, setGeoLayer] = useState<L.LayerGroup | null>(null)
  const { crop_type } = form.watch()

  useEffect(() => {
    const mapInstance = new L.map(ref.current!, {
      zoom: ZOOM,
      center: CENTER,
      layers: [DEFAULT_LAYER],
      fullscreenControl: true,
    })
    setMap(mapInstance)

    const layerGroup = new L.LayerGroup().addTo(mapInstance)
    setGeoLayer(layerGroup)

    return () => mapInstance.remove()
  }, [])

  const { data: cropTypes = [] } = useQuery({
    queryKey: ['get-api-config'],
    queryFn: async () => await request('config/'),
    select: res => {
      return res.data?.crop_prices?.map((v: any) => {
        return {
          value: v?.crop_type,
          label: v?.crop_name,
        }
      })
    },
  })

  useEffect(() => {
    if (!crop_type && cropTypes?.length > 0) {
      form.setValue('crop_type', cropTypes?.[0]?.value, { shouldValidate: true })
    }
  }, [crop_type, cropTypes])

  const { data = [], isLoading } = useQuery({
    queryKey: ['get-all-land-areas', crop_type],
    queryFn: async () => await request('application/get/crop-type/' + crop_type),
    select: res => {
      return res.data?.result
    },
    onSuccess: res => {
      geoLayer?.clearLayers()

      const allFeatures = res.flatMap(
        item =>
          item.credit_area_contour_numbers?.flatMap(contour => contour?.data?.features ?? []) ?? [],
      )

      if (!allFeatures.length) return

      const geo = L.geoJSON({ type: 'FeatureCollection', features: allFeatures }).addTo(geoLayer!)

      map?.flyToBounds(geo.getBounds(), {
        maxZoom: 40,
      })
    },
    enabled: crop_type !== undefined,
  })

  return {
    ref,
    form,
    data,
    cropTypes,
    isLoading,
  }
}
