import {
  AppBar,
  Container,
  CssBaseline,
  Toolbar,
  Typography,
} from "@mui/material";
import { fontWeight } from "@mui/system";
import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import Home from "./pages/Home";
import { colors, theme } from "./theme";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" color="transparent" enableColorOnDark>
        <Toolbar variant="dense">
          <Typography
            variant="h6"
            color="inherit"
            component="div"
            style={{ color: colors.white }}
          >
            <b style={{ color: colors.green }}>Gym</b>Press
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Home />
      </Container>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
