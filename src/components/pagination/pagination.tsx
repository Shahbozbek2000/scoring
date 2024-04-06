/* eslint-disable react-hooks/exhaustive-deps */
// @ts-nocheck
import Stack from '@mui/material/Stack'
import Pagination from '@mui/material/Pagination'
import { Typography } from '@mui/material'
import { type ICustomPagination } from '@/types/pagination'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const CustomPagination = ({ params, setParams, count = 0 }: ICustomPagination) => {
  const navigate = useNavigate()

  useEffect(() => {
    const queryParams: string = '?page=' + params.page + '&limit=' + params.limit
    navigate({
      pathname: location.pathname,
      search: queryParams,
    })
  }, [params])

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setParams({
      page,
      limit: 10,
    })
  }
  return (
    <Stack
      width='100%'
      display='flex'
      justifyContent='center'
      alignItems='center'
      direction='row'
      spacing={3}
    >
      <Pagination
        count={Math.ceil(count / params.limit)}
        variant='outlined'
        shape='rounded'
        page={params.page}
        onChange={handlePageChange}
        sx={{
          '& .MuiPaginationItem-root': {
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'GothamProRegular',
            fontSize: '14px',
            color: '#272937',
            borderRadius: '4px !important',
            border: '1px solid #EDEDED',
            lineHeight: 'normal',
          },
        }}
      />
      <Typography
        sx={{
          color: 'var(--Gray)',
          fontFamily: 'GothamProRegular',
          fontSize: 14,
        }}
      >
        Barchasi: {count} ta
      </Typography>
    </Stack>
  )
}
