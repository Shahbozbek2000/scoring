import { Box } from '@mui/material'
import { useEffect } from 'react'
import L from 'leaflet'
import 'leaflet-draw/dist/leaflet.draw'
import 'leaflet-draw/dist/leaflet.draw.css'
import 'leaflet/dist/leaflet.css'

export const Map = () => {
  useEffect(() => {
    const map = L.map('map-drow').setView([-33.865, 151.2094], 6)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
    }).addTo(map)

    const editableLayers = new L.FeatureGroup()
    map.addLayer(editableLayers)

    const drawOptions: L.Control.DrawConstructorOptions = {
      position: 'topright',
      draw: {
        polygon: {
          allowIntersection: false,
          drawError: {
            color: '#ff0000',
            message: 'Xato chizildi',
          },
          shapeOptions: {
            color: '#000000',
            weight: 1,
          },
        },
        polyline: false,
        rectangle: false,
        circle: false,
        marker: false,
        circlemarker: false,
      },
      edit: {
        featureGroup: editableLayers,
        remove: false,
      },
    }

    const drawControl = new L.Control.Draw(drawOptions)
    map.addControl(drawControl)

    map.on(L.Draw.Event.CREATED, e => {
      const layer = e.layer

      if (layer instanceof L.Marker) {
        layer.bindPopup('A popup!')
      }

      editableLayers.addLayer(layer)
    })

    return () => {
      map.remove()
    }
  }, [])

  return (
    <>
      <Box
        id='map-drow'
        width='100%'
        height='calc(100vh - 124px)'
        borderRadius='8px'
        position='relative'
        border={theme => `3px solid ${theme.palette.allColors.GREY20}`}
      />
    </>
  )
}
