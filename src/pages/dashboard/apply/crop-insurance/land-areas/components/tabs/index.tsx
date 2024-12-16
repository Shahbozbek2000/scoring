import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { Pointers } from '../pointers'
import { NDVI } from '../ndvi'
import { Weather } from '../weather'
import { AnomalousArea } from '../anomalous-area'
import { SoilAnalysis } from '../soil-analysis'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

// Custom Tab styling
const StyledTabs = styled(Tabs)({
  '& .MuiTabs-indicator': {
    backgroundColor: '#2F847C', // Green underline
    height: '3px',
  },
})

const StyledTab = styled(Tab)(({ theme }) => ({
  fontFamily: 'GothamProRegular',
  fontWeight: 400,
  textTransform: 'none',
  fontSize: '14px',
  color: '#000', // Default color for inactive tabs
  '&.Mui-selected': {
    fontWeight: 600, // Bold for active tab
    color: '#2F847C', // Green color for active tab
  },
}))

interface ISelect {
  label: string
  value: string
}

interface ICustomTabsProps {
  value: number
  dates: ISelect[]
  series: number[]
  categories: string[]
  setValue: React.Dispatch<React.SetStateAction<number>>
}

export const CustomTabs = ({ value, setValue, dates, series, categories }: ICustomTabsProps) => {
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <StyledTabs value={value} onChange={handleChange} aria-label='custom styled tabs'>
          <StyledTab label="Ko'rsatgichlari" {...a11yProps(0)} />
          <StyledTab label='NDVI' {...a11yProps(1)} />
          <StyledTab label='Ob-havo' {...a11yProps(2)} disabled />
          <StyledTab label='Anamal hudud' {...a11yProps(3)} disabled />
          <StyledTab label='Tuproq tahlili' {...a11yProps(4)} disabled />
        </StyledTabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Pointers />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <NDVI dates={dates} series={series} categories={categories} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Weather />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <AnomalousArea />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <SoilAnalysis />
      </CustomTabPanel>
    </Box>
  )
}
