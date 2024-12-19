/* eslint-disable @typescript-eslint/array-type */
import ReactApexChart from 'react-apexcharts'
import { useRef } from 'react'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { useFormContext } from 'react-hook-form'
import { DATE_FORMAT } from '@/constants/format'

dayjs.extend(customParseFormat)

interface IVegetationChart {
  series: number[]
  categories: string[]
}

export const VegetationChart = ({ series, categories }: IVegetationChart) => {
  const form = useFormContext()

  const data = [
    {
      name: 'Средняя',
      data: series, // O'rtacha qiymatlar
    },
  ]

  const options: any = {
    chart: {
      type: 'line',
      height: 300,
      toolbar: { show: false },
      zoom: {
        enabled: true,
        type: 'x',
        autoScaleYaxis: true,
      },
    },
    colors: ['#A855F7', '#8B5CF6', '#D8B4FE'],
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    fill: {
      type: 'solid',
      opacity: [0.3, 0.2, 0.1],
    },
    markers: {
      size: 4,
      hover: { sizeOffset: 2 },
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '12px',
        colors: ['#A855F7'],
        borderRadius: '50%',
      },
      formatter: function (
        val: number,
        {
          seriesIndex,
          dataPointIndex,
          w,
        }: {
          seriesIndex: number
          dataPointIndex: number
          w: { config: { series: { data: { date: string }[] }[] }; globals: any }
        },
      ) {
        if (
          dayjs(`${w?.globals?.categoryLabels[dataPointIndex]} 2024`, 'DD MMMM YYYY')
            .add(1, 'month')
            .format('DD.MM.YYYY') === dayjs(form.watch('date')).format(DATE_FORMAT)
        ) {
          return val.toFixed(2)
        } else {
          return ''
        }
      },
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
        rotate: -45,
        show: true,
      },
    },
    yaxis: {
      min: undefined,
      labels: { formatter: (val: number) => val.toFixed(2) },
    },
    legend: {
      show: true,
      position: 'top',
    },
  }

  return (
    <div id='chart'>
      <ReactApexChart options={options} series={data} type='line' width='70%' height={300} />
    </div>
  )
}
