// @ts-nocheck
import ReactApexChart from 'react-apexcharts'
import { useFormContext } from 'react-hook-form'
import { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import { DATE_FORMAT } from '@/constants/format'

interface IVegetationChart {
  series: number[]
  categories: string[]
}

export const VegetationChart = ({ series, categories }: IVegetationChart) => {
  const form = useFormContext()
  const selectedDate = form.watch('date')

  const [annotations, setAnnotations] = useState<any[]>([])

  useEffect(() => {
    if (!selectedDate) return

    const selectedDateIndex = categories.findIndex(
      category => dayjs(category).format(DATE_FORMAT) === selectedDate,
    )

    // Log the index and selected date for debugging
    console.log(dayjs('29 Apr').format(DATE_FORMAT), 'categories')
    console.log(selectedDate, 'selectedDate')

    if (selectedDateIndex !== -1) {
      // Set the annotation for the selected date
      setAnnotations([
        {
          x: selectedDateIndex, // X position based on the index of the selected date
          y: series[selectedDateIndex], // Y position based on the series value
          label: {
            text: `Selected Date: ${selectedDate}`,
            style: {
              background: '#A855F7',
              color: '#fff',
              fontSize: '12px',
              borderRadius: '3px',
            },
          },
        },
      ])
    }
  }, [selectedDate, categories, series]) // Dependency array includes selectedDate, categories, and series

  console.log(annotations, 'annotations')

  const data = [
    {
      name: 'Средняя',
      data: series, // O'rtacha qiymatlar
    },
  ]

  const options = {
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
        rotate: -45,
        // show: categories[0] !== 'negative',
      },
      min: categories.length > 0 ? categories[0] : undefined,
      max: categories.length > 0 ? categories[categories.length - 1] : undefined,
    },
    yaxis: {
      min: undefined,
      labels: { formatter: (val: number) => val.toFixed(2) },
    },
    annotations: {
      points: annotations, // Dynamically add points annotation based on selectedDate
    },
    legend: {
      show: true,
      position: 'top',
    },
  }

  return (
    <div id='chart'>
      <ReactApexChart options={options} series={data} type='line' width='60%' height={300} />
    </div>
  )
}
