import Stack from '@mui/material/Stack'
import Pagination from '@mui/material/Pagination'

export const CustomPagination = () => {
  return (
    <Stack width='100%' display='flex' justifyContent='center' alignItems='center'>
      <Pagination
        count={10}
        variant='outlined'
        shape='rounded'
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
    </Stack>
  )
}
