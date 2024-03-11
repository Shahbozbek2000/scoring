import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import { Typography } from '@mui/material'

interface IOptions {
  value: string
  label: string
}
interface ICustomRadioProps {
  options: IOptions[]
}

export const CustomRadioGroup = ({ options = [] }: ICustomRadioProps) => {
  return (
    <FormControl>
      <RadioGroup row>
        {options.map((v, i: number) => {
          return (
            <FormControlLabel
              key={i}
              value={v?.value}
              control={<Radio />}
              label={
                <Typography
                  variant='body1'
                  style={{ fontFamily: 'GothamProRegular', fontSize: 14 }}
                >
                  {v?.label}
                </Typography>
              }
              labelPlacement='start'
              style={{ fontFamily: 'GothamProRegular !important' }}
            />
          )
        })}
      </RadioGroup>
    </FormControl>
  )
}
