// @ts-nocheck
import React from 'react'

export const Weather = () => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <iframe
        src='https://embed.windy.com/embed2.html?lat=50.4&lon=14.3&zoom=5&level=surface&overlay=wind&menu=&message=&marker=&calendar=now&pressure=true&type=map&location=coordinates&detail=&detailLat=50.4&detailLon=14.3&metricWind=default&metricTemp=default&radarRange=-1'
        width='100%'
        height='300px'
        frameBorder='0'
        title='Windy Map'
        style={{ border: 0 }}
        allowFullScreen
      ></iframe>
    </div>
  )
}
