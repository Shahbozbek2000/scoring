/* eslint-disable new-cap */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
// @ts-nocheck
import { request } from '@/configs/requests'
import { useRegions } from '@/hooks/useRegions'
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
  const regions = useRegions()
  const ref = useRef<HTMLDivElement | null>(null)
  const [map, setMap] = useState<L.Map | null>(null)
  const [geoLayer, setGeoLayer] = useState<L.LayerGroup | null>(null)
  const { region_id, district_id } = form.watch()

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

  useEffect(() => {
    if (!region_id && regions?.length > 0) {
      form.setValue('region_id', regions?.[0]?.value, { shouldValidate: true })
    }
  }, [region_id, regions])

  const { data: provinces = [] } = useQuery({
    queryKey: ['get-provinces', region_id],
    queryFn: async () => await request(`/data/districts/${region_id}`),
    select: res => {
      return res?.data?.map((v: any) => {
        return {
          value: v?.region_soato,
          label: v?.district,
        }
      })
    },
    enabled: region_id !== undefined,
  })

  const { data = [] } = useQuery({
    queryKey: ['get-all-land-areas', district_id],
    queryFn: async () => await request('application/get/district/' + district_id),
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
    enabled: district_id !== undefined,
  })

  return {
    ref,
    form,
    data,
    regions,
    provinces,
  }
}
