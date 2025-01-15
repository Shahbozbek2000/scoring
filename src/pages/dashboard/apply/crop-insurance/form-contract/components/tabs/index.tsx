import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { ContractForm } from '../form'
import LandAreas from '../land-areas'
import type { CreditAreaContour } from '@/types/credit-area'

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

interface ICustomTabsProps {
  slug: string | undefined
  value: number
  pointerData: CreditAreaContour[]
  setValue: React.Dispatch<React.SetStateAction<number>>
}

export const CustomTabs = ({ slug, value, pointerData, setValue }: ICustomTabsProps) => {
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  console.log(pointerData, 'data')

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <StyledTabs value={value} onChange={handleChange} aria-label='custom styled tabs'>
          <StyledTab label='Shartnoma generatsiya qilish' {...a11yProps(0)} />
          <StyledTab label='Yer maydonlari' {...a11yProps(1)} />
        </StyledTabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <ContractForm slug={slug} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <LandAreas pointerData={pointerData} />
      </CustomTabPanel>
    </Box>
  )
}
