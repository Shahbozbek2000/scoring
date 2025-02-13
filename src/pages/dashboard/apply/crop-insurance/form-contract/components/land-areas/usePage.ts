/* eslint-disable @typescript-eslint/no-non-null-assertion */
// @ts-nocheck
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import L, { type LatLngExpression } from 'leaflet'
// import parseGeoraster from 'georaster'
// import 'proj4'
// import GeoRasterLayer from 'georaster-layer-for-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css'
import 'leaflet-fullscreen'
import { useQuery } from '@tanstack/react-query'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import dayjs from 'dayjs'
import { DATE_FORMAT } from '@/constants/format' // Date formatting
import { useFormContext } from 'react-hook-form'
import type { CreditAreaContour } from '@/types/credit-area'
import { request } from '@/configs/requests'
import JSZip from 'jszip'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

L.Marker.prototype.options.icon = DefaultIcon

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
  const [dates, setDates] = useState<any[]>([])
  const [centerLatLng, setCenterLatLng] = useState<L.LatLng | null>(null)
  const [geoLayer, setGeoLayer] = useState<L.LayerGroup | null>(null)
  const [currentOverlay, setCurrentOverlay] = useState<L.ImageOverlay | null>(null)
  const [ndviList, setNdviList] = useState<any[]>([])
  const [tiffList, setTiffList] = useState<any[]>([])
  const [value, setValue] = useState(0)
  const { date } = form.watch()
  const query = new URLSearchParams(location.search)
  const apply_number = query.get('number')

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

  useEffect(() => {
    if (!ref.current || map) return

    delete (L.Icon.Default.prototype as any)._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'leaflet/dist/images/marker-icon-2x.png',
      iconUrl: 'leaflet/dist/images/marker-icon.png',
      shadowUrl: 'leaflet/dist/images/marker-shadow.png',
    })

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

  useEffect(() => {
    if (!map) return

    const legend = L.control({ position: 'bottomright' })

    legend.onAdd = function () {
      const div = L.DomUtil.create('div', 'info legend')

      if (value === 2) {
        const waterLabels = [
          { color: waterNdwiColors?.veryLow, label: 'Juda past suv indeksi' },
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

  async function parseZipFile(zipBlob: any) {
    const zip = new JSZip()
    const zipContent = await zip.loadAsync(zipBlob)

    const metadataFile = zipContent.file('metadata.json')
    const metadata = metadataFile ? JSON.parse(await metadataFile.async('string')) : []

    const tiffFiles = await Promise.all(
      Object.keys(zipContent.files)
        .filter(fileName => fileName.endsWith('.tif'))
        .map(async fileName => {
          const file = zipContent.file(fileName)
          if (file) {
            const content = await file.async('arraybuffer')
            return { fileName, content }
          }
          return null
        }),
    )

    return {
      metadata,
      tiffFiles: tiffFiles.filter(Boolean),
    }
  }

  // const displayTiffOnMap = async (
  //   tiffFile: { fileName: string; content: ArrayBuffer },
  //   map: L.Map,
  //   geoLayer: L.LayerGroup,
  // ) => {
  //   try {
  //     if (!tiffFile?.content) {
  //       console.error('TIFF fayl kontenti mavjud emas')
  //       return
  //     }

  //     const bufferCopy = tiffFile?.content.slice(0)
  //     const georaster = await parseGeoraster(bufferCopy)

  //     const currentLayer = new GeoRasterLayer({
  //       georaster,
  //       opacity: 0.8,
  //       resolution: 256,
  //     })

  //     currentLayer.addTo(map)
  //     setCurrentOverlay(currentLayer)
  //   } catch (error) {
  //     console.error('TIFF faylni xaritaga yuklashda xatolik:', error)
  //   }
  // }

  const { isLoading } = useQuery({
    queryKey: [REACT_QUERY_KEYS.GET_NDVI_WITH_CONTOUR, apply_number, value],
    queryFn: async () => {
      const endpoint =
        value === 2 ? `ndwi/insurance/${apply_number}` : `ndvi/insurance/${apply_number}`
      return await request(endpoint, {
        responseType: 'blob',
      })
    },
    select: async res => {
      const files = await parseZipFile(res?.data)
      return files
    },
    onSuccess: async res => {
      const result = await res
      setTiffList(result?.tiffFiles)
      setNdviList(result?.metadata)
      if (Array.isArray(result?.metadata)) {
        setDates(
          result?.metadata?.map((ndvi: any) => ({
            label: `${dayjs(ndvi?.time).format(DATE_FORMAT)}`,
            value: `${dayjs(ndvi?.time).format(DATE_FORMAT)}`,
            filename: ndvi?.filename,
          })),
        )
        form.reset({
          date:
            result?.metadata?.length > 0
              ? dayjs(result?.metadata?.[0]?.time).format(DATE_FORMAT)
              : '',
        })
      }

      pointerData?.forEach((item: CreditAreaContour) => {
        const geometry: any = item.data?.features?.[0]?.geometry
        const geo = L.geoJSON(geometry, {
          onEachFeature: (feature: any, layer: any) => {
            if (feature?.type === 'Polygon' || feature?.type === 'MultiPolygon') {
              layer.setStyle({
                color: 'green',
                weight: 2,
                opacity: 0.7,
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
          const coordinates = station?.station?.location?.coordinates
          if (coordinates) {
            const [lng, lat] = coordinates
            const marker = L.marker([lat, lng]).addTo(map!)
            marker.bindPopup(`<b>${station?.station?.name}</b>`)
          }
        })
      }
    },
    enabled: value === 4,
  })

  useEffect(() => {
    if (!map || !geoLayer || !Array.isArray(dates) || !Array.isArray(tiffList)) {
      return
    }

    if (value !== 1 && value !== 2) {
      if (currentOverlay) {
        map.removeLayer(currentOverlay)
        setCurrentOverlay(null)
      }
      return
    }

    const currentFilename = dates.find(v => v?.value === date)?.filename
    if (!currentFilename) {
      console.warn('Tanlangan sana bo‘yicha TIFF fayl topilmadi.')
      return
    }

    const tiff = tiffList.find(v => v?.fileName === currentFilename)
    // if (!tiff?.content) {
    //   console.warn(`"${currentFilename}" nomli TIFF fayl topilmadi yoki bo'sh.`)
    //   return
    // }

    // void displayTiffOnMap(tiff, map, geoLayer)
  }, [geoLayer, map, tiffList, value, date, dates])

  useEffect(() => {
    if (meteoData?.length > 0) {
      meteoData.forEach((station: any) => {
        const coordinates = station?.station?.location?.coordinates
        if (coordinates) {
          const [lng, lat] = coordinates
          const marker = L.marker([lat, lng]).addTo(map!)
          marker.bindPopup(`<b>${station?.station?.name}</b>`)
        }
      })
    }
  }, [meteoData, map])

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
