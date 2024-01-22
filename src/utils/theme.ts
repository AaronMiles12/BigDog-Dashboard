import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#DD075E",
      dark: "#B80D5E",
      light: "#F2D9E6",
    },

    secondary: {
      main: "#242D3C",
      light: "#333F51",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
