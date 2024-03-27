import { COLORS, BREAKPOINTS, LIGHT_COLORS, DARK_COLORS } from '@/constants/css'
import {
  type ColorSystemOptions,
  type SupportedColorScheme,
  experimental_extendTheme as extendTheme,
} from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Palette {
    allColors: typeof COLORS
    colors: typeof LIGHT_COLORS
  }

  interface PaletteOptions {
    allColors: typeof COLORS
    colors: typeof LIGHT_COLORS
  }
}

declare module '@mui/material/IconButton' {
  interface IconButtonOwnProps {
    radius?: string | number
  }
}

const colorSchemes: Partial<Record<SupportedColorScheme, ColorSystemOptions>> | undefined = {
  light: {
    palette: {
      allColors: COLORS,
      colors: LIGHT_COLORS,
      primary: {
        main: COLORS.BRAND,
      },
      text: {
        primary: COLORS.BLACK,
      },
      error: {
        light: COLORS.RED,
        main: COLORS.RED,
        dark: COLORS.RED,
      },
    },
  },
  dark: {
    palette: {
      allColors: COLORS,
      colors: DARK_COLORS,
      primary: {
        main: COLORS.BRAND,
      },
      text: {
        primary: COLORS.BLACK,
      },
      error: {
        light: COLORS.RED,
        main: COLORS.RED,
        dark: COLORS.RED,
      },
    },
  },
}

export const theme = extendTheme({
  colorSchemes,
  breakpoints: BREAKPOINTS,
  shape: {
    borderRadius: 8,
  },

  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
      styleOverrides: {
        sizeLarge: {
          height: 60,
          fontSize: '20px',
          letterSpacing: '-0.8px',
          padding: '0 20px',
        },
        sizeMedium: {
          height: 50,
          fontSize: '18px',
          letterSpacing: '-0.6px',
        },
        sizeSmall: {
          height: 40,
          gap: '6px',
        },

        root: ({ theme }) => ({
          fontWeight: 500,
          fontSize: '16px',
          boxShadow: 'none',
          whiteSpace: 'nowrap',
          textAlign: 'center',
          borderRadius: '10px',
          textTransform: 'inherit',
          padding: '0 16px',
          gap: '10px',
          ':hover': {
            boxShadow: 'none',
          },
        }),
      },
      variants: [
        {
          props: { variant: 'contained' },
          style: ({ theme }) => ({
            fontFamily: 'GothamProRegular',
            fontSize: 14,
            height: 44,
            minWidth: 150,
            '&.MuiLoadingButton-loading.Mui-disabled': {
              background: `${theme.palette.allColors.BRAND} !important`,
              '.MuiLoadingButton-loadingIndicator': {
                color: `${theme.palette.allColors.WHITE}`,
              },
            },
          }),
        },
        {
          props: { variant: 'outlined' },
          style: ({ theme }) => ({
            borderColor: `${theme.palette.allColors.GREY20} !important`,
            fontFamily: 'GothamProRegular',
            fontSize: 14,
            height: 44,
            minWidth: 150,
            '&.MuiLoadingButton-loading.Mui-disabled': {
              background: `${theme.palette.allColors.TRANSPARENT} !important`,
              '.MuiLoadingButton-loadingIndicator': {
                color: `${theme.palette.allColors.BRAND}`,
              },
            },
          }),
        },
      ],
    },

    MuiFormControl: {
      styleOverrides: {
        root: {
          ':has(label.MuiInputLabel-root)': {
            marginTop: '25px  !important',
          },
        },
      },
    },
    MuiInputBase: {
      defaultProps: {
        size: 'small',
      },
      styleOverrides: {
        root: ({ theme }) => ({
          height: 'auto',
          borderRadius: '8px !important',
          // backgroundColor: theme.palette.allColors.TRANSPARENT,
          backgroundColor: theme.palette.allColors.GREY,

          '&.MuiInputBase-sizeSmall': {
            height: '44px',
          },
          'input:-webkit-autofill,input:-webkit-autofill:hover,input:-webkit-autofill:focus,input:-webkit-autofill:active':
            {
              fontWeight: 500,
              fontSize: '14px',
              borderRadius: '0 8px 8px 0',
              WebkitTextFillColor: `${theme.palette.allColors.TRANSPARENT} !important`,
              WebkitBoxShadow: `0 0 0 30px ${theme.palette.allColors.TRANSPARENT} inset !important`,
              boxShadow: `0 0 0 30px ${theme.palette.allColors.TRANSPARENT} inset !important`,
              backgroundColor: theme.palette.allColors.TRANSPARENT,
            },
          ':has(.MuiInputAdornment-positionStart)': {
            paddingLeft: '20px !important',
            input: {
              paddingLeft: '0 !important',
            },
          },
          ':has(.MuiInputAdornment-positionEnd)': {
            paddingRight: '8px !important',
            input: {
              paddingRight: '0 !important',
            },
          },
          fieldset: {
            legend: {
              display: 'none',
            },
          },
          input: {
            height: 50,
            padding: '0 16px !important',
            fontSize: '14px',
            fontFamily: 'GothamProRegular',
            color: `${theme.palette.allColors.BLACK} !important`,
          },
        }),
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          transform: 'translate(0, -25px) scale(1)',
          fontFamily: 'GothamProRegular',
          fontSize: 14,
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: ({ theme }) => ({
          marginLeft: 0,
          fontSize: '12px',
          fontWeight: 400,
          fontFamily: 'GothamProRegular',
          color: theme.palette.allColors.RED,
        }),
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: '8px',
          '&.MuiInputBase-sizeSmall': {
            borderRadius: '5px',
          },
          '& fieldset': {
            top: 0,
            borderWidth: '1px',
            borderColor: theme.palette.allColors.GREY,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: `${theme.palette.allColors.BRAND} !important`,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderWidth: '1px',
            borderColor: `${theme.palette.allColors.BRAND} !important`,
          },
          '&.Mui-error .MuiOutlinedInput-notchedOutline': {
            borderWidth: '1px',
            borderColor: `${theme.palette.allColors.RED} !important`,
          },
        }),
      },
    },

    MuiSelect: {
      defaultProps: {
        MenuProps: {
          style: { zIndex: 9500 },
        },
      },
    },

    MuiMenu: {
      styleOverrides: {
        paper: ({ theme }) => ({
          marginTop: '8px',
          borderRadius: '10px',
          background: theme.palette.allColors.WHITE,
          border: `1px solid ${theme.palette.allColors.GREY}`,
          boxShadow: 'none',
        }),
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontWeight: 500,
          fontSize: '14px',
          padding: '8px 14px',
          lineHeight: 'normal',
          fontFamily: 'GothamProRegular',
          textAlign: 'center',
          color: theme.palette.allColors.BRAND,
          '.description': {
            opacity: 0.75,
            fontWeight: 400,
          },
        }),
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },

    MuiSwipeableDrawer: {
      defaultProps: {
        sx: {
          zIndex: 9000,
        },
        ModalProps: {
          keepMounted: false,
        },
        BackdropProps: {
          sx: theme => ({
            backgroundColor: theme.palette.allColors.BLACK20,
          }),
        },
        PaperProps: {
          sx: theme => ({
            backgroundImage: 'none',
            boxShadow: 'none',
            '&.MuiDrawer-paperAnchorBottom': {
              backgroundColor: theme.palette.allColors.TRANSPARENT,
              paddingTop: '14px',
            },
          }),
        },
      },
    },

    MuiDialog: {
      styleOverrides: {
        root: {
          zIndex: 9000,
        },
      },
      defaultProps: {
        PaperProps: {
          sx: () => ({
            borderRadius: '16px',
            backgroundImage: 'none',
            boxShadow: 'none',
          }),
        },
        BackdropProps: {
          sx: theme => ({
            backgroundColor: theme.palette.allColors.BLACK20,
          }),
        },
      },
    },
  },
})
