import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#66cbfe',
    },
    secondary: {
      main: '#19874b',
    },
    error: {
      main: red.A400,
    },
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundColor: '#4a148c',
        },
      },
    },
  },
});
