// @ts-nocheck
import ReactApexChart from 'react-apexcharts'

interface IVegetationChart {
  series: number[]
  categories: string[]
}

export const VegetationChart = ({ series, categories }: IVegetationChart) => {
  const data = [
    {
      name: 'Средняя',
      data: series, // O'rtacha qiymatlar
    },
  ]

  const options = {
    chart: {
      type: 'line',
      height: 350,
      toolbar: { show: false },
      zoom: {
        enabled: true,
        type: 'x',
        autoScaleYaxis: true,
      },
    },
    colors: ['#A855F7', '#8B5CF6', '#D8B4FE'], // Turli chiziqlar uchun ranglar
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    fill: {
      type: 'solid',
      opacity: [0.3, 0.2, 0.1], // Soyali maydonlar uchun
    },
    markers: {
      size: 4,
      hover: { sizeOffset: 2 },
    },
    dataLabels: {
      enabled: true,
      style: { colors: ['#A855F7'] },
    },
    tooltip: {
      shared: true,
      intersect: false,
      x: { format: 'dd MMM' },
      y: {
        formatter: (value: number) => value.toFixed(2),
      },
    },
    grid: {
      borderColor: '#E5E7EB',
      strokeDashArray: 5,
    },
    xaxis: {
      categories,
      labels: {
        style: { colors: '#6B7280' },
        rotate: -45, // Rotate the labels to avoid overlap
        show: true,
      },
      tickAmount: categories.length > 10 ? 10 : undefined, // Adjust number of ticks if categories are too many
      min: categories.length > 0 ? categories[0] : undefined,
      max: categories.length > 0 ? categories[categories.length - 1] : undefined,
    },
    yaxis: {
      min: -0.14,
      max: 0.84,
      labels: { formatter: (val: number) => val.toFixed(2) },
    },
    legend: {
      show: true,
      position: 'top',
    },
  }

  return (
    <div id='chart'>
      <ReactApexChart options={options} series={data} type='line' width='60%' height={250} />
    </div>
  )
}
