import { createTheme } from '@material-ui/core';

export const theme = createTheme({
  overrides: {
    MuiTypography: {
      subtitle1: {
        color: '#424242',
        fontSize: '0.75rem',
      },
      h5: {
        color: '#424242',
        fontSize: '1.25rem',
        lineHeight: '1.2',
        letterSpacing: '0.01em',
      },
    },
  },
});
