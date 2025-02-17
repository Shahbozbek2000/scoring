import React, { useState, useEffect, useCallback } from 'react'
import { IconButton, Stack } from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import { SelectInput } from '@/components/select'
import type { Control } from 'react-hook-form'

// Interfacelar
interface DateOption {
  label: string
  value: string
}

interface AnimationControlsProps {
  dates: DateOption[]
  currentDate: string
  onDateChange: (date: string) => void
  control: Control<any>
}

const AnimationControls: React.FC<AnimationControlsProps> = ({
  dates,
  currentDate,
  onDateChange,
  control,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  // Boshlang'ich indeksni topish
  useEffect(() => {
    const index = dates.findIndex((d: DateOption) => d.value === currentDate)
    if (index !== -1) {
      setCurrentIndex(index)
    }
  }, [currentDate, dates])

  // Animatsiya sikli
  useEffect(() => {
    let intervalId: NodeJS.Timeout

    if (isPlaying && dates.length > 0) {
      intervalId = setInterval(() => {
        setCurrentIndex((prevIndex: number) => {
          const nextIndex = (prevIndex + 1) % dates.length
          onDateChange(dates[nextIndex].value)
          return nextIndex
        })
      }, 2000)
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [isPlaying, dates, onDateChange])

  const togglePlay = useCallback((): void => {
    setIsPlaying((prev: boolean) => !prev)
  }, [])

  return (
    <Stack direction='row' spacing={2} alignItems='flex-end'>
      <SelectInput label='Sana' name='date' control={control} placeholder='Sana' options={dates} />
      <IconButton
        onClick={togglePlay}
        type='button'
        aria-label={isPlaying ? 'Pause animation' : 'Play animation'}
      >
        {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
      </IconButton>
    </Stack>
  )
}

export default AnimationControls
