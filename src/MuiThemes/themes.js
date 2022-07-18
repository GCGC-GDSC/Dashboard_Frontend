import { createTheme } from '@mui/material/styles';

const theme1  = createTheme({
  palette: {
    // pink theme
    primary: {
      light: '#f2acb7',
      main: '#e77889',
      dark: '#eb6075',
      contrastText: '#613f44f',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
    white:{
      light:'white'
    }
  },
});

export default theme1