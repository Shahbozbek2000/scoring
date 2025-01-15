export const Weather = () => {
  return (
    <iframe
      width='100%'
      height='300'
      src='https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=mm&metricTemp=°C&metricWind=m/s&zoom=5&overlay=wind&product=ecmwf&level=surface&lat=41.311081&lon=69.240562&detailLat=41.311081&detailLon=69.240562&detail=true&message=true'
      frameBorder='0'
    />
  )
}
