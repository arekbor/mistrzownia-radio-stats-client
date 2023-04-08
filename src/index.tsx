import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClientProvider } from "react-query";
import reactQueryClient from "./utils/reactQueryClient";
import { ThemeProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { createMuiTheme } from "@mui/material";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const theme = createMuiTheme({
  palette: {
    mode: "dark",
    secondary: {
      main: "#ff3333",
      contrastText: "#FFF",
    },
  },
  typography: {
    h5: {
      fontSize: "10px",
    },
  },
});

root.render(
  <QueryClientProvider client={reactQueryClient}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ThemeProvider>
  </QueryClientProvider>
);
