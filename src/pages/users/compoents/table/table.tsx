/* eslint-disable quotes */
import { useUserStore } from '@/store/user'
import { type MyFormValues } from '@/types/user'
import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Table as TableComponent,
  Stack,
  Button,
  Typography,
} from '@mui/material'
import { useFormContext } from 'react-hook-form'

export const Table = ({ setTrue }: { setTrue: () => void }) => {
  const form = useFormContext()
  const users = useUserStore(state => state.users)
  const deleteUser = useUserStore(state => state.deleteUser)
  const deleteFunc = (id: string) => {
    deleteUser(id)
  }

  const updateFunc = (user: MyFormValues) => {
    form.reset(user)
    setTrue()
  }
  return (
    <TableComponent>
      <TableHead>
        <TableRow
          sx={{
            th: {
              fontWeight: 700,
            },
          }}
        >
          <TableCell>Ism</TableCell>
          <TableCell>Familiya</TableCell>
          <TableCell>Telefon raqam</TableCell>
          <TableCell>Tug'ilgan davlat</TableCell>
          <TableCell>Til</TableCell>
          <TableCell>Amallar</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.length > 0 ? (
          users.map(user => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.firstname}</TableCell>
              <TableCell>
                {user.phones && user.phones.length > 0 ? (
                  <Stack width='100px'>
                    {user.phones.map((p, id: number) => (
                      <Typography fontSize='12px' key={id}>
                        {p.phone}
                      </Typography>
                    ))}
                  </Stack>
                ) : (
                  'Raqam kiritilmagan'
                )}
              </TableCell>
              <TableCell>{user.country ?? 'Kiritilmagan'}</TableCell>
              <TableCell>{user.language ?? 'Kiritilmagan'}</TableCell>
              <TableCell sx={{ width: '200px' }}>
                <Stack direction='row' gap='16px'>
                  <Button
                    onClick={() => {
                      updateFunc(user)
                    }}
                    color='success'
                    variant='outlined'
                    size='small'
                  >
                    Tahrirlash
                  </Button>
                  <Button
                    onClick={() => {
                      deleteFunc(`${user.id}`)
                    }}
                    color='error'
                    variant='outlined'
                    size='small'
                  >
                    O'chirish
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={6} sx={{ textAlign: 'center' }}>
              Ma'lumot topilmadi
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </TableComponent>
  )
}
