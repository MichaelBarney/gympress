import { createTheme } from "@mui/material";

export const colors = {
  black: "#1F282A",
  lightBlack: "#8F9495",

  lightGreen: "#B0E342",
  green: "#B1E443",
  darkGreen: "#85AC34",

  white: "#FFFFFF",
};

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: colors.white,
    },
    secondary: {
      main: colors.green,
    },
    background: {
      default: colors.black,
    },
    text: {
      primary: colors.white,
    },
  },
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
  },
});
